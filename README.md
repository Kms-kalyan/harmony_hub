# Final Project Description
## Harmony Hub
In the era of digital music streaming, HarmonyHub redefines the way we experience and share music by introducing a novel approach to collaborative playlist curation. Unlike traditional music platforms, HarmonyHub focuses on real-time interaction, allowing users to collaboratively build and curate playlists together, transforming the act of music discovery into a social, dynamic, and engaging experience.

## Problem Statement
* __Fragmented Collaboration:__ Existing music apps lack seamless synchronization, causing disjointed creative processes.
* __Tool Integration Gaps:__ Inefficient integration of essential music tools hampers sharing and coordinating musical elements.
* __Communication Challenges:__  Limited communication tools impede effective idea exchange, impacting collaborative music creation quality.

## About
The HarmonyHub project aims to develop a comprehensive music application that provides users with a seamless and personalized music streaming experience. The application will include essential features such as user authentication, playlist management, session tracking, and profile customization. The goal is to create an intuitive and user-friendly platform where music enthusiasts can discover, organize, and enjoy their favorite tunes.


## key Features
### login/signup:
* user can create a new account or login using their credentials
* signout from the web app
* view account information

### playlists:
* user can create one or more playlists by adding one or more songs

### Real-Time Playlist Collaboration:
* Users can create, modify, and curate playlists together in real-time.
* Instant updates ensure that all collaborators see changes simultaneously, fostering a seamless and dynamic collaborative environment.

### session management:
* user can create sessions and add as many people
* email notification to join a session
* join or leave sessions
* track sessions

### search bar:
* Search songs
* search other users
* search sessions

## technical Stack
We are using MERN stack
* MongoDB: as our data store, hosted in atlas
* Express: node library for rest end point creation
* React: Frontend framework for consuming rest endpoints
* Node: Backend server environment
* Libraries:
    * mongoose: used as a middleware to connect to mongoDB
    * bcrypt: used for authentication
    * JWT: for safe transfer of JSON data
    * Redux: used for session management
* End to end data consistency was ensured using validation for each field

# How to Use the Project
## ENV Variables
```bash
Create a .env file in the root and add the following.
PORT = Port Number you want to host the backend Server
MONGO_URI = your mongodb uri
```
## Install Dependencies (frontend & backend)
```bash
npm install
cd harmony-hub
npm install
```
## Convert SCSS File into CSS File
```bash
sass scss_file_name.scss css_file_name.css
```

## Run
```bash
Run the backend Server which is hosted on 3001 Port
Command : npm start
cd harmony-hub
Run the frontend Server hosted on 3000 port
Command : npm start
```

## To create Prod Build
```bash
cd harmony-hub
npm run build
```



## student details
```bash
* Ankush Maheshwari, NUID: 002826187
* Lenin kumar Gorle, NUID: 002803806
* Venkata Naga Sri Sai Sujh Tadikonda, NUID: 002642314
* Madhu Sai Kalyan Kaluri, NUID: 002248753
```
