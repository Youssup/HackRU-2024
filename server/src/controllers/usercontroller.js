const express = require("express");
const { getAllUsers } = require("../model/user");

const router = express.Router();

router.get('/', (req, res, next) => {

    res.send(getAllUsers());

});

module.exports = router;