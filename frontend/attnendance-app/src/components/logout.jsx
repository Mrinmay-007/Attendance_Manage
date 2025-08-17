import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white flex items-center gap-2 px-5 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        <FaSignOutAlt /> Logout
      </button>
    </>
  );
}



