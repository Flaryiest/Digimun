import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"
import {Box, TextField, Autocomplete, Button, Divider, Card, CardContent, Typography, Paper} from '@mui/material';
  import AccessTimeIcon from '@mui/icons-material/AccessTime'
  import PersonIcon from '@mui/icons-material/Person'
  import DescriptionIcon from '@mui/icons-material/Description'
  import DeleteIcon from '@mui/icons-material/Delete'
  import OpenInNewIcon from '@mui/icons-material/OpenInNew'

function Motions() {
    const [motions, setMotions] = useState([])
    const [countries, setCountries] = useState([])
    
    return (
        <Box sx={{ width: '60%', margin: '0 auto', padding: '20px', marginTop: '10dvh'}}>
          <Autocomplete
            options={['Option 1', 'Option 2', 'Option 3']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      <DescriptionIcon />
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}/>
            )}/>
    
          <Autocomplete
            options={['Proposer 1', 'Proposer 2', 'Proposer 3']}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Proposer"
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      <PersonIcon />
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}/>
            )}
            sx={{ mt: 2 }}/>
    
          <TextField
            label="Minutes"
            fullWidth
            InputProps={{
              endAdornment: (
                <AccessTimeIcon />
              )}} 
            sx={{ mt: 2 }}/>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}>
            Create
          </Button>
    
          <Divider sx={{ mt: 4, mb: 2 }} />
          <Card sx={{ mt: 2, mb: 2 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                Card Title
              </Typography>
              <Paper
                variant="outlined"
                sx={{
                  padding: '8px',
                  mt: 2,
                  borderRadius: '4px',
                }}>
                Proposer Name:
              </Paper>
            </CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
              <Button
                variant="outlined"
                color="error"
                sx={{ borderColor: 'red', color: 'red' }}>
                Delete
              </Button>
              <Button
                variant="outlined"
                color="success"
                sx={{ borderColor: 'green', color: 'green' }}>
                Open
              </Button>
            </Box>
          </Card>
    
        </Box>
      )
}

export default Motions