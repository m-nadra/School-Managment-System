import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />}>
          <Route path="profile" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}