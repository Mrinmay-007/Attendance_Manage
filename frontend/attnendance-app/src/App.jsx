
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

import Admin from "./pages/Admin";
import AdminPanel from "./components/Admin/Dashboard";

import Student from "./pages/Student";
import Teacher from "./pages/Faculty";
import ProtectedRoute from "./auth/ProtectedRoute";


export default function App() {
  return (


    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected route for Admin */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRole="admin">
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/*"
          element={
            <ProtectedRoute allowedRole="teacher">
              <Teacher />
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRole="student">
              <Student />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

