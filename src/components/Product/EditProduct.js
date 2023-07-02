import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css'; // Assuming you have a CSS file named "product.css"

const EditProduct = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState({
    name: "",
    ProductQuantity: 0,
    brand: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Product/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    fetch(`https://localhost:7240/api/Product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(product)
    })
      .then((res) => res.json())
      .then((data) => {
        window.alert("Product updated successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title editproducthead">Edit Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="productName">Name</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                name="name"
                value={product.name}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productQuantity">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="productQuantity"
                name="ProductQuantity"
                value={product.ProductQuantity}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productBrand">Brand</label>
              <input
                type="text"
                className="form-control"
                id="productBrand"
                name="brand"
                value={product.brand}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary mr-2" style={{ marginRight: "15px" }}> 
              Update
            </button>
            <Link to="/product" className="btn btn-secondary">
              Back
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
