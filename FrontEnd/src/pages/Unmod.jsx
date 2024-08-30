import Timer from "../components/Timer"
import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

function Unmod() {
    const [unmodInfo, setUnmodInfo] = useState(null)
    const params = useParams()

    useEffect(() => {
        getUnmod()
    }, [])
    console.log(unmodInfo)
    async function getUnmod() {
        const response = await fetch("http://localhost:3000/api/committee/unmod", {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        if (response.status == 200) {
            const mod = await response.json()
            setUnmodInfo(mod)
        }
        else {
            console.log("get unmod failed")
        }
        
    }
    if (unmodInfo) {
        return <Box
        sx={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20dvh',
            boxSizing: 'border-box',}}>
        <Box sx={{width: '50%'}}>
            <Timer totalTime={unmodInfo.totalTime} currentTime={unmodInfo.time} label={"Unmoderated Caucus"}/>
        </Box>
        
      </Box> 
    }
}

export default Unmod