const { Router } = require('express');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
const colors = require('colors')
const route = require('./routes/route');
const { notFound, errorHandler } = require('./midllewares/errors')

const PORT = process.env.PORT || 3001

// app.use(cors())

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Connection();
mongoose.connect("mongodb+srv://mohdarshad86:Arshad86@cluster0.r4p7rwf.mongodb.net/fsoc-chatApp-DB")
    .then(() => { console.log("MongoDB is connected".cyan.underline) })
    .catch((err) => { console.log(`Error:${err.message}`.red.bold) });

app.use(cors())


app.use("/", route);
/*
//user
app.use("/api/user", route);
//Chat
app.use('/api/chat' route)
*/

// app.use(notFound)
// app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`.yellow.bold);
})

