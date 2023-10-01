var username = "user-";
for (var i = 0; i < 3; i++) {
    username += Math.floor(Math.random() * 10).toString();
}
username += '-';
for (var i = 0; i < 5; i++) {
    username += Math.floor(Math.random() * 10).toString();
}

document.getElementById('username').innerHTML = "Using username: " + username;

function sanitize(string) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',      
        "/": '&#x2F;',
    };
    const reg = /[&<>"'/]/ig;
    return string.replace(reg, (match)=>(map[match]));
}

var box = document.getElementById('message');
box.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        send();
    }
});

function send(){
    var message = sanitize(document.getElementById('message').value)
    console.log(message)
    document.getElementById('message').value = ''
    if(message != ''){
        document.getElementById('chatBox').innerHTML = document.getElementById('chatBox').innerHTML + '<br>' + username + ": " + message
    }
    sendServer();
}

const url = 'https://chat-server.generationdnd.tk';
var roomId = ''
function sendServer(){
    const Http = new XMLHttpRequest();
    Http.open("POST", url);
    var params = 'username=' + username + '&message=' + sanitize(document.getElementById('message').value) + '&roomId=' + roomId;
    Http.send(params);

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
}

function openServer(){
    const Http = new XMLHttpRequest();
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
        roomId = Http.responseText
    }
}