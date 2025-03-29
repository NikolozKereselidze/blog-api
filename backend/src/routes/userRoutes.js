import express from "express";
import { loginUser, registerUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/register", (req, res) => {
  res.render("register");
});
router.post("/register", registerUser);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", loginUser);

router.get("/", (req, res) => {
  res.render("register");
});

export default router;
