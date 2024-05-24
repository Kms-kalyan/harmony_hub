import * as userService from '../services/user-service.js';
import {setResponse, setErrorResponse} from './response-handler.js';
import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {registerUser} from "../services/user-service.js";
import sendEmail from '../services/email-service.js';
import app from "../app.js";
import crypto from "crypto";
import User from "../models/user.js";

//function to find particular user
export const find = async (request, response) =>{
    try{
        const params = {...request.query};
        const users = await userService.search(params);
        setResponse(users, response);
    } catch(err){
        setErrorResponse(err, response);
    }
}

//Function to Log in a particular user
export const login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await UserModel.findOne({userName});

        if (user && (await bcrypt.compare(password, user.password))) {

            const secretKey = crypto.randomBytes(32).toString('hex');

            console.log('Generated Secret Key:', secretKey);

            const token = jwt.sign({ userId: user.userId}, secretKey, {
                expiresIn: '1h',
            });

            res.json({ user, token });
        } else {
            //Return Login Error for invalid credentials
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        //Return any other error
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//Function to Register a new user
export const post = async (request, response) =>{

    try{
        await registerUser(app, request, response);

    } catch(err){
        setErrorResponse(err, response);
    }
}

//Get details of a user
export const get = async (request, response) =>{
    try{
        const id = request.params.id;
        const user = await User.findOne({_id : id});
        setResponse(user, response);
    }
    catch(err){
        setErrorResponse(err, response);
    }
}


export const put = async (request, response) => {

    try{
        let id = request.params.id;
        let getUser ;

        console.log("Id is : ",id);

        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        if(isValidEmail(id)){
            getUser = await User.findOne({emailId : id});
        }else{
            getUser = await User.findOne({_id : id});
        }

        console.log("User det: ",getUser);

        console.log("Request params : ", request.body);
        console.log("Password : ",request.body.password);
        if(request.body.password){
            request.body.password = await bcrypt.hash(request.body.password, 10);
        }
        console.log("After Password : ",request.body.password);
        const updatedUser = {...request.body};
        id = getUser._id;
        console.log("ID is: ",id);
        console.log("Updated user details: ",updatedUser);
        const user = await userService.update(updatedUser, id);
        if(!user){
            throw Error;
        }
        setResponse(user, response);
    }
    catch(err){
        setErrorResponse(err, response);
    }
}

export const remove = async (request, response) =>{
    try{
        const id = request.params.id;
        console.log("User id to be removed : ",id);
        const user = await userService.remove(id);
        setResponse({user}, response);
    }
    catch(err){
        setErrorResponse(err, response);
    }
}

export const forgot = async(req,res) => {
    try{
        await sendEmail(req,res);
    }catch(err){
        setErrorResponse(err, res);
    }
}