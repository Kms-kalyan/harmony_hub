import express from "express";
import {getUserInsights, addUserInsight} from '../controllers/userInsightsController.js';

const router = express.Router();

router.route('/:songId')
    .get(getUserInsights)
    .post(addUserInsight);

export default router;
