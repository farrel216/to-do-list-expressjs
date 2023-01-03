const mongoose = require("mongoose");

const Todo = mongoose.model("Todo", {
    activity: {
        type: String,
        required: true
    },
    completed: {
        type: Number,
        required: true
    }
});

module.exports = Todo;