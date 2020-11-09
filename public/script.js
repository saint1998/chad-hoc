const myIP = "localhost";
let selectedIP = "localhost";

const onclickIP = () => {
  selectedIP = $('input[name="IPaddress"]:checked').val();
  getChat();
};

const onclickSend = () => {
  let text = $("#text-input").val();
  let sender = myIP;
  let receiver = selectedIP;
  $.ajax({
    url: `http://${myIP}:3000/chat`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ text, sender, receiver }),
    success: function (result) {
      console.log("success");
    },
  });
  $.ajax({
    url: `http://${selectedIP}:3000/chat`,
    method: "POST",
    contentType: "application/json",
    data: JSON.stringify({ text, sender, receiver }),
    success: function (result) {
      console.log("success");
    },
  });
  $("#text-input").val("");
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
        if (element.sender == myIP) {
          justifyContent = "flex-end";
        } else {
          justifyContent = "flex-start";
        }

        let data = `<div
        style="
          width: 100%;
          display: flex;
          justify-content: ${justifyContent};
          word-break: break-all;
        "
      >
        <div class="border m-2 rounded p-1" style="width: 45%">
          <span>
            ${element.sender}<br />
            ${element.text}
          </span>
        </div>
      </div>`;
        chatHTML += data;
      });
      $("#chatbox").html(chatHTML);
    },
  });
};
