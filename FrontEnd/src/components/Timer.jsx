import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, LinearProgress, Card, TextField, Button, MenuItem, Select } from '@mui/material'

function Timer({currentTime, totalTime, label}) {
    const [time, setTime] = useState(currentTime)
    const [maxTime, setMaxTime] = useState(totalTime)
    const [isActive, setIsActive] = useState(false)
    const [inputTime, setInputTime] = useState(10)
    const [timeUnit, setTimeUnit] = useState('minutes')
    const timerRef = useRef(null)
    useEffect(() => {
        if (isActive && time > 0) {
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)

        }
        return () => clearInterval(timerRef.current)
    }, [isActive, time])

    const handleClick = () => {
        if (isActive) {
        clearInterval(timerRef.current);
        } else {
        timerRef.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1)
        }, 1000)
        }
        setIsActive(!isActive)
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`
    }

    const handleSetTime = () => {
        const newTime = timeUnit === 'minutes' ? inputTime * 60 : inputTime
        setTime(newTime)
        setMaxTime(newTime)
        setIsActive(false)
    }

    const progress = (time / maxTime) * 100

    return (
        <Card 
        sx={{
            width: '100%',
            height: '350px', 
            padding: '15px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRadius: '12px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#cfcfcf',
            boxSizing: 'border-box',
        }}>
        <Typography 
            variant="body2" 
            sx={{ position: 'absolute', top: '10px', left: '10px', fontSize: '18px' }}>
            {label}
        </Typography>

        <Typography 
            variant="h3" 
            component="div" 
            sx={{ 
            marginTop: '20px', 
            textAlign: 'center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center', 
            fontSize: '28px',
            minWidth: '120px',
            minHeight: '50px',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '5px',
            backgroundColor: '#ddd',
            transition: 'background-color 0.3s, transform 0.3s',
            '&:hover': {
                backgroundColor: '#ccc',
                transform: 'scale(1.05)',
            },
            '&:active': {
                backgroundColor: '#bbb',
            },
            }}
            onClick={handleClick}>
            {formatTime(time)}
        </Typography>

        <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ 
            width: '90%', 
            margin: '20px 0', 
            bgcolor: 'lightGray', 
            height: '24px',
            borderRadius: '5px',
            }}/>

        <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            width: '100%', 
            justifyContent: 'space-between',
            marginTop: '10px',
            }}>
                
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            <TextField 
                value={inputTime} 
                onChange={(e) => setInputTime(e.target.value)} 
                sx={{ 
                width: '60%', 
                fontSize: '8px', 
                padding: 0, 
                minHeight: '56px',
                borderTopRightRadius: '0px', 
                borderBottomRightRadius: '0px',
                marginRight: 0,
                }} 
                InputProps={{
                inputProps: { min: 0 },
                }}/>

            <Select
                value={timeUnit}
                onChange={(e) => setTimeUnit(e.target.value)}
                sx={{ 
                minHeight: '56px', 
                borderTopLeftRadius: 0, 
                borderBottomLeftRadius: 0, 
                fontSize: '14px',
                margin: 0,
                padding: 0,
                minWidth: '100px',
                }}>
                <MenuItem value="minutes" sx={{ fontSize: '14px' }}>minutes</MenuItem>
                <MenuItem value="seconds" sx={{ fontSize: '14px' }}>seconds</MenuItem>
            </Select>
            </Box>

            <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSetTime}
            sx={{fontSize: '12px', padding: '5px 10px', minHeight: '56px' }}>
            Set
            </Button>
        </Box>
        </Card>
    )
    }

export default Timer