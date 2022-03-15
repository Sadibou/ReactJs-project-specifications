import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAddUserMutation } from "../services/userApi";

const initialState = {
  name: "",
  email: "",
};

const AddEditUser = () => {
  const [formValue, setFormValue] = useState(initialState);
  const [editMode, setEditMode] = useState(false);
  const [addUser] = useAddUserMutation();
  const { name, email } = formValue;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
    } else {
      setEditMode(false);
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name && !email) {
      toast.error("Please provide value into each input field");
    } else {
      if (!editMode) {
        await addUser(formValue);
        navigate("/");
        toast.success("User Added Successfully");
      } else {
        navigate("/");
        setEditMode(false);
        toast.success("User Updated Successfully");
      }
    }
  };

  const handleInputChange = (e: any) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name..."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Your Email..."
          value={email || ""}
          onChange={handleInputChange}
        />
       
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEditUser;