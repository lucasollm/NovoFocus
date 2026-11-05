/* ============================================================
   exercises.js — Exercícios depois de cada aula
   Tipos: quiz · truefalse · code (autoavaliação) · open (reflexão)
   Todo texto passa por escHtml() antes de ir para a tela.
============================================================ */

const ExerciseState = {
  lessonId: null,
  list: [],
  i: 0,
  score: 0,
  scored: 0,      // quantos exercícios valem nota (open não vale)
  picked: null,
  thenNext: false,
};

/* ── Util ───────────────────────────────────────────────── */
function findLesson(lessonId) {
  for (const c of COURSES_DATA)
    for (const m of (c.modules || []))
      for (const l of (m.lessons || []))
        if (l.id === lessonId) return l;
  return null;
}

function lessonHasExercises(lessonId) {
  const l = findLesson(lessonId);
  return !!(l && l.exercises && l.exercises.length);
}

/* ── Abrir / fechar ─────────────────────────────────────── */
function openExercises(lessonId, thenNext = false) {
  const lesson = findLesson(lessonId);
  if (!lesson || !lesson.exercises?.length) return;
  Object.assign(ExerciseState, {
    lessonId, list: lesson.exercises, i: 0, score: 0, scored: 0,
    picked: null, thenNext,
  });
  renderExercise();
  openModal('modal-exercises');
}

function closeExercises(advance = false) {
  closeModal('modal-exercises');
  if (advance && ExerciseState.thenNext) navigateLesson(1);
  ExerciseState.thenNext = false;
}

/* ── Render de uma pergunta ─────────────────────────────── */
const TYPE_LABEL = {
  quiz: '🔵 Múltipla escolha',
  truefalse: '⚪ Verdadeiro ou falso',
  code: '💻 Código',
  open: '✍️ Reflexão',
};

function renderExercise() {
  const ex = ExerciseState.list[ExerciseState.i];
  const total = ExerciseState.list.length;
  const pct = Math.round((ExerciseState.i / total) * 100);
  ExerciseState.picked = null;

  document.getElementById('exercise-content').innerHTML = `
    <div class="ex-header">
      <div class="ex-progress-bar"><div class="ex-progress-fill" style="width:${pct}%"></div></div>
      <div class="ex-counter">${ExerciseState.i + 1} / ${total}</div>
    </div>
    <span class="ex-badge">${TYPE_LABEL[ex.type] || ''}</span>
    <div class="ex-question">${escHtml(ex.question)}</div>
    <div id="ex-body">${bodyHtml(ex)}</div>
    <div class="ex-feedback hidden" id="ex-feedback"></div>
    <div class="ex-actions">
      <button class="btn-ex-confirm ${needsPick(ex) ? 'hidden' : ''}" id="btn-ex-confirm" onclick="confirmAnswer()">Confirmar</button>
    </div>`;
}

function needsPick(ex) { return ex.type === 'quiz' || ex.type === 'truefalse'; }

function bodyHtml(ex) {
  if (ex.type === 'quiz') {
    return ex.options.map((o, i) => `
      <button class="ex-option" data-i="${i}" onclick="pickOption(${i})">
        <span class="ex-option-letter">${'ABCDEF'[i]}</span><span>${escHtml(o)}</span>
      </button>`).join('');
  }
  if (ex.type === 'truefalse') {
    return `<div class="ex-tf-options">
      <button class="ex-tf-btn" data-v="true"  onclick="pickTF(true)">✅ Verdadeiro</button>
      <button class="ex-tf-btn" data-v="false" onclick="pickTF(false)">❌ Falso</button>
    </div>`;
  }
  if (ex.type === 'code') {
    return `<textarea class="ex-code-input" id="ex-input" spellcheck="false"
      placeholder="${escHtml(ex.placeholder || 'Escreva seu código...')}"></textarea>
      <div class="ex-hint">💡 Escreva do seu jeito. Depois você compara com a resposta de referência e se avalia.</div>`;
  }
  return `<textarea class="ex-open-input" id="ex-input" rows="4"
    placeholder="${escHtml(ex.placeholder || 'Escreva com suas palavras...')}"></textarea>
    <div class="ex-hint">✍️ Não existe resposta errada. Explicar com suas palavras é o que fixa o conteúdo.</div>`;
}

/* ── Seleção ────────────────────────────────────────────── */
function pickOption(i) {
  ExerciseState.picked = i;
  document.querySelectorAll('.ex-option').forEach(b =>
    b.classList.toggle('selected', Number(b.dataset.i) === i));
  document.getElementById('btn-ex-confirm').classList.remove('hidden');
}

function pickTF(v) {
  ExerciseState.picked = v;
  document.querySelectorAll('.ex-tf-btn').forEach(b =>
    b.classList.toggle('selected', (b.dataset.v === 'true') === v));
  document.getElementById('btn-ex-confirm').classList.remove('hidden');
}

/* ── Confirmar ──────────────────────────────────────────── */
function confirmAnswer() {
  const ex = ExerciseState.list[ExerciseState.i];
  const fb = document.getElementById('ex-feedback');
  const btn = document.getElementById('btn-ex-confirm');
  const picked = ExerciseState.picked;
  let html = '';

  if (ex.type === 'quiz' || ex.type === 'truefalse') {
    if (picked === null) { showToast('Escolha uma resposta primeiro.'); return; }
    const ok = picked === ex.answer;
    ExerciseState.scored++;
    if (ok) ExerciseState.score++;

    if (ex.type === 'quiz') {
      document.querySelectorAll('.ex-option').forEach((b, i) => {
        b.style.pointerEvents = 'none';
        if (i === ex.answer) b.classList.add('correct');
        else if (i === picked) b.classList.add('wrong');
      });
    } else {
      document.querySelectorAll('.ex-tf-btn').forEach(b => {
        b.style.pointerEvents = 'none';
        const v = b.dataset.v === 'true';
        if (v === ex.answer) b.classList.add('correct');
        else if (v === picked) b.classList.add('wrong');
      });
    }
    html = `<div class="${ok ? 'feedback-correct' : 'feedback-wrong'}">
      ${ok ? '✅ Correto!' : '❌ Não foi dessa vez.'}
      <p>${escHtml(ex.explanation || '')}</p></div>`;
    finishStep(btn, fb, html);
    return;
  }

  const text = (document.getElementById('ex-input')?.value || '').trim();

  if (ex.type === 'code') {
    if (text.length < 2) { showToast('Escreva alguma coisa antes de conferir.'); return; }
    document.getElementById('ex-input').disabled = true;
    fb.innerHTML = `<div class="feedback-neutral">
      <strong>Resposta de referência:</strong>
      <pre class="code-block">${escHtml(ex.answer)}</pre>
      <p>Seu código fez a mesma coisa?</p>
      <div class="ex-self">
        <button class="ex-self-btn yes" onclick="selfCheck(true)">✅ Acertei</button>
        <button class="ex-self-btn no" onclick="selfCheck(false)">❌ Errei</button>
      </div></div>`;
    fb.classList.remove('hidden');
    btn.classList.add('hidden');
    return;
  }

  // open
  if (text.length < 5) { showToast('Escreva pelo menos uma frase.'); return; }
  document.getElementById('ex-input').disabled = true;
  html = `<div class="feedback-correct">✅ Boa reflexão! Quem consegue explicar, aprendeu.</div>`;
  finishStep(btn, fb, html);
}

function selfCheck(ok) {
  ExerciseState.scored++;
  if (ok) ExerciseState.score++;
  const fb = document.getElementById('ex-feedback');
  fb.innerHTML = `<div class="${ok ? 'feedback-correct' : 'feedback-wrong'}">
    ${ok ? '✅ Boa! Anotado.' : '📝 Tudo bem. Reveja a resposta de referência e tente de novo depois.'}</div>`;
  const btn = document.getElementById('btn-ex-confirm');
  finishStep(btn, fb, fb.innerHTML);
}

function finishStep(btn, fb, html) {
  fb.innerHTML = html;
  fb.classList.remove('hidden');
  btn.classList.remove('hidden');
  const last = ExerciseState.i >= ExerciseState.list.length - 1;
  btn.textContent = last ? 'Ver resultado' : 'Próxima →';
  btn.onclick = nextExercise;
}

function nextExercise() {
  if (ExerciseState.i < ExerciseState.list.length - 1) {
    ExerciseState.i++;
    renderExercise();
  } else {
    showExerciseResult();
  }
}

/* ── Resultado ──────────────────────────────────────────── */
function showExerciseResult() {
  const { score, scored } = ExerciseState;
  const pct = scored === 0 ? 100 : Math.round((score / scored) * 100);
  const xp = pct >= 80 ? 15 : pct >= 50 ? 8 : 3;
  const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🎯' : pct >= 50 ? '📚' : '💪';
  const msg = pct === 100 ? 'Perfeito! Você dominou essa aula.'
    : pct >= 80 ? 'Muito bom! Você entendeu bem.'
    : pct >= 50 ? 'Bom trabalho! Revise o que errou.'
    : 'Sem problema. Reveja o resumo e tente de novo.';

  document.getElementById('exercise-content').innerHTML = `
    <div class="ex-result">
      <div class="ex-result-emoji">${emoji}</div>
      <h2>${scored ? `${score}/${scored} corretas` : 'Reflexão concluída'}</h2>
      <div class="ex-result-pct">${pct}%</div>
      <p>${msg}</p>
      <div class="ex-result-xp">+${xp} XP</div>
      <button class="btn-modal-primary" style="width:100%;margin-top:16px"
        onclick="closeExercises(true)">${ExerciseState.thenNext ? 'Ir para a próxima aula →' : 'Fechar'}</button>
      ${pct < 80 ? `<button class="btn-modal-secondary" style="width:100%;margin-top:8px"
        onclick="openExercises('${ExerciseState.lessonId}', ${ExerciseState.thenNext})">🔄 Tentar de novo</button>` : ''}
    </div>`;

  gainXPDirect(xp);
}

function gainXPDirect(amount) {
  if (typeof XPState === 'undefined') return;
  XPState.xp = Math.min(XPState.xp + amount, 100);
  XPState.totalXP = Math.min(XPState.totalXP + amount, 100);
  saveXPState();
  updateXPUI();
  showXPPopup(`+${amount} XP`, 'gain');
}

/* ── Botão e resumo no player ───────────────────────────── */
function renderExerciseButton(lessonId) {
  const btn = document.getElementById('btn-exercises');
  if (!btn) return;
  const lesson = findLesson(lessonId);
  const n = lesson?.exercises?.length || 0;
  btn.classList.toggle('hidden', n === 0);
  btn.textContent = `🧠 Exercícios (${n})`;
  btn.onclick = () => openExercises(lessonId, false);
}

function renderTheory(lessonId) {
  const lesson = findLesson(lessonId);
  const box = document.getElementById('lesson-theory-section');
  if (!box) return;
  if (lesson?.theory) {
    document.getElementById('lesson-theory-content').innerHTML = markdownToHTML(lesson.theory);
    box.classList.remove('hidden');
  } else {
    box.classList.add('hidden');
  }
}

/* ── Mini-markdown seguro (escapa antes de formatar) ────── */
function markdownToHTML(md) {
  const blocks = [];
  const withoutCode = md.replace(/```[^\n]*\n?([\s\S]*?)```/g, (_, code) => {
    blocks.push(`<pre class="code-block"><code>${escHtml(code.replace(/\n+$/, ''))}</code></pre>`);
    return `\n\n@@B${blocks.length - 1}@@\n\n`;
  });

  const inline = s => escHtml(s)
    .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

  return withoutCode.split(/\n{2,}/).map(chunk => {
    chunk = chunk.trim();
    if (!chunk) return '';
    const m = chunk.match(/^@@B(\d+)@@$/);
    if (m) return blocks[Number(m[1])];
    const lines = chunk.split('\n');
    const items = lines.filter(l => /^- /.test(l));
    if (items.length && items.length === lines.filter(Boolean).length) {
      return `<ul>${items.map(l => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
    }
    // parágrafo (pode ter uma lista logo depois do título em negrito)
    const out = []; let list = [];
    const flush = () => { if (list.length) { out.push(`<ul>${list.join('')}</ul>`); list = []; } };
    lines.forEach(l => {
      if (/^- /.test(l)) list.push(`<li>${inline(l.slice(2))}</li>`);
      else { flush(); if (l.trim()) out.push(`<p>${inline(l)}</p>`); }
    });
    flush();
    return out.join('');
  }).join('');
}
