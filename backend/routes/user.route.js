import express from "express";
import { getLikes, getUserProfileAndRepos, likeProfile } from "../controllers/user.controller.js";
import { ensureAuthenticated } from "../middleware/authenticated.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)
// TODO: add like route where users and like a profile
router.post("/like/:username", ensureAuthenticated, likeProfile)
// TODO: add likes route to get all users that like a profile
router.get("/likes", ensureAuthenticated, getLikes)

export default router;
