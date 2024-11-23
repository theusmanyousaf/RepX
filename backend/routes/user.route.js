import express from "express";
import { getUserProfileAndRepos } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)
// TODO: add like route where users and like a profile
// TODO: add likes route to get all users that like a profile

export default router;
