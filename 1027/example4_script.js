// example4_script.js
// 提交攔截、手動驗證、錯誤聚焦、防重送（disable 按鈕）與ARIA提示

const form = document.getElementById('access-form');
const submitBtn = document.getElementById('submit-btn');
const fields = [
  { input: document.getElementById('name'), error: document.getElementById('name-error') },
  { input: document.getElementById('age'),  error: document.getElementById('age-error')  },
];

let statusLive = document.getElementById('form-status-live');
if (!statusLive) {
  statusLive = document.createElement('div');
  statusLive.id = 'form-status-live';
  statusLive.setAttribute('aria-live', 'polite');
  statusLive.setAttribute('role', 'status');
  statusLive.className = 'visually-hidden'; 
  form.appendChild(statusLive);
}

function setError(field, message) {
  const { input, error } = field;
  input.setCustomValidity(message);
  error.textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function validateField(field) {
  const { input } = field;
  let message = '';

  if (input.validity.valueMissing) {
    message = '此欄位為必填。';
  } else if (input.type === 'number' && (input.validity.rangeUnderflow || input.validity.rangeOverflow)) {
    message = `請輸入 ${input.min} 到 ${input.max} 之間的數字。`;
  }

  setError(field, message);
  return !message;
}

function validateAll() {
  let firstInvalid = null;
  fields.forEach((field) => {
    const ok = validateField(field);
    if (!ok && !firstInvalid) firstInvalid = field.input;
  });
  if (firstInvalid) firstInvalid.focus();
  return !firstInvalid;
}

fields.forEach((field) => {
  field.input.addEventListener('input', () => {
    if (field.input.validationMessage) validateField(field);
  });
  field.input.addEventListener('blur', () => validateField(field));
});

async function submitToServer(payload, { signal } = {}) {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true };
}

let submitting = false;
let currentAbort = null;

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  if (submitting) return;

  const valid = validateAll();
  if (!valid) return;

  submitting = true;
  submitBtn.disabled = true;
  const originalBtnText = submitBtn.textContent;
  submitBtn.textContent = '送出中…';

  const formData = {
    name: document.getElementById('name').value.trim(),
    age:  Number(document.getElementById('age').value),
    message: document.getElementById('message').value.trim(),
  };

  currentAbort = new AbortController();

  try {
    const res = await submitToServer(formData, { signal: currentAbort.signal });

    if (!res || res.ok !== true) {
      statusLive.classList.remove('visually-hidden');
      statusLive.textContent = '送出失敗，請稍後再試。';
      return;
    }

    form.reset();
    fields.forEach(({ input, error }) => {
      input.setCustomValidity('');
      input.setAttribute('aria-invalid', 'false');
      error.textContent = '';
    });
    statusLive.classList.remove('visually-hidden');
    statusLive.textContent = '送出成功！';

  } catch (err) {
    if (err.name === 'AbortError') {
      statusLive.classList.remove('visually-hidden');
      statusLive.textContent = '已中止送出。';
    } else {
      statusLive.classList.remove('visually-hidden');
      statusLive.textContent = '發生錯誤，請稍後再試。';

    }
  } finally {
    submitting = false;
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
    currentAbort = null;
  }
});

export function abortSubmit() {
  if (currentAbort) currentAbort.abort();
}
