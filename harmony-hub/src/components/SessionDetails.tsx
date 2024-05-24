import React,{useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import { useNavigate, useParams} from 'react-router-dom';
import { Typography, Box, Button, Link, Card, CardContent, Divider,List, ListItem } from '@mui/material';
import Navbar from './Navbar';


interface Session {
    _id: string;
    ownerId: string;
    name: string;
    description: string;
     
}


// const SessionDetails: React.FC=() => {
//     const {id} = useParams();
//     const navigate = useNavigate();
    
//     const[session, setSession] =useState<Session | null>(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(()=>{
//         const fetchData = async() => {
//             try{
//                 const response = await fetch(`http://localhost:3001/api/collaborative-spaces/${id}`);
//                 const response_data = await response.json();
//                 setSession(response_data);
                
//             } catch(err){
//                 console.error('Error fetching Sessions',err);
//             }finally{
//                 setLoading(false);
                

//             }
//     };
//     if(id){
//         console.log(id);
//         fetchData();

//     }

//     },[]);

//     const handleNavigatetoHome = () => {
//         navigate('/home');
//       };

//       const handleGoBack =() => {
//          navigate(-1);
//       };

    
//     if(loading){
//         return <div>Loading...</div>;
//     }

//     else{
        
//         return(
//             <Box sx={{ padding: 2, backgroundColor: '#FFFFFF', color: '#000000', minHeight: '100vh' }}>
//                 <Button variant="outlined" onClick={handleNavigatetoHome} sx={{ position: 'absolute', top: 10, right: 10, color: '#1976D2' }}>
//                 Home
//                 </Button>
//                 <Button variant="outlined" onClick={handleGoBack} sx={{ position: 'absolute', top: 10, left: 10, color: '#1976D2' }}>
//                 Back
//                 </Button>
//                 <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
//                  Session Details
//               </Typography>
//               {/* <Typography variant="subtitle1">Session ID: {sessionId}</Typography>
//               <Typography variant="body2" color="textSecondary">
//             {session.description}
//           </Typography> */}
//             <Card sx={{ backgroundColor: '#E3F2FD' }}></Card>
//             <CardContent>
//             <Typography variant="h5">{session.name}</Typography>
//             <Typography variant="body1">
//                         {session.description}</Typography>

//             </CardContent>
//             </Box>
    
//     );

//     }


    

// };

const SessionDetails: React.FC=() =>{
    const {sessionId} = useParams();
    const navigate = useNavigate();
    const[sessions, setSessions] =useState<Session[]>([]);
    

    const fetchData = async() =>{
        try{
            const response = await fetch(`http://localhost:3001/api/collaborative-spaces/${sessionId}`);
            console.log(sessionId);
            const response_data = await response.json();
            setSessions(response_data);
        }catch(err){
            console.error('Error fetching Sessions',err);
        }
    };

    useEffect(()=>{
        fetchData();

    },[]);


    const handleNavigatetoHome = () => {
        navigate('/home');
      };

      const handleGoBack =() => {
         navigate(-1);
      };


    console.log(sessions[0]);
    return (
    <>
    <Navbar/>
    <Box sx={{ padding: 2, backgroundColor: '#2B2628', color: '#000000', minHeight: '100vh', width: 'calc(100% - 300px)',marginLeft: '300px', marginTop: '74px', }}>
    {/* <Button variant="outlined" onClick={handleNavigatetoHome} sx={{ position: 'absolute', top: 10, right: 10, color: '#1976D2' }}>
      Home
    </Button>
    <Button variant="outlined" onClick={handleGoBack} sx={{ position: 'absolute', top: 10, left: 10, color: '#1976D2' }}>
  Back
</Button> */}
    <Typography variant="h4" sx={{ marginBottom: 2, color: '#FFFFFF' }}>
      {sessions[0]?.name}
    </Typography>
    

    {/* List of All Sessions */}
    {/* <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
      Sessions Available
    </Typography> */}
    <List>
      {sessions.map((session) => (
        <Card key={session._id} sx={{ marginBottom: 1, backgroundColor: '#E3F2FD' }}>
          <CardContent>
            <Typography variant="subtitle1">{session.name}</Typography>
            <Typography variant="body2" color="textSecondary">
              {session.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </List>
    
  </Box>
  </>
);
}

export default SessionDetails;





