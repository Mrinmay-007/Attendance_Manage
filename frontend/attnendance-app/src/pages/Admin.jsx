import React from "react";

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../dashboard/adminDashboard";

import AdminPanel from "../components/Admin/Dashboard";
import Notice from "../components/notice"
import RoutineBuilder from "../components/Admin/routine";
import Setting from "../components/Admin/adminSetting";
import ResetPassword from "../components/resetPw";
import ProtectedRoute from "../auth/ProtectedRoute";
export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="dashboard/*"  element={<AdminPanel />}/>
        <Route path="notice"  element={<Notice />}/>
        <Route path="create-routine"  element={<RoutineBuilder />}/>
        <Route path="settings"  element={<Setting />}/>
        <Route path="settings/reset-password"  element={<ResetPassword />}/>
      </Routes>
    </div>
  );
}
