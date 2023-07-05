import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Navbar2 = () => {
  const handleRegister = () => {
    window.location.href = '/register';
  };

  const handleLogin = () => {
    window.location.href = '/login';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container" style={{display:'flex'}}>
        <a className="navbar-brand" href="/homePage">
          Inventory Management System
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{display:'flex' , marginLeft:'auto'}}>
          <ul className="navbar-nav ml-auto" style={{marginLeft:'auto'}} >
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleRegister}>
                Register
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogin}>
                Login
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;
