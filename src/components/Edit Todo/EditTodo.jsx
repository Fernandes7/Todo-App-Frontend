import styles from "../AddTodo/Addtodopage.module.css"
import { Autocomplete, Button, Center, Group, Stack, TextInput, Textarea } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm,hasLength } from "@mantine/form"
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";

export default function EditTodoPage(){

    const form=useForm({
        mode: 'uncontrolled',
        initialValues: { taskname:"",taskdescription:"",status:""},
        validate: {
          taskname: hasLength({ min: 3 }, 'Task name must be at least 3 characters'),
          taskdescription:hasLength({min:3},"Description must be alleast 3 character"),
          status:hasLength({min:2},"Status must be select"),
        },
      });

      const [tododata,setTododata]=useState()

    return(
        <div className={styles.Addtodowrap}>
           <h2>Edit your Added Todo</h2>
           <div className={styles.formwrap}>
            <form onSubmit={form.onSubmit(setTododata)}>
            <Stack gap={20}>
            <TextInput  {...form.getInputProps('taskname')} placeholder="Enter the Task Name" label="Task Name" withAsterisk></TextInput>
             <Textarea {...form.getInputProps('taskdescription')} placeholder="Enter the Description of task" label="Describtion about Task" withAsterisk ></Textarea>
             <Autocomplete {...form.getInputProps('status')} placeholder="Select the Status of the Task" label="Status of Task" data={["Todo","Pending","Complete"]} withAsterisk ></Autocomplete>
             <DatePickerInput {...form.getInputProps('dateofcompletion')} placeholder="Select the Completion date of Task" label="Completion date" leftSection={<IconCalendar size={20}/>} clearable defaultValue={new Date()} withAsterisk></DatePickerInput>
             <Center>
              <Group gap={10}>
              <Button>Cancel</Button>
              <Button type="submit" w={150} onClick={()=>console.log(tododata)}>Edit Task</Button>
              </Group>
             </Center>
            </Stack>
            </form>
           </div>
        </div>
    )
}