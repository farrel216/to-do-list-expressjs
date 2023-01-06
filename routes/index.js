var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
res.status(200)
});


module.exports = router;
