import { useState, useEffect } from "react";
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  DataTable,
  List,
  Edit,
  useRedirect
} from "react-admin";
import { useWatch, useFormContext } from "react-hook-form";

export const create_SubTeacher = (props) => {
  const redirect = useRedirect();
  const onSuccess = (data) => {
        console.log("Subject Teacher created:", data);
        redirect('/admin/dashboard/sub_teacher');
    };
  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        <ReferenceInput
          label="Teacher"
          source="teacher"
          reference="teacher_list"
        >
          <SelectInput
            optionText="teacher"
            optionValue="teacher"
            onChange={(e) => console.log("Teacher selected:", e.target.value)}
          />
        </ReferenceInput>
        <ReferenceInput
          label="Subjects"
          source="subject"
          reference="subject_list"
        >
          <SelectInput
            optionText="subject"
            optionValue="subject" // value is subject string instead of id
            onChange={(e) => console.log("Subject selected:", e.target.value)}
          />
        </ReferenceInput>
      </SimpleForm>
    </Create>
  );
};

export const get_SubTeacher = (props) => (
  <List {...props}>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="subject" label="Subject" />
      <DataTable.Col source="dep" label="Department" />
      <DataTable.Col source="year" />
      <DataTable.Col source="sem" />
      <DataTable.Col source="teacher" label="Teacher Name" />

    </DataTable>
      {/* Matches backend keys */}
      
    
  </List>
);

export const edit_SubTeacher = (props) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <ReferenceInput
          label="Teacher"
          source="teacher"
          reference="teacher_list"
        >
          <SelectInput
            optionText="teacher"
            optionValue="teacher"
            onChange={(e) => console.log("Teacher selected:", e.target.value)}
          />
        </ReferenceInput>
        <ReferenceInput
          label="Subjects"
          source="subject"
          reference="subject_list"
        >
          <SelectInput
            optionText="subject"
            optionValue="subject" // value is subject string instead of id
            onChange={(e) => console.log("Subject selected:", e.target.value)}
          />
        </ReferenceInput>
      </SimpleForm>
    </Edit>
  );
};



