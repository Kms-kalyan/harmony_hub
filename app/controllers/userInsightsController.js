import {getUserInsightsForSong, addUserInsightForSong} from '../services/userInsightService.js';
import { setResponse, setErrorResponse } from './response-handler.js';

export const getUserInsights = async (req, res) => {
  try {
    const insights = await getUserInsightsForSong(req.params.songId);
    setResponse(insights, res);
  } 
  catch (err) {
    setErrorResponse(err, res);
  }
};

export const addUserInsight = async (request, response) => {
  try {
    const newInsight = {...request.body}
    const insight = await addUserInsightForSong(request.params.songId,newInsight);
    setResponse(insight, response);
  } 
  catch (err) {
    setErrorResponse(err, response);
  }
};