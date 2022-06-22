"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clients = exports.attachServer = exports.io = void 0;
const socket_io_1 = require("socket.io");
const io = new socket_io_1.Server();
exports.io = io;
let clients = new Map();
exports.clients = clients;
io.on("connection", (socket) => {
    console.log("Connection Established: ", socket.id);
    socket.on("setId", (customId) => {
        socket.userId = customId;
        const z = clients.get(customId);
        if (!z) {
            clients.set(customId, [socket.id]);
        }
        else {
            clients.set(customId, [...z, socket.id]);
        }
        console.log(customId);
        console.log(clients);
    });
    socket.on("disconnect", () => {
        let userSockets = clients.get(socket.userId);
        if (userSockets) {
            userSockets = userSockets.filter((socketId) => socketId !== socket.id);
            if (userSockets.length < 1) {
                clients.delete(socket.userId);
            }
            else {
                clients.set(socket.userId, userSockets);
            }
        }
        console.log(clients);
    });
});
// http://larouemusicale.com
const attachServer = (server) => {
    io.attach(server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
        },
    });
};
exports.attachServer = attachServer;
