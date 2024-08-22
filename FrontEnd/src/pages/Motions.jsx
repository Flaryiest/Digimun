import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react"
import {Box, TextField, Autocomplete, Button, Divider, Card, CardContent, Typography, Paper, Chip} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import PersonIcon from '@mui/icons-material/Person'
import DescriptionIcon from '@mui/icons-material/Description'

const MotionCard = ({ motion, rerenderFunction }) => {
    const navigate = useNavigate()
    const params = useParams()
    const [motionInfo, setMotionInfo] = useState(motion)
    async function deleteMotion() {
        const response = await fetch("http://localhost:3000/api/committee/motion", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({motionID: motionInfo.id})
        })
        if (response.status == 200) {
            rerenderFunction()
        }
        else {
            console.log("delete failed")
        }
    }

    async function openMotion() {
        const response = await fetch("http://localhost:3000/api/committee/caucus", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({motion: motionInfo})
        })
        const caucus = await response.json()
        if (response.status == 200) {
            if (["open_unmoderated_caucus","extend_unmoderated_caucus"].includes(caucus.motionType)) {
                navigate("/committees/" + params.committeeID + "/unmod")
            }
            else {
                const path = "/committees/" + params.committeeID + "/mod/" + motionInfo.code
                navigate(path)
            }
            
        }
        else {
            console.log("opening motion failed")
        }        
    }

    if (['open_unmoderated_caucus', 'extend_unmoderated_caucus'].includes(motion.motionType)) {
        return (
            <Card sx={{ mt: 2, mb: 2 }} key={motion.id}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {motion.text ||  String(motion.time / 60) + ' min unmoderated caucus'}
                </Typography>
                <Chip
                  variant="outlined"
                  label={"Proposer: " + motion.country}
                  sx={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    borderRadius: '4px',
                  }}>
                  
                </Chip>
              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ borderColor: 'red', color: 'red' }}
                  onClick={deleteMotion}>
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ borderColor: 'green', color: 'green' }}
                  onClick={openMotion}>
                  Open
                </Button>
              </Box>
            </Card>
          )
    }
    else {
        {console.log(motion)}
        return (<Card sx={{ mt: 2, mb: 2 }} key={motion.id}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {String(motion.time / 60) + ' min moderated caucus'}
                </Typography>
                <Chip
                  variant="outlined"
                  label={"Proposer: " + motion.country}
                  sx={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    borderRadius: '4px',
                  }}>
                </Chip>
                <Chip
                  variant="outlined"
                  label={"Topic: " + motion.text}
                  sx={{
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    borderRadius: '4px',
                    marginLeft: '16px',
                  }}>
                </Chip>

              </CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px' }}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{ borderColor: 'red', color: 'red' }}
                  onClick={deleteMotion}>
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  sx={{ borderColor: 'green', color: 'green' }}
                  onClick={openMotion}>
                  Open
                </Button>
              </Box>
            </Card>
        )
    }

}


function Motions() {
    const [motions, setMotions] = useState([])
    const [motionTypes, setMotionTypes] = useState([])
    const [selectedMotion, setSelectedMotion] = useState(null)
    const [selectedCountry, setSelectedCountry] = useState(null)
    const [selectedName, setSelectedName] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [selectedSpeakingTime, setSelectedSpeakingTime] = useState("")
    const [showNameField, setShowNameField] = useState(false)
    const [countries, setCountries] = useState([])
    const [profiles, setProfiles] = useState([])
    const [rerender, setRerender] = useState(0)
    const params = useParams()
    console.log(motions)
    useEffect(() => {
        getCountriesInCommittee()
        getMotionTypes()
        getMotions()
    }, [rerender])

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

    async function createMotion(profileID, motionType, name, time, country, speakingTime) {
        const response = await fetch("http://localhost:3000/api/committee/motion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID, profileID: profileID, motionType: motionType, name: name, time: time, country: country, speakingTime: speakingTime})
        })
        if (response.status == 200) {
            setSelectedMotion(null)
            setSelectedCountry(null)
            setSelectedName("")
            setSelectedTime("")
            setSelectedSpeakingTime("")
            setShowNameField(false)
            triggerRerender()

        }
        else {
            console.log("motion creation failed")
        }
    }

    function triggerRerender() {
        setRerender(prevState => prevState + 1)
    }

    const handleSubmit = (e) => {
        console.log(selectedMotion, selectedCountry, selectedTime, selectedName)
        const proposer = profiles.filter((profile) => {
            return profile.country == selectedCountry
        })
        const profileID = proposer[0].id
        createMotion(profileID, selectedMotion.toLowerCase().replace(/ /g, '_'), selectedName, selectedTime, proposer[0].country, selectedSpeakingTime)
    }


    return (
        <Box sx={{ width: '50%', minWidth: "300px", margin: '0 auto', padding: '20px', marginTop: '10dvh'}}>
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
                label="Topic"
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

        {showNameField && <TextField
            label="Speaking Time"
            value = {selectedSpeakingTime}
            onChange={(event, newValue) => setSelectedSpeakingTime(event.target.value)}
            fullWidth
            InputProps={{
                endAdornment: (
                  <AccessTimeIcon />
                )}} 
            sx={{ mt: 2 }}/>}

        <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}>
            Create
        </Button>
    
        <Divider sx={{ mt: 4, mb: 2 }} />
        <Button
            variant="outlined"
            color="error"
            sx={{ borderColor: 'red', color: 'red' }}>
            Clear
        </Button> 
        <div>
            {motions.map(motion => (
                <MotionCard motion={motion} rerenderFunction={triggerRerender} key={motion.id} />
            ))}
        </div>
        </Box>
        
      )
}


export default Motions