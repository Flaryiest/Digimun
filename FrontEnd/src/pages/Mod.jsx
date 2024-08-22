import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Timer from "../components/Timer"
function Mod() {
    const { committeeID, modID } = useParams()
    const { modInfo, setModInfo } = useState({})
    useEffect(() => {
        getModInfo()
    })

    async function getModInfo() {
        const response = fetch("http://localhost:3000/api/committee/mod", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({modID: modID})
        })
        const currentMod = response.json()
        if (response.status == 200) {
            setModInfo(currentMod)
        }
        else {
            console.log("retrieving info failed")
        }
    }

    return (
        <div>
        <h1>Committee ID: {committeeID}</h1>
        <h1>Mod ID: {modID}</h1>
        {modInfo && <Timer/>}
        </div>
  )
}

export default Mod