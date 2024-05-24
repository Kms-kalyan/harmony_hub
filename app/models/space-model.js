import mongoose from 'mongoose'

const sSchema =  mongoose.Schema;

const SpaceSchema =  new sSchema({

    ownerId:{
        type: sSchema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }


},
{
    versionKey: false
});

const spaceModel  = mongoose.model('space', SpaceSchema);

export default spaceModel;