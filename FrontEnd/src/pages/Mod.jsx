import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Timer from "../components/Timer"
function Mod() {
    const { committeeID, modID } = useParams()
    const { modInfo, setModInfo } = useState({})
    async function getModInfo() {
        const response = fetch("http://localhost:3000/api/committee/mod", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({modID: modID})
        })
    }

    return (
        <div>
        <h1>Committee ID: {committeeID}</h1>
        <h1>Mod ID: {modID}</h1>
        <Timer/>
        </div>
  )
}

export default Mod