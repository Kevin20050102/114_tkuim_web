document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("convert");
  const resultEl = document.getElementById("result");

  btn.addEventListener("click", () => {
    const temp = parseFloat(document.getElementById("temp").value);
    const unit = document.getElementById("unit").value;

    if (Number.isNaN(temp)) {
      alert("請輸入正確的數字！");
      resultEl.textContent = "輸入錯誤：不是有效的數字。";
      return;
    }

    let converted, formula, fromLabel, toLabel;
    if (unit === "C") {
      converted = temp * 9 / 5 + 32;
      formula = "F = C × 9/5 + 32";
      fromLabel = "°C"; toLabel = "°F";
    } else {
      converted = (temp - 32) * 5 / 9;
      formula = "C = (F − 32) × 5/9";
      fromLabel = "°F"; toLabel = "°C";
    }

    const rounded = Math.round(converted * 100) / 100;
    const msg = [
      "=== 溫度轉換結果 ===",
      `原始輸入：${temp} ${fromLabel}`,
      `轉換公式：${formula}`,
      `轉換後結果：${rounded} ${toLabel}`
    ].join("\n");

    alert(msg);
    resultEl.textContent = msg;
  });
});

