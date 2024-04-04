import React from "react";

const Login = () => {
  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form className="box">
                  
                  <h1 className="title is-3 is-centered">Sign In</h1>

                  <div className="field">
                    <label htmlFor="">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="email"
                      />
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
                  
                  <div className="field mt-5">
                    <button className="button is-success is-fullwidth">
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
