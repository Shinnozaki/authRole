import React from "react";

const AddUser = () => {
  return (
    <div>
      <h1 className="title">Users</h1>
      <h2 className="subtitle">Add New User</h2>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <form>
              <h1 className="title is-3 is-centered">Add User</h1>

              <div className="field">
                <label htmlFor="">Name</label>
                <div className="control">
                  <input type="text" className="input" placeholder="name" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Email</label>
                <div className="control">
                  <input type="email" className="input" placeholder="email" />
                </div>
              </div>

              <div className="field">
                <label htmlFor="">Role</label>
                <div className="control">
                  <div className="select is-fullwidth">
                    <select>
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
                  />
                </div>
              </div>

              <div className="field">
                <div className="control"> 
                  <button className="button is-success">
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
