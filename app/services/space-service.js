import spaceModel from "../models/space-model.js";

// service function to search the collab space based on the parameters given
export const searchSpace = async(params = {}) =>{
    //defining the query and queryparams to check the conditions and find the results
    let query;
    let queryparams = {...params};
    if(queryparams.ownerId){
        query = spaceModel.find({ownerId: queryparams.ownerId});
    } 
    else if( queryparams.sessionId){
        query = spaceModel.find({_id: queryparams.sessionId});
    }
    else{
        query = spaceModel.find(queryparams);
    }
    //executing the query to return all the spaces
    const spaces = await query.exec();
    return spaces;
}

//Service function to create the new space.
export const saveSpace = async(newSpace)=>{
    const space =  new spaceModel(newSpace);

    return await space.save();
}

//service function to update the space which is already available.
export const updateSpace = async(updatedspace, id)=>{
    const space = await spaceModel.findByIdAndUpdate(id,updatedspace,{new:true}).exec();

    return space;
}
//service function to delete the collab space.
export const deleteSpace = async(id)=>{
    
    return await spaceModel.findByIdAndRemove(id).exec();
}


