import express from "express";
import authController from "../controllers/authController";

const router = express.Router();

router.route("/me").get(authController.checkCurrentUser);

export default router;
