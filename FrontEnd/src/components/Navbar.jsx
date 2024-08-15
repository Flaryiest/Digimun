import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import {Link} from "react-router-dom"

function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky" sx={{backgroundColor: "white",
        color: "black",
        }}>
        <Toolbar>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Digimun
          </Typography>
          <Link to="/onboard"><Button color="inherit">Login</Button></Link>
          <Link to="/onboard"><Button color="inherit">Sign Up</Button></Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default NavBar