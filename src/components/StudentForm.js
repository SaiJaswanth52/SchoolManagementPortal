import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { ValidateForm } from "../ValidateForm";

const StudentForm = () => {
  const initialState = {
    studentid: "",
    firstname: "",
    lastname: "",
    subjectsRegistered: [{ subjectName: "", teacher: "" }],
  };

  const [studentData, setStudentData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubjectChange = (index, e) => {
    const { name, value } = e.target;
    const subjects = [...studentData.subjectsRegistered];
    subjects[index][name] = value;
    setStudentData({ ...studentData, subjectsRegistered: subjects });
  };

  const addSubject = () => {
    setStudentData({
      ...studentData,
      subjectsRegistered: [
        ...studentData.subjectsRegistered,
        { subjectName: "", teacher: "" },
      ],
    });
  };

  const checkStudentId = async (studentId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/Student/${studentId}`
      );
      return response.data; // Returns existing student data or null if not found
    } catch (error) {
      console.error("Error checking student ID:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const validationErrors = ValidateForm(studentData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Check if student ID already exists
    const existingStudent = await checkStudentId(studentData.studentid);
    if (existingStudent) {
      setError("Student ID already exists. Please choose a different ID.");
      return;
    }

    // No error, proceed with form submission
    setError(""); // Clear any previous errors
    console.log(studentData);

    // Axios POST request
    axios
      .post("http://localhost:8080/Student", studentData)
      .then((response) => {
        console.log("Student data submitted successfully:", response.data);
        window.alert("Student Data Submitted Successfully");
        setStudentData(initialState); // Reset the form to initial state
        setErrors({}); // Clear errors after successful submission
      })
      .catch((error) => {
        console.error("There was an error submitting the student data!", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="insert-card">
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>Student ID:</label>
        <input
          type="text"
          name="studentid"
          value={studentData.studentid}
          onChange={handleInputChange}
        />
        {errors.studentid && (
          <span className="text-danger">{errors.studentid}</span>
        )}
      </div>
      <div>
        <label>First Name:</label>
        <input
          type="text"
          name="firstname"
          value={studentData.firstname}
          onChange={handleInputChange}
        />
        {errors.firstname && (
          <span className="text-danger">{errors.firstname}</span>
        )}
      </div>
      <div>
        <label>Last Name:</label>
        <input
          type="text"
          name="lastname"
          value={studentData.lastname}
          onChange={handleInputChange}
        />
        {errors.lastname && (
          <span className="text-danger">{errors.lastname}</span>
        )}
      </div>
      <div>
        <label>Subjects Registered:</label>
        {studentData.subjectsRegistered.map((subject, index) => (
          <div key={index}>
            <input
              type="text"
              name="subjectName"
              value={subject.subjectName}
              onChange={(e) => handleSubjectChange(index, e)}
              placeholder="Subject Name"
            />
            <input
              type="text"
              name="teacher"
              value={subject.teacher}
              onChange={(e) => handleSubjectChange(index, e)}
              placeholder="Teacher"
            />
          </div>
        ))}
        <button type="button" onClick={addSubject}>
          Add Subject
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
