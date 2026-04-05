import { Route, Routes } from "react-router-dom"
import Home from "./app/Home"
import SmorePage from "./app/SmorePage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/smore" element={<SmorePage />} />
    </Routes>
  )
}

export default App
