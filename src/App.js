import './App.css';
import Feed from './components/Feed';
import Register from './components/Register';
import Reset from './components/Reset';
import Login from './components/Login';
// import Navbar from './components/Navbar'; 

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      
       <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} />
          <Route exact path="/feed" element={<Feed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
