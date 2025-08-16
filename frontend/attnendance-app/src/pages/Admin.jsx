
import React from 'react';
import { Admin, Resource} from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';

// Import your resources
import { get_Dept, create_Dept, edit_Dept } from '../components/department';
import { get_Slot, create_Slot, edit_Slot } from '../components/slot';
import { get_Teacher, create_Teacher, edit_Teacher } from '../components/teacher';
import { get_Subject, create_Subject, edit_Subject } from '../components/subject';
import { get_Student, create_Student, edit_Student } from '../components/student';
import { get_SubTeacher, create_SubTeacher, edit_SubTeacher } from '../components/sub_teacher';
import authProvider from '../auth/authProvider';
import Login from './Login'; // Import your custom login page

const apiUrl = "http://localhost:8000";

const baseProvider = simpleRestProvider(apiUrl, fetchUtils.fetchJson);

const authFetchJson = (url, options = {}) => {
  const token = localStorage.getItem("token");
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }
  if (token) {
    options.headers.set("Authorization", `Bearer ${token}`);
  }
  return fetchUtils.fetchJson(url, options);
};

const dataProvider = {
  ...simpleRestProvider(apiUrl, authFetchJson),
  getList: (resource, params) => {
    if (resource === "subject/filter") {
      const { year, sem, dep } = params.filter;
      const url = `${apiUrl}/subject/filter/${year},${sem},${dep}`;
      return authFetchJson(url).then(({ json }) => ({
        data: json,
        total: json.length,
      }));
    }
    return baseProvider.getList(resource, params);
  },
};


export default function AdminPanel() {
  return (
    <div style={{ height: '100vh' }}>

      <Admin
        basename='/admin'
        dataProvider={dataProvider}
         authProvider={authProvider}
      >
        <Resource name="departments" />
        <Resource name="teacher_list" />
        <Resource name="subject_list" />

        <Resource name="department" list={get_Dept} edit={edit_Dept} create={create_Dept} />
        <Resource name="slot" list={get_Slot} edit={edit_Slot} create={create_Slot} />
        <Resource name="teacher" list={get_Teacher} edit={edit_Teacher} create={create_Teacher} />
        <Resource name="subject" list={get_Subject} edit={edit_Subject} create={create_Subject} />
        <Resource name="student" list={get_Student} edit={edit_Student} create={create_Student} />
        <Resource name="sub_teacher" list={get_SubTeacher} edit={edit_SubTeacher} create={create_SubTeacher} /> 

      </Admin> 
    </div>
  );
}


//====================================================================



// <Admin dataProvider={simpleRestProvider("http://localhost:8000")}>

//   <Resource name="departments" /> {/* ✅ Add this */}
 
//   <Resource name="department" list={get_dept} edit={EditDepartment} create={CreateDepartment} />
//   <Resource name="teacher" list={get_faculty} edit={Edit_Faculty} create={Create_Faculty} />
//   <Resource name="student" list={get_student} edit={edit_student} create={create_student} />
//   <Resource name="subject" list={get_subject} edit={Edit_Subject} create={add_subject} />
//   <Resource name="sub_teacher"  list={SubTeacherList}  create={AddSubTeacher}/>

// </Admin>




// Your API base URL
// const apiUrl = "http://localhost:8000";

// // Default provider
// const baseProvider = simpleRestProvider(apiUrl);

// // Custom provider wrapper
// const dataProvider = {
//   ...baseProvider,
//   getList: (resource, params) => {
//     // Custom endpoint for subjects
//     if (resource === "subject/filter") {
//       const { year, sem, dep } = params.filter;
//       const url = `${apiUrl}/subject/filter/${year},${sem},${dep}}`;
//       return fetchUtils.fetchJson(url).then(({ json }) => ({
//         data: json,
//         total: json.length,
//       }));
//     }
//     // Otherwise use default behavior
//     return baseProvider.getList(resource, params);
//   },
// };

// const Admin_dashboard = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="departments" />
//     <Resource name="teacher_list" />
//     <Resource name="subject_list" />

//     <Resource name="department" list={get_Dept} edit={edit_Dept} create={create_Dept} />


//   </Admin>
// );

// export default Admin_dashboard;