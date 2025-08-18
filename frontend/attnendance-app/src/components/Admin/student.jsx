import React from "react";
import {
  Create,
  Edit,
  SimpleForm,
  TextInput,
  useRedirect,
  List,
  DataTable,
  SelectInput,
  EmailField,
  ReferenceInput,
} from "react-admin";
import { useState } from "react";

import { useWatch, useFormContext } from "react-hook-form";
// const roleChoices = [{ id: "Student", name: "Student" }];
const yearChoices = [
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
];
const semChoices = [
  { id: "1", name: "1" },
  { id: "2", name: "2" },
  { id: "3", name: "3" },
  { id: "4", name: "4" },
  { id: "5", name: "5" },
  { id: "6", name: "6" },
  { id: "7", name: "7" },
  { id: "8", name: "8" },
];



export const create_Student = (props) => {
  const redirect = useRedirect();
  const [selectedYear, setSelectedYear] = useState("");

  const onSuccess = (data) => {
    console.log("Student created:", data);
    redirect("/admin/dashboard/student");
  };

  const transform = (data) => {
    console.log("Form submitted:", data);
    return data;
  };

  // Filter sem choices based on selected year
  const getSemChoices = () => {
    const yearInt = parseInt(selectedYear);
    if (!yearInt) return [];
    const startSem = (yearInt - 1) * 2 + 1;
    return semChoices.filter(
      (sc) => parseInt(sc.id) === startSem || parseInt(sc.id) === startSem + 1
    );
  };

  // const FormLogger = () => {
   
  //  const name = useWatch({ name: "name" });
  //  const email = useWatch({ name: "email" });
  //  const u_roll = useWatch({ name: "u_roll" });
  //  const c_roll = useWatch({ name: "c_roll" });
  //  const dep = useWatch({ name: "dep" });
  //  const year = useWatch({ name: "year" });
  //  const sem = useWatch({ name: "sem" });
  //  const role = useWatch({ name: "role" });

  //   console.log("Form data:", {
  //     name,
  //     email,
  //     u_roll,
  //     c_roll,
  //     dep,
  //     year,
  //     sem,
  //     role,
  //   });
  //   return null;
  // };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      
      <SimpleForm transform={transform}>
        {/* <FormLogger /> */}
        <TextInput source="name" />
        <TextInput source="email" />
         <ReferenceInput
           label="Department"
           source="dep"
           reference="department_students"
         >
           <SelectInput optionText="dep" optionValue="dep" />
         </ReferenceInput>

        <TextInput source="u_roll" />
        <TextInput source="c_roll" />
        <SelectInput
          source="year"
          choices={yearChoices}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
        <SelectInput source="sem" choices={getSemChoices()} />
       <TextInput source="role" defaultValue="Student" style={{ display: "none" }} />
      </SimpleForm>
    </Create>
  );
};



export const edit_Student = (props) => {
  const redirect = useRedirect();
  const [selectedYear, setSelectedYear] = useState("");

  const onSuccess = (data) => {
    console.log("Student created:", data);
    redirect("/student");
  };

  const transform = (data) => {
    console.log("Form submitted:", data);
    return data;
  };

  // Filter sem choices based on selected year
  const getSemChoices = () => {
    const yearInt = parseInt(selectedYear);
    if (!yearInt) return [];
    const startSem = (yearInt - 1) * 2 + 1;
    return semChoices.filter(
      (sc) => parseInt(sc.id) === startSem || parseInt(sc.id) === startSem + 1
    );
  };

  return (
    <Edit {...props}>
      <SimpleForm transform={transform}>
        <TextInput source="id" disabled />
        <TextInput source="name" />
        <TextInput source="email" />
        {/* <TextInput source="pw" label="Password" /> */}
        <TextInput source="u_roll" />
        <TextInput source="c_roll" />
        <SelectInput
          source="year"
          choices={yearChoices}
          onChange={(e) => setSelectedYear(e.target.value)}
        />
        <SelectInput source="sem" choices={getSemChoices()} />
        <TextInput source="role" defaultValue="Student" style={{ display: "none" }} />
      </SimpleForm>
    </Edit>
  );
};




export const get_Student = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="name" />
      <DataTable.Col source="email" />
      <DataTable.Col source="u_roll" />
      <DataTable.Col source="c_roll" />
      <DataTable.Col source="dep" />
      <DataTable.Col source="year" />
      <DataTable.Col source="sem" />
      <DataTable.Col source="role" />
    </DataTable>
  </List>
);