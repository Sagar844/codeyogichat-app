const socket = io();

let name;
let textarea = document.querySelector("#textarea");
let messagearea = document.querySelector(".message-area");
do {
  name = prompt("please enter your name ");
} while (!name);

textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
    console.log(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: name,
    message: message.trim(),
  };

  //  appendmessage
  appendMessage(msg, "outgoing");

  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let classname = type;
  mainDiv.classList.add(classname, "message");

  let markup = `<h4>${msg.user}</h4> <p>${msg.message}</p> `;
  mainDiv.innerHTML = markup;
  messagearea.appendChild(mainDiv);
}

socket.on("message", (msg) => {
  appendMessage(msg , 'incoming')
});
