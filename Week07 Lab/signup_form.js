const form = document.getElementById('signup-form');
const submitBtn = document.getElementById('submitBtn');
const resetBtn = document.getElementById('resetBtn');
const statusLive = document.getElementById('form-status');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');
const interestsWrap = document.getElementById('interests');
const interestsError = document.getElementById('interests-error');
const interestsCount = document.getElementById('interests-count');
const tosCheckbox = document.getElementById('tos');
const strengthBar = document.getElementById('strength-bar');
const strengthText = document.getElementById('strength-text');
const openTosBtn = document.getElementById('open-tos');
const tosDialog = document.getElementById('tos-dialog');
const tosClose = document.getElementById('tos-close');
const touched = new Set();

function showError(inputEl, msg) {
  inputEl.setCustomValidity(msg || '');
  const errorEl = document.getElementById(`${inputEl.id}-error`);
  if (errorEl) errorEl.textContent = msg || '';
  inputEl.classList.toggle('is-invalid', Boolean(msg));
}

function clearError(inputEl) {
  showError(inputEl, '');
}
function validateName() {
  const v = nameInput.value.trim();
  if (!v) {
    showError(nameInput, '請輸入姓名。');
    return false;
  }
  clearError(nameInput);
  return true;
}

function validateEmail() {
  const v = emailInput.value.trim();
  if (!v) {
    showError(emailInput, '請輸入 Email。');
    return false;
  }
  if (!emailInput.checkValidity()) {
    showError(emailInput, 'Email 格式不正確，請輸入有效的 Email。');
    return false;
  }
  clearError(emailInput);
  return true;
}

function validatePhone() {
  const v = phoneInput.value.trim();
  if (!v) {
    showError(phoneInput, '請輸入手機。');
    return false;
  }
  if (!/^\d{10}$/.test(v)) {
    showError(phoneInput, '手機需為 10 碼數字。');
    return false;
  }
  clearError(phoneInput);
  return true;
}

function validatePassword() {
  const v = passwordInput.value;
  if (!v) {
    showError(passwordInput, '請輸入密碼。');
    return false;
  }
  if (v.length < 8) {
    showError(passwordInput, '密碼至少需 8 碼。');
    return false;
  }
  const hasLetter = /[A-Za-z]/.test(v);
  const hasNumber = /\d/.test(v);
  if (!hasLetter || !hasNumber) {
    showError(passwordInput, '請同時包含英文字母與數字。');
    return false;
  }
  clearError(passwordInput);
  return true;
}

function validateConfirm() {
  const p = passwordInput.value;
  const c = confirmInput.value;
  if (!c) {
    showError(confirmInput, '請再次輸入密碼。');
    return false;
  }
  if (p !== c) {
    showError(confirmInput, '兩次輸入的密碼不一致。');
    return false;
  }
  clearError(confirmInput);
  return true;
}

function validateInterests() {
  const checks = interestsWrap.querySelectorAll('input[type="checkbox"]:checked');
  if (checks.length === 0) {
    interestsError.textContent = '請至少選擇 1 個興趣。';
    interestsWrap.classList.add('is-invalid');
    return false;
  }
  interestsError.textContent = '';
  interestsWrap.classList.remove('is-invalid');
  return true;
}

function validateTos() {
  if (!tosCheckbox.checked) {
    const el = document.getElementById('tos-error');
    if (el) el.textContent = '請勾選同意服務條款。';
    tosCheckbox.setCustomValidity('請勾選同意服務條款。');
    return false;
  }
  const el = document.getElementById('tos-error');
  if (el) el.textContent = '';
  tosCheckbox.setCustomValidity('');
  return true;
}
function scorePassword(pw) {
  let score = 0;
  if (!pw) return 0;
  if (pw.length >= 8) score += 1;
  if (pw.length >= 12) score += 1;
  if (/[a-z]/.test(pw)) score += 1;
  if (/[A-Z]/.test(pw)) score += 1;
  if (/\d/.test(pw)) score += 1;
  if (/[^A-Za-z0-9]/.test(pw)) score += 1;
  return Math.min(score, 6);
}

function updateStrengthUI() {
  const s = scorePassword(passwordInput.value);
  const pct = [0, 20, 34, 50, 67, 84, 100][s];
  strengthBar.style.width = pct + '%';

  let label = '—';
  let level = 'empty';
  if (s <= 2) { label = '弱'; level = 'weak'; }
  else if (s <= 4) { label = '中'; level = 'medium'; }
  else { label = '強'; level = 'strong'; }

  strengthText.textContent = `強度：${label}`;
  strengthBar.dataset.level = level;
}
interestsWrap.addEventListener('click', (e) => {
  const label = e.target.closest('label.chip');
  if (!label) return;
  const cb = label.querySelector('input[type="checkbox"]');
  if (!cb) return;
  cb.checked = !cb.checked;
  label.classList.toggle('selected', cb.checked);
  const count = interestsWrap.querySelectorAll('input[type="checkbox"]:checked').length;
  interestsCount.textContent = `已選 ${count}`;
  if (touched.has('interests')) validateInterests();
  persistForm();
});
function markTouched(id) { touched.add(id); }

nameInput.addEventListener('blur', () => { markTouched('name'); validateName(); });
emailInput.addEventListener('blur', () => { markTouched('email'); validateEmail(); });
phoneInput.addEventListener('blur', () => { markTouched('phone'); validatePhone(); });
passwordInput.addEventListener('blur', () => { markTouched('password'); validatePassword(); });
confirmInput.addEventListener('blur', () => { markTouched('confirm'); validateConfirm(); });
interestsWrap.addEventListener('blur', () => { markTouched('interests'); validateInterests(); }, true);
tosCheckbox.addEventListener('blur', () => { markTouched('tos'); validateTos(); });

nameInput.addEventListener('input', () => { if (touched.has('name')) validateName(); persistForm(); });
emailInput.addEventListener('input', () => { if (touched.has('email')) validateEmail(); persistForm(); });
phoneInput.addEventListener('input', () => { if (touched.has('phone')) validatePhone(); persistForm(); });
passwordInput.addEventListener('input', () => { updateStrengthUI(); if (touched.has('password')) validatePassword(); if (touched.has('confirm')) validateConfirm(); persistForm(); });
confirmInput.addEventListener('input', () => { if (touched.has('confirm')) validateConfirm(); persistForm(); });
tosCheckbox.addEventListener('change', () => { if (touched.has('tos')) validateTos(); persistForm(); });

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const v1 = validateName();
  const v2 = validateEmail();
  const v3 = validatePhone();
  const v4 = validatePassword();
  const v5 = validateConfirm();
  touched.add('interests');
  const v6 = validateInterests();
  const v7 = validateTos();

  if (!(v1 && v2 && v3 && v4 && v5 && v6 && v7)) {
    const order = [nameInput, emailInput, phoneInput, passwordInput, confirmInput, tosCheckbox];
    for (const el of order) {
      if (!el.checkValidity()) {
        el.focus();
        break;
      }
    }
    if (v1 && v2 && v3 && v4 && v5 && v7 && !v6) {
      interestsWrap.querySelector('input[type="checkbox"]').focus();
    }
    return;
  }
  submitBtn.disabled = true;
  submitBtn.classList.add('loading');
  submitBtn.textContent = '送出中...';

  statusLive.textContent = '正在送出，請稍候。';
  await new Promise((r) => setTimeout(r, 1000));

  submitBtn.disabled = false;
  submitBtn.classList.remove('loading');
  submitBtn.textContent = '送出';
  statusLive.textContent = '送出成功！已建立會員資料（示範）。';
  showToast('註冊成功！');

  form.reset();
  resetUIState();
  clearStorage();
});
resetBtn.addEventListener('click', () => {
  form.reset();
  resetUIState();
  clearStorage();
  statusLive.textContent = '已重設表單。';
});
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}
openTosBtn.addEventListener('click', () => {
  if (typeof tosDialog.showModal === 'function') {
    tosDialog.showModal();
  } else {
    alert('您的瀏覽器不支援 <dialog>，這裡顯示簡易條款。\n\n[示範條款]\n本表單僅供作業示範。');
  }
});
tosClose.addEventListener('click', () => tosDialog.close());
const LS_KEY = 'week07_signup_form';

function persistForm() {
  const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,   
    confirm: confirmInput.value,
    interests: Array.from(interestsWrap.querySelectorAll('input[type="checkbox"]'))
      .filter(cb => cb.checked).map(cb => cb.value),
    tos: tosCheckbox.checked
  };
  localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function restoreForm() {
  const raw = localStorage.getItem(LS_KEY);
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    if (data.name) nameInput.value = data.name;
    if (data.email) emailInput.value = data.email;
    if (data.phone) phoneInput.value = data.phone;
    if (data.password) passwordInput.value = data.password;
    if (data.confirm) confirmInput.value = data.confirm;
    if (Array.isArray(data.interests)) {
      const all = interestsWrap.querySelectorAll('input[type="checkbox"]');
      all.forEach(cb => {
        cb.checked = data.interests.includes(cb.value);
        cb.closest('label.chip').classList.toggle('selected', cb.checked);
      });
      const count = interestsWrap.querySelectorAll('input[type="checkbox"]:checked').length;
      interestsCount.textContent = `已選 ${count}`;
    }
    if (typeof data.tos === 'boolean') tosCheckbox.checked = data.tos;

    updateStrengthUI();
  } catch {

  }
}

function clearStorage() {
  localStorage.removeItem(LS_KEY);
}
function resetUIState() {
  [nameInput, emailInput, phoneInput, passwordInput, confirmInput, tosCheckbox].forEach(clearError);
  interestsError.textContent = '';
  interestsWrap.classList.remove('is-invalid');
  interestsWrap.querySelectorAll('label.chip').forEach(l => l.classList.remove('selected'));
  interestsCount.textContent = '已選 0';
  strengthBar.style.width = '0%';
  strengthBar.dataset.level = 'empty';
  strengthText.textContent = '強度：—';
  touched.clear();
}
document.addEventListener('DOMContentLoaded', () => {
  restoreForm();
  updateStrengthUI();
});
