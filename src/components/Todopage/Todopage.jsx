import { CloseButton, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import ListofTodos from "./ListTodos";
import styles from "./Todopage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { deleteproject, editprojectnameapi, findprojectbyid } from "../../Api/api";

export default function TodoappPage() {
  const {id}=useParams()
  const [projectname,setProjectname]=useState()
  const [enableEditProjectName, setenableProjectName] = useState(false);
  const [editprojectname,setEnableeditprojecname]=useState()
  const history=useNavigate()
  

  useEffect(()=>{
  fetchProjectbyid(id)
  },[])
  
  const fetchProjectbyid=async(id)=>{
  const responce=await findprojectbyid(id)
  setProjectname(responce.data.data.projectname)
  setEnableeditprojecname(responce.data.data.projectname)
  }

  const enableprojectedit = () => {
    setenableProjectName(!enableEditProjectName);
  };

  const editprojectnamefunction=async()=>{
    if(editprojectname.length>0)
    {
    if(editprojectname!=projectname)
    {
    const responce=await editprojectnameapi(id,{projectname:editprojectname})
    if(responce.status==200)
    {
     enableprojectedit()
     fetchProjectbyid(id) 
    }
    }
    else
    enableprojectedit()
    }
    else
    alert("Project name cannot be Empty")
    
  }

  const deleteprojectfunction=async(projectid,projectname)=>{
  const dodelete=window.confirm(`Are you really wnat to delete project ${projectname}`)
  if(dodelete)
  {
  const responce=await deleteproject(projectid)
  if(responce.status==200)
  history(-1)
  }
  }

  return (
    <div className={styles.todoappmaindiv}>
      {!enableEditProjectName ? (
        <div className={styles.projectnamediv}>
          <h3>{projectname && projectname}</h3>
          <div onClick={enableprojectedit}>
            <img
              src="https://cdn-icons-png.flaticon.com/128/2356/2356780.png"
              alt="editIcon"
            />
          </div>
        </div>
      ) : (
        <div className={styles.editprojectnamediv}>
          <TextInput
            value={editprojectname}
            rightSection={<CloseButton aria-label="Clear input" style={{cursor:"pointer"}} onClick={enableprojectedit}/>} onChange={(e)=>setEnableeditprojecname(e.target.value)}
          ></TextInput>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/5290/5290989.png"
              alt="editIcon" onClick={editprojectnamefunction}
            />
          </div>
          <div>
            <img
              src="https://cdn-icons-png.flaticon.com/128/1214/1214428.png"
              alt="editIcon" onClick={()=>deleteprojectfunction(id,projectname)}
            />
          </div>
        </div>
      )}
      <ListofTodos projectid={id} projectname={projectname} />
    </div>
  );
}
