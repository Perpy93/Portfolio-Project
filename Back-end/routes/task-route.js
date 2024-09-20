const router = require('express').Router();
const Task = require("../models/task-model")


router.get("/todos", async (req, res)=>{

    try {
        const tasks = await Task.find();
        res.status(200).json({data: tasks});
    } catch (error) {
        res.status(400).json({error})
    }    
});


router.post("/todos", async (req, res)=>{
    try {
        const task = await Task.create({task: req.body.task});
        res.status(200).json({data: task});
    } catch (error) {
        res.status(400).json({error})
    }  
});


router.get("/todos/:todoId", async (req, res)=>{
    try {
        const task = await Task.findOne({_id: req.params.todoId});
        res.status(200).json({data: task});
    } catch (error) {
        res.status(400).json({error})
    }  
});


router.put("/todos/:todoId", async (req, res)=>{
    try {
        const payload = {};
        if (req.body.task) {
            payload["task"] =  req.body.task;
        }
        if (req.body.isCompleted) {
            payload["isCompleted"] =  req.body.isCompleted;
        }
        const task = await Task.findOneAndUpdate({_id: req.params.todoId}, payload);
        res.status(200).json({data: task});
    } catch (error) {
        res.status(400).json({error});
    }  
});


router.delete("/todos/:todoId", async (req, res)=>{
    try {
        const task = await Task.findOneAndDelete({_id: req.params.todoId});
        res.status(200).json({data: task});
    } catch (error) {
        res.status(400).json({error})
    }  
});


module.exports = router;
    