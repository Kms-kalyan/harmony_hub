import React from 'react';
import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import image from '../img.png';
interface SongCardProps {
    title: string;
}

const SongCard: React.FC<SongCardProps> = ({ title }) => {
    return (
    <Card sx={{ maxWidth: 400, margin: '10px', maxHeight: 250 }}>
       
      <CardMedia
        sx={{ height: 140 }}
        //image="https://static.mirchi.in/thumb/imgsize-64850,msid-104742539,width-800,height-450,resizemode-1,webp-1/104742539.jpg"
        image={image}
        title={title}
        
      />
      {/*<IconButton
        aria-label="play"
        style={{ position: 'absolute', transform: 'translate(-50%, -150%)', opacity: '1.5' }}
        >
            <PlayCircleOutlineIcon fontSize="large" />
        </IconButton>*/}
      <CardContent sx={{backgroundColor: '#555555',height:'200px', width:'150px'}}>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
       </CardContent>
    </Card>
    )
}

export default SongCard;