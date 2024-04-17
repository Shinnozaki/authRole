import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [role, setRole] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:3100/users/${id}`);
        setName(response.data.name);
        setEmail(response.data.email);
        setRole(response.data.role);
        setPassword(response.data.password);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);

  const updateUser = async (e) => {
    e.preventDefault();
    if (confirmPass !== password) {
      setMsg("confirm pass doesn't match")
    } else {
      try {
        await axios.patch(`http://localhost:3100/users/update/${id}`, {
          name: name,
          email: email,
          role: role,
          password: password,
        });
        navigate("/users");
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    }
  };

  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Update User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form onSubmit={updateUser}>
            <p className="has-text-centered">{msg}</p>
              <h1 className="title is-3 is-centered">Update User</h1>

              <div className="field">
                <label htmlFor="">Name</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Email</label>
                <div className="control">
                  <input
                    type="email"
                    className="input"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Confirm Password</label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    placeholder="password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <button className="button is-success">Update</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
