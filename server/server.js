// server/server.js
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// routes
app.get("/api", (req, res) => {
  res.json({ data: "hello world from nodejs api" });
});

app.listen(3000, () => console.log("Server running in port 3000"));