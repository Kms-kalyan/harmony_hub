// Searchbar.tsx
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import '../App.css';
import Button from '@mui/material/Button';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface SongModalProps {
    onClose: () => void;
    title: string;
    artist: string;
    genre: string;
    album: string;
    showModal: boolean;
}

interface YourSongType {
    // Define the properties of your song
    id: number;
    title: string;
    artist: string;
    genre: string;
    album: string;
}

const SongModal: React.FC<SongModalProps> = ({ onClose, title, artist, genre, album, showModal }) => {
    return (
        <div className={`songModal${showModal ? ' show' : ''}`}>
            <div className="songModalContent">
                <span className="songClose" onClick={onClose}>&times;</span>
                <div className="songDetails">
                    {/* Render song details */}
                    <p>Title: {title}</p>
                    <p>Artist: {artist}</p>
                    <p>Genre: {genre}</p>
                    <p>Album: {album}</p>
                    <Button className="playButton" startIcon={<PlayArrowIcon />}>
                        Play
                    </Button>
                </div>
            </div>
        </div>
    );
};

//Styling for Search component
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(0),
        width: 'auto',
    },
}));


//Styling provided for input component
const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

const Searchbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedSong, setSelectedSong] = useState<YourSongType | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleMenuOpen = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleOptionSelect = (option: any) => {
        setSelectedOption(option);
        handleMenuClose();
    };

    const handleItemClick = async (sessionOrSong: any) => {
        // Redirect to te particular session page
       if(selectedOption === 'session'){
            window.location.href = `http://localhost:3000/sessions/${sessionOrSong}`;
        }else{
           const songDetails = await axios.get(`http://localhost:3001/api/songs/${sessionOrSong}`);
           setSelectedSong(songDetails.data);
           setIsModalOpen(true)
            //window.location.href = `http://localhost:3000/home`;
        }

       setSearchText('');
       setSearchResults([]);
    };

    const handleCloseModal = () => {
        // Close the modal and reset the selected song
        setIsModalOpen(false);
        setSelectedSong(null);
    };

    const handleSearchTextChange = (event: any) => {
        setSearchText(event.target.value);
    };

    const handleSearch = async () => {
        setSearchResults([]);
        if (selectedOption === 'song') {
            // Song search logic
            const response = await axios.get('http://localhost:3001/api/songs/');
            const songs = response.data;

            if (searchText !== '') {
                const filteredSongs = songs.filter((song: { title: any }) =>
                    song.title.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filteredSongs);
            }
        } else {
            //Search logic for sessions
            const response = await axios.get('http://localhost:3001/api/collaborative-spaces/');
            const sessions = response.data;

            if (searchText !== '') {
                const filteredSessions = sessions.filter((session: { name: any }) =>
                    session.name.toLowerCase().includes(searchText.toLowerCase())
                );
                setSearchResults(filteredSessions);
            }
        }
    };

    return (
        <div>
            <Search>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    onClick={handleMenuOpen}
                    onChange={handleSearchTextChange}
                    value={searchText}
                />
                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                    <MenuItem onClick={() => handleOptionSelect('song')}>Song</MenuItem>
                    <MenuItem onClick={() => handleOptionSelect('session')}>Session</MenuItem>
                </Menu>
            </Search>
            {searchResults.length > 0 && (
                <div style={{ position: 'absolute', zIndex: 1, width: '100%' }}>
                    <ul
                        style={{
                            color: 'white',
                            listStyleType: 'none',
                            padding: 0,
                            margin: 0,
                            backgroundColor: '#2B2628',
                            border: '1px solid black',
                            borderRadius: '4px',
                        }}
                    >
                        {searchResults.map((session: any) => (
                            <li
                                className='searchList'
                                key={session._id}
                                onClick={() => handleItemClick(session._id)}
                            >
                                {session.title || session.name}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <IconButton color="inherit" onClick={handleSearch} style={{ position: 'absolute', left: '0', top: '0' }}>
                <SearchIcon />
            </IconButton>

            {selectedSong && (
                <SongModal
                    onClose={handleCloseModal}
                    showModal={isModalOpen}
                    // Pass song details to the modal
                    title={selectedSong.title}
                    artist={selectedSong.artist}
                    genre={selectedSong.genre}
                    album={selectedSong.album}
                />
            )}
        </div>
    );
};

export default Searchbar;
