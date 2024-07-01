import { Button, Group } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import styles from "./Todopage.module.css"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { deleteTodo, fetchalltodobyprojectid } from "../../Api/api"

export default function ListofTodos({projectid}){
const history=useNavigate()
const[todos,setTodos]=useState([])
const[filtertodos,setFilterTodos]=useState([])
const[filterbuttontype,setFilterButtonType]=useState("all")


const filtertype=(type)=>{
const filterdata=todos.filter((item)=>item.status==type)
setFilterTodos(filterdata)
setFilterButtonType(type)
}

useEffect(()=>{
fetchTodofunction()
},[])

 const fetchTodofunction=async()=>{
 const responce=await fetchalltodobyprojectid(projectid)
 if(responce.status==200)
{
setTodos(responce.data.data)
setFilterTodos(responce.data.data)
}
}

const alltodoFunction=()=>{
    setFilterTodos(todos)
    setFilterButtonType("all")
}


const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const deletetodofunction=async(todoname,tododid)=>{
  const deleteifyes=window.confirm(`Are you Sure to Delete Task "${todoname}"`)
  if(deleteifyes)
  {
    const responce=await deleteTodo(tododid)
    if(responce.status==200)
    fetchTodofunction()
    else
    alert("Failed to delete Task")
  }
  }

return(
    <div className={styles.listoftodomain}>
    <h4>My saved Todos </h4>
    <Button color={"darkblue"} rightSection={<IconArrowRight size={14} />} onClick={()=>history(`/addtodo/${projectid}`)}>Add Your To Do</Button>
    <Group gap={10} mt={40}>
        <Button size="xs" variant={filterbuttontype=="all"?null:"outline"} onClick={alltodoFunction}>All Todo</Button>
        <Button size="xs" variant={filterbuttontype=="Todo"?null:"outline"} onClick={()=>filtertype("Todo")}>Todo</Button>
        <Button size="xs" variant={filterbuttontype=="Pending"?null:"outline"} onClick={()=>filtertype("Pending")}>Pending</Button>
        <Button size="xs" variant={filterbuttontype=="Complete"?null:"outline"} onClick={()=>filtertype("Complete")}>Completed</Button>
    </Group>
    <div className={styles.todotablewrap}>
        <div className={styles.todotablehead}>
            <div>SI No</div>
            <div>Task Name</div>
            <div>Task Description</div>
            <div>Status</div>
            <div>Completion Date</div>
            <div>Options</div>
        </div>



        {(filtertodos && filtertodos.length>0) ? filtertodos.map((item,key)=>{
        return(
            <div key={key} className={styles.todotabledata}>
           <div>{key+1}</div>
            <div>{item.taskname}</div>
            <div>{item.taskdescription}</div>
            <div>{item.status}</div>
            <div>{formatDate(item.dateofcompletion)}</div>
            <div>
                <img src="https://cdn-icons-png.flaticon.com/128/7073/7073677.png" alt="Edit Button"  onClick={()=>history(`/edittodopage/${item._id}`,{state:item})}/>
                <img src="https://cdn-icons-png.flaticon.com/128/484/484662.png" alt="Delete Button" onClick={()=>deletetodofunction(item.taskname,item._id)}/>
            </div>
        </div>
        )
        }):<div>
            <p style={{textAlign:"center",marginTop:100,fontFamily:"Raleway"}}>
            Currently No Task Assigned in this Category
            </p>
            </div>}



    </div>
    </div>

)
}