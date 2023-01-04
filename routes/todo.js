var express = require('express');
const Todo = require("../model/todo");
var router = express.Router();
const {getTodo, deleteTodo, updateTodo, deleteTodos, addTodo} = require("../controllers/todoController");

/* GET users listing. */

router.post("/", getTodo);

router.delete("/",deleteTodos);

router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.post("/add", addTodo);

module.exports = router;
