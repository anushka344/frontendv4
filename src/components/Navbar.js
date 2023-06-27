import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

const Navbar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand" href="/">Inventory Management System</a>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item unitNav">
              <a className="nav-link" href="/units">Unit</a>
            </li>
            <li className="nav-item unitNav">
              <a className="nav-link" href="/country">Country</a>
            </li>
            <li className="nav-item unitNav">
              <a className="nav-link" href="/suppliers">Supplier</a>
            </li>
            <li className="nav-item unitNav">
              <a className="nav-link" href="/product">Product</a>
            </li>
            <li className="nav-item unitNav">
              <a className="nav-link" href="/customer">Customer</a>
            </li>
            <li className="nav-item unitNav">
              <a className="nav-link" href="/payment">Payment</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={handleLogout}>LogOut</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
