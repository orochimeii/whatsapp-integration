const { Router } = require('express');
const { sendMessage } = require('../controllers/wweb.js');

const router = Router();

router.post('/message', (req, res, next) => {
    console.log(req.body);
    const { to, message } = req.body;
    sendMessage(to+'@c.us', message)
})

module.exports = router;