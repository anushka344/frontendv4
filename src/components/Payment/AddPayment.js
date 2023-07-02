import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './payment.css'; // Assuming you have a CSS file named "payment.css"

const AddPayment = () => {
  const currentDate = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
  const [payment, setPayment] = useState({
    paymentDate: currentDate,
    qty: 0,
    customerId: 0,
    productId: 0,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPayment((prevPayment) => ({ ...prevPayment, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const productResponse = await fetch(
        `https://localhost:7240/api/Product/${payment.productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!productResponse.ok) {
        throw new Error("Product ID does not exist");
      }

      const customerResponse = await fetch(
        `https://localhost:7240/api/Customer/${payment.customerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!customerResponse.ok) {
        throw new Error("Customer ID does not exist");
      }

      const paymentResponse = await fetch(
        "https://localhost:7240/api/Payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payment),
        }
      );
      if (paymentResponse.ok) {
        window.alert("Payment added successfully!");
        setPayment({
          paymentDate: currentDate,
          qty: 0,
          customerId: 0,
          productId: 0,
        });
      } else if (paymentResponse.status === 401) {
        throw new Error("Unauthorized");
      } else {
        throw new Error("Error occurred");
      }
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center">
      <div className="card mt-5" style={{ width: "500px" }}>
        <div className="card-body">
          <h2 className="card-title addpaymenthead">Add Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {/* <label htmlFor="paymentDate">Payment Date</label>
              <input
                type="date"
                className="form-control"
                id="paymentDate"
                name="paymentDate"
                value={payment.paymentDate}
                onChange={handleInputChange}
              /> */}
            </div>
            <div className="form-group">
              <label htmlFor="qty">Quantity</label>
              <input
                type="number"
                className="form-control"
                id="qty"
                name="qty"
                value={payment.qty}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="customerId">Customer ID</label>
              <input
                type="number"
                className="form-control"
                id="customerId"
                name="customerId"
                value={payment.customerId}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="productId">Product ID</label>
              <input
                type="number"
                className="form-control"
                id="productId"
                name="productId"
                value={payment.productId}
                onChange={handleInputChange}
                style={{ marginBottom: '20px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ marginRight: '15px' }}>
            
              Submit
            </button>
            <Link to="/payment" className="btn btn-secondary ml-2">
              Back
            </Link>
            {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPayment;
