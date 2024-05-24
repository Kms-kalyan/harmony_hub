import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const Schema = mongoose.Schema;
const newUUID = uuidv4();

//Schema provided for User details
const UserSchema = new Schema({

            userName: {
                type: String,
                required: true
            },
            userID: {
                type: String,
                default: newUUID,
                unique: true
            },
            password: {
                type: String,
                required: true
            },
            emailId: {
                type: String,
                required: true,
                unique: true
            },
            mobileNumber: {
                type: String
            }
        },
        {
            versionKey: false
        }
);

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;