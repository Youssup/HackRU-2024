const express = require("express");

const { requireUser } = require('../middleware/authorization');

const router = express.Router();

router.post('/locationcalc', (request, response, next) => {
    const address1 = request.body.address1;
    const address2 = request.body.address2;

    // TODO: calculate with google api
})

module.exports = router;