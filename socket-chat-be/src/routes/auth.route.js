//import express from 'express';
//const router = express.Router();
import { Router } from "express";
import { logout, signin, signup, update, me } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);

authRouter.post("/signin", signin);

authRouter.post("/logout", logout);

authRouter.get("/update", protectRoute, update);

authRouter.get("/me", protectRoute, me);

export default authRouter;
