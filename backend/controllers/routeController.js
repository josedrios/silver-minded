const Task = require('../models/tasks');

exports.createTask = async (req,res) => {
    try {
        console.log(req.body);
        const { name, info, tag } = req.body;

        const newTask = new Task({
            name,
            info, 
            tag,
        })

        await newTask.save();

        return res.status(201).json(newTask)
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            message: 'Error occurred while creating new task',
            error: err.message
        })
    }
}

exports.editTask = async (req,res) => {
    try {
        const { name, info, tag, status} = req.body;
        const { id } = req.params;

        const task = await Task.findById(id);

        console.log(task);
        return res.status(201).json(task);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Error occurred while editing task',
            error: err.message
        })
    }
}

exports.getTasks = async (req,res) => {
    try {
        const tasks = await Task.find().sort({createdAt: -1});
        res.json(tasks);
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Error occurred while getting tasks',
            error: err.message
        })
    }
}

exports.deleteTask = async (req,res) => {
    try {
        
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: 'Error occurred while deleting task',
            error: err.message
        })
    }
}