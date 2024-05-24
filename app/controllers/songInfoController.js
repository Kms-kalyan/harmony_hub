import * as songInfoService from '../services/songInfoService.js';
import { setResponse,setErrorResponse } from './response-handler.js';

export const addSong = async(req,res) =>{
    const songData = {...req.body};
       try {     
        const newSong = await songInfoService.createSong(songData);     
        res.status(200).json(newSong);   
    } 
    catch (error) 
    {    
        res.status(500)
            .json({
                code: "Service Error",
                message: "Error occured while processing your request."
            })
    }
}

export const get = async(req, res) =>{
    try{
        const params = {...req.query};
        const songs = await songInfoService.getSongs(params);
        setResponse(songs,res);
    }catch(err){
        setErrorResponse(err,res);
    }
}

    
