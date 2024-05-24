import * as PlaylistService from "../services/playlist-service.js";
import {setResponse, setErrorResponse} from './response-handler.js';


//controller to fetch all the playlists of a user
export const fetchUserPlaylists = async(req,res) =>{
    try{
        const userId = {...req.query};
        const playlists = await PlaylistService.getPlaylistByUserId(userId);
        setResponse(playlists,res);
    }
    catch(err){
        setErrorResponse(err, res);
    }
}

//constroller to fetch details of a playlist using its id
export const fetchPlaylist = async(req,res) =>{
    try{
        const { playlistid } = req.params;
        const playlist = await PlaylistService.getPlaylistDetailsById(playlistid);
        setResponse(playlist,res);
    }
    catch(err){
        setErrorResponse(err, res);
    }
}

// controller to post data 
export const postPlaylist = async(req,res) =>{
    try{
        const { userId, playlistName, description } = req.body;
        const newPlaylist = await PlaylistService.createPlaylist(userId, playlistName, description);
        setResponse(newPlaylist,res);
    }
    catch(err){
        setErrorResponse(err, res);
    }
}

//Controller to update a playlist
export const putPlaylist = async(req,res) =>{
    const { playlistid } = req.params;
    console.log("id", playlistid);
    //const updatedPlaylistData = {...req.body};
    const updatedPlaylistData = req.body;
    console.log("body",updatedPlaylistData);
    try{
        const updatedPlaylist = await PlaylistService.updatePlaylist(playlistid, updatedPlaylistData);
        if (!updatedPlaylist) {
          return res.status(404).json({ error: 'Playlist not found' });
        }
        setResponse(updatedPlaylist,res);
    }
    catch(err){
        console.log(err);
        setErrorResponse(err, res);
    }
}

//controller to delete a playlist
export const delPlaylist = async(req,res)=>{
    const { playlistid } = req.params;
    try{
        const deletedPlaylist = await PlaylistService.removePlaylist(playlistid);
        
        if (!deletedPlaylist) {
            return res.status(404).json({ error: 'Playlist not found' });
        }
        setResponse(deletedPlaylist,res);
    }
    catch(err){
        setErrorResponse(err, res);
    }
}