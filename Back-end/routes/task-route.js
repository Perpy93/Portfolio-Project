const router = require('express').Router();


router.get("/todos", (req, res)=>{res.send("hello")});
router.post("/todos", (req, res)=>{res.send("hello")});
router.get("/todos/:todoId", (req, res)=>{res.send("hello")});
router.put("/todos/:todoId", (req, res)=>{res.send("hello")});
router.delete("/todos/:todoId", (req, res)=>{res.send("hello")});


module.exports = router;
    