import React, { useState } from "react";
import StudentForm from "./StudentForm";
import TeacherForm from "./TeacherForm";
import { Link } from "react-router-dom";

const InsertData = () => {
  const [formType, setFormType] = useState("");

  const handleFormSelection = (type) => {
    setFormType(type);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Insert Data</h1>
        <Link to="/AdminDashboard">Back</Link>
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary m-2"
          onClick={() => handleFormSelection("student")}
        >
          Student Form
        </button>
        <button
          className="btn btn-primary m-2"
          onClick={() => handleFormSelection("teacher")}
        >
          Teacher Form
        </button>
      </div>
      <div>
        {formType === "student" && <StudentForm />}
        {formType === "teacher" && <TeacherForm />}
      </div>
    </div>
  );
};

export default InsertData;
