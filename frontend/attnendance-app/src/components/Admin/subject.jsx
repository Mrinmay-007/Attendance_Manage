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
  PasswordInput,
  ReferenceInput,
} from "react-admin";
import { useWatch } from "react-hook-form";

export const get_Subject = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="sub_name" />
      <DataTable.Col source="sub_code" />
      <DataTable.Col source="dep" />
      <DataTable.Col source="year" />
      <DataTable.Col source="sem" />
    </DataTable>
  </List>
);

export const create_Subject = (props) => {
  const redirect = useRedirect();

  const onSuccess = (data) => {
    console.log("Subject created:", data);
    redirect("/admin/subject");
  };

    // Custom component to watch form values
  const FormLogger = () => {
    const did = useWatch({ name: "Did" });
    const year = useWatch({ name: "year" });
    const sem = useWatch({ name: "sem" });

    console.log("Department ID:", did, "Year:", year, "Semester:", sem);

    return null; // we don't render anything
  };

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <FormLogger />
        <TextInput source="sub_name" />
        <TextInput source="sub_code" />

        <ReferenceInput
          label="Department"
          source="Did"
          reference="department_students"
          filter={{ role: "student" }}
        >
          <SelectInput optionText="dep" />
        </ReferenceInput>

        <TextInput source="year" />
        <TextInput source="sem" />
      </SimpleForm>
    </Create>
  );
};

export const edit_Subject = (props) => {
  const redirect = useRedirect();

  const onSuccess = (data) => {
    console.log("Subject updated:", data);
    redirect("/subject");
  };

  const transform = (data) => {
    console.log("Form submitted for update:", data);
    return data;
  };

  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="sub_name" />
        <TextInput source="sub_code" />
        <TextInput source="dep" />
        <TextInput source="year" />
        <TextInput source="sem" />
      </SimpleForm>
    </Edit>
  );
};
