const API_BASE = import.meta.env.VITE_API_URL;


// export async function apiFetch(url, method = "GET", body = null) {
//   const options = {
//     method,
//     headers: { "Content-Type": "application/json" },
//   };

//   if (body) {
//     options.body = JSON.stringify(body);
//   }

//   const res = await fetch(`${API_BASE}${url}`, options);

//   if (!res.ok) {
//     throw new Error(`API error: ${res.status} ${res.statusText}`);
//   }

//   return res.json();
// }


// export async function apiFetch(url, method = "GET", body = null, isFormData = false) {
//   const options = { method, headers: {} };

//   if (body) {
//     if (isFormData) {
//       options.body = body; // FormData, no Content-Type header
//     } else {
//       options.headers["Content-Type"] = "application/json";
//       options.body = JSON.stringify(body);
//     }
//   }

//   const response = await fetch(`http://localhost:8000${url}`, options);
//   if (!response.ok) {
//     const err = await response.json().catch(() => ({}));
//     throw new Error(err.detail || "API error");
//   }
//   return response.json();
// }



export async function apiFetch(url, method = "GET", body = null, isFormData = false) {
  const options = { method, headers: {} };

  if (body) {
    if (isFormData) {
      options.body = body; // FormData, no Content-Type header
    } else {
      options.headers["Content-Type"] = "application/json";
      options.body = JSON.stringify(body);
    }
  }

  const response = await fetch(`${API_BASE}${url}`, options);

  if (!response.ok) {
    const errText = await response.text();
    let errMsg;
    try {
      errMsg = JSON.parse(errText).detail;
    } catch {
      errMsg = errText || "API error";
    }
    throw new Error(errMsg);
  }

  // ✅ handle empty/no-content safely
  const text = await response.text();
  if (!text) return null; // e.g., DELETE returns 204
  try {
    return JSON.parse(text);
  } catch {
    return text; // in case backend sends plain string
  }
}
