require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. 引入 cors
const eventRoutes = require('./routes/eventRoutes');

const app = express();

// ==========================================
// 關鍵設定：CORS 必須放在最上面！
// 這行告訴後端：「允許任何人 (包含前端 5173) 來拿資料」
app.use(cors()); 
// ==========================================

app.use(express.json());

// 資料庫連線
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB 連線成功'))
    .catch(err => console.error(err));

// 路由設定 (必須在 cors 之後)
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`後端 Server 運行於 Port ${PORT}`));