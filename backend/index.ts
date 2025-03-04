import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './src/routes/userRoute';
import articleRouter from './src/routes/articleRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" }));
app.use(cors());

app.use('/user', userRouter);
app.use('/article', articleRouter);

app.listen(PORT, () => {
    console.log(`Server running in port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});