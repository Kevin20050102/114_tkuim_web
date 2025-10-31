// practice6_dynamic_fields.js
// 動態新增報名欄位 + 序列化匯出 + localStorage 暫存 + 增強不合法樣式

const form = document.getElementById('dynamic-form');
const list = document.getElementById('participant-list');
const addBtn = document.getElementById('add-participant');
const submitBtn = document.getElementById('submit-btn');
const resetBtn = document.getElementById('reset-btn');
const countLabel = document.getElementById('count');

const maxParticipants = 5;
let participantIndex = 0;

const STORAGE_KEY = 'practice6_participants_v1';
(function ensureEnhancedInvalidStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .form-control.is-invalid {
      border-color: #dc3545 !important;                   /* 更明顯紅框 */
      box-shadow: 0 0 0 .25rem rgba(220, 53, 69, .2) !important; /* 柔和高亮 */
    }
  `;
  document.head.appendChild(style);
})();
function serializeParticipants() {
  const data = [];
  list.querySelectorAll('.participant').forEach((card) => {
    const nameInput = card.querySelector('input[type="text"]');
    const emailInput = card.querySelector('input[type="email"]');
    data.push({
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
    });
  });
  return data;
}

function saveToStorage() {
  const data = serializeParticipants();
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ participants: data }));
}

function restoreFromStorage() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  try {
    const { participants } = JSON.parse(raw);
    if (!Array.isArray(participants)) return false;
    list.innerHTML = '';
    participantIndex = 0;
    participants.forEach((p) => {
      const node = createParticipantCard(p);
      list.appendChild(node);
    });
    updateCount();
    return participants.length > 0;
  } catch {
    return false;
  }
}

function clearStorage() {
  localStorage.removeItem(STORAGE_KEY);
}

(function injectExportButtons() {
  const toolbar = addBtn.parentElement; 
  const exportJsonBtn = document.createElement('button');
  exportJsonBtn.id = 'export-json';
  exportJsonBtn.type = 'button';
  exportJsonBtn.className = 'btn btn-outline-success';
  exportJsonBtn.textContent = '匯出 JSON';

  const exportTextBtn = document.createElement('button');
  exportTextBtn.id = 'export-text';
  exportTextBtn.type = 'button';
  exportTextBtn.className = 'btn btn-outline-success';
  exportTextBtn.textContent = '匯出文字';

  toolbar.insertBefore(exportTextBtn, submitBtn);
  toolbar.insertBefore(exportJsonBtn, exportTextBtn);

  exportJsonBtn.addEventListener('click', () => exportParticipants('json'));
  exportTextBtn.addEventListener('click', () => exportParticipants('text'));
})();

function exportParticipants(type = 'json') {
  const data = serializeParticipants();
  if (data.length === 0) {
    alert('目前沒有參與者資料可匯出。');
    return;
  }

  const ts = new Date()
    .toISOString()
    .replace(/[:.]/g, '-')
    .replace('T', '_')
    .replace('Z', '');

  if (type === 'json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' });
    triggerDownload(blob, `participants_${ts}.json`);
  } else {
    const text = data
      .map((p, i) => `#${i + 1} 姓名：${p.name || '(未填)'}  Email：${p.email || '(未填)'}`)
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    triggerDownload(blob, `participants_${ts}.txt`);
  }
}

function triggerDownload(blob, filename) {
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  URL.revokeObjectURL(a.href);
  a.remove();
}

function createParticipantCard(defaults = { name: '', email: '' }) {
  const index = participantIndex++;
  const wrapper = document.createElement('div');
  wrapper.className = 'participant card border-0 shadow-sm';
  wrapper.dataset.index = index;
  wrapper.innerHTML = `
    <div class="card-body">
      <div class="d-flex justify-content-between align-items-start mb-3">
        <h5 class="card-title mb-0">參與者 ${index + 1}</h5>
        <button type="button" class="btn btn-sm btn-outline-danger" data-action="remove">移除</button>
      </div>
      <div class="mb-3">
        <label class="form-label" for="name-${index}">姓名</label>
        <input id="name-${index}" name="name-${index}" class="form-control" type="text" required aria-describedby="name-${index}-error" value="${escapeHtml(defaults.name)}">
        <p id="name-${index}-error" class="text-danger small mb-0" aria-live="polite"></p>
      </div>
      <div class="mb-0">
        <label class="form-label" for="email-${index}">Email</label>
        <input id="email-${index}" name="email-${index}" class="form-control" type="email" required aria-describedby="email-${index}-error" inputmode="email" value="${escapeHtml(defaults.email)}">
        <p id="email-${index}-error" class="text-danger small mb-0" aria-live="polite"></p>
      </div>
    </div>
  `;
  return wrapper;
}

function escapeHtml(s = '') {
  return s.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
}

function updateCount() {
  countLabel.textContent = list.children.length;
  addBtn.disabled = list.children.length >= maxParticipants;
}

function setError(input, message) {
  const error = document.getElementById(`${input.id}-error`);
  input.setCustomValidity(message);
  error.textContent = message;
  if (message) {
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');
  } else {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
  }
}

function validateInput(input) {
  const value = input.value.trim();
  if (!value) {
    setError(input, '此欄位必填');
    return false;
  }
  if (input.type === 'email') {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) {
      setError(input, 'Email 格式不正確');
      return false;
    }
  }
  setError(input, '');
  return true;
}

function handleAddParticipant() {
  if (list.children.length >= maxParticipants) return;
  const participant = createParticipantCard();
  list.appendChild(participant);
  updateCount();
  participant.querySelector('input').focus();
  saveToStorage();
}

addBtn.addEventListener('click', handleAddParticipant);

list.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="remove"]');
  if (!button) return;
  const participant = button.closest('.participant');
  participant?.remove();
  updateCount();
  saveToStorage();
});

list.addEventListener('blur', (event) => {
  if (event.target.matches('input')) {
    validateInput(event.target);
    saveToStorage();
  }
}, true);

list.addEventListener('input', (event) => {
  if (event.target.matches('input')) {
    const wasInvalid = !!event.target.validationMessage;
    if (wasInvalid) validateInput(event.target);
    saveToStorage();
  }
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (list.children.length === 0) {
    alert('請至少新增一位參與者');
    handleAddParticipant();
    return;
  }

  let firstInvalid = null;
  list.querySelectorAll('input').forEach((input) => {
    const valid = validateInput(input);
    if (!valid && !firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    firstInvalid.focus();
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = '送出中...';
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert('表單已送出！');

  form.reset();
  list.innerHTML = '';
  participantIndex = 0;
  updateCount();
  clearStorage();

  submitBtn.disabled = false;
  submitBtn.textContent = '送出';
});

resetBtn.addEventListener('click', () => {
  form.reset();
  list.innerHTML = '';
  participantIndex = 0;
  updateCount();
  clearStorage();
});

if (!restoreFromStorage()) {
  handleAddParticipant(); 
}
