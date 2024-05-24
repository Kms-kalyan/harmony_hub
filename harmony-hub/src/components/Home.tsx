import React, {useState} from 'react';
import Navbar from './Navbar';
import SongCard from './SongCard';
import { displayPartsToString } from 'typescript';


// Interface to define the Type of the each Song.
interface Song{
    _id:string;
    title:string;
    artist:string;
    genre:string;
    album:string;
}

//function to define the Home Page
export default function Home(){
    //definig the type of the song
    const backgroundColor = '#2B2628';
    const[songs,setSongs] = useState<Song[]>([]);
   // defining the function to get all the songs.
    const fetchData = async() => {
        try{
            const response = await fetch(`http://localhost:3001/api/songs`);
            const response_data = await response.json();
            setSongs(response_data);
        }catch(err){
            console.error('Error fetching Sessions');
        }
    };

    fetchData();
    
    // defining the card style of the song
    const songCards = songs.map((song) => (
        <SongCard title={song.title} />
    ));
    // defining the CSS properties for the card
    const cardCss : React.CSSProperties = {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '30px',
        flexWrap: 'wrap',
        marginTop: '60px'
        // Add more styles as needed
    };
    //return statement in JSX format.
    return (
        <div style={{
            backgroundColor: `${backgroundColor}`, 
            height: '100vh', 
            overflowX: "hidden",
            width: 'calc(100% - 300px)',
             marginLeft: '300px'
            }}>
            <Navbar/>
            <div style={cardCss}>
                {songCards}
            </div>
        </div>
    )
}














