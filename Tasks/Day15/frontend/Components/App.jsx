import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Dashboard from "../Components/DashBoard";
import Register from "../Components/Register"
function App() {


  return (
    <Router>
      <Routes>
  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

       
        <Route
          path="/dashboard" element={<Dashboard/>}/>

      </Routes>
    </Router>
  );
}

export default App;
