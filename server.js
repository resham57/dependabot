const cluster = require("cluster");

const app = require("./app");
const http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || "6003");
app.set("port", port);

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

const socketIo = require("socket.io");

/**
 * socket.ioのモジュールを読み込む
 */
const io = socketIo(server);

io.on("connection", (socket) => {
    console.log("a user connected!");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});

/**
 * ポート番号を正規化する関数
 * @param {string|number} val - 正規化するポート番号
 * @returns {number|boolean|string} - 正規化されたポート番号
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * エラーハンドラ関数です。
 *
 * @param {Error} error - エラーオブジェクト
 * @returns {void}
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * リスニングイベントのハンドラ関数です。
 *
 * @function onListening
 * @memberof module:server
 * @returns {void}
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
}

module.exports = { server, io };
