import songRouter  from './songInfoRoutes.js';
import collabrouter from "./collobaration-routes.js";
import spacerouter from "./space-routes.js";
import playlistRouter  from './playlist-routes.js';
import userRouter  from './user-routes.js';

export default(app) =>{
    app.use('/api/songs', songRouter);
    app.use('/api/collaboration', collabrouter);
    app.use('/api/collaborative-spaces',spacerouter);
    app.use('/api/users', userRouter);
    app.use('/api/playlists', playlistRouter);
};




