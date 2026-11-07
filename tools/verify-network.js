/* Run while `npm start` is serving Kaiser Quest locally. */
var http = require("http"),
    WebSocket = require("ws");

function request(pathname, expectedType, callback) {
    http.get({ host: "localhost", port: 8000, path: pathname }, function(response) {
        var body = "";
        response.on("data", function(chunk) { body += chunk; });
        response.on("end", function() {
            if(response.statusCode !== 200 || response.headers["content-type"].indexOf(expectedType) !== 0) {
                callback(new Error(pathname + " returned " + response.statusCode + " with " + response.headers["content-type"]));
                return;
            }
            callback(null, body);
        });
    }).on("error", callback);
}

request("/status", "application/json", function(error, status) {
    if(error) { throw error; }
    if(JSON.parse(status).length !== 5) { throw new Error("Expected five configured worlds"); }
    request("/config/config_build.json", "application/json", function(configError, config) {
        if(configError) { throw configError; }
        if(JSON.parse(config).port !== 8000) { throw new Error("Development client config is invalid"); }
        request("/shared/js/gametypes.js", "application/javascript", function(typesError, types) {
        if(typesError) { throw typesError; }
        if(types.indexOf("Types =") === -1) { throw new Error("Shared game types were not served"); }
        request("/", "text/html", function(pageError, page) {
        if(pageError) { throw pageError; }
        if(page.indexOf("BrowserQuest") === -1) { throw new Error("Client page was not served"); }
        var socket = new WebSocket("ws://localhost:8000/"),
            timeout;
        socket.on("message", function(data) {
            var message = data.toString();
            if(message === "go") {
                socket.send(JSON.stringify([0, "Verifier", 21, 60]));
            } else if(message.indexOf("[1,") === 0) {
                console.log("HTTP and WebSocket verification passed");
                clearTimeout(timeout);
                socket.close();
            }
        });
        socket.on("error", function(socketError) { throw socketError; });
        timeout = setTimeout(function() { throw new Error("WebSocket handshake timed out"); }, 5000);
        });
        });
    });
});
