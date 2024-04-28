window.addEventListener('load', () => {
    const socket = new WebSocket("ws://localhost:3001");

    // Connection opened
    socket.addEventListener("open", function (event) {
        socket.send("Hello Server! from index.html ruansheng");
    });

    // Listen for messages
    socket.addEventListener("message", function (event) {
        console.log("Message from server ", event.data);
        let div = document.createElement("div");
        div.innerText = event.data;
        document.body.appendChild(div);
    });
});