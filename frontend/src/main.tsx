import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from '@/components/ui/provider'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Main from "./pages/Main";
import Teachers from './components/Teachers';
import Profile from './components/Profile';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} >
            <Route index element={<p>Dashboard</p>} />
            <Route path="teachers" element={<Teachers/>} />
            <Route path="profile" element={<Profile/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </StrictMode>,
)
