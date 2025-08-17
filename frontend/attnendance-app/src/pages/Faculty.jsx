
import React from "react";


import { Routes, Route } from "react-router-dom";
import AttendanceForm from "../components/attendanceForm";
import Attendance from "../components/attendance";
import TeacherDashboard  from "../components/teacherDashboard";
import Details  from "../components/teacherDetails";
import Info  from "../components/teacherInfo";
import ResetPassword  from "../components/resetPw";
export default function Teacher() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TeacherDashboard  />} />
        <Route path="form" element={<AttendanceForm  />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="details" element={<Details />} />
        <Route path="details/info" element={<Info />} />
        <Route path="details/reset-password" element={<ResetPassword />} />
      </Routes>
     
    </div>
  );
}
