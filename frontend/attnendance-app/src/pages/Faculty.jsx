
import React from "react";


import { Routes, Route } from "react-router-dom";
import TeacherDashboard  from "../dashboard/teacherDashboard";

import AttendanceForm from "../components/Teacher/attendanceForm";
import Attendance from "../components/Teacher/attendance";
import Details  from "../components/Teacher/teacherDetails";
import Info  from "../components/Teacher/teacherInfo";
import EditAttendance from "../components/Teacher/editAttendance";
import TeacherRoutine from "../components/Teacher/teacherRoutine";
import Notice from "../components/notice";
import ResetPassword  from "../components/resetPw";
export default function Teacher() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<TeacherDashboard  />} />
        <Route path="form" element={<AttendanceForm  />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="edit_attendance" element={<EditAttendance />} />
        <Route path="details" element={<Details />} />
        <Route path="notice" element={<Notice />} />
        <Route path="routine" element={<TeacherRoutine />} />
        <Route path="details/info" element={<Info />} />
        <Route path="details/reset-password" element={<ResetPassword />} />
      </Routes>
     
    </div>
  );
}
