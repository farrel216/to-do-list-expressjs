var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  let sess = req.session;
  if(sess.username){
    res.render("index", {
      title: "To Do List App",
      layout: "layouts/layout",
    });
  }
  else{res.render("login", {
    title: "Login Page",
    layout: "layouts/layout",
    msg: req.flash("msg"),
  });
}
});

router.get("/register", (req, res, next) => {
  res.render("register", {
      title: "Register Page",
      layout: "layouts/layout",
  });
});


module.exports = router;
