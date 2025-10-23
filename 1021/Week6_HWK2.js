document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start");
  const log = document.getElementById("log");

  startBtn.addEventListener("click", () => {
    const answer = Math.floor(Math.random() * 100) + 1;
    let count = 0;
    let message = "=== 猜數字遊戲 ===\n電腦已產生 1–100 的隨機整數。\n";

    while (true) {
      const input = prompt("請輸入你猜的數字 (1–100)：");
      if (input === null) {
        message += "\n遊戲取消。";
        break;
      }

      const guess = parseInt(input.trim());
      if (Number.isNaN(guess) || guess < 1 || guess > 100) {
        alert(" 請輸入 1–100 的整數！");
        continue;
      }

      count++;

      if (guess === answer) {
        alert(` 恭喜猜中！答案是 ${answer}。\n共猜了 ${count} 次。`);
        message += `\n 恭喜猜中！答案是 ${answer}\n總共猜了 ${count} 次。`;
        break;
      } else if (guess < answer) {
        alert("再大一點！");
      } else {
        alert("再小一點！");
      }
    }

    log.textContent = message;
  });
});
