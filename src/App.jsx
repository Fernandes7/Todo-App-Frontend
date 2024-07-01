import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AddTodoPage from './components/AddTodo/Addtodopage'
import DashBoard from './components/DashBoard/Dashboard'
import EditTodoPage from './components/Edit Todo/EditTodo'
import LoginPage from './components/Login/Login'
import CreateProjectPage from './components/ProjectPage/CreateProject'
import TodoappPage from './components/Todopage/Todopage'
import SignupPage from './components/Signup/Signup'

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route index element={<DashBoard />}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
        <Route path="/register" element={<SignupPage />}></Route>
        <Route path="/createproject" element={<CreateProjectPage />}></Route>
        <Route path="/todolist/:id" element={<TodoappPage />}></Route>
        <Route path="/addtodo/:id" element={<AddTodoPage />}></Route>
        <Route path="/edittodopage" element={<EditTodoPage />}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
