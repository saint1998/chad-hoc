const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const chatHistory = {};
const myIP = "<my IP>";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/chat", (req, res) => {
  if (req.query.IP in chatHistory) {
    res.json(chatHistory[req.query.IP]);
  } else {
    res.json([]);
  }
});

app.post("/chat", (req, res) => {
  let data = req.body;
  if (data.sender == myIP) {
    if (data.receiver in chatHistory) {
      chatHistory[data.receiver].push(data);
    } else {
      chatHistory[data.receiver] = [];
      chatHistory[data.receiver].push(data);
    }
    console.log(chatHistory);
  } else {
    if (data.sender in chatHistory) {
      chatHistory[data.sender].push(data);
    } else {
      chatHistory[data.sender] = [];
      chatHistory[data.sender].push(data);
    }
  }
});

app.use("/", express.static(__dirname + "/public"));

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
