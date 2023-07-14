const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors')
require('colors')
require('dotenv').config()
const route = require('./routes/route');

const PORT = process.env.PORT || 3001

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Connection();
mongoose.connect(process.env.DB_CLUSTER)
  .then(() => { console.log("MongoDB is connected".cyan.underline) })
  .catch((err) => { console.log(`Error:${err.message}`.red.bold) });

app.use(cors())

app.use("/", route);

const server = app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`.yellow.bold);
})

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.IO_ORIGIN,
    // credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) {
      return console.log("chat.users not defined");
    }

    chat.users.forEach((user) => {

      if (user == newMessageRecieved.sender._id) return;

      socket.in(user).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    // console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});