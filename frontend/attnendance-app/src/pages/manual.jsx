import { apiFetch } from "../components/api";
import { useEffect, useState } from "react";

export default function Manual() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    apiFetch(`/manual`)
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, []);

  // Function to assign default password based on role
  const getDefaultPassword = (role) => {
    if (role === "Admin") return "admin123";
    if (role === "Teacher") return "faculty123";
    if (role === "Student") return "student123";
    return "N/A";
  };

  return (
    <div className="overflow-x-auto">
      <center>
        <h1 className="text-2xl font-bold mb-4">User Manual</h1>
      </center>
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            {/* <th className="border px-4 py-2">Department</th> */}
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Default Password</th>
          </tr>
        </thead>
        <tbody>
          {user.map((item, index) => (
            <tr key={index} className="text-center">
              {/* <td className="border px-4 py-2">{item.department}</td> */}
              <td className="border px-4 py-2">{item.name}</td>
              <td className="border px-4 py-2">{item.email}</td>
              <td className="border px-4 py-2">{item.role}</td>
              <td className="border px-4 py-2">
                {getDefaultPassword(item.role)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4">
        <center>
          <h2 className="text-xl font-semibold">Instructions</h2>
          <p>
            Please refer to the table above for user details and default
            passwords.
            <br />
            <b>
              <u>Important:</u>
              <span className="ml-3">
                Make sure that all users are informed of their default
                passwords.
              </span>
            </b>
          </p>
        </center>
      </div>
    </div>
  );
}
