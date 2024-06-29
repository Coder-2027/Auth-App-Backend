const { login, signup } = require('../controllers/auth');
const express = require('express');
const { auth, isStudent, isAdmin, isVisitor } = require('../middlewares/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/student', auth, isStudent, (req, res) => {
    res.json({
        success : true,
        messege : 'Welcome to student Portal',
    })
})

router.get('/admin', auth, isAdmin, (req, res) => {
    // console.log(first)
    res.json({
        success : true,
        messege : 'Welcome to admin Portal',
    })
})

module.exports = router;