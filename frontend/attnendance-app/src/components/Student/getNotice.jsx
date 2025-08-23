

import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export default function NoticeBoard() {
  const [notice, setNotice] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    apiFetch(`/notice/${email}`)
      .then((data) => setNotice(data))
      .catch((err) => console.error(err));
  }, []);

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold text-indigo-700">Notice Board</h1>
        <p className="text-gray-600 mt-2">
          Logged in as: <span className="font-medium">{email}</span>
        </p>
      </div>

      {/* Notice Cards */}
      <div className="max-w-3xl mx-auto space-y-6">
        {notice.length === 0 ? (
          <div className="text-center text-gray-500">No notices available.</div>
        ) : (
          notice.map((data, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 border border-gray-200"
            >
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {data.content}
              </div>
              {data.file && (
              <a
                    href={`http://localhost:8000/notice/download/${data.id}`}
                    className="text-indigo-600 hover:underline text-sm"
                    >
                    📥 Download File
                    </a>

              )}
              <p className="text-gray-500 text-xs mt-3">Notice ID: {data.id}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
