import { Alert, Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Snackbar, TextField, Typography } from '@mui/material';
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { idText } from 'typescript';
import EditIcon from '@mui/icons-material/Edit';
// import generate from '@babel/generator';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';

interface playlist {
  createdAt: string;
  playlistName: string;
  description: string;
  songs: any[];
  userId: string;
  _id: string;
}

interface song{
  title: string;
  artist: string;
  album: string;
  genre: string;
  _id: string;
}

type SongId = string;

export default function Playlist() {
  const { id } = useParams();
  // const [playlist, setPlaylist] = useState<Playlist[]>([]);
  const [playlist, setPlaylist] = useState<playlist | null>();
  const [songsList, setSongList] = useState<song[]>([]);
  const [open, setOpen] = useState(false);
  const [songOpen, setSongOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [nameErr, setNameErr] = useState('');
  const [showErr, setShowErr] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [addedSongs, setAddedSongs] = useState<SongId[]>([]); 
  const navigate = useNavigate();
  const backgroundColor = '#2B2628';


  // function to fetch the playlist details by using id
  async function fetchPlaylistDetails() {
    try {
      const response = await fetch(`http://localhost:3001/api/playlists/${id}`);
      const data = await response.json();
      console.log(data);
      setPlaylist(data);
      setPlaylistName(data.playlistName);
      setDescription(data.description);
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      // Handle error (e.g., show error message to the user)
    }
  }

  // function to fetch all the songs list
  async function fetchSongsList() {
    try {
      const response = await fetch(`http://localhost:3001/api/songs/`);
      const data = await response.json();
      console.log(data);
      setSongList(data);
    } catch (error) {
      console.error('Error fetching playlist details:', error);
      // Handle error (e.g., show error message to the user)
    }
  }

  //function to update a playlist
  async function updatePlaylist() {
    const data = {
      playlistName,
      description,
    }
    try {
      console.log("data:",data);
      const response = await fetch(`http://localhost:3001/api/playlists/${playlist?._id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      
    } catch (error) {
      console.error('Error adding playlist:', error);
      // Handle error (e.g., show error message to the user)
    }
  }

  useEffect(() => {

    fetchPlaylistDetails(); // Call the function to fetch playlist details
  }, []); 

  const handleClickOpen = () => {
    setOpen(true);

  };

  const handleClose = () => {
    setOpen(false);
    setShowErr(false);
    setNameErr("");
    // setPlaylistName(playlist?.playlistName);
    // setDescription(playlist?.description);
  };

  const handleUpdate = async() => {
    if(!playlistName){
      setShowErr(true);
      setNameErr("Playlist Name Required");
    }
    else{
      updatePlaylist();
      setPlaylistName('');
      setDescription('');
      setOpen(false);
      fetchPlaylistDetails();
    }
    
  }

  const handleDelete = async() =>{
    setOpenAlert(true);
    try {
      const response = await fetch(`http://localhost:3001/api/playlists/${id}`, {
        method: 'DELETE'
      });
      
      setAlertMsg('Playlist Deleted Successfully');
      setTimeout(()=>navigate("/Playlists"), 1500);
      

    }
    catch(err){
      setAlertMsg('Error Deleting Playlist');
    }
  }

  const handleCloseAlert = (event?: React.SyntheticEvent | Event, reason?: string) =>{
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }

  const handleClickSongOpen = () => {
    fetchSongsList();
    setSongOpen(true);
  }

  const handleSongClose = () => {
    setSongOpen(false);
    setAddedSongs([]);
    
  }

  // add songs in the playlist by calling the updateapi
  const handleAdd = () => {
    if(addedSongs.length>0){
      // Songs = addedSongs.map(id => ({ _id: id }));
      // console.log("songs",Songs);
      updatePlaylist();
      fetchPlaylistDetails();
    }
    setSongOpen(false);
    setAddedSongs([]);
  }

  const handleAddSong = (songId: SongId) => {
    setAddedSongs(prevSongs => [...prevSongs, songId]);
    // Additional logic or actions related to adding a song can go here
  };

  console.log('Playlist state:', playlist);
  // setPlaylistName(playlist.playlistName);
  return (
    <div>
      <Navbar />
      <div style={{
        backgroundColor: `${backgroundColor}`,
        height: '100vh',
        marginLeft: '300px',
        width: 'calc(100% - 300px)',
        marginTop: '74px',
      }}>
        <div style={{ display: "flex" }}>

          <h2 style={{
            marginTop: "15px",
            color: 'white',
            marginLeft: '35px',
            borderLeft: '#EC645B 5px solid',
            paddingLeft: '5px',
            paddingRight: '10px'
          }}>
            {playlist?.playlistName}
          </h2>
          <Button sx={{
            marginLeft: 'auto',
            paddingRight: '2%'
          }}
            onClick={handleClickOpen}
          >Update</Button>
          <Button sx={{
            marginLeft: 'auto',
            paddingRight: '2%',
          }}
            onClick={handleClickSongOpen}
          >Add Songs</Button>
        </div>
        <Typography sx={{
          color:'#d1c7c7',
          display: 'flex',
          marginTop: '-7px',
          marginBottom: '10px',
          marginLeft: '45px'
        }}>{playlist?.description}</Typography>
        <Divider/>
        <List sx={{ width: '100%', }}>
          {playlist?.songs.length == undefined ?
            playlist?.songs.map((song, index) => ( 
          <><ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={song._id}
              secondary={<React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {song._id}
                </Typography>

              </React.Fragment>} />
          </ListItem><Divider variant="inset" component="li" /></>
          ))
        : <Typography>Playlist is Empty</Typography>} 
        </List>
        <Button sx={{
            // marginLeft: 'auto',
            paddingRight: '2%',
            borderColor: 'error'
          }}
            variant="outlined"
            color= 'error'
            onClick={handleDelete}
          >Delete Playlist</Button>
          <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleClose}>
            {alertMsg =='Playlist Deleted Successfully' ? 
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
          :
          <Alert onClose={handleCloseAlert} severity="error" sx={{ width: '100%' }}>
            {alertMsg}
          </Alert>
          }
        </Snackbar>
        
      </div>
      <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Playlist Details</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="pname"
              label="Playlist Name"
              type="text"
              fullWidth
              variant="standard"
              value={playlistName}
              onChange={(event)=> setPlaylistName(event.target.value)}
            />
            {showErr == true ? <p style={{
              color:"red",
              marginTop: "-1px",
              fontSize: "smaller",
            }}>{nameErr}</p>: null}
            <TextField
              autoFocus
              margin="dense"
              id="pname"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value={description}
              onChange={(event)=> setDescription(event.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdate}>Confirm</Button>
          </DialogActions>
      </Dialog>

      <Dialog open={songOpen} onClose={handleSongClose}>
          <DialogTitle>Songs</DialogTitle>
          <DialogContent>
            {songsList.map((song,index)=>(
          <List key={index}>
                <ListItem key={song._id}
                  secondaryAction={
                    <IconButton edge="end" aria-label="add" onClick={() => handleAddSong(song._id)}>
                      
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={song.title}
                    secondary={song.artist}
                  />
                </ListItem>
              
            </List>
          ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSongClose}>Cancel</Button>
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
      </Dialog>
    </div>
  )
}