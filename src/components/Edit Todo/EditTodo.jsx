import styles from "../AddTodo/Addtodopage.module.css"
import { Autocomplete, Box, Button, Center, Group, Stack,LoadingOverlay,Loader, TextInput, Textarea } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { useForm,hasLength } from "@mantine/form"
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { editTododata } from "../../Api/api";

export default function EditTodoPage(){
   const statedata=useLocation()
   const history=useNavigate()
   const {id}=useParams()
   const [editdata,setData]=useState(statedata.state)
   const [loading,setLoading]=useState(false)

   const parseDate = (date) => {
    if (date instanceof Date) {
      return date;
    } else {
      return new Date(date);
    }
  };

    const form=useForm({
        mode: 'uncontrolled',
        initialValues: { taskname:editdata.taskname,taskdescription:editdata.taskdescription,status:editdata.status,dateofcompletion:parseDate(editdata.dateofcompletion)},
        validate: {
          taskname: hasLength({ min: 3 }, 'Task name must be at least 3 characters'),
          taskdescription:hasLength({min:3},"Description must be alleast 3 character"),
          status:hasLength({min:2},"Status must be select"),
        },
      });

      const editTodoFunction=async()=>{
        setLoading(true)
        const valid=form.isValid()
        if(valid){
        const responce=await editTododata(id,form.getValues())
        setLoading(false)
        if(responce.status==201)
        alert("Data Edited Successfully")
        history(-1)
        }
      }


    return(
        <div className={styles.Addtodowrap}>
           <h2>Edit your Added Todo</h2>
           <div className={styles.formwrap}>
            <form onSubmit={form.onSubmit(editTodoFunction)}>
            <Box pos="realitive">
            <LoadingOverlay visible={loading} loaderProps={{ children: <Loader size={30} /> }} />
            <Stack gap={20}>
            <TextInput  {...form.getInputProps('taskname')} placeholder="Enter the Task Name" label="Task Name" withAsterisk></TextInput>
             <Textarea {...form.getInputProps('taskdescription')} placeholder="Enter the Description of task" label="Describtion about Task" withAsterisk ></Textarea>
             <Autocomplete {...form.getInputProps('status')} placeholder="Select the Status of the Task" label="Status of Task" data={["Todo","Pending","Complete"]} withAsterisk ></Autocomplete>
             <DatePickerInput {...form.getInputProps('dateofcompletion')} placeholder="Select the Completion date of Task" label="Completion date" leftSection={<IconCalendar size={20}/>} clearable  withAsterisk></DatePickerInput>
             <Center>
              <Group gap={10}>
              <Button onClick={()=>history(-1)}>Cancel</Button>
              <Button type="submit" w={150} loading={loading}>Edit Task</Button>
              </Group>
             </Center>
            </Stack>
            </Box>
            </form>
           </div>
        </div>
    )
}