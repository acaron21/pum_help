import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom"
import Navigation from "./components/Navigation"
import ICPage from "./pages/ICPage"
import HowPage from "./pages/HowPage"
import WherePage2 from "./pages/WherePage2"
import TcodePage from "./pages/TcodePage"



function App() {



  return (
    <div className="min-h-screen flex flex-col">
      <BrowserRouter basename={import.meta.env.BASE_URL}>

        <Navigation/>
        <div className="flex-1 flex flex-col h-0">
          <Routes>
            <Route path="/" element={<Navigate to="/ic" replace />} />
            <Route path="/how" element={<HowPage />} />
            <Route path="/where" element={<WherePage2 />} />
            <Route path="/ic" element={<ICPage />} />
            <Route path="/etiquettes" element={<TcodePage />} />
          </Routes>
        </div>
        

    </BrowserRouter>
    </div>

  )
}

export default App
