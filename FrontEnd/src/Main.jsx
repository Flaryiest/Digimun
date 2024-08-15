import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import Routes from "./Routes"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import "./style/index.css"
import { ThemeProvider, createTheme} from "@mui/material/styles"

const THEME = createTheme({
  typography: {
   "fontFamily": `"Poppins", "Roboto", "Helvetica", "Arial", sans-serif`,
  }
});
const router = Routes()

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={THEME}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
)