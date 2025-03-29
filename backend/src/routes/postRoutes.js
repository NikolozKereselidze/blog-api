import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import commentRoutes from "./commentRoutes.js";

const router = express.Router();

router.get("/", authenticateJWT, getPosts);
router.get("/:id", authenticateJWT, getPost);
router.post("/create", authenticateJWT, createPost);
router.put("/:id", authenticateJWT, updatePost);
router.delete("/:id", authenticateJWT, deletePost);

router.use("/:postId/comments", commentRoutes);

export default router;
