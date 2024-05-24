import mongoose from "mongoose";

const Schema = mongoose.Schema;

const SongInfoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
    },
    album: {
        type: String,
    }
  },
  {
    versionKey: false

  });


const SongModel = mongoose.model('song', SongInfoSchema);

export default SongModel;
