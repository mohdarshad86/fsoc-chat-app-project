const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const route = require('./routes/route');
const app = express();
const PORT = process.env.PORT || 3001

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://mohdarshad86:Arshad86@cluster0.r4p7rwf.mongodb.net/fsoc-chatApp-DB")
    .then(() => { console.log("MongoDB is connected") })
    .catch((err) => { console.log(err.message) });

app.use("/", route);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})