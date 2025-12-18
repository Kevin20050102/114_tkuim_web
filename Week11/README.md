# Week11
## CREO 300字
CRUD 是系統開發中最核心、最基本的四種資料操作：Create（新增）、Read（讀取）、Update（更新）、Delete（刪除）。不論是網站、App，或後端 API，只要牽涉到資料管理，幾乎都離不開這四個動作。Create 代表把新的資料寫入資料庫，例如使用者提交報名表單；Read 是讀取資料，像是後台顯示所有報名紀錄或查詢特定使用者資訊；Update 則用於修改已存在的內容，例如更新聯絡電話、調整課程資訊；Delete 則是刪除不需要或重複的資料，例如移除重複報名、刪除過期活動。透過 CRUD，我們可以看出一套系統如何管理資料生命週期：從建立、呈現、修改到移除，形成完整的循環。掌握 CRUD 的概念，不僅能理解資料庫如何運作，也能更快看懂後端 API、前端表單流程，甚至規劃資料架構。無論是初學程式或正在開發專案，CRUD 都是必須熟悉的基礎能力。
## 事前環境
Node.js（包含 npm）
Docker / Docker Desktop
VS Code Extension：REST Client
Postman
mongosh（MongoDB Shell） MongoDB Compass
## 啟動 MongoDB Container
在 week11/docker 底下執行：docker compose up -d

確認 MongoDB 有啟動：docker ps

看到 container 名稱類似 week11-mongo 即代表 MongoDB 已經在本機的 27017 port 上運作。

## docker-compose.ym
version: '3.9' services: mongodb: image: mongo:7 container_name: week11-mongo restart: unless-stopped ports: - "27017:27017" environment: MONGO_INITDB_ROOT_USERNAME: week11-user MONGO_INITDB_ROOT_PASSWORD: week11-pass MONGO_INITDB_DATABASE: week11 volumes: - ./mongo-data:/data/db - ./mongo-init.js:/docker-entrypoint-initdb.d/init.js:ro

## .env
PORT=3001 MONGODB_URI=mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11 ALLOWED_ORIGIN=http://127.0.0.1:5500 說明：PORT後端 API 伺服器啟動的 port，預設 3001，對應 http://localhost:3001。

使用者：week11-user

密碼：week11-pass

主機：localhost

Port：27017

資料庫：week11

## 啟動後端伺服器
在 week11/server 資料夾執行： 安裝:npm install 開發模式啟動:npm run dev Server running on http://localhost:3001 代表後端已成功啟動並連上 MongoDB。
## 環境需求
Docker Desktop
確認 Docker Engine 已啟動。
驗證指令：docker -v 與 docker compose version
Node.js (LTS 版本)
驗證指令：node -v
VS Code 擴充套件 
REST Client: 用於執行 .http 測試檔。
MongoDB for VS Code: 
## 啟動指令
1. 啟動資料庫 
進入 docker 目錄並啟動 MongoDB 容器：
Bash
cd Week11/docker
啟動容器 
docker compose up -d
檢查容器狀態 
docker ps
2. 設定後端伺服器 
進入 server 目錄，安裝套件並設定環境變數：
Bash
cd ../server
安裝相依套件
npm install
建立 .env 檔案 (server/.env)，內容如下：
Ini, TOML
PORT=3001
MongoDB 連線字串 
MONGODB_URI=mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11
ALLOWED_ORIGIN=http://localhost:5173
3. 啟動伺服器
Bash
開發模式 (使用 nodemon 自動重啟)
npm run dev
成功時應顯示：
Server running on http://localhost:3001
[DB] Connected to MongoDB
## 測試方式
1. API 測試 (REST Client)
開啟 tests/api.http 檔案，點擊 Send Request 測試以下 API：
POST /api/signup：建立新報名資料。
GET /api/signup：取得報名列表。
PATCH /api/signup/:id：更新資料。
DELETE /api/signup/:id：刪除資料。
2. 資料庫驗證 
使用 MongoDB Compass 連線查看實際資料：
Connection String: mongodb://week11-user:week11-pass@localhost:27017/week11?authSource=week11
驗證目標：確認 week11 資料庫下的 participants 集合中有新增的 Document。
3. 終端機驗證 
Bash
docker exec -it week11-mongo mongosh -u week11-user -p week11-pass --authenticationDatabase week11
進入 shell 後輸入：
use week11
db.participants.find()
## 常見問題 
1. Error: connect ECONNREFUSED 127.0.0.1:27017
原因：MongoDB 容器沒有啟動，或 Port 沒對應好。
解法：請確認 docker ps 有看到 week11-mongo 正在執行。若 Docker Desktop 沒開，請先開啟。

2. MongoServerError: Authentication faile
原因：帳號密碼錯誤。
解法：檢查 server/.env 中的 MONGODB_URI 是否與 docker/mongo-init.js 內的設定一致。

3. TypeError: Cannot read properties of undefined (reading 'collection')
原因：資料庫尚未連線就呼叫了 Repository。
解法：確認 app.js 中有確實執行 await connectDB() 且成功後才啟動 Server (app.listen)。

4. Docker 權限問題 (Mac)
現象：docker.socket permission denied 或無法寫入 volume。
解法：在 Docker Desktop 設定中開啟 "File Sharing" 權限，或嘗試重新啟動 Docker Desktop。