import { Autocomplete, Box, Button, Center, Group, PasswordInput, Stack, TextInput, Textarea ,Loader,LoadingOverlay} from "@mantine/core"
import styles from "../AddTodo/Addtodopage.module.css"
import { useForm,hasLength } from "@mantine/form"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupFunction } from "../../Api/api";

export default function SignupPage(){

    const history=useNavigate()
    const[loading,setLoading]=useState(false)

    const form=useForm({
        mode: 'uncontrolled',
        initialValues: { useremail:"",userpassword:"",username:"",confirmpassword:""},
        validate: {
          useremail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
          userpassword:hasLength({min:5},"Password length must be greater than 5"),
          username:hasLength({min:3},"The Username contain atleast 3 letter"),
          confirmpassword:(value,values)=>value!=values.userpassword?"The password doesnt match":null
        },
      });

      const register=async()=>{
        const valid=form.isValid()
        if(valid){
           setLoading(true)
           const responce=await signupFunction(form.getValues())
           setLoading(false)
           if(responce.status==201){
            alert("User Registerd Successfullty")
            history("/login")
           }
           else
           alert("This Email id is already Exist")
        }
      }

    return(
        <div className={styles.Addtodowrap}>
           <h2>Register Now</h2>
           <div className={styles.formwrap}>
            <form onSubmit={form.onSubmit(register)}>
            <Stack gap={20}>
            <Box pos={"realtive"}>
            <LoadingOverlay visible={loading} loaderProps={{ children: <Loader size={30} /> }} />
            <TextInput  {...form.getInputProps('username')} placeholder="Enter Your User Name" label="User Name" withAsterisk></TextInput>
            <TextInput  {...form.getInputProps('useremail')} placeholder="Enter the User Email" label="User Email" withAsterisk></TextInput>
             <PasswordInput {...form.getInputProps('userpassword')} placeholder="Enter Your Password" label="User Password" withAsterisk></PasswordInput>
             <PasswordInput {...form.getInputProps('confirmpassword')} placeholder="Conform Password" label="Re Enter your Password" withAsterisk></PasswordInput>
             </Box>
             <Center>
              <Button disabled={loading} type="submit" w={150}>Register</Button>
             </Center>
             <p className={styles.registertext} onClick={()=>history("/login")}>Already Have Account Login Now</p>
            </Stack>
            </form>
           </div>
        </div>
    )
}