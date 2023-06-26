import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    unitId: "",
    supplierId: "",
    ProductQuantity: "", // Updated key name to "ProductQuantity"
    brand: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token"); // Get the JWT token from local storage

    // Check if the unitId exists in the Unit table
    fetch(`https://localhost:7240/api/Unit/${product.unitId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => res.json())
      .then((unit) => {
        if (unit) {
          // UnitId exists, now check if the supplierId exists in the Supplier table
          fetch(`https://localhost:7240/api/Supplier/${product.supplierId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
            },
          })
            .then((res) => res.json())
            .then((supplier) => {
              if (supplier) {
                // SupplierId exists, proceed with adding the product
                fetch("https://localhost:7240/api/Product", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
                  },
                  body: JSON.stringify(product),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    window.alert("Product added successfully!");
                  })
                  .catch((error) => {
                    console.log(error);
                    window.alert("Failed to add product");
                  });
              } else {
                // SupplierId does not exist
                setErrorMessage(`SupplierId ${product.supplierId} does not exist.`);
              }
            })
            .catch((error) => {
              console.log(error);
              window.alert("Failed to check supplierId existence");
            });
        } else {
          // UnitId does not exist
          setErrorMessage(`UnitId ${product.unitId} does not exist.`);
        }
      })
      .catch((error) => {
        console.log(error);
        window.alert("Failed to check unitId existence");
      });
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="unitId">Unit ID</label>
          <input
            type="text"
            className="form-control"
            id="unitId"
            name="unitId"
            value={product.unitId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="supplierId">Supplier ID</label>
          <input
            type="text"
            className="form-control"
            id="supplierId"
            name="supplierId"
            value={product.supplierId}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="text"
            className="form-control"
            id="quantity"
            name="ProductQuantity" // Updated name to "ProductQuantity"
            value={product.ProductQuantity} // Updated value to "ProductQuantity"
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            className="form-control"
            id="brand"
            name="brand"
            value={product.brand}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/product" className="btn btn-secondary ml-2">
          Back
        </Link>
        {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default AddProduct;
