import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserInsightSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    comment: {
      type: String,
    }
  }, 
  {
    versionKey: false
  }
);

const UserInsightModel = mongoose.model('userInsight', UserInsightSchema);

export default UserInsightModel;
