import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { authenticateJWT } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateJWT, getPosts);
router.get("/:id", authenticateJWT, getPost);

router.get("/create", authenticateJWT, (req, res) => {
  res.render("createPost");
});
router.post("/create", authenticateJWT, createPost);

router.put("/:id", authenticateJWT, updatePost);
router.delete("/:id", authenticateJWT, deletePost);

export default router;
