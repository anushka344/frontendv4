import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Unit.css'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UnitListing = () => {
  const [unitData, setUnitData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    fetch("https://localhost:7240/api/Unit", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnitData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteUnit = (id, token) => {
    fetch(`https://localhost:7240/api/Unit/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the authorization header
      },
    })
      .then((res) => {
        if (res.ok) {
          toast.success("Removed successfully.");
          setUnitData(unitData.filter(unit => unit.id !== id));
        } else {
          throw new Error('Error deleting unit');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    toast.warn(
      <div>
        <p>Are you sure you want to remove?</p>
        <div className="confirmation-buttons">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => {
              deleteUnit(id, token);
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
    <div className="content-container"  style={{ padding: '40px' }}>
      <h2 className="Unithead">Unit Listing</h2>
      <Link to="/units/add" className=" add-unit">
        Add Unit
      </Link>
      <table className="table table-bordered tbl table-hover">
        <thead className="bg-dark text-white tableHead">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {unitData.map((unit) => (
            <tr key={unit.id}>
              <td>{unit.id}</td>
              <td>{unit.name}</td>
              <td>{unit.description}</td>
              <td>
                <Link to={`/units/edit/${unit.id}`} className="btn btn-primary btn-sm mr-2 edit-btn" style={{ marginRight: '10px' }}>
                  Edit
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(unit.id)}>
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

export default UnitListing;
