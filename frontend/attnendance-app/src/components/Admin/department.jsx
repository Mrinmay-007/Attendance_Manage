import React from 'react';
import { Create, Edit, SimpleForm, TextInput, useRedirect, List, DataTable, SelectInput } from 'react-admin';

const roleChoices = [
    { id: 'Admin', name: 'Admin' },
    { id: 'Teacher', name: 'Teacher' },
    { id: 'Student', name: 'Student' },
];

export const get_Dept = () => (
    <List>
        <DataTable>
            <DataTable.Col source="id" />
            <DataTable.Col source="dep" />
            <DataTable.Col source="role" />
        </DataTable>
    </List>
);

export const create_Dept = (props) => {
    const redirect = useRedirect();

    const onSuccess = () => {
        redirect('/admin/department');
    };

    return (
        <Create {...props} mutationOptions={{ onSuccess }}>
            <SimpleForm>
                <TextInput
                    source="dep"
                    parse={(value) => value ? value.toUpperCase() : ''} // Capitalize before send
                />
                <SelectInput source="role" choices={roleChoices} />
            </SimpleForm>
        </Create>
    );
};

export const edit_Dept = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="id" disabled /> {/* id field (disabled) */}
            <TextInput
                source="dep"
                parse={(value) => value ? value.toUpperCase() : ''} // Capitalize before send
            />
            <SelectInput source="role" choices={roleChoices} />
        </SimpleForm>
    </Edit>
);
