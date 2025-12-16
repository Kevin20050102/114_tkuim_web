# Week14 - Valorant News Page Clone (特戰英豪最新消息復刻)

這個專案是 Week14 的練習成果，目標是使用 HTML, CSS, JS 和 JSON 復刻《特戰英豪》(Valorant) 官方網站的「最新消息」頁面。

## 📝 專案說明

本網頁模擬了 Riot Games 的官方設計風格，包含響應式的卡片網格佈局、動態資料加載以及深色系的遊戲主題 UI。

### 主要功能
- **動態內容渲染**：使用 JavaScript (`fetch`) 從 `data.json` 讀取新聞資料並自動生成網頁內容。
- **響應式設計 (Responsive Web Design)**：
  - 桌面版：3 欄佈局
  - 平板：2 欄佈局
  - 手機：1 欄佈局
- **互動效果**：
  - 新聞卡片 Hover 懸浮特效
  - 圖片縮放動畫
- **UI 細節**：
  - 仿官方的導航列 (Navigation Bar)
  - 遊戲風格的邊角裝飾
  - 閱讀性高的排版 (Noto Sans TC)

## 📂 檔案結構

```text
Week14/
├── index.html    # 主頁面結構
├── style.css     # 樣式表 (包含 RWD 與動畫設定)
├── script.js     # 邏輯控制 (Fetch JSON 與 DOM 操作)
├── data.json     # 新聞資料來源
└── README.md     # 專案說明文件
```

## 🚀 如何執行

1. **Clone 專案** 或下載 `Week14` 資料夾。
2. 由於專案使用了 `fetch` API 讀取本地 JSON 檔案，建議使用 **Live Server** 開啟，或將檔案部署至 Web Server。
   - *注意：直接雙擊 `index.html` 開啟可能會因為瀏覽器的 CORS 安全策略而無法讀取 `data.json` 資料。*
3. 開啟網頁後即可看到動態載入的新聞列表。

## 🛠️ 技術棧

- **HTML5**: 語意化標籤 (`header`, `main`, `article`)
- **CSS3**: Flexbox, Grid Layout, CSS Variables, Transitions
- **JavaScript (ES6+)**: Fetch API, DOM Manipulation, Modules (雖未拆分但採用模組化思維)
- **JSON**: 結構化資料儲存

## 🎨 設計參考

- 參考對象：[Valorant 官方新聞頁面](https://playvalorant.com/zh-tw/news/)
- 色調：
  - 主色 (Red): `#ff4655`
  - 背景 (Light): `#ece8e1`
  - 深色 (Dark): `#111`, `#0f1923`

---
*Created for TKUIM Web Programming Course - Week 14*
