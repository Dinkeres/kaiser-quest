var cls = require("./lib/class"),
    http = require("http"),
    path = require("path"),
    fs = require("fs"),
    WebSocketServer = require("ws").WebSocketServer,
    Utils = require("./utils"),
    _ = require("underscore"),
    WS = {};

module.exports = WS;

var Server = cls.Class.extend({
    init: function(port) { this.port = port; },
    onConnect: function(callback) { this.connection_callback = callback; },
    onError: function(callback) { this.error_callback = callback; },
    forEachConnection: function(callback) { _.each(this._connections, callback); },
    addConnection: function(connection) { this._connections[connection.id] = connection; },
    removeConnection: function(id) { delete this._connections[id]; },
    getConnection: function(id) { return this._connections[id]; }
});

var Connection = cls.Class.extend({
    init: function(id, socket, server, request) {
        this._socket = socket;
        this._server = server;
        this.remoteAddress = request.socket.remoteAddress;
        this.id = id;
    },
    onClose: function(callback) { this.close_callback = callback; },
    listen: function(callback) { this.listen_callback = callback; },
    send: function(message) { if(this._socket.readyState === this._socket.OPEN) { this._socket.send(JSON.stringify(message)); } },
    sendUTF8: function(data) { if(this._socket.readyState === this._socket.OPEN) { this._socket.send(data); } },
    close: function() { this._socket.close(); }
});

/** Modern WebSocket and static-file server. The BrowserQuest JSON protocol is retained. */
WS.MultiVersionWebsocketServer = Server.extend({
    _connections: {},
    _counter: 0,
    init: function(port) {
        var self = this;
        this._super(port);
        this._connections = {};
        this._clientRoot = path.resolve(__dirname, "../../client");
        this._sharedClientRoot = path.resolve(__dirname, "../../shared");
        this._httpServer = http.createServer(function(request, response) { self._handleRequest(request, response); });
        this._websocketServer = new WebSocketServer({ noServer: true });
        this._httpServer.on("upgrade", function(request, socket, head) {
            self._websocketServer.handleUpgrade(request, socket, head, function(socketConnection) {
                var connection = new WS.WebSocketConnection(self._createId(), socketConnection, self, request);
                self.addConnection(connection);
                if(self.connection_callback) { self.connection_callback(connection); }
            });
        });
        this._websocketServer.on("error", function(error) { if(self.error_callback) { self.error_callback(error); } });
        this._httpServer.on("error", function(error) { if(self.error_callback) { self.error_callback(error); } });
        this._httpServer.listen(port, function() { log.info("Server is listening on port " + port); });
    },
    _handleRequest: function(request, response) {
        var pathname = new URL(request.url, "http://localhost").pathname;
        if(pathname === "/status") { response.writeHead(200, { "Content-Type": "application/json" }); response.end(this.status_callback ? this.status_callback() : "[]"); return; }
        if(request.method !== "GET" && request.method !== "HEAD") { response.writeHead(405); response.end(); return; }
        if(pathname === "/") { pathname = "/index.html"; }
        var root = this._clientRoot,
            relativePath = pathname;
        // The legacy AMD client imports the shared game protocol types. Expose
        // only this shared browser directory; server files remain private.
        if(pathname.indexOf("/shared/") === 0) {
            root = this._sharedClientRoot;
            relativePath = pathname.substring("/shared".length);
        }
        var filename = path.resolve(root, "." + relativePath);
        if(filename.indexOf(root + path.sep) !== 0 && filename !== root) { response.writeHead(403); response.end(); return; }
        fs.readFile(filename, function(error, data) {
            if(error) { response.writeHead(error.code === "ENOENT" ? 404 : 500); response.end(); return; }
            var extension = path.extname(filename).toLowerCase(),
                types = { ".css": "text/css", ".html": "text/html", ".js": "application/javascript", ".json": "application/json", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".png": "image/png", ".jpg": "image/jpeg", ".gif": "image/gif", ".svg": "image/svg+xml", ".woff": "font/woff", ".ttf": "font/ttf", ".eot": "application/vnd.ms-fontobject" };
            response.writeHead(200, { "Content-Type": types[extension] || "application/octet-stream" });
            response.end(request.method === "HEAD" ? undefined : data);
        });
    },
    _createId: function() { return "5" + Utils.random(99) + "" + (this._counter++); },
    broadcast: function(message) { this.forEachConnection(function(connection) { connection.send(message); }); },
    onRequestStatus: function(callback) { this.status_callback = callback; }
});

WS.WebSocketConnection = Connection.extend({
    init: function(id, socket, server, request) {
        var self = this;
        this._super(id, socket, server, request);
        socket.on("message", function(data, isBinary) {
            if(isBinary) { self.close(); return; }
            try { if(self.listen_callback) { self.listen_callback(JSON.parse(data.toString())); } } catch(error) { self.close(); }
        });
        socket.on("close", function() { server.removeConnection(self.id); if(self.close_callback) { self.close_callback(); } });
        socket.on("error", function(error) { if(server.error_callback) { server.error_callback(error); } });
    }
});
