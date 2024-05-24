import express from 'express';
import * as playlistController from "../controllers/playlist-controller.js";

const router = express.Router();

router.route('/')
    .get(playlistController.fetchUserPlaylists)
    .post(playlistController.postPlaylist);

router.route('/:playlistid')
    .get(playlistController.fetchPlaylist)
    .put(playlistController.putPlaylist)
    .delete(playlistController.delPlaylist);

export default router;