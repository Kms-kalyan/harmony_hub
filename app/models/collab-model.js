import mongoose from 'mongoose';

const cSchema = mongoose.Schema;


const CollabSchema = new cSchema({
    
    playlistId: {
        type: cSchema.Types.ObjectId,
        ref: 'Playlist',
        required: true
    },
    hostuserId:{
        type: cSchema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    participantUserIds: [{
        type: cSchema.Types.ObjectId,
        ref: 'User'
    }],
    sessionStatus: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active'
    }

},
    
    {
        versionKey: false
    }
);


const CollabModel = mongoose.model('collab', CollabSchema);

export default CollabModel;