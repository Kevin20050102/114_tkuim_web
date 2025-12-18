# Week12LAB
## 1. 啟動方式
啟動資料庫 (Docker)
開啟終端機，進入 docker 資料夾。
執行指令啟動 MongoDB 容器：
docker compose up -d
確認容器已正常啟動（可使用 docker ps 查看）。
啟動後端伺服器 (Node.js)
開啟另一個終端機視窗，進入 server 資料夾。

安裝必要套件（若尚未安裝）：
npm install
啟動伺服器：
npm run dev
當看到 [DB] MongoDB 已連線成功 與 [Server] 執行中 時，代表後端已準備就緒。
開啟前端網頁
打開瀏覽器，輸入網址：

http://localhost:3001

## 2. 測試方式
### 註冊與登入流程
註冊：在網頁上輸入帳號與密碼，點擊「註冊帳號」。此時帳號預設角色為 student。

登入：輸入剛註冊的帳號密碼，點擊「登入」。登入成功後會取得 Token，並顯示功能區塊。

### 手動升級管理員 (使用 MongoDB Compass)
開啟 MongoDB Compass 並連線至 mongodb://root:password123@localhost:27017/。
進入 week12 資料庫的 users 集合。
找到目標帳號，點擊 鉛筆圖示 (Edit)。
將 "role": "student" 改為 "role": "admin" 並點擊 Update。

### 權限控管驗證
資料隔離測試：
使用 student 帳號登入，送出幾筆報名資料。
使用另一個 student 帳號登入，確認無法看到前一個學員的資料。
管理員全覽測試：
使用 admin 帳號登入，確認可以看到資料庫中「所有學員」的報名清單。
刪除權限測試：
一般學員只能刪除自己建立的資料。
管理員擁有權限刪除系統中任何人的報名資料

## 4. 技術細節
後端框架：Express.js
資料庫：MongoDB (透過 Docker 部署)
身分驗證：JWT (JSON Web Token)
密碼安全：使用 bcryptjs 進行雜湊加密
安全性設計：/api/signup 路由下的 GET, POST, DELETE 均受到 authenticate 中介軟體保護，未攜帶有效 Token 的請求將被拒絕。