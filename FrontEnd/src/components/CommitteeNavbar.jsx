import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';


function CommitteeNavBar() {
    const theme = useTheme();
    const navigate = useNavigate()
    const { committeeID } = useParams();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = async () => {
        const response = await fetch("http://localhost:3000/api/logOut", {
            method: "GET",
            credentials: "include"
        })
        navigate("/")
    }

    const buttonStyles = {
        border: '1px solid rgba(0, 0, 0, 0.1)', 
        borderRadius: '4px',
        margin: '5px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="sticky"
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                }}
            >
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                            Digimun
                        </Link>
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}
                    >
                        <Link to={`/committees/${committeeID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Committee
                            </Button>
                        </Link>
                        <Link to={`/committees/${committeeID}/setup`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Setup
                            </Button>
                        </Link>
                        <Link to={`/committees/${committeeID}/motions`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Motions
                            </Button>
                        </Link>
                        <Link to={`/committees/${committeeID}/unmod`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Unmod
                            </Button>
                        </Link>
                        <Button color="inherit" onClick={handleClick} sx={buttonStyles}>
                            Mod
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                                <Link to={`/committees/${committeeID}/mod/page1`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Mod Page 1
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to={`/committees/${committeeID}/mod/page2`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Mod Page 2
                                </Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <Link to={`/committees/${committeeID}/mod/page3`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    Mod Page 3
                                </Link>
                            </MenuItem>
                        </Menu>
                        <Link to={`/committees/${committeeID}/chats`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Chats
                            </Button>
                        </Link>
                        <Link to={`/committees/${committeeID}/working-papers`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Working Papers
                            </Button>
                        </Link>
                        <Button color="inherit" onClick={handleLogout} sx={buttonStyles}>
                            Log Out
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default CommitteeNavBar;