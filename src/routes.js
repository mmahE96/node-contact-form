const express = require('express');
const controllers=require('./controllers');

const router = express.Router();


router.get('/mail/user/:email',controllers.getUser)

router.post('/mail/send', controllers.sendMail);

router.get('/mail/drafts/:email', controllers.getDrafts);

router.get('/mail/search/:search', controllers.searchMail)


module.exports = router;