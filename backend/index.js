import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import MongoStore from 'connect-mongo';
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
// app.use(cors());
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI, // MongoDB connection string
        }),
        cookie: {
            secure: process.env.NODE_ENV === 'production', // Secure cookies in production
            httpOnly: true,
            sameSite: 'none', // Adjust based on requirements
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
// Vercel Custom CORS Headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', process.env.CLIENT_BASE_URL || '*'); // Change * to CLIENT_URL for stricter control
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    next();
});

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

{/* Routes */ }
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/explore', exploreRoutes)

connectMongoDB();

// app.listen(3000, () => {
//     connectMongoDB();
//     console.log('Server is running on port http://localhost:3000');
// })

export default app;