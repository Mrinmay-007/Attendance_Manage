import React from "react";

import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../dashboard/adminDashboard";

import AdminPanel from "../components/Admin/Dashboard";

import ResetPassword from "../components/resetPw";
import ProtectedRoute from "../auth/ProtectedRoute";
export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="dashboard/*"  element={<AdminPanel />}/>
        
      </Routes>
    </div>
  );
}
