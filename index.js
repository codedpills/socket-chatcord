const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// set static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "Chatchord Bot";

// run when client connects
io.on("connection", (socket) => {
  // welcome current user
  socket.emit("message", formatMessage(botName, "Welcome to Chatchord"));

  // broadcast when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A new user has joined the chat")
  );

  //runs when a client disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });
});

const PORT = 4000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
