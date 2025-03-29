import express from "express";
import { authenticateJWT } from "../middleware/authMiddleware.js";
import {
  createComment,
  deleteComment,
  getComments,
  updateComment,
} from "../controllers/commentController.js";

const router = express.Router({ mergeParams: true }); // Merge parent route params

router.post("/", authenticateJWT, createComment);

router.get("/", authenticateJWT, getComments);

router.put("/:commentId", authenticateJWT, updateComment);

router.delete("/:commentId", authenticateJWT, deleteComment);

export default router;
