import { Button,TextInput,CloseButton,Input, Loader, Center } from "@mantine/core"
import styles from "./Createproject.module.css"
import { useEffect, useState } from "react"
import { addProject, fetchUserdetails, viewProjects } from "../../Api/api"
import { hasLength, useForm } from "@mantine/form"
import { useNavigate } from "react-router-dom"

export default function CreateProjectPage(){
    const[userdata,setUserdata]=useState()
    const[project,setProject]=useState([])
    const[searchfilter,setSearchfilter]=useState()
    const[searchvalue,setSeachValue]=useState()
    const [loading,setLoading]=useState(false)
    const history=useNavigate()


    const form=useForm({
        mode:"controlled",
        initialValues:{projectname:""},
        validate:{
            projectname:hasLength({min:3},"Project name length must greater than 3 ")
        }
    })
    
    useEffect(()=>{
    fetchuserdata()
    fetchProjects()
    },[])


    const fetchuserdata=async()=>{
        const responce=await fetchUserdetails()
        setUserdata(responce.data.data)
        
    }

    const fetchProjects=async()=>{
        const responce=await viewProjects()
        setProject(responce.data.data)
        setSearchfilter(responce.data.data)
    }

    const addTodo=async()=>{
        const valid=form.isValid()
        setLoading(true)
        if(valid){
            const responce=await addProject(form.getValues().projectname)
            setLoading(false)
            if(responce){
            fetchProjects()
            form.reset()
            }
            
        }
    }

    const filterfunction=(e)=>{
        const value = e.target.value;
        if (value) {
          setSeachValue(value)
          const filtered = project.filter((item) =>
            item.projectname.toLowerCase().startsWith(value.toLowerCase())
          );
          console.log(filtered)
          setSearchfilter(filtered);
        } else {
          setSearchfilter(project);
        }
    }

    const clearSerachfilter=()=>{
        setSeachValue("")
        setSearchfilter(project)
    }

    return(
        <div className={styles.createprojectbody}>
            <h2>My ToDo App</h2>
            <p>Welcome {userdata && userdata.username} !</p>
            <form onSubmit={form.onSubmit(addTodo)}>
                <div style={{display:"flex",gap:10}}>
                <TextInput {...form.getInputProps('projectname')} placeholder="Enter the name of project to create" className={styles.createprojectinput} ></TextInput>
                <Button type="submit" rightSection={loading && <Loader size={20}></Loader>}>Add Project</Button>
                </div>
                </form>
            <div className={styles.projectlistdiv}>
            <h3>My Projects</h3>
            <TextInput placeholder="Enter the Project name to Search" style={{width:300}} rightSection={<CloseButton aria-label="Clear input" onClick={clearSerachfilter}/>} value={searchvalue} onChange={filterfunction}/>
            <div className={styles.projectsdiv}>
                {( searchfilter && searchfilter.length>0) ? searchfilter.map((item,key)=>{
                    return(
                        <div key={key} onClick={()=>history(`/todolist/${item._id}`)}>{item.projectname}</div>
                    )
                }):<p style={{marginTop:100,textAlign:"center",width:"100%"}}>Currently No prejects are aviilable or not created !</p>}
            </div>
            </div>    
        </div>
    )
}