import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"
import {Box, TextField, Autocomplete, Button, Divider, Card, CardContent, Typography, Paper} from '@mui/material';
  import AccessTimeIcon from '@mui/icons-material/AccessTime'
  import PersonIcon from '@mui/icons-material/Person'
  import DescriptionIcon from '@mui/icons-material/Description'
function Motions() {
    const [motions, setMotions] = useState([])
    const [motionTypes, setMotionTypes] = useState([])
    const [selectedMotion, setSelectedMotion] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedName, setSelectedName] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [showNameField, setShowNameField] = useState(false)
    const [countries, setCountries] = useState([])
    const [profiles, setProfiles] = useState([])
    const params = useParams()

    useEffect(() => {
        getCountriesInCommittee()
        getMotionTypes()
        getMotions()
    }, [])

    useEffect(() => {
        if (["Open Moderated Caucus", "Extend Moderated Caucus"].includes(selectedMotion)) {
            setShowNameField(true)
        }
        else {
            setShowNameField(false)
        }
    }, [selectedMotion])

    async function getCountriesInCommittee() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const committee = await response.json()
        const profilesWithCountry = committee.profiles.filter((profile) => profile.country != null)
        profilesWithCountry.sort()
        const countries = profilesWithCountry.map((profile => profile.country))
        countries.sort()
        setProfiles(profilesWithCountry)
        setCountries(countries)
    }

    async function getMotionTypes() {
        const response = await fetch("http://localhost:3000/api/committee/motionTypes", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        const motionEnums = await response.json()
        const motionTypes = motionEnums.map((motionEnum ) => {return motionEnum.replace(/_/g, " ").replace(
            /\w\S*/g, text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase())
        })
        setMotionTypes(motionTypes)
    }

    async function getMotions() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const committee = await response.json()
        setMotions(committee.Motion)
    }

    async function createMotion(profileID, motionType, name, time) {
        const response = await fetch("http://localhost:3000/api/committee/motion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, profileID: profileID, motionType: motionType, name: name, time: time})
        })
        if (response.status == 200) {
            setSelectedMotion(null)
            setSelectedCountry(null)
            setSelectedName("")
            setSelectedTime("")
            showNameField(false)
        }
        else {
            console.log("motion creation failed")
        }
    }

    const handleSubmit = (e) => {
        console.log(selectedMotion, selectedCountry, selectedTime, selectedName)
        const proposer = profiles.filter((profile) => {
            return profile.country == selectedCountry
        })
        const profileID = proposer[0].id
        createMotion(profileID, selectedMotion.toLowerCase().replace(/ /g, '_'), selectedName, selectedTime)
    }


    return (
        <Box sx={{ width: '60%', margin: '0 auto', padding: '20px', marginTop: '10dvh'}}>
            <Autocomplete
                options = {motionTypes}
                value = {selectedMotion}
                onChange={(event, newValue) => setSelectedMotion(newValue)}
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

            {showNameField && <TextField
                label="Name"
                value = {selectedName}
                onChange={(event, newValue) => setSelectedName(event.target.value)}
                fullWidth
                sx={{ mt: 2 }}/>}
                
          <Autocomplete
            options={countries}
            value = {selectedCountry}
            onChange={(event, newValue) => setSelectedCountry(newValue)}
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
            value = {selectedTime}
            onChange={(event, newValue) => setSelectedTime(event.target.value)}
            fullWidth
            InputProps={{
              endAdornment: (
                <AccessTimeIcon />
              )}} 
            sx={{ mt: 2 }}/>
          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
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