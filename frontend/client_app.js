// the following line could also be: "var socket = io('ws://<URL>:<PORT_Number>?botmasterUserId=wantedUserId');"
// if you know you will be communicating with a server different from the one that served you the page you are on.
// this only works because the socket.io library assumes with this syntax that the socket.io server
// lives at the same address as the server that served this page (this should mostly be your case)
var socket = io('ws://localhost.:3000?botmasterUserId=00001');

// just get the html elements we will be needing by ID
var form = document.getElementById('form');
var textInput = document.getElementById('text-input');
var messages = document.getElementById('messages');

form.onsubmit = function(event) {
  // just making sure the page isn't refreshed
  event.preventDefault();
  // don't do anything if there is no text
  if (!textInput.value) {
    return;
  }
  // Add the user message to the web page
  messages.insertAdjacentHTML('beforeend',
  `<div><li class="bubble client">${textInput.value}</li></div>`);
  // create a botmaster compatible message from the text input by the user
  const update = {
    message: {
      text: textInput.value
    }
  };
  // send the message over the webSocket
  socket.send(update);
  // finally, clear the user textInput field
  textInput.value = '';
  messages.scrollTo(0,document.body.scrollHeight);
};



socket.on('message', function(botmasterMessage){
  var textMessage = botmasterMessage.message.text;

  console.log(JSON.stringify(textMessage));

  messages.insertAdjacentHTML('beforeend',
  `<div style="display:inline-block; width:60%;"><img src="../img/bot.png" style="width:40px; height:40px; float:left; margin-top:5px;"/><li class="bubble server" style="margin-left: 10px;">${textMessage}</li></div>`);
});

