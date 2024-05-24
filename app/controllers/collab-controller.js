import * as CollabService from '../services/collab-service.js';
import { setResponse, setErrorResponse } from './response-handler.js';



export const join = async (req, res) => {
    try{
        const playlistId = req.params.playlistId;
        const userId = req.user._id;

        const session = await CollabService.joinSession(playlistId,userId);

        setResponse(session,res);
    }
    catch{
        setErrorResponse(err,res);
    }
}


export const leave = async(req,res) =>{
    try{
        const {playlistId} = req.params;
        const userId = req.user._id;

        const session = await CollabService.leaveSession(playlistId,userId);

        setResponse(session,res);

    }
    catch{
        setErrorResponse(err,res);
    }
}


