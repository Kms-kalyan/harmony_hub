import SongModel from "../models/songInfoModel.js";
 
export const createSong = async (songData) => {
    const newSong = new SongModel(songData);    
    const savedSong = await newSong.save();    
    return savedSong;
}
export const getSongs = async(params={}) =>{
    let queryparams = {...params};
    const songs = await SongModel.find(queryparams);
    return songs;
}