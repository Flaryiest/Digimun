import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Menu, MenuItem, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function CommitteeNavBar() {
    const navigate = useNavigate()
    const { committeeID } = useParams()
    const [anchorEl, setAnchorEl] = useState(null)
    const [mods, setMods] = useState([])
    const [rerender, setRerender] = useState(0)

    useEffect(() => {
        getMods()
    }, [rerender])

    function triggerRerender() {
        setRerender(prevState => prevState + 1)
    }

    async function getMods() {
        const response = await fetch("http://localhost:3000/api/committee/mods", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: committeeID})
        })
        if (response.status == 200) {
            const caucuses = await response.json()
            setMods(caucuses)
        }
        else {
            console.log("Get Mods Failed")
        }
    }

    async function deleteMod(modID) {
        const response = await fetch("http://localhost:3000/api/committee/mod", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({modID: modID})
        })
        if (response.status == 200) {
            triggerRerender()
        }
        else {
            console.log("delete mod failed")
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
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
    
    console.log(mods, "mods")
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
                            onClose={handleClose}>
                        {mods.map((mod) => (
                            <MenuItem key={mod.id} onClick={handleClose}>
                                <Link
                                    to={`/committees/${committeeID}/mod/${mod.code}`}
                                    style={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }}>
                                {mod.text}
                                </Link>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    color="error"
                                    onClick={() => deleteMod(mod.id)}
                                    size="small">
                                    <DeleteIcon/>
                                </IconButton>
                            </MenuItem>
                        ))}
                        </Menu>
                        {/* <Link to={`/committees/${committeeID}/chats`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Chats
                            </Button>
                        </Link>
                        <Link to={`/committees/${committeeID}/working-papers`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Button color="inherit" sx={buttonStyles}>
                                Working Papers
                            </Button>
                        </Link> */}
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