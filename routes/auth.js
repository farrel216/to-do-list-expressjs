var express = require('express');
var router = express.Router();
const {register, getUser, login, logout} = require("../controllers/authController");
const { refreshToken } = require('../controllers/refreshToken');

router.get('/',getUser)
router.get("/token", refreshToken);
router.post("/register", register);
router.post("/login", login);
router.delete('/logout', logout)

module.exports = router;