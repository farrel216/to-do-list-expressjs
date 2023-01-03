var express = require('express');
const Todo = require("../model/todo");
var router = express.Router();

/* GET users listing. */
router.get('/', async(req, res, next) =>{
  const todos = await Todo.find();
  res.render("index", {
    title: "To Do List App",
    layout: "layouts/layout",
    todos,
  });
  res.send('respond with a resource');
});

module.exports = router;
