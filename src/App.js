import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
//units
import UnitListing from "./components/Unit/UnitListing";
import AddUnit from "./components/Unit/AddUnit";
import EditUnit from "./components/Unit/EditUnit";
//country
import CountryListing from "./components/Country/CountryListing";
import AddCountry from "./components/Country/AddCountry";
import EditCountry from "./components/Country/EditCountry";
// Supplier 
import SupplierListing from "./components/Supplier/SupplierListing";
import AddSupplier from "./components/Supplier/AddSupplier";
import EditSupplier from "./components/Supplier/EditSupplier";
// Product
import ProductListing from "./components/Product/ProductListing";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if there is a token in local storage
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token"); // Clear the token from local storage on logout
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <div className="container mt-4">
       
        <Routes>
          {!isLoggedIn && (
            <Route path="/" element={<Register onLogin={handleLogin} />} />
          )}
          {!isLoggedIn && (
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          )}
           <Route path="/HomePage" element={<HomePage />} />
           
         
              {/* units */}
              <Route path="/units" element={<UnitListing />} />
              <Route path="/units/add" element={<AddUnit />} />
              <Route path="/units/edit/:unitId" element={<EditUnit />} />

              {/* Country */}
              <Route path="/country" element={<CountryListing />} />
              <Route path="/countries/add" element={<AddCountry />} />
              <Route path="/countries/edit/:countryId" element={<EditCountry />} />

              {/* Supplier */}
              <Route path="/suppliers" element={<SupplierListing />} />
              <Route path="/supplier/add" element={<AddSupplier />} />
              <Route path="/supplier/edit/:supplierId" element={<EditSupplier />} />

              {/* Product */}
              <Route path="/product" element={<ProductListing />} />
              <Route path="/product/add" element={<AddProduct />} />
              <Route path="/product/edit/:productId" element={<EditProduct />} />
          
         
        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
