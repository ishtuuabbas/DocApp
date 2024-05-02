import React from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate()
  return (
    <div className="App">
      <header>
        <div className="header-container">
          <div className="logo">Clinic Name</div>
          <div className="header-buttons">
            <button className="header-button">Online Appointment</button>
            <button className="header-button" onClick={()=>navigate('/login')}>Login</button>
          </div>
        </div>
      </header>

      <main>
        <div className="main-container">
          <h1>Welcome to Our Clinic</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            suscipit, nisi at sodales vehicula, nulla quam molestie mi, a
            consectetur felis elit sed purus.
          </p>
          {/* Add more content here */}
        </div>
      </main>

      <footer>
        <div className="footer-container">
          <p>&copy; 2024 Clinic Name. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
