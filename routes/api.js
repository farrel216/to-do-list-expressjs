var express = require('express');
var router = express.Router();
const {getTodo, deleteTodo, updateTodo, deleteTodos, addTodo, activeTodo, completedTodo} = require("../controllers/todoController");

/* GET users listing. */

router.get("/", getTodo);
router.get("/active", activeTodo);
router.get("/completed", completedTodo);

router.delete("/todos",deleteTodos);

router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

router.post("/add", addTodo);

module.exports = router;
