import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef, createContext, useContext } from 'react'
import React from 'react'
import { Box, Card, Button, Typography, Autocomplete, TextField } from '@mui/material'
import Timer from "../components/Timer"
function Mod() {
    const { committeeID, modID } = useParams()
    const [countries, setCountries] = useState(null)
    const [modInfo, setModInfo] = useState(null)
    const [queue, setQueue] = useState([])
    const [speaking, setSpeaking] = useState(null)
    const [selectionValue, setSelectionValue] = useState(null)
    const selectionRef = useRef(null)
    useEffect(() => {   
        getModInfo()
        getCountriesInCommittee()
        console.log("rerendering")
    }, [modID])

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

    async function getCountriesInCommittee() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: committeeID})
        })
        const committee = await response.json()
        const profilesWithCountry = committee.profiles.filter((profile) => profile.country != null)
        profilesWithCountry.sort()
        const countries = profilesWithCountry.map((profile => profile.country))
        countries.sort()
        setCountries(countries)
    }


    async function addToQueue(country) {
        if (!(queue.includes(country))) {
            setQueue([...queue, country])
            const response = await fetch("http://localhost:3000/api/committee/mod/add", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({modID: modID, committeeID: committeeID, country: country, })
            })

            if (response.status == 200) {
                console.log(response)
            }
            else {
                console.log("failed to add to queue")
            }
        }
    }

    async function addToSpeaking() {
        if (queue) {
            setSpeaking(queue[0])
            queue.splice(0, 1)
        }
    }

    console.log(queue)
    console.log(modInfo, "modinfo", countries, "countries")
    if (modInfo && countries) {
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
                <Typography variant="h5">
                    {modInfo.text}
                </Typography>
              </Card>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                width: '60%',
                padding: '20px',
                gap: '10%', 
                boxSizing: 'border-box',
              }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '10px', width: '50%', height: '100%'}}>
                    <Card sx={{ padding: '10px' }}>
                        <Typography variant="h6">Now Speaking</Typography>
                        <Box>
                            {speaking}
                        </Box>
                    </Card>
                    <Card sx={{ padding: '10px', position: 'relative' }}>
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                        <Typography variant="h6" sx={{}}>Queue</Typography>
                        <Button 
                        variant="contained" 
                        color="primary" 
                        sx={{ position: 'absolute', top: '10px', right: '10px' }}
                        onClick={addToSpeaking}>
                        Next
                        </Button>
                    </Box>
                    {queue.map((country) => {
                        return <Box>
                            {country}
                        </Box>
                    })}
                  </Card>
                  <Card sx={{ padding: '10px' }}>
                    <Autocomplete
                      options={countries}
                      value={selectionValue}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Speaker" variant="outlined" inputRef={selectionRef} />
                      )}
                      onChange={(event, value) => {
                        addToQueue(value)
                        setSelectionValue(null)
                        if (selectionRef.current) {
                            selectionRef.current.blur()
                        }
                      }}

                    />
                  </Card>
                </Box>
                
                    <Box sx={{ display: 'flex', gap: '16px', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                        <Timer totalTime={modInfo.speakingTime} currentTime={modInfo.speakingTime} label={"Speaker Timer"} />
                        <Timer totalTime={modInfo.totalTime} currentTime={modInfo.time} label={"Caucus Timer"} />    
                    </Box>
                </Box>
            </Box>
          )
    }
}

export default Mod