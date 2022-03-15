import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddEditUser from "./pages/AddEditUser";


function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddEditUser />} />
        <Route path="/update/:id" element={<AddEditUser />} />
      </Routes>
    </div>
  );
}

export default App;