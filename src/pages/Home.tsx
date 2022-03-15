import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsersQuery, useDeleteUserMutation } from "../services/userApi";

const Home = () => {
    const {data, error, isSuccess, isLoading, isFetching} = useUsersQuery();
    const [deleteUser] = useDeleteUserMutation();

    useEffect(() =>{
        if(error){
            toast.error("Something went wrong");
        }
    }, [error])  

    const handleDelete = async (id: any) => {
        if (window.confirm("Are you sure that you wanted to delete that user ?")) {
            await deleteUser(id);
            toast.success("Contact Deleted Successfully");
        }
    };
    return (
        <div style={{ marginTop: "100px" }}>
        <h2>Redux Toolkit RTK Query CRUD with React and JSON Server </h2>
        <Link to="/add">
            <button className="btn btn-add">Add User</button>
        </Link>
        <br />
        <br />
        <table className="styled-table">
            <thead>
            <tr>
                <th style={{ textAlign: "center" }}>ID</th>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
            </tr>
            </thead>
            <tbody>
            {data &&
                data.map((item: any, index: any) => {
                return (
                    <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                        <Link to={`/update/${item.id}`}>
                        <button className="btn btn-edit">Edit</button>
                        </Link>
                        <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(item.id)}
                        >
                        Delete
                        </button>
                        <Link to={`/view/${item.id}`}>
                        <button className="btn btn-view">View</button>
                        </Link>
                    </td>
                    </tr>
                );
                })}
            </tbody>
        </table>
        </div>
    );
};

export default Home;