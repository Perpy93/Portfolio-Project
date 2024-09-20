require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRouter = require("./routes/task-route")

app = express();

const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URL)
.then(() => {console.log('db connection succesful')})
.catch((err) => {console.log(err)});

app.use(express.json());
app.use(cors({
    origin: "*"
}));


app.use('/api/v1', taskRouter);




app.listen(PORT, ()=>{
    console.log(`App is listening on port ${PORT}`);
});