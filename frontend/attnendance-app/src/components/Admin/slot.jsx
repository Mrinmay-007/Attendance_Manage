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
  TimeInput,
} from "react-admin";
import { useWatch } from "react-hook-form";
import dayjs from "dayjs";


const dayChoices = [
  { id: "Monday", name: "Monday" },
  { id: "Tuesday", name: "Tuesday" },
  { id: "Wednesday", name: "Wednesday" },
  { id: "Thursday", name: "Thursday" },
  { id: "Friday", name: "Friday" },
  { id: "Saturday", name: "Saturday" },
  
];

export const create_Slot = (props) => {
  

    const redirect = useRedirect();
    
    const onSuccess = (data) => {
        console.log("Slot created:", data);
        redirect("/admin/dashboard/slot");
      };

    // helper function to normalize to HH:mm
    //   const FormLogger = () => {
    //     const start = useWatch({ name: "start" });
    //     const end = useWatch({ name: "end" });
    //     const day = useWatch({ name: "day" });
    //     const sl_name = useWatch({ name: "sl_name" });

    //     console.log("Start Time:", start, "End Time:", end, "Day:", day, "Slot Name:", sl_name);

    //     return null; // we don't render anything
    //   };

    const formatTime = (value) => {
    if (!value) return "";
    if (typeof value === "string") {
      // Already in "HH:mm" format
      return value.length === 5 ? value : dayjs(value).format("HH:mm");
    }
    // If Date object
    return dayjs(value).format("HH:mm");
    };

    

  return (
    <Create {...props} mutationOptions={{ onSuccess }}>
      <SimpleForm>
        
        <TimeInput source="start" parse={formatTime} />
        <TimeInput source="end" parse={formatTime} />
        <TextInput
          source="sl_name"
          parse={(value) => (value ? value.toUpperCase() : "")}
        />
        <SelectInput
          source="day"
          choices={dayChoices}
          optionText="name"
          optionValue="id"
        />
      </SimpleForm>
    </Create>
  );
};


export const edit_Slot = (props) => (
    <Edit {...props}>
    <SimpleForm>
      <TextInput source="id" disabled /> {/* id field (disabled) */}
      <TimeInput source="start" />
      <TimeInput source="end" />
      <SelectInput
        source="day"
        optionText="name"
        optionValue="name"
        choices={dayChoices}
        />
      <TextInput
        source="sl_name"
        parse={(value) => (value ? value.toUpperCase() : "")} // Capitalize before send
        />
    </SimpleForm>
  </Edit>
);


export const get_Slot = () => (
  <List>
    <DataTable>
      <DataTable.Col source="id" />
      <DataTable.Col source="start" />
      <DataTable.Col source="end" />
      <DataTable.Col source="day" />
      <DataTable.Col source="sl_name" />
    </DataTable>
  </List>
);
