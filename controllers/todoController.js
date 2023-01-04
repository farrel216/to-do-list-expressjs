const Todo = require("../model/todo");

const getTodo = async(req, res, next) =>{
    Todo.find().then((result)=>{
        res.status(200).json(result);
    }).catch((err)=>{
        res.status(500).json({error:err});
    })
  }
const deleteTodos = (req,res)=>{
    Todo.deleteMany((err)=>{
      if(err) console.log(err);
    });
    res.redirect("/");
  }

const updateTodo = (req, res, next) => {
  Todo.updateOne({_id:req.params.id}, {completed:req.body.completed}, (err)=>{
    if(err) console.log(err);
  })
    res.redirect("/");
}

const deleteTodo = (req, res, next) => {
    Todo.deleteOne({ _id: req.params.id}).then((result) => {
      // req.flash("success_msg", "Todo deleted successfully");
    });
  res.redirect("/");

  }
const addTodo = (req, res, next) => {
    Todo.insertMany(req.body, (error,result)=>{
      // req.flash("success_msg", "Todo added successfully");
  res.redirect("/");

    });
  }
module.exports = {getTodo, deleteTodo, updateTodo, deleteTodos, addTodo};