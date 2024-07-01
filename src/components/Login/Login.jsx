import { Button,Text, Center, PasswordInput, Stack, TextInput,LoadingOverlay,Box, Loader } from "@mantine/core";
import { hasLength, useForm } from "@mantine/form";
import { loginFunction } from "../../Api/api";
import styles from "../AddTodo/Addtodopage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage(){
   
   const history=useNavigate()
   const[loading,setLoading]=useState(false)

    const form=useForm({
        mode: 'uncontrolled',
        initialValues: { useremail:"",userpassword:""},
        validate: {
          useremail: hasLength({ min: 3 }, ' Useremail cannot be empty'),
          userpassword:hasLength({min:3},"Password Cannot be empty"),
        },
      });

      const login=async()=>{
        const valid=form.isValid()
        if(valid){
            setLoading(true)
            const responce=await loginFunction(form.getValues())
            setLoading(false)
            if(responce.status==200){
              alert("Login Successfull")
              history("/createproject")
            }
            else
            alert("Invalid password or Username")
        }
      }

    return(
        <div className={styles.Addtodowrap}>
           <h2>Login Page</h2>
           <div className={styles.formwrap}>
            <form onSubmit={form.onSubmit(login)}>
            <Stack gap={20}>
            <Box pos="relative">
            <LoadingOverlay visible={loading} loaderProps={{ children: <Loader size={30} /> }} />
            <TextInput  {...form.getInputProps('useremail')} placeholder="Enter the User Email" label="User Name" withAsterisk></TextInput>
             <PasswordInput {...form.getInputProps('userpassword')} placeholder="Enter Your Password" label="User Password" withAsterisk></PasswordInput>
             </Box>
             <Center>
              <Button type="submit" w={150} disabled={loading}>Login</Button>
             </Center>
             <p className={styles.registertext} onClick={()=>history("/register")}>New Member Register Now</p>
            </Stack>
            </form>
           </div>
        </div>
    )
}