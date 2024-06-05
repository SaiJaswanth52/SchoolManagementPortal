import "./App.css";
import Home from "./components/Home";
import AdminLogin from "./components/AdminLogin";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StudentsSection from "./components/StudentsSection";
import TeachersSection from "./components/TeachersSection";
import InsertData from "./components/InsertData";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-image">
        <h1 className="mt-2 heading">SCHOOL MANAGEMENT PORTAL</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AdminLogin" element={<AdminLogin />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/StudentsSection" element={<StudentsSection />} />
          <Route path="/TeachersSection" element={<TeachersSection />} />
          <Route path="/InsertData" element={<InsertData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
