
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../dashboard/studentDashboard";
import ShowAttendance from "../components/Student/showAttendance"
import ResetPassword from "../components/resetPw"
import Settings from "../components/Student/settings";
export default function Student() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="attendance" element={<ShowAttendance />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
