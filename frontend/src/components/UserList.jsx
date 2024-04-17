import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
const UserList = () => {
    const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:3100/users");
    setUsers(response.data);
    console.log(users)
  };

  useEffect(() => {
    getUsers();
  }, []);


  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:3100/users/delete/${userId}`)
    getUsers()
  } 
  return (
    <div>
        <h1 className='title'>Users</h1>
        <h2 className='subtitle'>List of users</h2>
        <Link className="button is-primary mb-2" to={"/users/add"}>Add Users</Link>
        <table className='table is-striped is-fullwidth'>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index)=>(
                <tr>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                        <Link to={`/users/edit/${user.uuid}`} className='button is-small is-info'>Edit</Link>
                        <button className='button is-small is-danger' onClick={()=>{deleteUser(user.uuid)}}>Delete</button>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  )
}

export default UserList