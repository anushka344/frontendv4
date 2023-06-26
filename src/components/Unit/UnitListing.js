import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsPencilFill, BsTrashFill } from 'react-icons/bs';
import './Unit.css'; 

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

  const handleDelete = (id) => {
    const token = localStorage.getItem('token'); // Retrieve the token from local storage

    if (window.confirm('Do you want to remove?')) {
      fetch(`https://localhost:7240/api/Unit/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the authorization header
        },
      })
        .then((res) => {
          if (res.ok) {
            alert('Removed successfully.');
            setUnitData(unitData.filter(unit => unit.id !== id));
          } else {
            throw new Error('Error deleting unit');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="content-container">
      <h2 className="Unithead">Unit Listing</h2>
      <Link to="/units/add" className="btn btn-success mb-3 addBtn">
        Add Unit
      </Link>
      <table className="table table-bordered tbl">
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
                <Link to={`/units/edit/${unit.id}`} className="btn btn-primary btn-sm mr-2" style={{ marginRight: '10px' }}>
                  <BsPencilFill />
                </Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(unit.id)}>
                  <BsTrashFill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UnitListing;
