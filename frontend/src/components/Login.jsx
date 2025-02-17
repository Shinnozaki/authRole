import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser, reset } from "../features/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(()=> {
    if(user || isSuccess) {
      navigate("/dashboard")
    }
    dispatch(reset())
  }, [user, isSuccess, dispatch, navigate])

  const Auth = (e) => {
    e.preventDefault()
    dispatch(LoginUser({email, password}))
  }

  return (
    <div>
      <section className="hero has-background-grey-light is-fullheight is-fullwidth">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-4">
                <form className="box" onSubmit={Auth}>
                  <h1 className="title is-3 has-text-centered">Sign In</h1>
                  {isError && <p className="has-text-centered">{message}</p>}
                  <div className="field">
                    <label htmlFor="">Email</label>
                    <div className="control">
                      <input
                        type="text"
                        className="input"
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="field mt-5">
                    <button type="submit" className="button is-success is-fullwidth">
                      {isLoading ? 'Loading...' : 'Login'}
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
