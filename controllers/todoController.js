const Todo = require("../model/todo");

const getTodo = (req, res, next) => {
  Todo.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
const activeTodo = (req, res, next) => {
  Todo.find({ completed: false })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
const completedTodo = (req, res, next) => {
  Todo.find({ completed: true })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
const deleteTodos = (req, res) => {
  Todo.deleteMany({ completed: true})
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const updateTodo = (req, res, next) => {
  Todo.updateOne({ _id: req.params.id }, { completed: req.body.completed })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

const deleteTodo = (req, res, next) => {
  Todo.deleteOne({ _id: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
const addTodo = (req, res, next) => {
  Todo.insertMany(req.body)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
module.exports = {
  getTodo,
  deleteTodo,
  updateTodo,
  deleteTodos,
  addTodo,
  activeTodo,
  completedTodo
};
