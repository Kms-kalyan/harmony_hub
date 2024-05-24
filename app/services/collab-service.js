import CollabModel from '../models/collab-model.js'


export const joinSession = async(playlistId, userId) => {
    const session = await CollabModel.findOne({playlistId, sessionStatus: 'active'});

    if(!session){
        throw new Error('Session not found or not active')
    }

    if(!session.participantUserIds.includes(userId)){
        session.participantUserIds.push(userId);
        await session.save();
    }


    return session;

}


export const leaveSession = async(playlistId, userId) => {
    const session = await CollabModel.findOne({playlistId, sessionStatus: 'active'});
    if(!session){
        throw new Error('Session not found or not active')
    }

    session.participantUserIds = session.participantUserIds.filter(id => id.toString() !== userId.toString());
    return await session.save();

}