
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminPanel from "./pages/Admin";
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
              <AdminPanel />
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


// export default function App() {
//   return (
//    <>
//    <AdminPanel />
//    </>
//   );
// }