import Playlist from "../models/playlist.js";
// const { v4: uuidv4 } = require('uuid');

// function to fetch playlists for the provided userid
export const getPlaylistByUserId = async(params = {}) => {
    const playlists = await Playlist.find({userId:params.userId});
    return playlists;
}

// Function to find playlist by playlistid
export const getPlaylistDetailsById = async(id) =>{
    const playlist = await Playlist.findById(id); 
    return playlist;
}

// Fucntion to create a new playlist 
export const createPlaylist = async(userId, playlistName, description) =>{
    const newPlaylist = new Playlist({
        userId,
        playlistName,
        description,
        createdAt: new Date(),
    })


const savedPlaylist = await newPlaylist.save();
    return savedPlaylist;
}

// function to create a unique playlist id using uuid
// function generatePlaylistId() {
//     return uuidv4();
//   }

//function to update a playlist
export const updatePlaylist = async(id, updatedPlaylistData) =>{
        const updatedPlaylist = await Playlist.findOneAndUpdate(
            {_id:id},
            updatedPlaylistData,
            {new : true}
        );
    return updatedPlaylist;
}

//function to remove a playlist
export const removePlaylist = async(id) =>{
    const deletedPlaylist = await Playlist.findByIdAndDelete(id);
    return deletedPlaylist;
}
