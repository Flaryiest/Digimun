import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Grid, Card, CardContent, CardActions, Typography, Box, TextField, Button, CardActionArea } from '@mui/material'


const Dashboard = () => {
    const [committees, setCommittees] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        getCommittees()
    }, [])

    async function getCommittees() {
        const response = await fetch("http://localhost:3000/api/committees", {
            method: "GET",
            credentials: "include"
        })
        const committees = await response.json()
        console.log(committees)
        setCommittees(committees)
    }

    const createCommittee = async (event) => {
        const data = handleCreate(event)
        const response = await fetch("http://localhost:3000/api/committees", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: data.name, topic: data.topic, conference: data.conference}),
        })
        if (response.status == 400) {
          console.log("committee creation failed")
        }
    

    }

    const handleCreate = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target.closest('form'))
        const data = Object.fromEntries(formData.entries())
        return data
    }

    return (
        <Grid container spacing={3} style={{ padding: '20px' }}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={3}>
          {committees.map((committee, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card onClick={() => {navigate("/committees/" + committee.code)}}>
                <CardActionArea>
                    <CardContent>
                    <Typography variant="h5" component="div">
                        {committee.name}
                    </Typography>
                    </CardContent>
                    <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary">
                        Topic: {committee.topic || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Conference: {committee.conference || 'N/A'}
                    </Typography>
                    </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>

      <Grid item xs={12} md={4}>
        <Card style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Create A Committee
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Name*"
                margin="normal"
                variant="outlined"
                name="name"
              />
              <TextField
                fullWidth
                label="Topic"
                margin="normal"
                variant="outlined"
                name="topic"
              />
              <TextField
                fullWidth
                label="Conference"
                margin="normal"
                variant="outlined"
                name="conference"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={createCommittee}
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Create
              </Button>
            </Box>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Join Committee
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                label="Committee ID*"
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                style={{ marginTop: '20px' }}
              >
                Join
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    )
}

export default Dashboard