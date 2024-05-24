/*
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Middleware to check if a request has a valid token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register a new user
const registerUser = async (app, req, res) => {
    // Access the app instance as a parameter
    const { userName, password, emailId } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, password: hashedPassword, emailId });
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login route
const loginUser = async (app, req, res) => {
    // Access the app instance as a parameter
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ userName });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user.userID }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            res.json({ token });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export { authenticateToken, registerUser, loginUser };
/!*
// Logout route (invalidate token - client should discard it)
app.post('/logout', authenticateToken, (req, res) => {
    res.json({ message: 'Logout successful' });
});*!/

export const search = async (params = {})=>{
    const users = await User.find(params).exec();   //exec returns a promise
    return users;
}

export const save = async (newUser)=>{
    const user = new User(newUser);
    return await user.save();     //save by default returns a promise
}

export const update = async (updatedUser, userID) =>{
    const user = await User.findByIdAndUpdate(userID, updatedUser).exec();
    return user;
}

export const remove = async (userID) =>{
    return await User.findByIdAndRemove(userID).exec();
}

export const findById = async (userID) =>{
    return await User.findById(userID).exec();
}*/

import User from '../models/user.js';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {v4 as uuidv4} from "uuid";

// Middleware to check if a request has a valid token
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Register a new user
const registerUser = async (app, req, res) => {
    // Access the app instance as a parameter
    const { userName, password, emailId,mobileNumber } = req.body;

    try {

        //Create unique ID for each user
        let newUUID = uuidv4();
        console.log("UserId generated is : ",newUUID);

        //Encrypt the password before saving in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({userID:newUUID});
        while(user){
            newUUID = uuidv4();
            user = await User.findOne({userID:newUUID});
        }
        const newUser = new User({ userName, userID: newUUID, password: hashedPassword, emailId ,mobileNumber});
        await newUser.save();

        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


export { authenticateToken, registerUser };

//Search for users based on given params
export const search = async (params = {})=>{
    const users = await User.find(params).exec();   //exec returns a promise
    return users;
}

//Save user details into the Database
export const save = async (newUser)=>{
    const user = new User(newUser);
    return await user.save();     //save by default returns a promise
}

//Update user details with given details
export const update = async (updatedUser, id) =>{

    return await User.findOneAndUpdate({_id : id}, updatedUser,{new:true}).exec();
}

//Remove a particular user based on ID
export const remove = async (id) => {
    try {
        return await User.findOneAndDelete({_id:id}).exec();
    } catch (error) {
        console.error("Error removing user in userService:", error);
        throw error; // Rethrow the error to propagate it to the calling function
    }
}

//Find user based on the id
export const findById = async (userID) =>{
    return await User.findById(userID).exec();
}
