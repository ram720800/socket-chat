import express from "express";
import authRouter from "./routes/auth.route.js";
import messageRouter from "./routes/message.route.js";
import groupRouter from "./routes/group.route.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";

const __dirname = path.resolve();

dotenv.config();
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/groups", groupRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../socket-chat-fe/dist")));

  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../socket-chat-fe", "dist", "index.html")
    );
  });
}

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
