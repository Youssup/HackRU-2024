const express = require('express');
require('dotenv').config();
const path = require('path')
const userController = require('./controllers/usercontroller');
const googleController = require('./controllers/googlecontroller');
const { requireUser, parseAuthorizationToken } = require("./middleware/authorization");

const app = express();

const PORT = process.env.PORT ?? 3000;

app
.use('/', express.static(path.join( __dirname, '../../client/dist/')))
.use(express.json())

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
// authorization middleware
.use(parseAuthorizationToken)
// userscontroller / user part of API
.use('/api/v1/users', userController)
.use('/api/v1/calculate', googleController)
.get('*', (req, res) => {
    res.sendFile(path.join( __dirname, '../../client/dist/index.html'))
});

app.use((err, req, res, next) => {
    // TODO: remove in production!!!
    console.error(err);

    res
        .status(err?.status || 500)
        .json({ message: err?.message || err });
});

app.listen(PORT, () => {
    console.log(`[Server] Server running at http://localhost:${PORT}`);
});