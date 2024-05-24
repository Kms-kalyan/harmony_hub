import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
      userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      songs: [{
        type: Schema.Types.ObjectId,
        ref: 'Song'
      }],
      playlistName: {
        type: String,
        required: true
      },
      description:{
        type: String,
        required: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
})

const PlaylistModel = mongoose.model('Playlist', PlaylistSchema);
export default PlaylistModel;
