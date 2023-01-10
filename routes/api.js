var express = require('express');
var router = express.Router();
const {verifyToken} = require("../middleware/VerifyToken");
const {getTodo, deleteTodo, updateTodo, deleteTodos, addTodo, activeTodo, completedTodo} = require("../controllers/todoController");

/* GET users listing. */
router.get("/",verifyToken,getTodo);
router.get("/active",verifyToken, activeTodo);
router.get("/completed",verifyToken,completedTodo);

router.delete("/todos",verifyToken,deleteTodos);

router.put("/:id",verifyToken, updateTodo);
router.delete("/:id",verifyToken, deleteTodo);

router.post("/add",verifyToken, addTodo);


module.exports = router;
