import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsersQuery, useDeleteUserMutation } from "../services/userApi";

const Home = () => {
    const {data, error} = useUsersQuery();
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
        <div>
            <h2>Simple CRUD using redux toolkit query</h2>
            <Link to="/add">
                <button>Add User</button>
            </Link>

            <br />
            <br />

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
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
                                    <button>Edit</button>
                                    </Link>
                                    <button onClick={() => handleDelete(item.id)}>Delete</button>     
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