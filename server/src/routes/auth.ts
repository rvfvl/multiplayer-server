import express from "express";
import authController from "../controllers/authController";
import { protectedRoute } from "../middleware/protectedRouteMiddleware";

const router = express.Router();

router.route("/me").get(protectedRoute, authController.checkCurrentUser);
router.route("/login").post(authController.login);

export default router;
