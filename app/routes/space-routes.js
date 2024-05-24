import express from 'express';

import * as spaceController from '../controllers/space-controller.js';

const spacerouter = express.Router();

spacerouter.route('/')
           .get(spaceController.find)
           .post(spaceController.post);

spacerouter.route('/:spaceId')
           .put(spaceController.put)
           .delete(spaceController.remove);

spacerouter.route('/:sessionId')
           .get(spaceController.findById);
export default spacerouter;