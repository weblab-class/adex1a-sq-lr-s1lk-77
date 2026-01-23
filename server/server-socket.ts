import type http from "http";
import { Server, Socket } from "socket.io";
import Player from "../shared/Player";
let io: Server;

const userToSocketMap: Map<string, Socket> = new Map<string, Socket>(); // maps player ID to socket object
const socketToUserMap: Map<string, Player> = new Map<string, Player>(); // maps socket ID to player object

export const getSocketFromUserID = (userid: string) => userToSocketMap.get(userid);
export const getUserFromSocketID = (socketid: string) => socketToUserMap.get(socketid);
export const getSocketFromSocketID = (socketid: string) => io.sockets.sockets.get(socketid);

export const addUser = (player: Player, socket: Socket): void => {
  const oldSocket = userToSocketMap.get(player._id);
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this player, force it to disconnect
    // TODO(weblab student): is this the behavior you want?
    oldSocket.disconnect();
    socketToUserMap.delete(oldSocket.id);
  }
  userToSocketMap.set(player._id, socket);
  socketToUserMap.set(socket.id, player);
};

export const removeUser = (player: Player, socket: Socket): void => {
  if (player) userToSocketMap.delete(player._id);
  socketToUserMap.delete(socket.id);
};

export const init = (server: http.Server): void => {
  io = new Server(server);
  io.on("connection", (socket) => {
    console.log(`socket has connected ${socket.id}`);
    socket.on("disconnect", () => {
      console.log(`socket has disconnected ${socket.id}`);
      const player = getUserFromSocketID(socket.id);
      if (player !== undefined) removeUser(player, socket);
    });
  });
};

export const getIo = () => io;

export default {
  getIo,
  init,
  removeUser,
  addUser,
  getSocketFromSocketID,
  getUserFromSocketID,
  getSocketFromUserID,
};
