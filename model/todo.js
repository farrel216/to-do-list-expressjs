const mongoose = require("mongoose");

const Todo = mongoose.model("Activity", {
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