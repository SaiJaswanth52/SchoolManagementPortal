import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function TeachersSection() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [edit_Id, setEditTeacherId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    _id: "",
    teacherId: "",
    firstName: "",
    lastName: "",
    teaches: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Teachers");
      setData(response.data);
    } catch (error) {
      console.error("Error in fetching data", error);
    }
  };

  const handleSearch = async (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      fetchData();
    } else {
      try {
        const response = await axios.get(
          `http://localhost:8080/Teachers/search/${e.target.value}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    }
  };

  const handleEditClick = (teacher) => {
    setEditTeacherId(teacher._id);
    setEditFormData({
      _id: teacher._id,
      teacherId: teacher.teacherId,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      teaches: teacher.teaches,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const errors = [];
    if (!editFormData.firstName.trim()) {
      errors.push("First name cannot be empty");
    }
    if (!editFormData.lastName.trim()) {
      errors.push("Last name cannot be empty");
    }
    if (!editFormData.teaches.trim()) {
      errors.push("Teaches field cannot be empty");
    }
    setErrors(errors);
    return errors.length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await axios.put(
        `http://localhost:8080/Teachers/${edit_Id}`,
        editFormData
      );
      setEditTeacherId(null);
      setEditFormData({
        _id: "",
        teacherId: "",
        firstName: "",
        lastName: "",
        teaches: "",
      });
      fetchData();
      window.alert("Teacher record updated successfully!");
    } catch (error) {
      console.error("Error in updating data", error);
    }
  };

  const handleDeleteClick = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/Teachers/${_id}`);
      fetchData();
      window.alert("Teacher record deleted successfully!");
    } catch (error) {
      console.error("Error in deleting data", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Teachers-Subject Registration List</h2>
        <input
          type="text"
          placeholder="Search By First Name/Subject Name"
          value={search}
          onChange={handleSearch}
        />
        <Link to="/AdminDashboard">Back</Link>
      </div>
      {data.length === 0 ? (
        <p>No Teachers found</p>
      ) : (
        <div className="students-flex">
          {data.map((teacher) => (
            <div className="student-card" key={teacher._id}>
              {edit_Id === teacher._id ? (
                <form onSubmit={handleEditSubmit}>
                  {errors.length > 0 && (
                    <div className="error-messages">
                      {errors.map((error, index) => (
                        <p key={index} className="error">
                          {error}
                        </p>
                      ))}
                    </div>
                  )}
                  <input
                    type="text"
                    name="_id"
                    value={editFormData._id}
                    onChange={handleEditChange}
                    disabled
                  />
                  <input
                    type="text"
                    name="teacherId"
                    value={editFormData.teacherId}
                    onChange={handleEditChange}
                    disabled
                  />
                  <input
                    type="text"
                    name="firstName"
                    value={editFormData.firstName}
                    onChange={handleEditChange}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={editFormData.lastName}
                    onChange={handleEditChange}
                    placeholder="Last Name"
                  />
                  <input
                    type="text"
                    name="teaches"
                    value={editFormData.teaches}
                    onChange={handleEditChange}
                    placeholder="Teaches"
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditTeacherId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3>
                    Teacher Name: {teacher.firstName} {teacher.lastName}
                  </h3>
                  <h5>Teacher Id: {teacher.teacherId}</h5>
                  <h5>Teaches: {teacher.teaches}</h5>
                  <button onClick={() => handleEditClick(teacher)}>Edit</button>
                  <button onClick={() => handleDeleteClick(teacher._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
