var express = require('express');
const Todo = require("../model/todo");
var router = express.Router();
const {getTodo, deleteTodo, updateTodo, deleteTodos, addTodo} = require("../controllers/todoController");

/* GET users listing. */
router.get('/', getTodo);

router.delete("/",deleteTodo);

router.put("/todos", updateTodo);
router.delete("/todos", deleteTodos);

router.post("/add", addTodo);

module.exports = router;
