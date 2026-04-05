import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.tsx"
import { i18nReady } from "./i18n"
import "./index.css"

const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, "") || undefined

i18nReady.then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter basename={routerBasename}>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
})
