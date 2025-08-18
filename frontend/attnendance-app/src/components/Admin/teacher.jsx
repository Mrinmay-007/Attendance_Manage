
import React from 'react';
import { Create, Edit, SimpleForm, TextInput, useRedirect, List, DataTable, SelectInput,EmailField ,PasswordInput} from 'react-admin';
import { useWatch, useFormContext } from "react-hook-form";

const roleChoices = [
    { id: 'Admin', name: 'Admin' },
    { id: 'Teacher', name: 'Teacher' },
];

export const get_Teacher = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="name" />
            <DataTable.Col  source="name_code" />
            <DataTable.Col source="email" />
            <DataTable.Col source="role" />
        </DataTable>
    </List>
);

export const create_Teacher = (props) => {
    const redirect = useRedirect();

    const onSuccess = (data) => {
        console.log("Teacher created:", data);
        redirect('/admin/dashboard/teacher');
    };

    const transform = (data) => {
        console.log("Form submitted:", data);
        return data;
    };

    const FormLogger = () => {
        const name = useWatch({ name: "name" });
        const email = useWatch({ name: "email" });
        const name_code = useWatch({ name: "name_code" });
        const role = useWatch({ name: "role" });

        console.log("Form data:", {
            name,
            email,
            name_code,
            role,
        });
        return null;
    };

    return (
        <Create {...props} mutationOptions={{ onSuccess }}>
            <SimpleForm transform={transform}>
                <FormLogger />
                <TextInput source="name" />
                <TextInput source="name_code" />
                <TextInput source="email" />
                <SelectInput source="role" choices={roleChoices} />
            </SimpleForm>
        </Create>
    );
};

export const edit_Teacher = (props) => {
    const redirect = useRedirect();

    const onSuccess = (data) => {
        console.log("Teacher created:", data);
        redirect('/teacher');
    };

    const transform = (data) => {
        console.log("Form submitted:", data);
        return data;
    };

    return (
        <Edit {...props} >
            <SimpleForm >
                <TextInput source="id" disabled /> 
                <TextInput source="name" />
                <TextInput source="name_code" />
                <TextInput source="email" />
                {/* <TextInput source="pw" label="Password" /> */}
                <SelectInput source="role" choices={roleChoices} />
            </SimpleForm>
        </Edit>
    );
};

