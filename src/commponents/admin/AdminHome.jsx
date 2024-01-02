import { Link, Outlet } from "react-router-dom";
import AllMeeting from "./AllMeeting";
import AddService from "./AddService";
import AllServices from "../public/AllServices";
import BusinessDetails from "../public/businessDetails";
import { useContext, useEffect, useState, createContext } from "react";
import { IsAdminContext } from "../../App";
import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

export const CloseContext = createContext(null);
export default function Admin() {


  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const closeContext = { anchorElUser, setAnchorElUser };
  const setAdmin = useContext(IsAdminContext).setIsAdmin;
  useEffect(() => {
    setAdmin(true);
  });

  return (
    <div  >
      <BusinessDetails />
      <br/><br/>
      <AppBar position="static" sx={{ width: '115%', transform: 'translate(-7vw, 0)',backgroundColor: "#77474b" ,  }}>
        <Container maxWidth="xl" >
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => setAnchorElNav(null)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="allMeeting" style={{ color: "white" }}>Meetings</Link>
              </Button>
              <Button
                onClick={() => setAnchorElNav(null)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link to="allServices" style={{ color: "white" }}>Services</Link>
              </Button>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Add Service">
                <IconButton onClick={() => setAnchorElUser(event.currentTarget)} sx={{ p: 2, color: "white" }}>
                  <AddIcon ></AddIcon>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={() => setAnchorElUser(null)}
              >
                <MenuItem >
                  <CloseContext.Provider value={closeContext}>
                    <AddService />
                  </CloseContext.Provider>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{width:'80vw',height:'50vh'}}>
        <Outlet />
      </Box>
    </div>
  );
}
