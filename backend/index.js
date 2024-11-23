import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.listen(5000, () => {
    console.log('Server is running on port http://localhost:5000');
})