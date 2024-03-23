const express = require('express');
const userController = require('./controllers/usercontroller');

const app = express();

// TODO: change to read from dotenv
const PORT = 3000;

app.use(express.json())
// CORS
.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
        return res.send(200);
    }

    next();
})
.use('/api/v1/users', userController);

app.use((err, req, res, next) => {
        console.error(err);
        res
            .status(err?.status || 500)
            .json({ message: err?.message || err });
});

app.listen(PORT, () => {
    console.log(`[Server] Server running at http://localhost:${PORT}`);
});