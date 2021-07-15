
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use(cookieParser());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useFindAndModify: false,useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
}) 


//const userRouter = require("./routes/Users");
const projectRouter = require("./routes/Projects");
const jobRouter = require("./routes/Jobs");

app.use("/users",require("./routes/Users"));
app.use("/projects",projectRouter);
app.use("/jobs",jobRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});