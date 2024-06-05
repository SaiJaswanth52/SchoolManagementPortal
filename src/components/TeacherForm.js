import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const TeacherForm = () => {
  const initialState = {
    teacherId: "",
    firstName: "",
    lastName: "",
    teaches: "",
  };

  const [teacherData, setTeacherData] = useState(initialState);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if teacherId already exists
    try {
      const existingTeacher = await axios.get(
        `http://localhost:8080/Teachers/${teacherData.teacherId}`
      );
      if (existingTeacher.data) {
        setError(
          "TeacherId already exists. Please choose a different TeacherId."
        );
        return;
      }
    } catch (error) {
      console.error("Error checking teacher ID:", error);
    }

    // No error, proceed with form submission
    setError(""); // Clear any previous errors
    console.log(teacherData);

    // Axios POST request
    axios
      .post("http://localhost:8080/Teachers", teacherData)
      .then((response) => {
        window.alert("Teacher Data Submitted Successfully");
        setTeacherData(initialState); // Reset the form to initial state
      })
      .catch((error) => {
        console.error("There was an error submitting the teacher data!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="insert-card">
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>Teacher ID:</label>
        <input
          type="text"
          name="teacherId"
          value={teacherData.teacherId}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={teacherData.firstName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={teacherData.lastName}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Teaches:</label>
        <input
          type="text"
          name="teaches"
          value={teacherData.teaches}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TeacherForm;
