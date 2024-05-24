import UserInsightModel from '../models/userInsightModel.js';


export const getUserInsightsForSong = async (songId) => {

    const insights = await UserInsightModel.findOne(songId);
    return insights;
  
};

export const addUserInsightForSong = async (songId, userInsightData) => {
 
    const newInsight = new UserInsightModel(userInsightData);
    return await newInsight.save();
  
};
