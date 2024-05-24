
  // The Navbar component serves as the navigation bar for the application, providing a menu with links to different sections.
// Importing necessary dependencies and components

import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import HomeIcon from '@mui/icons-material/Home';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Logout from './Logout';
import Searchbar from './Searchbar';
import '../App.css';
import { useTranslation } from 'react-i18next';

// Width of the drawer
const drawerWidth = 300;
// Menu items and corresponding icons
const drawerMenu = ['Home', 'Playlists', 'Create Playlist', 'Sessions', 'Create Sessions'];
const drawerIcons = [<HomeIcon />, <PlaylistPlayIcon />, <AddIcon />, <SpaceDashboardIcon />, <AddIcon />];


// Main Navbar component
export default function Navbar() {
  // Translation hook for internationalization
  const { t } = useTranslation('common');
  // State and handler for user menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const userName = localStorage.getItem('userName');


  // Handler for opening the user menu

  const handleMenu = (event:any) => {
    setAnchorEl(event.currentTarget);
  };

  // Handler for closing the user menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClose = () => {
        setAnchorEl(null);
       window.location.href = `http://localhost:3000/Account`;
    };

  return (
      <div>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          {/*top navbar*/ }
          <AppBar sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar sx={{ backgroundColor: '#2B2628' }}>
              <Typography variant="h6" noWrap component="div">
              {t('title')}
              </Typography>
                 <div style={{ position:"absolute",  marginLeft: '200px', marginRight: 'auto' }}>
                    <Searchbar />
                  </div>
                <div style={{ marginLeft: 'auto', marginRight: '50px' }}>
                  <IconButton
                      size="large"
                      edge="end"
                      color="inherit"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      sx={{ color: '#EC645B', marginLeft: 'auto' }}
                  >

                    <AccountCircleIcon />
                      <p style={{paddingLeft:'5px'}}>{userName}</p>
                  </IconButton>
                  <Menu className='menuClass'
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={open}
                      onClose={handleClose}
                  >
                      <div className='myMenuBtn'>
                      <MenuItem onClick={handleProfileClose}>My Profile</MenuItem>
                      </div>
                      <div className='myMenuBtn'>
                          <Logout onLogout={handleClose}/>
                      </div>
                  </Menu>
            </div>
            </Toolbar>
          </AppBar>
          {/*Side bar*/ }
          <Drawer
              sx={{
                width: drawerWidth,
                flexShrink: 0,

                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
              variant="permanent"
              anchor="left"
          >
            <Toolbar />
            <Divider />
            {/*using map to display the menuitems in the sidebar*/ }
            <List>
              {drawerMenu.map((text, index) => (
                  <ListItem key={text} disablePadding>
                    <ListItemButton sx={{color:'white'}} component={Link} to={`/${text}`}>
                      <ListItemIcon sx={{color:'white'}}>{drawerIcons[index]}</ListItemIcon>
                      <ListItemText primary={t(text)} />
                    </ListItemButton>
                  </ListItem>
              ))}
            </List>
          </Drawer>
        </Box>
        <Outlet />
      </div>

  );
}
