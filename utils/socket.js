import { Server } from "socket.io";
import { getData } from "../helpers/getData.js";

export default function socketIO(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    const updatedData = await getData();
    console.log("A user connected");
    socket.emit("data", updatedData);

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

  return io;
}
