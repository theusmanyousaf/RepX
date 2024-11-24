import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';

import './passport/github.auth.js';

import userRoutes from './routes/user.route.js';
import exploreRoutes from './routes/explore.route.js';
import authRoutes from './routes/auth.route.js';

import connectMongoDB from './db/connectMongoDB.js';

dotenv.config();

const app = express();

{/* Middleware */ }
app.use(cors());
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

{/* Routes */ }
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/explore', exploreRoutes)

app.listen(5000, () => {
    connectMongoDB();
    console.log('Server is running on port http://localhost:5000');
})