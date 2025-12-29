# Campus Event Management System (校園活動報名管理系統)

這是一個基於 **MERN Stack** (MongoDB, Express, React, Node.js) 開發的全端網頁應用程式。
系統專為校園活動設計，提供視覺化的前端介面，讓使用者可以輕鬆管理活動資訊。系統具備完整的 **CRUD** (新增、讀取、更新、刪除) 功能，並透過 RESTful API 進行前後端資料互動。

---
## 功能特色
* **全端整合**：完整的前後端分離架構，透過 RESTful API 進行資料串接。
* **資料管理 (CRUD)**：
    * **新增**：即時發布活動，包含名稱、日期、地點、主辦單位與詳情。
    * **讀取**：卡片式列表呈現，自動依時間排序。
    * **刪除**：支援單筆活動刪除功能。
* **現代化介面**：使用 **Tailwind CSS** 打造美觀、整潔且支援手機瀏覽的 UI。
* **即時互動**：操作後無需重新整理頁面，資料狀態即時更新。

## 技術架構 (Tech Stack)

### 前端 (Frontend)
* **核心框架**：React (Vite 建置工具)
* **樣式庫**：Tailwind CSS (v3) + PostCSS
* **HTTP 請求**：Axios
* **語言**：JavaScript (ES6+)

### 後端 (Backend)
* **執行環境**：Node.js
* **Web 框架**：Express.js
* **資料庫模型**：Mongoose (ODM)
* **跨域處理**：CORS
* **環境變數**：Dotenv

### 資料庫 (Database)
* **MongoDB Community Edition** (本地端運行)
---

## 安裝與執行
1. 環境準備 (Prerequisites)
請確定電腦已安裝 Node.js 
請確定本機 MongoDB 服務已啟動 (預設 Port: 27017)。

2. 後端設定 (Backend Setup)
開啟終端機 (Terminal)，進入 backend 資料夾並安裝依賴套件：
Bash
cd backend
npm install
設定環境變數： 在 backend 資料夾內建立一個名為 .env 的檔案，並貼上以下內容：
程式碼片段
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/campus_events
啟動後端伺服器：
Bash
npm run dev

3. 前端設定 (Frontend Setup)
開啟一個新的終端機視窗，進入 frontend 資料夾並安裝依賴套件：
Bash
cd frontend
npm install
啟動前端開發伺服器：
Bash
npm run dev

## 使用指引 (User Guide)
開啟網頁： 打開瀏覽器，輸入網址 http://localhost:5173。
新增活動：
在左側（手機版為上方）的「新增活動」區塊填寫資料。
所有欄位（名稱、日期、地點、主辦單位）皆為必填。
按下「發布活動」按鈕，成功後右側列表會立即更新。
瀏覽活動：
右側（手機版為下方）會顯示目前所有活動的卡片列表。
卡片包含活動的詳細資訊與日期。
刪除活動：
點擊卡片下方的「刪除」按鈕。
系統會跳出確認視窗，確認後即可將該筆資料從資料庫移除。

## 專案目錄結構 (Project Structure)

```text
campus-event-system/
├── backend/                # 後端伺服器 (Node.js + Express)
│   ├── controllers/        # 商業邏輯控制 (CRUD 實作)
│   ├── models/             # 資料庫模型定義 (Schema)
│   ├── routes/             # API路由路徑設定
│   ├── server.js           # 後端伺服器入口點
│   ├── .env                # 環境變數設定 (需自行建立)
│   └── package.json        # 後端套件清單
│
├── frontend/               # 前端應用程式 (React + Vite)
│   ├── src/
│   │   ├── components/     # UI 元件 (表單、列表)
│   │   ├── App.jsx         # 主頁面邏輯
│   │   └── main.jsx        # 前端入口點
│   └── package.json        # 前端套件清單
│
└── docs/                   # 專案文件 (架構圖、流程圖等)