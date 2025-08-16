

import { useNavigate ,Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box
} from "@mui/material";

export default function AttendanceForm() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    id: "",
    department: "",
    year: "",
    semester: "",
    subject: "",
  });

  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);

  // Fetch teacher data
  useEffect(() => {
    apiFetch(`/teacher_data/${email}`)
      .then((data) => setFormData((prev) => ({ ...prev, id: data.id })))
      .catch((err) => console.error(err));
  }, [email]);

  // Fetch departments
  useEffect(() => {
    apiFetch("/department_students")
      .then(setDepartments)
      .catch((err) => console.error(err));
  }, []);

  // Fetch subjects when department or semester changes
  useEffect(() => {
    if (formData.id && formData.department && formData.semester) {
      const depName = departments.find(
        (d) => d.id === parseInt(formData.department)
      )?.dep;
      if (depName) {
        apiFetch(`/sub/${formData.id}/${depName}/${formData.semester}`)
          .then((data) => setSubjects(data))
          .catch((err) => console.error(err));
      }
    }
  }, [formData.department, formData.semester, formData.id, departments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/teacher/attendance", { state: formData });
  };

  return (
    //<Link to = ''>
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Attendance Form
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2, color: "gray" }}>
          Logged in as: {email}
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Teacher ID */}
          <TextField
            fullWidth
            label="Teacher ID"
            value={formData.id}
            InputProps={{ readOnly: true }}
            sx={{ mb: 3 }}
          />

          {/* Department */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Department</InputLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <MenuItem value="">Select Department</MenuItem>
              {departments.map((dep) => (
                <MenuItem key={dep.id} value={dep.id}>
                  {dep.dep}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Semester Dropdown */}
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Select Semester</InputLabel>
            <Select
              name="semester"
              value={formData.semester}
              onChange={handleChange}
            >
              <MenuItem value="">Select Semester</MenuItem>
              {[...Array(8)].map((_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {i + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Subject */}
          <FormControl fullWidth sx={{ mb: 4 }}>
            <InputLabel>Select Subject</InputLabel>
            <Select
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <MenuItem value="">Select Subject</MenuItem>
              {subjects.map((sub) => (
                <MenuItem key={sub.id} value={sub.id}>
                  {sub.subject}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Buttons */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => {
                localStorage.clear();
                navigate("/");
              }}
            >
              Logout
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Next
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
     //<Link/> 
  );
}
