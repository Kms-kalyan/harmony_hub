
import Navbar from './Navbar';
import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Playlist from './Playlist';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { loadPlaylists } from '../store/slices/playlist-slice';
import {AppState} from "../store/index";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  // height: 60,
  lineHeight: '60px',
}));

// const darkTheme = createTheme({ palette: { mode: 'dark' } });

const customDarkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#2B2628',
    },
  },
});

interface Playlist {
  createdAt: string;
  playlistName: string;
  description: string;
  songs: any[]; // Adjust the type based on the structure of your songs array
  userId: string;
  _id: string;
}
export default function Playlists() {

  const [playlists, setPlaylists] = useState<Playlist[]>([]); //defining the type of the state
  const [open, setOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [songs, setSongs] = useState([]);
  const userId = localStorage.getItem('userID');
  const [nameErr, setNameErr] = useState('');
  const [showErr, setShowErr] = useState(false);
  const navigate = useNavigate();
  const backgroundColor = '#2B2628';
  

  useEffect(() => {
    fetchPlaylists(); 
  }, []);
  
  //function to fetch all the playlists of a user
  async function fetchPlaylists() {
    try {
      const response = await fetch(`http://localhost:3001/api/playlists?userId=${userId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      console.log("data", data)
      setPlaylists(data); // Update state with fetched playlists

    } catch (error) {
      console.error('Error fetching playlists:', error);
      // Handle error (e.g., show error message to the user)
    }
  }

  //function to add a playlist
  async function addPlaylist() {
    const data = {
      userId,
      playlistName,
      description,
      songs,
    }
    try {
      console.log("data:",data);
      const response = await fetch(`http://localhost:3001/api/playlists/`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      setPlaylistName('');
      setDescription('');
      setSongs([]);
      fetchPlaylists();
      
    } catch (error) {
      console.error('Error adding playlist:', error);
      // Handle error (e.g., show error message to the user)
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setPlaylistName('');
    setDescription('');
    setSongs([]);
    setShowErr(false);
    setNameErr("");
  };

  // calling the addplaylist api
  const handleAdd = () => {
    
    if(!playlistName){
      setShowErr(true);
      setNameErr("Playlist Name Required");
    }
    else{
      setOpen(false);
      setShowErr(false);
      setNameErr("");
      addPlaylist();
    }
  }

  return (
    <div>
      <Navbar />
      <div style={{
        marginLeft: "300px",
        backgroundColor: `${backgroundColor}`,
        height: '100vh',
        width: 'calc(100% - 300px)',
        marginTop: '74px',

      }}>


        <div style={{ display: "flex"}}>
          
            <h2 style={{
              marginTop: "5px",
              color: 'white',
              marginLeft: '35px',
              borderLeft: '#EC645B 5px solid',
              paddingLeft: '5px',
              // display: "inline-block"
            }}>
              Playlists
            </h2>
          <Button style={{
            marginLeft: 'auto',
            padding: "0px 10px",
            marginRight: '1%',
            color:'#EC645B',
            border: '0px',
          }}
            
            variant="outlined"
            onClick={handleClickOpen}><AddIcon/>Create</Button>
        </div>
        <Divider variant="inset" />
        <Grid item xs={6} >
          <ThemeProvider theme={customDarkTheme}>
            <Box

              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                
              }}
            >
              {playlists.length > 0 ? playlists.map((playlist, index) => (
                <Item key={index} >
                  <p onClick={() => navigate(playlist._id)}>{playlist.playlistName}</p>
                </Item>
              )) : 
                <Typography sx ={{ color: 'white', marginLeft: 'auto'}}>No Playlists Found!</Typography>
              
            }
            </Box>
          </ThemeProvider>
        </Grid>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Playlist</DialogTitle>
          <DialogContent>
            
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Playlist Name*"
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
              id="desc"
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
            <Button onClick={handleAdd}>Add</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>
  )
}