
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../dashboard/studentDashboard";
import ShowAttendance from "../components/Student/showAttendance"

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
