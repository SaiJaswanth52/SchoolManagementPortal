import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";

export default function StudentsSection() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [edit_Id, setEditStudentId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    _id: "",
    studentid: "",
    firstname: "",
    lastname: "",
    subjectsRegistered: [],
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Student");
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
          `http://localhost:8080/Student/search/${e.target.value}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Error in fetching data", error);
      }
    }
  };

  const handleEditClick = (student) => {
    setEditStudentId(student._id);
    setEditFormData({
      _id: student._id,
      studentid: student.studentid,
      firstname: student.firstname,
      lastname: student.lastname,
      subjectsRegistered: student.subjectsRegistered.map((subject) => ({
        subjectName: subject.subjectName,
        teacher: subject.teacher,
      })),
    });
  };

  const handleEditChange = (e, index, field) => {
    const { value } = e.target;
    setEditFormData((prev) => {
      const updatedSubjects = [...prev.subjectsRegistered];
      updatedSubjects[index][field] = value;
      return { ...prev, subjectsRegistered: updatedSubjects };
    });
  };

  const handleGeneralEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSubject = () => {
    setEditFormData((prev) => ({
      ...prev,
      subjectsRegistered: [
        ...prev.subjectsRegistered,
        { subjectName: "", teacher: "" },
      ],
    }));
  };

  const handleRemoveSubject = (index) => {
    setEditFormData((prev) => {
      const updatedSubjects = [...prev.subjectsRegistered];
      updatedSubjects.splice(index, 1);
      return { ...prev, subjectsRegistered: updatedSubjects };
    });
  };

  const validateForm = () => {
    const errors = [];
    if (!editFormData.firstname.trim()) {
      errors.push("First name cannot be empty");
    }
    if (!editFormData.lastname.trim()) {
      errors.push("Last name cannot be empty");
    }
    editFormData.subjectsRegistered.forEach((subject, index) => {
      if (!subject.subjectName.trim()) {
        errors.push(`Subject Name ${index + 1} cannot be empty`);
      }
      if (!subject.teacher.trim()) {
        errors.push(`Teacher Name ${index + 1} cannot be empty`);
      }
    });
    setErrors(errors);
    return errors.length === 0;
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const uniqueSubjects = new Set(
        editFormData.subjectsRegistered.map((sub) => sub.subjectName)
      );
      const uniqueTeachers = new Set(
        editFormData.subjectsRegistered.map((sub) => sub.teacher)
      );

      if (
        uniqueSubjects.size !== editFormData.subjectsRegistered.length ||
        uniqueTeachers.size !== editFormData.subjectsRegistered.length
      ) {
        alert("Subject names and teacher names must be unique.");
        return;
      }

      await axios.put(`http://localhost:8080/Student/${edit_Id}`, editFormData);
      setEditStudentId(null);
      fetchData();
      window.alert("Student record updated successfully!");
    } catch (error) {
      console.error("Error in updating data", error);
    }
  };

  const handleDeleteClick = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/Student/${_id}`);
      fetchData();
      window.alert("Student record deleted successfully!");
    } catch (error) {
      console.error("Error in deleting data", error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h2>Students-Subject Registration List</h2>
        <input
          type="text"
          placeholder="Search By First Name/SubName"
          value={search}
          onChange={handleSearch}
        />
        <Link to="/AdminDashboard">Back</Link>
      </div>
      {data.length === 0 ? (
        <p>No students found</p>
      ) : (
        <div className="students-flex">
          {data.map((student) => (
            <div className="student-card" key={student._id}>
              {edit_Id === student._id ? (
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
                    onChange={handleGeneralEditChange}
                    disabled
                  />
                  <input
                    type="text"
                    name="studentid"
                    value={editFormData.studentid}
                    onChange={handleGeneralEditChange}
                    disabled
                  />
                  <input
                    type="text"
                    name="firstname"
                    value={editFormData.firstname}
                    onChange={handleGeneralEditChange}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="lastname"
                    value={editFormData.lastname}
                    onChange={handleGeneralEditChange}
                    placeholder="Last Name"
                  />
                  {editFormData.subjectsRegistered.map((subject, index) => (
                    <div key={index}>
                      <input
                        type="text"
                        name={`subjectName${index + 1}`}
                        value={subject.subjectName}
                        onChange={(e) =>
                          handleEditChange(e, index, "subjectName")
                        }
                        placeholder={`Subject Name ${index + 1}`}
                      />
                      <input
                        type="text"
                        name={`teacher${index + 1}`}
                        value={subject.teacher}
                        onChange={(e) => handleEditChange(e, index, "teacher")}
                        placeholder={`Teacher Name ${index + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveSubject(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={handleAddSubject}>
                    Add Subject
                  </button>
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditStudentId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h3>
                    Student Name: {student.firstname} {student.lastname}
                  </h3>
                  <h5>Student Id: {student.studentid}</h5>
                  <ul>
                    {student.subjectsRegistered.map((subject, index) => (
                      <li key={index}>
                        <strong>
                          Subject Name {index + 1}: {subject.subjectName} <br />
                          Teacher Name {index + 1}: {subject.teacher}
                        </strong>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => handleEditClick(student)}>Edit</button>
                  <button onClick={() => handleDeleteClick(student._id)}>
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
