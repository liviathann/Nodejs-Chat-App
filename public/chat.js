window.onload = function() {


    var name = document.getElementById("name");
    var params = new URL(location.href).searchParams;
    var username = params.get("username");
    name.innerHTML = username;
    var messages = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    var name = document.getElementById("name");

    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
                html += messages[i].message + '<br />';
            }
            content.innerHTML = html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
    // button to send message to socket
    sendButton.onclick = function() {
    	if(name.value == "") {
            alert("Please type your name!");
        } else {
        var text = field.value;
        socket.emit('send', { message: text, username: name.value });
        field.value = '';
        }
    };
    // set enter key listener 
    field.addEventListener('keypress', function (e) {
	    var key = e.which || e.keyCode;
	    if (key === 13) { 
	    	sendButton.onclick();
    	}
	});
}

