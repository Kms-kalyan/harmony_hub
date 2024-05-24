interface Playlist {
    createdAt: string;
    playlistName: string;
    description: string;
    songs: any[]; // Adjust the type based on the structure of your songs array
    userId: string;
    _id: string;
  }

  export default Playlist;