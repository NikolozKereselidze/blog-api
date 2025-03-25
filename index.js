import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

const Port = process.env.PORT || 5000;
app.listen(Port, () => {
  console.log(`Server is running on port ${Port}`);
});
