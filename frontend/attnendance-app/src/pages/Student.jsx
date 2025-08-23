
import React from "react";
import { Routes, Route } from "react-router-dom";
import StudentDashboard from "../dashboard/studentDashboard";
import ShowAttendance from "../components/Student/showAttendance"
import ResetPassword from "../components/resetPw"
import Settings from "../components/Student/settings";
import NoticeBoard from "../components/Student/getNotice";
import Routine from "../components/Student/getRoutine";
export default function Student() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="attendance" element={<ShowAttendance />} />
        <Route path="notice" element={<NoticeBoard />} />
        <Route path="routine" element={<Routine />} />
        <Route path="settings" element={<Settings />} />
        <Route path="settings/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}
