import express from 'express'
import cors from 'cors';
import analyzeRouter from './routes/analyze.route.js';

const app = express()
const PORT = 3000

app.use(cors());
app.use(express.json());
app.use('/', analyzeRouter)

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at localhost:${PORT}`)
})