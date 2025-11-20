async function submitSignup(data) {
  const response = await fetch('http://localhost:3001/api/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const payload = await response.json();
    throw new Error(payload.error || '報名失敗');
  }
  return response.json();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  // ...原本驗證流程...
  try {
    submitBtn.disabled = true;
    submitBtn.textContent = '送出中...';
    const result = await submitSignup(payload);
    toast.show(`✅ ${result.message}`);
    form.reset();
  } catch (error) {
    toast.show(`❌ ${error.message}`);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = '送出';
  }
});
