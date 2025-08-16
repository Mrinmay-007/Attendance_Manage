
import React from "react";


import { Routes, Route } from "react-router-dom";
import AttendanceForm from "../components/attendanceForm";
import Attendance from "../components/attendance";
;
import TeacherDashboard  from "../components/teacherDashboard";
export default function Teacher() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TeacherDashboard  />} />
        <Route path="form" element={<AttendanceForm  />} />
        <Route path="attendance" element={<Attendance />} />
      </Routes>
     
    </div>
  );
}
