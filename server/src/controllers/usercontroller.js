const express = require("express");
const { getAllUsers } = require("../model/user");
const { requireUser } = require('../middleware/authorization');

const router = express.Router();

router.get('/', requireUser(), (req, res, next) => {

    res.send(getAllUsers());

});

module.exports = router;