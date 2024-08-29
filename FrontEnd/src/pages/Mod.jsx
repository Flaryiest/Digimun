import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import React from 'react'
import { Box, Card, Button, Typography, Autocomplete, TextField } from '@mui/material'
import Timer from "../components/Timer"
function Mod() {
    const { committeeID, modID } = useParams()
    const [modInfo, setModInfo] = useState(null)
    useEffect(() => {
        getModInfo()
    }, [])

    async function getModInfo() {
        const response = await fetch("http://localhost:3000/api/committee/mod", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({modID: modID})
        })
        if (response.status == 200) {
            const currentMod = await response.json()
            console.log(currentMod, "current mod")
            setModInfo(currentMod)
        }
        else {
            console.log("retrieving info failed")
        }
    }
    if (modInfo) {
        return (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center', 
              marginTop: '5vh', 
              boxSizing: 'border-box', 
              width: '100%'
            }}>
              <Card sx={{ width: '60%', padding: '20px', marginBottom: '20px' }}>
                <Typography variant="h5">Header</Typography>
              </Card>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '60%',
                padding: '20px',
                gap: '10%', 
                boxSizing: 'border-box',
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between',  gap: '10px', width: '50%'}}>
                  <Card sx={{ padding: '10px' }}>
                    <Typography variant="h6">Now Speaking</Typography>
                  </Card>
                  <Card sx={{ padding: '10px', position: 'relative' }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      sx={{ position: 'absolute', top: '10px', right: '10px' }}>
                      Next
                    </Button>
                    <Typography variant="h6" sx={{ marginTop: '40px' }}>Next Speaking</Typography>
                  </Card>
                  <Card sx={{ padding: '10px' }}>
                    <Autocomplete
                      options={[]}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Speaker" variant="outlined" />
                      )}
                      onChange={(event, value) => {
                      }}
                    />
                  </Card>
                </Box>
                
                <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                  <Timer totalTime={modInfo.totalTime} currentTime={modInfo.time} label={"Caucus Timer"} />
                  <Timer totalTime={modInfo.totalTime} currentTime={modInfo.time} label={"Speaker Timer"} />
                </Box>
              </Box>
            </Box>
          )
    }
}

export default Mod