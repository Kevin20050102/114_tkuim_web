import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDB } from '../db.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, role } = req.body; 
    try {
        const hashedPassword = await bcrypt.hash(password, 10); 
        await getDB().collection('users').insertOne({
            username,
            password: hashedPassword,
            role: role || 'student' 
        });
        res.status(201).json({ message: '註冊成功' });
    } catch (e) {
        res.status(400).json({ error: '帳號可能已存在' });
    }
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await getDB().collection('users').findOne({ username });
    
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { id: user._id, username: user.username, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.json({ token, username: user.username, role: user.role });
    } else {
        res.status(401).json({ error: '帳號或密碼錯誤' });
    }
});

export default router;