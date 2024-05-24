import express from 'express';

import * as CollabController from '../controllers/collab-controller.js';

// defining express router
const router =  express.Router();
//defining the routes for the specific routes.
router.route('/:playlistId/join')
      .post(CollabController.join);


router.route('/:playlistId/leave')
      .post(CollabController.leave);
      

export default router;
