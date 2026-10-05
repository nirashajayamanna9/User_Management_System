import "./App.css";
import { Routes, Route } from "react-router-dom";
import AddUser from "./features/userAddFrom";
import UserList from "./features/userList";
import EditUser from "./features/userEditFrom";
import Login from "./features/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user-list" element={<UserList />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
      </Routes>
    </div>
  );
}

export default App;