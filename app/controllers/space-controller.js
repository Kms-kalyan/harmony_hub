import * as SpaceService from '../services/space-service.js';
import { setResponse,setErrorResponse } from './response-handler.js';

// function to find the space based on the params given
export const find = async(req,res)=>{
    try{
        const params = {...req.query};
        const spaces = await SpaceService.searchSpace(params);
        setResponse(spaces,res);
    }
    catch(err){
        setErrorResponse(err,res);
    }
}
// function to create new session
export const post = async(req,res)=>{
    try{
        const newSpace = {...req.body};
        const space = await SpaceService.saveSpace(newSpace);
        setResponse(space,res)
    }
    catch(err){
        setErrorResponse(err, res);
    }
}
//fuinction to update the space
export const put = async(req,res)=>{
    try{
        const id = req.params.id;
        const updatedSpace = {...req.body};
        const space = await SpaceService.updateSpace(updatedSpace,id);
        setResponse(space,res);
    }
    catch(err){
        setErrorResponse(err,res);
    }
}
//function to delete
export const remove = async(req,res)=>{
    try{
        const id = req.params.id;
        const space = await SpaceService.deleteSpace(id);
        setResponse({},res);
    }
    catch(err){
        setErrorResponse(err,res);
    }
}
//function to find spaces by userId
export const findById = async(req,res) =>{
    try{
        const sessionId = req.params.sessionId;
        const space = await SpaceService.searchSpace({sessionId});
        setResponse(space,res);

    }
    catch(err){
        setErrorResponse(err,res);
    }
}