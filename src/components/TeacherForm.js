import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { validateTeacherForm } from "../TeachersValidation"; // Import the validation function

const TeacherForm = () => {
  const initialState = {
    teacherId: "",
    firstName: "",
    lastName: "",
    teaches: "",
  };

  const [teacherData, setTeacherData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacherData({ ...teacherData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = validateTeacherForm(teacherData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({}); // Clear errors after successful submission
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
        {errors.teacherId && (
          <span className="text-danger">{errors.teacherId}</span>
        )}
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          value={teacherData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && (
          <span className="text-danger">{errors.firstName}</span>
        )}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          value={teacherData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && (
          <span className="text-danger">{errors.lastName}</span>
        )}
      </div>
      <div>
        <label>Teaches:</label>
        <input
          type="text"
          name="teaches"
          value={teacherData.teaches}
          onChange={handleInputChange}
        />
        {errors.teaches && (
          <span className="text-danger">{errors.teaches}</span>
        )}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default TeacherForm;
