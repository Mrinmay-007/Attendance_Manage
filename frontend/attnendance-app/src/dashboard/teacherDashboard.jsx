import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../components/logout";
import {
  FaUserCheck,
  FaBullhorn,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";

export default function TeacherDashboard() {


  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b132b] via-[#1c2541] to-[#0b132b] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-10 border-b border-gray-700 pb-4">
        <h1 className="text-3xl font-bold tracking-wide">Teacher Dashboard</h1>
        <Logout/>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1 */}
        <Link to="/teacher/form">
          <div className="bg-[#1c2541] p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col items-center text-center border border-gray-700">
            <FaUserCheck className="text-6xl mb-4 text-blue-400" />
            <h2 className="text-blue-300 font-semibold text-lg">
              Mark Attendance
            </h2>
            <p className="text-gray-400 text-sm">
              Take and manage student attendance
            </p>
          </div>
        </Link>

        {/* Card 2 */}
        {/* <div className="bg-[#1c2541] p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col items-center text-center border border-gray-700">
          <LuCalendarClock className="text-6xl mb-4 text-yellow-400" />
          <h2 className="text-yellow-300 font-semibold text-lg">
            Routine
          </h2>
          <p className="text-gray-400 text-sm">
            Post and share important updates
          </p>
        </div> */}

        {/* Card 3 */}
        {/* <div className="bg-[#1c2541] p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col items-center text-center border border-gray-700">
          <FaBell className="text-6xl mb-4 text-green-400" />
          <h2 className="text-green-300 font-semibold text-lg">Notice</h2>
          <p className="text-gray-400 text-sm">
            View and send important notices
          </p>
        </div> */}

        {/* Card 4 */}
        <Link to="/teacher/details">
          <div className="bg-[#1c2541] p-6 rounded-xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer flex flex-col items-center text-center border border-gray-700">
            <FaUserCircle className="text-6xl mb-4 text-purple-400" />
            <h2 className="text-purple-300 font-semibold text-lg">Details</h2>
            <p className="text-gray-400 text-sm">
              View teacher profile and class details
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
