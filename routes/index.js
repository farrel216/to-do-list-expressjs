var express = require("express");
var router = express.Router();
const Todo = require("../model/todo");
const User = require("../model/user");
/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("login", {
    title: "To Do List App",
    layout: "layouts/layout",
  });
});

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if(user){
    if(user.password === req.body.password){
      res.redirect("/todo");
    }else{
      res.redirect("/");
    }
  }
  else{
    res.redirect("/");
  }
});

router.get("/register", (req, res, next) => {
  res.render("register", {
    title: "To Do List App",
    layout: "layouts/layout",
  });
});

router.post("/register", (req, res, next) => {
  User.insertMany(req.body, (error,result)=>{
    res.redirect("/");
  });
});

router.delete("/",(req,res)=>{
  Todo.deleteMany((err)=>{
    if(err) console.log(err);
    res.redirect("/");
  });
})

router.put("/todos", (req, res, next) => {
  Todo.updateOne({_id:req.body._id}, {completed:req.body.completed}, (err)=>{
    if(err) console.log(err);
    res.redirect("/");
  })
});
router.delete("/todos", (req, res, next) => {
  Todo.deleteOne({ _id: req.body._id}).then((result) => {
    // req.flash("success_msg", "Todo deleted successfully");
    res.redirect("/");
  });
});

router.post("/add", (req, res, next) => {
  Todo.insertMany(req.body, (error,result)=>{
    // req.flash("success_msg", "Todo added successfully");
    res.redirect("/");
  });
});






module.exports = router;
