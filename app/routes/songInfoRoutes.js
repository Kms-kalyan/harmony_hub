import express from 'express';
import * as songInfoController from "../controllers/songInfoController.js";
import * as userController from "../controllers/user-controller.js";

const router = express.Router();

router.route('/')
    .post(songInfoController.addSong)
    .get(songInfoController.get);

export default router;