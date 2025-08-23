

import { apiFetch } from "../components/api";
import Logout from "../components/logout";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";   
const API_BASE = import.meta.env.VITE_API_URL;

export default function Notice() {
  const [department, setDepartment] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [notices, setNotices] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    apiFetch(`/department_students`)
      .then((data) => setDepartment(data))
      .catch((err) => console.error(err));

    fetchNotices();
  }, [email]);

  const fetchNotices = async () => {
    try {
      const data = await apiFetch(`/notice/history/${email}`);
      setNotices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("Did", selectedDept);
    formData.append("content", content);
    if (files.length > 0) {
      formData.append("file", files[0]);
    }

    try {
      await apiFetch(`/notice/`, "POST", formData, true);
      alert("Notice created successfully!");
      setContent("");
      setFiles([]);
      setSelectedDept("");
      fetchNotices();
    } catch (err) {
      console.error(err);
      alert("Error creating notice: " + err.message);
    }
  };

  // ✅ Delete notice handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this notice?")) return;

    try {
      await apiFetch(`/notice/${id}`, "DELETE");
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting notice: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Notice Board</h2>
        <Logout />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Notice History */}
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-yellow-400">
            Your Notice History
          </h3>

          {notices.length === 0 ? (
            <div className="text-center text-gray-400 py-10">
              No notices posted yet.
            </div>
          ) : (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              {notices.map((notice) => (
                <div
                  key={notice.id}
                  className="p-4 bg-slate-700 rounded-xl shadow hover:shadow-md transition relative"
                >
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                    title="Delete Notice"
                  >
                    <FiTrash2 size={18} />
                  </button>

                  <p className="text-gray-200">
                    {notice.content?.split(" ").slice(0, 10).join(" ")}
                    {notice.content?.split(" ").length > 10 ? "..." : ""}
                  </p>
                  <p className="text-sm text-gray-400 mt-2">
                    Department: {notice.dep} | Date: {notice.date_time}
                  </p>
                  {notice.file ? (
                    <a
                      href={`${API_BASE}/notice/image/${notice.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 px-3 py-1 text-sm bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                    >
                      Download File
                    </a>
                  ) : null}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Create Notice Form */}
        <div className="bg-slate-800 rounded-2xl shadow-lg border border-slate-700 p-6">
          <h3 className="text-xl font-semibold mb-4 text-green-400">
            Create New Notice
          </h3>
          <p className="text-gray-400 mb-6">
            Logged in as: <span className="font-medium">{email}</span>
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Department Dropdown */}
            <div>
              <label
                htmlFor="dept"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Select Department:
              </label>
              <select
                id="dept"
                name="dept"
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full rounded-lg border-gray-600 bg-slate-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                required
              >
                <option value="">-- Select --</option>
                {department.map((data, index) => (
                  <option key={index} value={data.id}>
                    {data.dep}
                  </option>
                ))}
              </select>
            </div>

            {/* Textarea */}
            <div>
              <label
                htmlFor="notice-content"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Notice Content:
              </label>
              <textarea
                id="notice-content"
                rows="4"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-lg border-gray-600 bg-slate-900 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
                placeholder="Write your notice here..."
                required
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Attach File: (optional)
              </label>
              <input
                type="file"
                onChange={(e) => setFiles(e.target.files)}
                className="block w-full text-sm text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />{" "}
              *less than 60kB
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 px-4 rounded-lg shadow hover:bg-green-500 focus:ring-2 focus:ring-green-400 focus:ring-offset-1 transition"
            >
              Submit Notice
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
