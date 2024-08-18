import {Outlet} from "react-router-dom"
import CommitteeNavbar from "./components/CommitteeNavbar"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
function CommitteeLayout() {
    const [permissionStatus, setPermissionStatus] = useState(null)
    const params = useParams()
    useEffect(() => {
        getPermissionStatus()
    }, [])

    async function getPermissionStatus() {
        const response = await fetch("http://localhost:3000/api/permissions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({committeeID: params.committeeID})
        })
        const profile = await response.json()
        console.log(profile)
        setPermissionStatus(profile.role)
    }
    
    return <div>
        <CommitteeNavbar/>
        <Outlet/>
    </div>

}

export default CommitteeLayout