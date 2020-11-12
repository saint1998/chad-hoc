const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const chatHistory = {};
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
  if (data.receiver in chatHistory) {
    chatHistory[data.receiver].push(data);
  } else {
    chatHistory[data.receiver] = [];
    chatHistory[data.receiver].push(data);
  }
  console.log(chatHistory);
});

app.use("/", express.static(__dirname + "/public"));

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
