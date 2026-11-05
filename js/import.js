/* ============================================================
   import.js — Importar playlist do YouTube automaticamente

   SEGURANÇA: nenhuma chave de API fica neste arquivo.
   A chave é digitada na própria plataforma (caixa "Chave da
   API do YouTube") e salva apenas no localStorage do seu
   navegador. Assim ela nunca vai para o GitHub.
============================================================ */

const YT_KEY_STORAGE = 'focuslearn_yt_key';

function getYTKey() {
  try { return (localStorage.getItem(YT_KEY_STORAGE) || '').trim(); }
  catch (e) { return ''; }
}

function saveYTKey() {
  const input = document.getElementById('yt-key-input');
  const key = (input?.value || '').trim();
  if (!/^AIza[0-9A-Za-z_-]{30,}$/.test(key)) {
    showImportError('Essa chave não parece válida. Ela começa com "AIza".');
    return;
  }
  try { localStorage.setItem(YT_KEY_STORAGE, key); } catch (e) {}
  input.value = '';
  document.getElementById('import-error').classList.add('hidden');
  renderKeyBox();
  showToast('🔑 Chave salva só neste navegador');
}

function clearYTKey() {
  try { localStorage.removeItem(YT_KEY_STORAGE); } catch (e) {}
  renderKeyBox();
}

function renderKeyBox() {
  const has = !!getYTKey();
  document.getElementById('yt-key-saved')?.classList.toggle('hidden', !has);
  document.getElementById('yt-key-form')?.classList.toggle('hidden', has);
}


/* Estado do import */
const ImportState = {
  videos: [],       // vídeos buscados da API
  playlistTitle: '',
};

/* ── Extrai o ID da playlist de qualquer formato de URL ──── */
function extractPlaylistId(url) {
  try {
    const u = new URL(url.trim());
    // Formato padrão: ?list=PLxxx
    const list = u.searchParams.get('list');
    if (list) return list;
  } catch (_) {}

  // Fallback regex caso a URL esteja malformada
  const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  return match ? match[1] : null;
}

/* ── Formata duração ISO 8601 (PT1H2M3S) → "1:02:03" ────── */
function formatDuration(iso) {
  if (!iso) return '';
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const h = parseInt(match[1] || 0);
  const m = parseInt(match[2] || 0);
  const s = parseInt(match[3] || 0);
  if (h > 0) return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${m}:${String(s).padStart(2,'0')}`;
}

/* ── Busca todos os vídeos da playlist (paginada) ────────── */
async function fetchAllPlaylistItems(playlistId) {
  let items = [];
  let pageToken = '';

  do {
    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet,contentDetails');
    url.searchParams.set('playlistId', playlistId);
    url.searchParams.set('maxResults', '50');
    url.searchParams.set('key', getYTKey());
    if (pageToken) url.searchParams.set('pageToken', pageToken);

    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err?.error?.message || 'Erro ao buscar playlist');
    }
    const data = await res.json();
    items = items.concat(data.items || []);
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return items;
}

/* ── Busca durações dos vídeos em lote (50 por vez) ───────── */
async function fetchVideoDurations(videoIds) {
  const durations = {};
  // Divide em lotes de 50
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.set('part', 'contentDetails');
    url.searchParams.set('id', batch.join(','));
    url.searchParams.set('key', getYTKey());

    const res = await fetch(url);
    if (!res.ok) continue;
    const data = await res.json();
    (data.items || []).forEach(v => {
      durations[v.id] = formatDuration(v.contentDetails?.duration);
    });
  }
  return durations;
}

/* ── Busca título da playlist ───────────────────────────────*/
async function fetchPlaylistInfo(playlistId) {
  const url = new URL('https://www.googleapis.com/youtube/v3/playlists');
  url.searchParams.set('part', 'snippet');
  url.searchParams.set('id', playlistId);
  url.searchParams.set('key', getYTKey());
  const res = await fetch(url);
  const data = await res.json();
  return data.items?.[0]?.snippet?.title || 'Novo Curso';
}

/* ── Função principal: botão "Buscar" ───────────────────── */
async function fetchPlaylist() {
  const input = document.getElementById('import-url-input').value.trim();
  const errorEl = document.getElementById('import-error');
  const loadingEl = document.getElementById('import-loading');
  const loadingMsg = document.getElementById('import-loading-msg');
  const fetchBtn = document.getElementById('btn-fetch');

  // Limpa estado anterior
  errorEl.classList.add('hidden');
  errorEl.textContent = '';

  if (!input) {
    showImportError('Cole o link da playlist primeiro.');
    return;
  }

  if (!getYTKey()) {
    renderKeyBox();
    showImportError('Cole sua chave da API do YouTube abaixo antes de buscar.');
    return;
  }

  const playlistId = extractPlaylistId(input);
  if (!playlistId) {
    showImportError('Link inválido. Certifique-se de copiar o link completo da playlist do YouTube.');
    return;
  }

  // Inicia loading
  loadingEl.classList.remove('hidden');
  fetchBtn.disabled = true;
  loadingMsg.textContent = 'Buscando informações da playlist...';

  try {
    // 1. Busca título da playlist
    const title = await fetchPlaylistInfo(playlistId);
    ImportState.playlistTitle = title;

    loadingMsg.textContent = 'Carregando vídeos...';

    // 2. Busca todos os itens da playlist
    const items = await fetchAllPlaylistItems(playlistId);

    if (items.length === 0) {
      throw new Error('Playlist vazia ou privada. Verifique se ela é pública.');
    }

    loadingMsg.textContent = `${items.length} vídeos encontrados. Buscando durações...`;

    // 3. Busca durações
    const videoIds = items
      .map(i => i.contentDetails?.videoId || i.snippet?.resourceId?.videoId)
      .filter(Boolean);
    const durations = await fetchVideoDurations(videoIds);

    // 4. Monta lista de vídeos
    ImportState.videos = items.map((item, idx) => {
      const videoId = item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
      const snippet = item.snippet || {};
      return {
        index: idx + 1,
        videoId,
        title: snippet.title || `Aula ${idx + 1}`,
        duration: durations[videoId] || '',
        thumbnail: snippet.thumbnails?.default?.url || '',
      };
    });

    // 5. Vai para etapa 2
    loadingEl.classList.add('hidden');
    fetchBtn.disabled = false;
    renderImportStep2(title);

  } catch (err) {
    loadingEl.classList.add('hidden');
    fetchBtn.disabled = false;
    showImportError(err.message || 'Erro desconhecido. Tente novamente.');
  }
}

/* ── Renderiza etapa 2 (revisão) ────────────────────────── */
function renderImportStep2(title) {
  document.getElementById('import-step-1').classList.add('hidden');
  document.getElementById('import-step-2').classList.remove('hidden');

  // Preenche campos editáveis
  document.getElementById('import-course-title').value = title;
  document.getElementById('import-course-icon').value = '🎓';
  document.getElementById('import-course-tag').value = 'YouTube';

  // Contagem
  document.getElementById('import-videos-count').textContent =
    `${ImportState.videos.length} vídeo${ImportState.videos.length !== 1 ? 's' : ''} encontrado${ImportState.videos.length !== 1 ? 's' : ''}`;

  // Lista de vídeos
  const list = document.getElementById('import-videos-list');
  list.innerHTML = '';

  ImportState.videos.forEach((v, i) => {
    const item = document.createElement('div');
    item.className = 'import-video-item';
    item.innerHTML = `
      <span class="import-video-num">${v.index}</span>
      ${v.thumbnail
        ? `<img class="import-video-thumb" src="${escapeHtmlAttr(v.thumbnail)}" alt="" loading="lazy" />`
        : `<div class="import-video-thumb"></div>`}
      <div class="import-video-info">
        <input
          class="import-video-title"
          type="text"
          value="${escapeHtmlAttr(v.title)}"
          data-idx="${i}"
          title="Clique para editar"
        />
        ${v.duration ? `<div class="import-video-duration">⏱ ${v.duration}</div>` : ''}
      </div>
    `;
    list.appendChild(item);
  });

  // Sync títulos editados de volta ao state
  list.addEventListener('input', (e) => {
    if (e.target.classList.contains('import-video-title')) {
      const idx = parseInt(e.target.dataset.idx);
      ImportState.videos[idx].title = e.target.value;
    }
  });
}

/* ── Confirma e cria o curso ────────────────────────────── */
function confirmImport() {
  const title = document.getElementById('import-course-title').value.trim() || 'Novo Curso';
  const icon  = document.getElementById('import-course-icon').value.trim() || '🎓';
  const tag   = document.getElementById('import-course-tag').value.trim() || 'YouTube';

  if (ImportState.videos.length === 0) {
    showToast('Nenhum vídeo para importar.');
    return;
  }

  // Gera ID único
  const courseId = 'yt-' + Date.now();

  // Escolhe cor aleatória pra ficar bonito
  const palettes = [
    { color: '#6366F1', bg: '#EEF2FF', thumb: 'linear-gradient(135deg,#6366F1,#A855F7)' },
    { color: '#059669', bg: '#D1FAE5', thumb: 'linear-gradient(135deg,#10B981,#3B82F6)' },
    { color: '#D97706', bg: '#FEF3C7', thumb: 'linear-gradient(135deg,#F59E0B,#EF4444)' },
    { color: '#0284C7', bg: '#E0F2FE', thumb: 'linear-gradient(135deg,#0EA5E9,#6366F1)' },
    { color: '#7C3AED', bg: '#EDE9FE', thumb: 'linear-gradient(135deg,#8B5CF6,#EC4899)' },
  ];
  const p = palettes[Math.floor(Math.random() * palettes.length)];

  // Monta módulo único com todas as aulas
  const lessons = ImportState.videos.map((v, i) => ({
    id: `${courseId}-lesson-${i}`,
    code: String(i + 1).padStart(4, '0'),
    title: v.title,
    duration: v.duration,
    youtubeId: v.videoId,
    description: `Aula ${i + 1} do curso importado do YouTube.`,
  }));

  const newCourse = {
    id: courseId,
    title,
    description: `Curso importado do YouTube com ${lessons.length} aulas.`,
    tag,
    tagColor: p.color,
    tagBg: p.bg,
    thumbColor: p.thumb,
    thumbIcon: icon,
    modules: [
      {
        id: `${courseId}-mod-1`,
        title: 'Aulas',
        lessons,
      }
    ],
    imported: true, // marcado como importado (não vem do data.js)
  };

  // Adiciona ao início da lista de cursos
  COURSES_DATA.unshift(newCourse);
  saveImportedCourses();

  closeModal('modal-import');
  resetImportModal();
  renderCourseCards();
  showToast(`✅ "${title}" importado com ${lessons.length} aulas!`, 3500);

  // Scrola para os cursos
  setTimeout(() => scrollToSection('cursos-section'), 300);

  // Abre setup do plano de estudos
  setTimeout(() => {
    if (typeof openPlanSetupModal === 'function') {
      openPlanSetupModal(courseId, title, lessons.length);
    }
  }, 800);
}

/* ── Volta para etapa 1 ─────────────────────────────────── */
function importGoBack() {
  document.getElementById('import-step-2').classList.add('hidden');
  document.getElementById('import-step-1').classList.remove('hidden');
}

/* ── Reset do modal ─────────────────────────────────────── */
function resetImportModal() {
  document.getElementById('import-url-input').value = '';
  document.getElementById('import-error').classList.add('hidden');
  document.getElementById('import-loading').classList.add('hidden');
  document.getElementById('import-videos-list').innerHTML = '';
  document.getElementById('import-step-1').classList.remove('hidden');
  document.getElementById('import-step-2').classList.add('hidden');
  document.getElementById('btn-fetch').disabled = false;
  ImportState.videos = [];
  ImportState.playlistTitle = '';
}

/* ── Fecha modal e reseta ───────────────────────────────── */
const _origCloseModal = window.closeModal;
// Intercepta closeModal para resetar ao fechar o import
document.addEventListener('DOMContentLoaded', () => {
  // Reseta quando fechar o modal de import
  document.getElementById('modal-import')
    ?.querySelector('.modal-close')
    ?.addEventListener('click', resetImportModal);
});

/* ── Helpers ─────────────────────────────────────────────── */
function showImportError(msg) {
  const el = document.getElementById('import-error');
  el.textContent = '⚠️ ' + msg;
  el.classList.remove('hidden');
}

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

document.addEventListener('DOMContentLoaded', renderKeyBox);

/* ── Cursos importados ficam salvos só neste navegador ──── */
const IMPORTED_KEY = 'focuslearn_imported_courses';

function saveImportedCourses() {
  try {
    localStorage.setItem(IMPORTED_KEY,
      JSON.stringify(COURSES_DATA.filter(c => c.imported)));
  } catch (e) {}
}

(function loadImportedCourses() {
  try {
    const saved = JSON.parse(localStorage.getItem(IMPORTED_KEY) || '[]');
    saved.forEach(c => {
      if (c && c.id && !COURSES_DATA.find(x => x.id === c.id)) COURSES_DATA.unshift(c);
    });
  } catch (e) {}
})();
