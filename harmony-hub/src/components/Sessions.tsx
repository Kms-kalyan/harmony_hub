import React,{useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, Button, Link, Card, CardContent,List, Dialog,DialogTitle,DialogContent,TextField,DialogActions  } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './Navbar';

//Interface to define the Type of each Session retrieved
interface Session {
    _id: string;
    ownerId: string;
    name: string;
    description: string;
}
//function to define the all the global sessions available
const SessionsPage: React.FC =() => {
    //using navigate to redirect and state variables
    const navigate = useNavigate();
    const[sessions, setSessions] =useState<Session[]>([]);
    const[openDialog,setOpenDialog] = useState(false);
    const[newSession,setNewSession] = useState({name:'',description:''});
    const[validationErrors, setValidationErrors] = useState<{name: string; description: string}>({
        name: '',
        description: '',
    });
    //const userId = '655d208bfde3756f72ed4d22';
    //getting the userId from local storage
    const userId = localStorage.getItem('userID');

   // use effect Hook to make the data render when the page loads
    useEffect(()=>{

        const fetchData =async () => {
            try{
                //console.log(`http://localhost:3001/api/collaborative-spaces/?ownerId={userId}`)
                const response = await fetch(`http://localhost:3001/api/collaborative-spaces/?ownerId=${userId}`);
                const response_data = await response.json();
                setSessions(response_data);
                //console.log(response_data);
                //console.log(typeof sessions);
            } catch(err){
                console.error('Error fetching Sessions',err);
            }
        };
        fetchData();
    },[]);

   // funciton to handle the events.
    const handleSpaceClick = (sessionId: string) =>{
        navigate(`/sessions/${sessionId}`);
    };

    const handleShowAllSessions = () =>{
        navigate('/sessions/all');
    };

    // const handleNavigatetoHome = () =>{
    //     navigate('/home');
    // };

    const handleOpenDialog =() =>{
        setNewSession({ name: '', description: '' });
        setOpenDialog(true);
    };

    const handleCloseDialog =() =>{
        setOpenDialog(false);
        setNewSession({ name: '', description: '' });
        setValidationErrors({ name: '', description: '' });

    };
   // function to display a new card to create a session by using a post method.
    const handleCreateSession = async() =>{
        if(!newSession.name.trim()){
            setValidationErrors((prevErrors) => ({ ...prevErrors, name: 'Session name cannot be empty' }));
            return;
        }
        if (!newSession.description.trim()) {
            setValidationErrors((prevErrors) => ({ ...prevErrors, description: 'Session description cannot be empty' }));
            return;
          }
        
        setValidationErrors({ name: '', description: '' });

        try{
            const response = await fetch(`http://localhost:3001/api/collaborative-spaces`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ownerId: userId,
                    name: newSession.name,
                    description: newSession.description
                }),
            });

            if(response.ok){
                const newSessionData = await response.json();

                setSessions((prevSessions)=>[...prevSessions, newSessionData]);
                handleCloseDialog();
            }else{
                console.error('Error Creating session:', response.statusText);
            }

        }catch(err){
            console.error('Error Creating Session');
        }
    };


    //return statement in JSX format and Material UI
    return(
        <>
        <Navbar/>
        <Box sx = {{padding:2, backgroundColor: '#121212', color: '#000000', minHeight: '100vh', width: 'calc(100% - 300px)',marginLeft: '300px', marginTop: '74px', }}>

            {/* <Button variant='outlined' onClick={handleNavigatetoHome} sx={{position: 'absolute', top:10, right:10,color:'#1976D2'}}> Home</Button> */}
            <Typography variant='h4' sx={{marginBottom:2, color: '#FFFFFF'}}>
                Sessions
            </Typography>

            {/* List of Sessions */}
            <Typography variant='h6' sx={{marginTop:2,marginBottom:1, color: '#FFFFFF'}}>
                List of Sessions You're Part Of
            </Typography>
            <List>
            {sessions.map((session) => (
          <Card key={session._id} sx={{ marginBottom: 1,backgroundColor: '#E3F2FD'  }}>
            <CardContent>
              <Typography variant="subtitle1">{session.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {session.description}
              </Typography>
              <Link
                component="button"
                variant="body1"
                onClick={() => handleSpaceClick(session._id)} sx={{ color: '#1976D2' }}
              >
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
            </List>

            <Box sx={{ float:'right', marginTop: '18px'}}>
                <Button variant="outlined" sx={{color:'#de6154', borderColor: '#de6154'}} onClick={handleOpenDialog} startIcon={<AddIcon />}>
                    Add Session
                </Button>
            </Box>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Create New Session</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="dense" id="name" label="Session Name" type="text" fullWidth value={newSession.name}
                    onChange={(e) => setNewSession({ ...newSession, name: e.target.value })} error={Boolean(validationErrors.name)} helperText={validationErrors.name}/>
                    <TextField margin="dense" id="description" label="Session Description" type="text" fullWidth value={newSession.description}
                    onChange={(e) => setNewSession({ ...newSession, description: e.target.value })} error={Boolean(validationErrors.description)} helperText={validationErrors.description}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary"> Cancel</Button>
                    <Button onClick={handleCreateSession} color="primary"> Create</Button>
                </DialogActions>
        
            </Dialog>

            <Box sx={{marginTop:2}}>
                <Button variant='outlined' onClick={handleShowAllSessions}  sx={{ color: '#de6154', borderColor: '#de6154' }}>
                    Show All Sessions
                </Button>
            </Box>

        </Box>
        </>
    );
};


export default SessionsPage;