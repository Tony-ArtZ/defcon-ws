import { createServer } from "http";
import socketIO from "./utils/socket.js";
import express from "express";
import { createUser } from "./helpers/createUser.js";
import { getData } from "./helpers/getData.js";
import { updateUser } from "./helpers/updateUser.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
const io = socketIO(httpServer);

app.post("/update", async (req, res) => {
  const { userId, flags } = req.body;
  const result = await updateUser(userId, flags);
  const updatedData = await getData();
  if (!result.error) {
    io.emit("data", updatedData);
    res.status(200).json({ success: result.success });
  } else {
    res.status(500).json({ error: result.error, success: result.success });
  }
});

app.post("/create", async (req, res) => {
  const { userName } = req.body;
  const result = await createUser(userName);
  if (!result.error) {
    res.status(200).json({ success: result.success });
  } else {
    res.status(500).json({ error: result.error, success: result.success });
  }
});

app.get("/ping", async (req, res) => {
  res.sendStatus(200);
});
const PORT = 3000;
httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
