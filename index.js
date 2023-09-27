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
        document.getElementById('chatBox').innerHTML = document.getElementById('chatBox').innerHTML + '<br>' + message
    }
}