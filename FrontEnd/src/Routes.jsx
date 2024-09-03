import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import Layout from "./Layout"
import CommitteeLayout from "./CommitteeLayout"
import Homepage from "./pages/Homepage"
import Onboard from "./pages/Onboard"
import Committee from "./pages/Committee"
import Admin from "./pages/Admin"
import Mod from "./pages/Mod"
import Motions from "./pages/Motions"
import Unmod from "./pages/Unmod"
import Dashboard from "./pages/Dashboard"

function Routes() {
  return createBrowserRouter(
    createRoutesFromElements(<>

      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="onboard" element={<Onboard />} />
        <Route path="committees" element={<Dashboard />} />
      </Route>

      <Route element={<CommitteeLayout />}>
        <Route path="committees/:committeeID" element={<Committee />} />
        <Route path="committees/:committeeID/setup" element={<Admin />} />
        <Route path="committees/:committeeID/motions" element={<Motions />} />
        <Route path="committees/:committeeID/unmod" element={<Unmod />} />
        <Route path="committees/:committeeID/mod/:modID" element={<Mod />} />
      </Route>

      <Route path="*" element={<div>Not Found</div>} />
    </>

    )
  )
}

export default Routes;
