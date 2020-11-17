let ips = { wlan_ip: "localhost", bat_ip: "localhost" };
let myIP = ips.bat_ip;
$.getJSON("auto-ips.json", function (data) {
  ips = data;
  myIP = ips.bat_ip;
  console.log("bat0 ip is:", myIP);
});
let selectedIP = "localhost";

const onclickIP = () => {
  selectedIP = $('input[name="IPaddress"]:checked').val();
  getChat();
};

const onclickSend = () => {
  let text = $("#text-input").val();
  let file = $("#file-input")[0].files[0];
  let sender = myIP;
  let receiver = selectedIP;
  if (text) {
    sendText(text, sender, receiver);
  }
  if (file) {
    sendFile(file, sender, receiver);
  }
  getChat();
};

const getChat = () => {
  $.ajax({
    url: `http://localhost:3000/chat?IP=${selectedIP}`,
    method: "GET",
    contentType: "/application/json",
    success: function (result) {
      console.log(result);
      chatHTML = "";
      result.forEach((element) => {
        let justifyContent = "";
        let message = "";
        if (element.sender == myIP) {
          justifyContent = "flex-end";
        } else {
          justifyContent = "flex-start";
        }
        if (element.type == "text") {
          message = element.text;
        } else if (element.type.split("/")[0] == "image") {
          message = `<img src="/upload/${element.name}" width="200" height="300">`;
        } else {
          message = `<a href="/upload/${element.name}">Link for file</a>`;
        }
        let data = `<div style="
        width: 100%;
        display: flex;
        justify-content: ${justifyContent};
        word-break: break-all;">
        <div class="border m-2 rounded p-1" style="width: 45%">
          <span>
            ${element.sender}<br />
            ${message}
          </span>
        </div>
      </div>`;
        chatHTML += data;
      });
      $("#chatbox").html(chatHTML);
    },
  });
};

const sendText = (text, sender, receiver) => {
  $.ajax({
    url: `http://localhost:3000/chat/text`,
    method: "POST",
    cache: false,

    contentType: "application/json",
    data: JSON.stringify({ text, sender, receiver, type: "text" }),
    success: function (result) {
      console.log(result);
    },
  });
  $.ajax({
    url: `http://${selectedIP}:3000/chat/text`,
    method: "POST",
    cache: false,

    contentType: "application/json",
    data: JSON.stringify({ text, sender, receiver }),
    success: function (result) {
      console.log(result);
    },
  });
  $("#text-input").val("");
};

const sendFile = (file, sender, receiver) => {
  let { name, type } = file;
  name = new Date().getTime() + name;
  let fileData = JSON.stringify({ name, type, sender, receiver });
  let formData = new FormData();
  formData.append("fileData", fileData);
  formData.append("file", file, name);
  $.ajax({
    url: `http://localhost:3000/chat/file`,
    method: "POST",
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      console.log(result);
    },
  });
  $.ajax({
    url: `http://${selectedIP}:3000/chat/file`,
    method: "POST",
    cache: false,
    contentType: false,
    processData: false,
    data: formData,
    success: function (result) {
      console.log(result);
    },
  });
  $("#file-input").val("");
};
