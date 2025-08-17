import { Link, useNavigate } from "react-router-dom";
import Logout from "./logout";
export default function Details() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-4">Details</h2>
      <Logout/>

      {/* Top row with two divs side by side */}
      <div className="flex gap-4 mb-6">
        <Link to="/teacher/details/info">
          <div className="flex-1 p-4 border rounded-lg shadow">Your Info</div>
        </Link>

        <Link to="/teacher/details/reset-password">
          <div className="flex-1 p-4 border rounded-lg shadow">
            Reset Password
          </div>
        </Link>
      </div>

      {/* Bottom row */}
      <div className="p-4 border rounded-lg shadow">
        <h3 className="text-xl font-medium mb-2">Attendance History</h3>
        <div>here</div>
      </div>
    </>
  );
}
