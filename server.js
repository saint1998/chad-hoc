const express = require("express");
const cors = require("cors");
const Busboy = require("busboy");
const path = require("path");
const fs = require("fs");
// const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const app = express();
app.use(cors());
// app.use(
//   fileUpload({
//     createParentPath: true,
//   })
// );
app.use(morgan("dev"));
const chatHistory = {};
const myIP = require("./public/auto-ips.json").bat_ip;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/chat", (req, res) => {
  if (req.query.IP in chatHistory) {
    res.json(chatHistory[req.query.IP]);
  } else {
    res.json([]);
  }
});

app.post("/chat/text", (req, res) => {
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
  res.json("seccess");
});

app.post("/chat/file", (req, res) => {
  let busboy = new Busboy({ headers: req.headers });
  busboy.on("field", function (fieldname, val) {
    let data = JSON.parse(val);
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
  busboy.on("file", function (fieldname, file, filename, encoding, mimetype) {
    let saveTo = path.join(__dirname, "uploads/" + filename);
    file.pipe(fs.createWriteStream(saveTo));
  });

  busboy.on("finish", function () {
    res.writeHead(200, { Connection: "close" });
    res.end("That's all folks!");
  });

  return req.pipe(busboy);
});
app.get("/upload/:filename", (req, res) => {
  res.sendFile(__dirname + `/uploads/${req.params.filename}`);
});

app.use("/", express.static(__dirname + "/public"));

app.listen(3000, () => {
  console.log("Start server at port 3000.");
});
