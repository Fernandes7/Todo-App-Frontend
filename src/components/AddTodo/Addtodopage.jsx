import { Autocomplete, Box, Button, Center, Group, Stack,LoadingOverlay,Loader, TextInput, Textarea } from "@mantine/core"
import styles from "./Addtodopage.module.css"
import { DatePickerInput } from "@mantine/dates"
import { useForm,hasLength } from "@mantine/form"
import { useState } from "react";
import { IconCalendar } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { addtodoapifunction } from "../../Api/api";

export default function AddTodoPage(){

    const {id}=useParams()
    const history=useNavigate()

    const[loading,setLoading]=useState(false)

    const form=useForm({
        mode: 'uncontrolled',
        initialValues: { taskname:"",taskdescription:"",status:"",dateofcompletion:new Date()},
        validate: {
          taskname: hasLength({ min: 3 }, 'Task name must be at least 3 characters'),
          taskdescription:hasLength({min:3},"Description must be alleast 3 character"),
          status:hasLength({min:2},"Status must be select"),
        },
      });

      const addtodofunction=async()=>{
      const valid=form.isValid()
      setLoading(true)
      if(valid){
        const responce=await addtodoapifunction(id,form.getValues())
        setLoading(false)
        if(responce.status==201){
          history(`/todolist/${id}`)
        }
        console.log(responce)

      }
      
      }

    return(
        <div className={styles.Addtodowrap}>
           <h2>Add your ToDo</h2>
           <div className={styles.formwrap}>
            <form onSubmit={form.onSubmit(addtodofunction)}>
            <Box pos="relative">
            <Stack gap={20}>
            <LoadingOverlay visible={loading} loaderProps={{ children: <Loader size={30} /> }} />
            <TextInput  {...form.getInputProps('taskname')} placeholder="Enter the Task Name" label="Task Name" withAsterisk></TextInput>
             <Textarea {...form.getInputProps('taskdescription')} placeholder="Enter the Description of task" label="Describtion about Task" withAsterisk ></Textarea>
             <Autocomplete {...form.getInputProps('status')} placeholder="Select the Status of the Task" label="Status of Task" data={["Todo","Pending","Complete"]} withAsterisk ></Autocomplete>
             <DatePickerInput {...form.getInputProps('dateofcompletion')} placeholder="Select the Completion date of Task" label="Completion date" leftSection={<IconCalendar size={20}/>} clearable defaultValue={new Date()} withAsterisk></DatePickerInput>
             <Center>
              <Group gap={10}>
              <Button type="submit" w={150} disabled={loading}>Add Task</Button>
              </Group>
             </Center>
            </Stack>
            </Box>
            </form>
           </div>
        </div>
    )
}