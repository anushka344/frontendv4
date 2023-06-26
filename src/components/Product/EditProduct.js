import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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
    <div className="container">
      <h2>Edit Product</h2>
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
          />
        </div>
        <div className="form-group">
          <label htmlFor="productQuantity">Quantity</label>
          <input
            type="number"
            className="form-control"
            id="productQuantity"
            name="ProductQuantity" // Updated name to "ProductQuantity"
            value={product.ProductQuantity} // Updated value to "ProductQuantity"
            onChange={handleInputChange}
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
          />
        </div>
        <button type="submit" className="btn btn-primary mr-2">
          Update
        </button>
        <Link to="/product" className="btn btn-secondary">
          Back
        </Link>
      </form>
    </div>
  );
};

export default EditProduct;
