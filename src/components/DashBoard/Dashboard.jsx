import { Button, Group } from "@mantine/core";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";

export default function DashBoard() {
  const history=useNavigate()
  return (
    <div className={styles.dashboardmain}>
      <div>
         <h3>Welcome to My ToDo</h3>
         <p>Lets Re-Order your Tasks and plan your day</p>
         <Group gap={20}>
            <Button style={{width:100,fontWeight:400}} onClick={()=>history("/login")}>Login</Button>
            <Button style={{width:100, fontWeight:400}} onClick={()=>history("/register")}>Register</Button>
         </Group>
      </div>
    </div>
  );
}
