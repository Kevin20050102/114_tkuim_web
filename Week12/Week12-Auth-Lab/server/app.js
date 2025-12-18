import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import authRouter from './routes/auth.js';
import signupRouter from './routes/signup.js';

const app = express();

app.use(cors());
app.use(express.json()); 
app.use(express.static('../public')); 

app.use('/auth', authRouter);        
app.use('/api/signup', signupRouter); 

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: '伺服器發生錯誤' });
});

const PORT = process.env.PORT || 3001;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`[Server] 執行中：http://localhost:${PORT}`);
            console.log(`[Server] 前端頁面：http://localhost:${PORT}/index.html`);
        });
    })
    .catch((err) => {
        console.error('資料庫連線失敗，伺服器無法啟動', err);
        process.exit(1);
    });