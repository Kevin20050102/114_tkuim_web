var start = prompt('請輸入起始數（例如 2）：');
var end = prompt('請輸入結束數（例如 5）：');

var from = parseInt(start, 10);
var to = parseInt(end, 10);

var output = '';
if (isNaN(from) || isNaN(to) || from < 1 || to > 9 || from > to) {
  output = '輸入範圍無效！請輸入 1~9 並確保起始數 ≤ 結束數。';
} else {
  for (var i = from; i <= to; i++) {
    for (var j = 1; j <= 9; j++) {
      output += i + 'x' + j + '=' + (i * j) + '\t';
    }
    output += '\n';
  }
}

document.getElementById('result').textContent = output;
