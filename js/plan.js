/* ============================================================
   plan.js — Plano Semanal de Estudos
============================================================ */

const DAYS_PT = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'];
const DAYS_FULL = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];

const LEARNING_QUOTES = [
  { quote: 'A melhor forma de aprender é ensinando.', author: 'Richard Feynman' },
  { quote: 'Escrever sobre o que você aprendeu fixa o conhecimento 3x mais.', author: 'Ciência da Memória' },
  { quote: 'Quem ensina aprende duas vezes.', author: 'Joseph Joubert' },
  { quote: 'Resumir em suas próprias palavras é o maior sinal de que você entendeu.', author: 'Aprendizagem Ativa' },
  { quote: 'Ensine como se fosse explicar para uma criança de 10 anos.', author: 'Técnica Feynman' },
  { quote: 'Seu cérebro consolida memórias enquanto você dorme. Revise antes de dormir.', author: 'Neurociência' },
  { quote: 'Consistência bate intensidade. 30 min todo dia > 4h no sábado.', author: 'Ciência do Hábito' },
];

/* ── Estado do plano ─────────────────────────────────────── */
const PlanState = {
  plans: [], // [{courseId, courseName, startDate, lessonsPerDay, studyDays, weeks, dailyLogs}]
};

function loadPlanState() {
  try {
    const saved = localStorage.getItem('focuslearn_plans');
    if (saved) PlanState.plans = JSON.parse(saved);
  } catch(e) {}
}

function savePlanState() {
  try {
    localStorage.setItem('focuslearn_plans', JSON.stringify(PlanState.plans));
  } catch(e) {}
}

/* ── Cria plano para um curso ───────────────────────────── */
function createPlan(courseId, courseName, totalLessons, config) {
  const { startDate, lessonsPerDay, studyDays } = config;

  // Distribui aulas nos dias de estudo
  const weeks = buildWeeks(totalLessons, startDate, lessonsPerDay, studyDays);

  const plan = {
    id: 'plan-' + Date.now(),
    courseId,
    courseName,
    totalLessons,
    lessonsPerDay,
    studyDays,
    startDate,
    weeks,
    dailyLogs: {}, // { 'YYYY-MM-DD': { summary, lessonsCount, mood } }
    createdAt: new Date().toISOString(),
  };

  // Remove plano anterior do mesmo curso se existir
  PlanState.plans = PlanState.plans.filter(p => p.courseId !== courseId);
  PlanState.plans.unshift(plan);
  savePlanState();
  return plan;
}

/* ── Distribui aulas em semanas/dias ────────────────────── */
function buildWeeks(totalLessons, startDateStr, lessonsPerDay, studyDays) {
  const weeks = [];
  let lessonIdx = 0;
  let current = new Date(startDateStr + 'T12:00:00');
  let weekNum = 1;

  while (lessonIdx < totalLessons) {
    const week = { weekNum, days: [] };

    // Pega os 7 dias da semana
    const weekStart = new Date(current);
    for (let d = 0; d < 7; d++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + d);
      const dayOfWeek = date.getDay();
      const dateStr = formatDate(date);
      const isStudyDay = studyDays.includes(dayOfWeek);
      const count = isStudyDay ? Math.min(lessonsPerDay, totalLessons - lessonIdx) : 0;

      week.days.push({
        date: dateStr,
        dayOfWeek,
        dayName: DAYS_PT[dayOfWeek],
        isStudyDay,
        lessonStart: isStudyDay ? lessonIdx + 1 : null,
        lessonEnd: isStudyDay ? lessonIdx + count : null,
        lessonsCount: count,
      });

      if (isStudyDay && count > 0) lessonIdx += count;
      if (lessonIdx >= totalLessons) break;
    }

    weeks.push(week);
    current.setDate(current.getDate() + 7);
    weekNum++;
    if (weekNum > 52) break; // segurança
  }

  return weeks;
}

/* ── Helpers de data ────────────────────────────────────── */
function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function todayStr() {
  return formatDate(new Date());
}

function getPlanForToday(plan) {
  const today = todayStr();
  for (const week of plan.weeks) {
    for (const day of week.days) {
      if (day.date === today) return { week, day };
    }
  }
  return null;
}

function getPlanStatus(plan) {
  const today = todayStr();
  let lastStudyDay = null;
  let nextStudyDay = null;
  let delayedDays = 0;

  for (const week of plan.weeks) {
    for (const day of week.days) {
      if (!day.isStudyDay || day.lessonsCount === 0) continue;
      if (day.date < today && !plan.dailyLogs[day.date]) delayedDays++;
      if (day.date <= today) lastStudyDay = day;
      if (day.date > today && !nextStudyDay) nextStudyDay = day;
    }
  }

  return { lastStudyDay, nextStudyDay, delayedDays };
}

function getCurrentWeek(plan) {
  const today = todayStr();
  for (const week of plan.weeks) {
    const dates = week.days.map(d => d.date);
    if (dates.includes(today)) return week;
    if (dates[0] <= today && dates[dates.length-1] >= today) return week;
  }
  return plan.weeks[0];
}

/* ── Salva log diário ───────────────────────────────────── */
function saveDailyLog(planId, summary, mood) {
  const plan = PlanState.plans.find(p => p.id === planId);
  if (!plan) return;
  const today = todayStr();
  plan.dailyLogs[today] = {
    summary,
    mood,
    savedAt: new Date().toISOString(),
  };
  savePlanState();
  showToast('📝 Resumo salvo! Continue assim!');
  closePlanLogModal();
  renderPlanCard();
}

/* ── Seletor: criar plano para qualquer curso ───────────── */
function planPickerHtml() {
  const opts = COURSES_DATA.map(c =>
    `<option value="${escHtml(c.id)}">${escHtml(c.title)}</option>`).join('');
  return `<div class="plan-picker">
    <select id="plan-course-select" class="import-field-input">${opts}</select>
    <button class="btn-modal-primary" onclick="startPlanFromSelect()">＋ Criar plano</button>
  </div>`;
}

function startPlanFromSelect() {
  const id = document.getElementById('plan-course-select')?.value;
  const c = COURSES_DATA.find(x => x.id === id);
  if (c) openPlanSetupModal(c.id, c.title, countLessons(c));
}

/* ── Renderiza o card "Meu Plano" na home ───────────────── */
function renderPlanCard() {
  const container = document.getElementById('plan-card-container');
  if (!container) return;

  if (PlanState.plans.length === 0) {
    container.innerHTML = `
      <div class="plan-empty-card">
        <div class="plan-empty-icon">📅</div>
        <div class="plan-empty-text">
          <strong>Nenhum plano criado</strong>
          <p>Escolha um curso e monte seu plano semanal</p>
        </div>
      </div>${planPickerHtml()}`;
    return;
  }

  const plan = PlanState.plans[0]; // plano mais recente
  const today = todayStr();
  const todayData = getPlanForToday(plan);
  const { delayedDays } = getPlanStatus(plan);
  const todayLog = plan.dailyLogs[today];
  const currentWeek = getCurrentWeek(plan);
  const totalWeeks = plan.weeks.length;
  const currentWeekNum = currentWeek?.weekNum || 1;

  // Aulas totais concluídas (via AppState se disponível)
  const completedSet = AppState?.completedLessons?.[plan.courseId];
  const completedCount = completedSet ? completedSet.size : 0;
  const totalPct = Math.round((completedCount / plan.totalLessons) * 100);

  container.innerHTML = `
    <div class="plan-card" onclick="openPlanModal('${plan.id}')">
      <div class="plan-card-header">
        <div class="plan-card-title">
          <span class="plan-icon">📅</span>
          <div>
            <div class="plan-course-name">${escHtml(plan.courseName)}</div>
            <div class="plan-week-label">Semana ${currentWeekNum} de ${totalWeeks}</div>
          </div>
        </div>
        <div class="plan-overall-pct">${totalPct}%</div>
      </div>

      ${delayedDays > 0 ? `
        <div class="plan-alert">
          ⚠️ Você está <strong>${delayedDays} dia${delayedDays>1?'s':''}</strong> atrasado! Hoje é o momento de recuperar.
        </div>` : ''}

      ${todayData && todayData.day.isStudyDay ? `
        <div class="plan-today">
          <div class="plan-today-label">📚 Hoje</div>
          <div class="plan-today-info">
            <strong>${todayData.day.lessonsCount} aulas</strong>
            ${todayData.day.lessonStart ? `<span class="plan-lesson-range">(aula ${todayData.day.lessonStart} → ${todayData.day.lessonEnd})</span>` : ''}
          </div>
          ${todayLog
            ? `<div class="plan-today-done">✅ Resumo do dia salvo!</div>`
            : `<div class="plan-today-cta" onclick="event.stopPropagation();openPlanLogModal('${plan.id}')">✍️ Escrever resumo do dia</div>`}
        </div>` : `
        <div class="plan-today rest">
          <div class="plan-today-label">😌 Hoje</div>
          <div class="plan-today-info">Dia de descanso — aproveite!</div>
        </div>`}

      <div class="plan-week-strip">
        ${(currentWeek?.days || []).map(d => `
          <div class="plan-day-dot ${d.isStudyDay ? 'study' : 'rest'} ${d.date === today ? 'today' : ''} ${plan.dailyLogs[d.date] ? 'done' : ''}">
            <span>${d.dayName}</span>
            ${d.isStudyDay ? `<div class="dot ${plan.dailyLogs[d.date] ? 'done' : d.date < today ? 'missed' : ''}"></div>` : `<div class="dot rest"></div>`}
          </div>`).join('')}
      </div>
    </div>${planPickerHtml()}`;
}

/* ── Modal do plano completo ────────────────────────────── */
function openPlanModal(planId) {
  const plan = PlanState.plans.find(p => p.id === planId);
  if (!plan) return;

  const today = todayStr();
  const { delayedDays } = getPlanStatus(plan);

  const weeksHtml = plan.weeks.map(week => {
    const allDone = week.days.filter(d => d.isStudyDay && d.lessonsCount > 0).every(d => plan.dailyLogs[d.date]);
    return `
      <div class="plan-week-block ${allDone ? 'done' : ''}">
        <div class="plan-week-num">Semana ${week.weekNum} ${allDone ? '✅' : ''}</div>
        <div class="plan-week-days">
          ${week.days.map(d => `
            <div class="plan-week-day ${d.isStudyDay && d.lessonsCount > 0 ? 'study' : 'rest'} ${d.date === today ? 'today' : ''} ${plan.dailyLogs[d.date] ? 'done' : d.date < today && d.isStudyDay && d.lessonsCount > 0 ? 'missed' : ''}">
              <div class="pwd-name">${d.dayName}</div>
              ${d.isStudyDay && d.lessonsCount > 0
                ? `<div class="pwd-count">${d.lessonsCount} aula${d.lessonsCount > 1 ? 's' : ''}</div>`
                : `<div class="pwd-rest">—</div>`}
              ${plan.dailyLogs[d.date] ? `<div class="pwd-done">✓</div>` : ''}
            </div>`).join('')}
        </div>
        ${allDone && plan.dailyLogs[week.days.find(d=>d.isStudyDay)?.date]?.summary ? `
          <div class="plan-week-summary">
            💬 "${plan.dailyLogs[week.days.find(d=>d.isStudyDay)?.date].summary.slice(0,80)}..."
          </div>` : ''}
      </div>`;
  }).join('');

  document.getElementById('plan-modal-content').innerHTML = `
    <div class="plan-modal-header">
      <h2>📅 ${escHtml(plan.courseName)}</h2>
      <p>${plan.weeks.length} semanas · ${plan.totalLessons} aulas · ${plan.lessonsPerDay} aula${plan.lessonsPerDay>1?'s':''}/dia</p>
      ${delayedDays > 0 ? `<div class="plan-alert" style="margin-top:10px">⚠️ ${delayedDays} dia${delayedDays>1?'s':''} de atraso — não desista!</div>` : ''}
    </div>
    <div class="plan-weeks-grid">${weeksHtml}</div>
    <div class="plan-modal-footer">
      <button class="btn-modal-secondary" onclick="closeModal('modal-plan')">Fechar</button>
      <button class="btn-modal-primary" onclick="closeModal('modal-plan');openCourse('${plan.courseId}')">Ir para o Curso →</button>
    </div>`;

  openModal('modal-plan');
}

/* ── Modal de log diário ────────────────────────────────── */
function openPlanLogModal(planId) {
  const plan = PlanState.plans.find(p => p.id === planId);
  if (!plan) return;

  const quote = LEARNING_QUOTES[Math.floor(Math.random() * LEARNING_QUOTES.length)];
  const today = todayStr();
  const todayData = getPlanForToday(plan);

  document.getElementById('plan-log-content').innerHTML = `
    <div class="plan-log-header">
      <div class="plan-log-icon">✍️</div>
      <h2>Resumo do dia</h2>
      <p>O que você aprendeu hoje?</p>
    </div>

    <div class="plan-log-quote">
      <div class="plq-text">"${quote.quote}"</div>
      <div class="plq-author">— ${quote.author}</div>
    </div>

    ${todayData ? `
      <div class="plan-log-info">
        📚 Hoje: <strong>${todayData.day.lessonsCount} aulas</strong>
        ${todayData.day.lessonStart ? `(aula ${todayData.day.lessonStart} até ${todayData.day.lessonEnd})` : ''}
      </div>` : ''}

    <div class="plan-log-field">
      <label>Explique com suas palavras o que você aprendeu hoje:</label>
      <textarea id="plan-log-summary" placeholder="Ex: Aprendi sobre box model no CSS. Entendi que todo elemento tem margin, border e padding. Se eu fosse explicar para alguém, diria que é como uma caixa dentro de outra caixa..." rows="5"></textarea>
      <div class="plan-log-hint">💡 Dica: escreva como se estivesse explicando para um amigo. Quem consegue ensinar, aprendeu de verdade.</div>
    </div>

    <div class="plan-log-mood">
      <label>Como foi o estudo hoje?</label>
      <div class="mood-options">
        <label class="mood-opt"><input type="radio" name="mood" value="great"> 🔥 Excelente</label>
        <label class="mood-opt"><input type="radio" name="mood" value="good" checked> 😊 Bem</label>
        <label class="mood-opt"><input type="radio" name="mood" value="ok"> 😐 Mais ou menos</label>
        <label class="mood-opt"><input type="radio" name="mood" value="hard"> 😓 Difícil</label>
      </div>
    </div>

    <button class="btn-modal-primary" style="width:100%;margin-top:4px" onclick="submitDailyLog('${plan.id}')">
      Salvar Resumo 💾
    </button>`;

  openModal('modal-plan-log');
}

function closePlanLogModal() {
  closeModal('modal-plan-log');
}

function submitDailyLog(planId) {
  const summary = document.getElementById('plan-log-summary')?.value?.trim();
  const mood = document.querySelector('input[name="mood"]:checked')?.value || 'good';

  if (!summary || summary.length < 10) {
    showToast('Escreva pelo menos uma frase sobre o que aprendeu!');
    return;
  }

  saveDailyLog(planId, summary, mood);
}

/* ── Abre modal de setup do plano (chamado pelo import) ── */
function openPlanSetupModal(courseId, courseName, totalLessons) {
  const today = todayStr();

  document.getElementById('plan-setup-content').innerHTML = `
    <div class="plan-log-header">
      <div class="plan-log-icon">📅</div>
      <h2>Criar Plano de Estudos</h2>
      <p>Para o curso <strong>${escHtml(courseName)}</strong> (${totalLessons} aulas)</p>
    </div>

    <div class="plan-setup-fields">
      <div class="import-field">
        <label>Data de início</label>
        <input type="date" id="plan-start-date" class="import-field-input" value="${today}" min="${today}" />
      </div>

      <div class="import-field">
        <label>Aulas por dia de estudo</label>
        <div class="goal-picker">
          <button type="button" onclick="adjustPlanLessons(-1)">−</button>
          <input type="number" id="plan-lessons-per-day" value="2" min="1" max="10" />
          <button type="button" onclick="adjustPlanLessons(1)">+</button>
        </div>
      </div>

      <div class="import-field">
        <label>Dias de estudo por semana</label>
        <div class="plan-days-picker" id="plan-days-picker">
          ${DAYS_PT.map((d, i) => `
            <button type="button" class="plan-day-btn ${[1,2,3,4,5].includes(i) ? 'selected' : ''}"
              data-day="${i}" onclick="togglePlanDay(this)">
              ${d}
            </button>`).join('')}
        </div>
      </div>

      <div class="plan-preview" id="plan-preview"></div>
    </div>

    <input type="hidden" id="plan-course-id" value="${courseId}" />
    <input type="hidden" id="plan-course-name" value="${escHtml(courseName)}" />
    <input type="hidden" id="plan-total-lessons" value="${totalLessons}" />

    <div class="import-actions" style="margin-top:16px">
      <button class="btn-modal-secondary" onclick="closeModal('modal-plan-setup');renderPlanCard()">Pular por agora</button>
      <button class="btn-modal-primary" onclick="confirmPlanSetup()">Criar Plano ✅</button>
    </div>`;

  updatePlanPreview();
  openModal('modal-plan-setup');
}

function adjustPlanLessons(delta) {
  const inp = document.getElementById('plan-lessons-per-day');
  if (!inp) return;
  inp.value = Math.max(1, Math.min(10, parseInt(inp.value || 2) + delta));
  updatePlanPreview();
}

function togglePlanDay(btn) {
  btn.classList.toggle('selected');
  updatePlanPreview();
}

function updatePlanPreview() {
  const lessonsPerDay = parseInt(document.getElementById('plan-lessons-per-day')?.value || 2);
  const total = parseInt(document.getElementById('plan-total-lessons')?.value || 0);
  const selectedDays = [...document.querySelectorAll('.plan-day-btn.selected')].map(b => parseInt(b.dataset.day));

  const prev = document.getElementById('plan-preview');
  if (!prev || selectedDays.length === 0) return;

  const studyDaysPerWeek = selectedDays.length;
  const lessonsPerWeek = studyDaysPerWeek * lessonsPerDay;
  const weeks = Math.ceil(total / lessonsPerWeek);

  prev.innerHTML = `
    <div class="plan-preview-box">
      <div class="ppb-item">📅 <strong>${weeks}</strong> semana${weeks !== 1 ? 's' : ''}</div>
      <div class="ppb-item">📚 <strong>${lessonsPerWeek}</strong> aulas/semana</div>
      <div class="ppb-item">⏱ ~<strong>${Math.round(weeks * 7)}</strong> dias</div>
    </div>`;
}

function confirmPlanSetup() {
  const courseId = document.getElementById('plan-course-id')?.value;
  const courseName = document.getElementById('plan-course-name')?.value;
  const totalLessons = parseInt(document.getElementById('plan-total-lessons')?.value || 0);
  const startDate = document.getElementById('plan-start-date')?.value;
  const lessonsPerDay = parseInt(document.getElementById('plan-lessons-per-day')?.value || 2);
  const studyDays = [...document.querySelectorAll('.plan-day-btn.selected')].map(b => parseInt(b.dataset.day));

  if (studyDays.length === 0) { showToast('Selecione pelo menos 1 dia de estudo!'); return; }
  if (!startDate) { showToast('Escolha uma data de início!'); return; }

  createPlan(courseId, courseName, totalLessons, { startDate, lessonsPerDay, studyDays });
  closeModal('modal-plan-setup');
  renderPlanCard();
  showToast('📅 Plano criado! Bons estudos!', 3000);
}

/* ── Inicialização ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  loadPlanState();
  renderPlanCard();
});
