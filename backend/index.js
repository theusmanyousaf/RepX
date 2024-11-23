import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';

dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

{/* Routes */ }
app.use('/api/users', userRoutes)

app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
})