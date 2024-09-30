import React, { useState, useEffect } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);

  useEffect(() => {
    setData(EmployeeData);
  }, []);

  // Handle Edit Process
  const handleEdit = (id) => {
    const dt = data.filter(item => item.id === id); // Corrected typo from 'Data' to 'data'
    if (dt.length > 0) {
      setId(id); // Set the id to the selected item
      setFirstName(dt[0].firstName);
      setLastName(dt[0].lastName);
      setAge(dt[0].age);
    }
  };

  // Handle Delete Process
  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const dt = data.filter(item => item.id !== id);
        setData(dt);
      }
    }
  };

  // Handle Save Process
  const handleSave = () => {
    if (id === 0) {
      // Adding a new record
      const newEntry = {
        id: data.length + 1, // Generate a new id
        firstName,
        lastName,
        age
      };
      setData([...data, newEntry]);
    } else {
      // Updating an existing record
      const updatedData = data.map(item =>
        item.id === id ? { id, firstName, lastName, age } : item
      );
      setData(updatedData);
    }

    // Clear the fields after saving
    handleClear();
  };

  // Handle Clear Process
  const handleClear = () => {
    setFirstName('');
    setLastName('');
    setAge(0);
    setId(0); // Reset the id to indicate adding a new record
  };

  return (
    <div className='App'>
      {/* Form for Adding/Editing Records */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px', marginBottom: '10px' }}>
        <div>
          <label>First Name:
            <input
              type='text'
              placeholder='Enter first name'
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </label>
        </div>
        <div>
          <label>Last Name:
            <input
              type='text'
              placeholder='Enter last name'
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
          </label>
        </div>
        <div>
          <label>Age:
            <input
              type='number'
              placeholder='Enter Age'
              onChange={(e) => setAge(e.target.value)}
              value={age}
            />
          </label>
        </div>
        <div>
          <button className='btn btn-primary' onClick={handleSave}>
            {id === 0 ? 'Add' : 'Update'}
          </button>&nbsp;
          <button className='btn btn-danger' onClick={handleClear}>Clear</button>
        </div>
      </div>

      {/* Table to Display Records */}
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>SR.no</th>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>&nbsp;
                <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
