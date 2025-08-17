

import { useEffect, useState } from "react";
import { apiFetch } from "./api"; // make sure you have this helper
import Logout from "./logout";

export default function Info() {
  const [teacher, setTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);

  const email = localStorage.getItem("email");

  useEffect(() => {
    apiFetch(`/teacher_details/${email}`)
      .then((data) => {
        setTeacher(data.teacher);
        setSubjects(data.subjects);
        setDepartments(data.departments);
      })
      .catch((err) => console.error(err));
  }, [email]);

  if (!teacher) return <h2>Loading...</h2>;

  return (
    <div className="p-4">
      {/* Header/Nav section */}
      <header className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 rounded-lg shadow">
        <h1 className="text-xl font-semibold">Teacher Details</h1>
        <div className="text-right">
          <Logout/>
          <br />
          <p className="font-medium">{teacher.name} ({teacher.name_code})</p>
          <p className="text-sm">{teacher.email}</p>
        </div>
      </header>

      <div className="mt-6 space-y-6">
        {/* Subjects Table */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Assign Subjects</h2>
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Sub ID</th>
                <th className="border px-4 py-2">Subject Name</th>
                <th className="border px-4 py-2">Subject Code</th>
                <th className="border px-4 py-2">Semester</th>
                <th className="border px-4 py-2">Year</th>
                <th className="border px-4 py-2">Department </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((sub) => (
                <tr key={sub.Sub_id}>
                  <td className="border px-4 py-2">{sub.Sub_id}</td>
                  <td className="border px-4 py-2">{sub.sub_name}</td>
                  <td className="border px-4 py-2">{sub.sub_code}</td>
                  <td className="border px-4 py-2">{sub.sem}</td>
                  <td className="border px-4 py-2">{sub.year}</td>
                  {departments.map((dep) => (
                  <td className="border px-4 py-2">{dep.dep}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Departments Table */}
        {/* <div>
          <h2 className="text-lg font-semibold mb-2">Departments</h2>
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">Department ID</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dep) => (
                <tr key={dep.Did}>
                  <td className="border px-4 py-2">{dep.Did}</td>
                  <td className="border px-4 py-2">{dep.dep}</td>
                  <td className="border px-4 py-2">{dep.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
