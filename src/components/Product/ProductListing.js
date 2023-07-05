import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './product.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductListing = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    fetch("https://localhost:7240/api/Product", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 401) {
          throw new Error("Unauthorized"); // Handle unauthorized access error
        } else {
          throw new Error("Error occurred"); // Handle other errors
        }
      })
      .then((data) => {
        setProductData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteProduct = (id, token) => {
    fetch(`https://localhost:7240/api/Product/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Removed successfully.");
          setProductData(productData.filter(product => product.id !== id));
        } else if (res.status === 401) {
          throw new Error("Unauthorized"); // Handle unauthorized access error
        } else {
          throw new Error('Error deleting product');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Get the JWT token from local storage

    toast.warn(
      <div>
        <p>Are you sure you want to remove?</p>
        <div className="confirmation-buttons">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteProduct(id, token);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <span className="spacer"></span>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => toast.dismiss()}
          >
            No
          </button>
        </div>
      </div>,
      { autoClose: false }
    );
  };

  return (
    <div className="content-container" style={{ padding: '40px' }}>
      <h2 className="Producthead">Product Listing</h2>
      <Link to="/product/add" className="btn  add-product">
        Add Product
      </Link>
      <table className="table table-bordered table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Unit ID</th>
            <th>Supplier ID</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.brand}</td>
              <td>{product.productQuantity}</td>
              <td>{product.unitId}</td>
              <td>{product.supplierId}</td>
              <td>
                <Link to={`/product/edit/${product.id}`} className="btn btn-primary btn-sm mr-2" style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default ProductListing;
