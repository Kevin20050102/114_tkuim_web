import express from 'express';
import { ObjectId } from 'mongodb';
import { getDB } from '../db.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: '未經授權' });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (e) { res.status(401).json({ error: 'Token 無效' }); }
};

router.use(authenticate);

router.get('/', async (req, res) => {
    const query = req.user.role === 'admin' ? {} : { ownerId: new ObjectId(req.user.id) };
    const list = await getDB().collection('participants').find(query).toArray();
    res.json(list);
});

router.post('/', async (req, res) => {
    const result = await getDB().collection('participants').insertOne({
        ...req.body,
        ownerId: new ObjectId(req.user.id),
        ownerName: req.user.username,
        createdAt: new Date()
    });
    res.status(201).json({ id: result.insertedId });
});

router.delete('/:id', async (req, res) => {
    const id = new ObjectId(req.params.id);
    const doc = await getDB().collection('participants').findOne({ _id: id });
    if (!doc) return res.status(404).json({ error: '資料不存在' });

    if (req.user.role === 'admin' || doc.ownerId.toString() === req.user.id) {
        await getDB().collection('participants').deleteOne({ _id: id });
        res.status(204).end();
    } else {
        res.status(403).json({ error: '權限不足' });
    }
});

export default router;