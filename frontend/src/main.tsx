import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
