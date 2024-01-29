import { Routes, Route } from "react-router-dom"
import Dashboard from "@/containers/Dashboard";
import Login from "@/containers/Auth/Login";
import Register from "@/containers/Auth/Register"

function App() {

  return (
    <div className="app">
      <Routes>
        <Route path={"/dashboard/*"} element={<Dashboard />} key={1} />
        <Route path={"/auth/login"} element={<Login />} key={2} />
        <Route path={"/auth/register"} element={<Register />} key={3} />
      </Routes>
    </div>
  )
}

export default App
