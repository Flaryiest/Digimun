import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as React from 'react';
import { Grid, Card, CardContent, Typography, Box, Container, Button } from '@mui/material';

function Committee() {
    const [committeeInfo, setCommitteeInfo] = useState(null)
    const params = useParams()
    
    async function getCommitteeInfo() {
        const response = await fetch("http://localhost:3000/api/committee", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const committee = await response.json()
        setCommitteeInfo(committee)
    }

    useEffect(() => {
        getCommitteeInfo()
    }, [])
    console.log(committeeInfo, "committee info")
    if (committeeInfo) {
        return (
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '20px',
                    }}
                >
                    <Grid container spacing={3} justifyContent="center" alignItems="center">
                        <Grid item xs={12} md={6} sx={{ paddingBottom: '40px' }}>
                            <Card sx={{ width: '100%', padding: '20px' }}>
                                <CardContent>
                                    <Typography variant="h4" component="div" sx={{ textAlign: 'center' }}>
                                        Main Title
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
    
                        <Grid container spacing={3} justifyContent="center" sx={{marginLeft: "0px"}}>
                            <Grid item xs={12} sm={6} md={3} sx={{ paddingBottom: '20px', paddingRight: '10px' }}>
                                <Card sx={{ width: '100%', padding: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                            Topic
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                            Topic Details
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
    
                            <Grid item xs={12} sm={6} md={3} sx={{ paddingBottom: '20px', paddingLeft: '20px' }}>
                                <Card sx={{ width: '100%', padding: '20px' }}>
                                    <CardContent>
                                        <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                                            Conference
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
                                            Conference Details
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
    
                        <Grid item xs={12} md={6} sx={{ paddingBottom: '40px' }}>
                            <Card sx={{ width: '100%', padding: '20px' }}>
                                <CardContent>
                                    <Typography variant="h6" component="div" sx={{ textAlign: 'center', marginBottom: '16px' }}>
                                        Description
                                    </Typography>
                                    <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center' }}>
                                        This is a detailed description of the committee or event.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
    
                        <Grid item xs={12}>
                            <Box sx={{ textAlign: 'center', marginTop: '20px', marginLeft: '35px', paddingLeft: '0px' }}>
                                <Button variant="contained" color="primary">
                                    Set Up Committee
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        );
    }
    return <div></div>       
    }
    

export default Committee