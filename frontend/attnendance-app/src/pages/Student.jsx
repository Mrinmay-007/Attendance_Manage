
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../components/studentDashboard";
import ShowAttendance from "../components/showAttendance"

export default function Student() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="attendance" element={<ShowAttendance />} />
        {/* <Route path="attendance" element={<Attendance />} /> */}
      </Routes>
    </div>
  );
}
