import React,{useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import { useNavigate} from 'react-router-dom';
import { Typography, Box, Button, Link, Card, CardContent, Divider,List, ListItem } from '@mui/material';
import Navbar from './Navbar';

//Interface to define the Type of each Session
interface Session {
    _id: string;
    ownerId: string;
    name: string;
    description: string;
}

// React Component to display the all the available Global Sessions
const AllSessions: React.FC=() => {
   // using navigate to redirect to different pages and state to define the state of all the sessions.
    const navigate = useNavigate();
    const[sessions, setSessions] =useState<Session[]>([]);
    // function to fetch the data from the api and then setting the session with the response
    const fetchData =async() =>{
        try{
            const response = await fetch(`http://localhost:3001/api/collaborative-spaces/`);
            const response_data = await response.json();
            setSessions(response_data);
        }catch(err){
            console.error('Error fetching Sessions',err);
        }
    };

    fetchData();
    // function to handle the click on each session.
    const handleSpaceClick = (sessionId: string) => {
        navigate(`/sessions/${sessionId}`);
      };

    // const handleNavigatetoHome = () => {
    //     navigate('/home');
    //   };
     // function to handle the back button action
      const handleGoBack =() => {
         navigate(-1);
      };


     // return statement in JSX format using material UI Components and exporting the function
      return (
        <>
        <Navbar/>
        <Box sx={{ padding: 2, backgroundColor: '#2B2628', color: '#000000', minHeight: '100vh' ,width: 'calc(100% - 300px)',marginLeft: '300px', marginTop: '74px'}}>
          
          <Button variant="outlined" onClick={handleGoBack} sx={{ position: 'absolute', top: 10, left: 10, color: '#1976D2' }}>
        Back
      </Button>
          <Typography variant="h4" sx={{ marginBottom: 2, color: '#FFFFFF' }}>
            All Sessions
          </Typography>
          {/* <Searchbar /> */}
    
          {/* List of All Sessions */}
          <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1,color: 'white' }}>
            Sessions Available
          </Typography>
          <List>
            {sessions.map((session) => (
              <Card key={session._id} sx={{ marginBottom: 1, backgroundColor: '#E3F2FD' }}>
                <CardContent>
                  <Typography variant="subtitle1">{session.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {session.description}
                  </Typography>
                  <Link
                    component="button"
                    variant="body1"
                    onClick={() => handleSpaceClick(session._id)}
                    sx={{ color: '#1976D2' }}
                  >
                    View Details
                  </Link>
                </CardContent>
              </Card>
            ))}
          </List>
        </Box>
        </>
      );

};

export default AllSessions;