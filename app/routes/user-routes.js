import express from 'express';

import * as userController from '../controllers/user-controller.js';

//Router file that contains path to all the Rest APIs
const router = express.Router();

router.route('/')
    .get(userController.find)
    .post(userController.post)

router.route('/:id')
    .get(userController.get)
    .put(userController.put)
    .delete(userController.remove);

router.post('/login',userController.login);

router.post('/forgot-password',userController.forgot);
export default router;
