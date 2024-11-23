import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import { connectMongoDB } from './db/connect.js';

dotenv.config();

const app = express();

{/* Middleware */ }
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

{/* Routes */ }
app.use('/api/users', userRoutes)
app.use('/api/explore', exploreRoutes)

app.listen(5000, () => {
    connectMongoDB();
    console.log('Server is running on port http://localhost:5000');
})