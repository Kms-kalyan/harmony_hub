import React,{useEffect,useState, useRef} from 'react';
import {io,Socket} from 'socket.io-client';
import Playlist from './Playlist';
import { Container,List,ListItem,ListItemText,Button,Typography, Box } from '@mui/material';
import Navbar from './Navbar';
import { useParams } from 'react-router-dom';

// Interface to define the Type of the Function return Type
interface RoomProps {
    //userId:string;
}
// Interface to define the type of the song
interface Song{
    _id:string;
    title:string;
    artist:string;
    genre:string;
    album:string;
}
//function to define the collab session.
const CollabRoom:React.FC<RoomProps> = () =>{
    //const userId = '655d1dd8fde3756f72ed4d20'
    //defining the state variables to update the state and useparams to get the sessionId .
    const[songs,setSongs] = useState<Song[]>([]);
    const[roomSongs,setRoomSongs] = useState<Song[]>([]);
    const[newSong, setnewSong] = useState<Song>({ _id: '', title: '', artist: '', genre: '', album: '' });
    const socketRef = useRef<Socket |null>(null);
    const sessionId = useParams();
    
    //using the useEfect hook to manipulate the socket session and defining the socket events to do the real-time collaboration.
    useEffect(() =>{
        // Initialize socket conenction
        socketRef.current= io('http://localhost:3001');
        const socket = socketRef.current;
        socket.emit('joinRoom',sessionId);
        socket.on('songAddedToRoom',(updatedRoomSongs: Song[])=>{
            setRoomSongs(updatedRoomSongs);
        });

        return () => {
            // Clean up the socket connection
            socket.disconnect();

        };
    },[]);
    //using the useEffect hook to get the songs to display to add in the collab Room.
    useEffect(() =>{
        // Fetch all songs from the API

        const fetchSongs = async() => {
            try{
                const respose = await fetch('http://localhost:3001/api/songs');
                if(respose.ok){
                    const data = await respose.json();
                    setSongs(data);
                }else{
                    console.error('Error fetching songs');
                }
            }catch(error){
                console.error('Error fetching songs');
            }
        };
        fetchSongs();
    },[]);

    const handleAddSongToRoom = (song:Song) =>{
        console.log(roomSongs);
        const socket = socketRef.current;

        if(socket){
            socket.emit('addSongToRoom',song);
        }
    };
    //return statement in JSX format and used materialUI for the styling.
    return(
        <>
        <Navbar/>
        <Box sx={{padding: 2, backgroundColor: '#2B2628', color: '#000000'}}>
            <Typography variant='h4' gutterBottom sx={{color:`white`}}>
                Collaboration Room
            </Typography>
            <Container maxWidth ="sm">
                <Typography variant='h5' gutterBottom sx={{color:`white`}}>
                    All Songs
                </Typography>
                <List>
                    {songs.map((song,index) =>(
                        <ListItem key={index} divider>
                            <ListItemText primary={<Typography sx={{color:'white'}}>{song.title}</Typography>} secondary={<Typography sx={{color:'#de6154'}}>{`by ${song.artist}`}</Typography>}/>
                            <Button variant='outlined' onClick={() => handleAddSongToRoom(song)}>
                                Add to Room
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Container>

            <Container maxWidth="sm">
                <Typography variant='h5' gutterBottom sx={{color:`white`}}>
                    Songs in Room
                </Typography>
                <List>
                   {roomSongs.map((song,index) =>(
                        <ListItem key={index} divider>
                            <ListItemText primary={<Typography sx={{color:'white'}}>{song.title}</Typography>} secondary={<Typography sx={{color:'#de6154'}}>{`by ${song.artist}`}</Typography>} />
                            <Button variant='outlined' onClick={() => handleAddSongToRoom(song)}>
                                Add to Room
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Container>
        </Box>
        </>
        
    );

};

export default CollabRoom;