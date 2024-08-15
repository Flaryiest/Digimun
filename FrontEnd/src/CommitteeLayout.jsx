import {Outlet} from "react-router-dom"
import CommitteeNavbar from "./components/CommitteeNavbar"

function CommitteeLayout() {
    return <div>
        <CommitteeNavbar/>
        <Outlet/>
    </div>

}

export default CommitteeLayout