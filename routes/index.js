var express = require("express");
var router = express.Router();
const Todo = require("../model/todo");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const todos = await Todo.find();
  res.render("index", {
    title: "To Do List App",
    layout: "layouts/layout",
    todos,
  });
});
router.delete("/",(req,res)=>{
  Todo.deleteMany((err)=>{
    if(err) console.log(err);
    res.redirect("/");
  });
})


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
