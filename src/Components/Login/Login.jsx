import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import axios from "axios";
const baseurl = "https://joblisting-backend-jmsf.onrender.com"

const Login = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }
    if (!UserState.password) {
      errors.password = "*Password field is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateValues(UserState);

      if (isValid) {
        const response = await axios.post(`${baseurl}/login`, {
          email: UserState.email,
          password: UserState.password,
          name: UserState.name,
        });
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("UserName", response.data.recruiterName);

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate("/");
        }, 1500);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  const updateForm = (e) => {
    let { name, value } = e.target;
    const inputValue = value;
    setUserState({
      ...UserState,
      [name]: inputValue,
    });
  };
  return (
    <>
      <ToastContainer />
      <div className="container2">
        <div className="Login">
          <div className="heading">
            <div id="h1">Already have an account?</div>
            <div id="p1">Your personal job finder is here</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="email"
                name="email"
                value={UserState.email}
                onChange={updateForm}
                className="input-box"
                placeholder="Email"
              />
              <br />
              <span className="error">{errors.email}</span>
              <br />
              <input
                type="text"
                name="password"
                value={UserState.password}
                onChange={updateForm}
                className="input-box"
                placeholder="Password"
              />
              <br />
              <span className="error">{errors.password}</span>
              <br />
            </div>
            <div>
              <button type="submit" className="signin-btn">
                <div id="signbut">Sign In</div>
              </button>
            </div>
            <div className="rule">
              Don't have an account? <span onClick={handleSignIn}>Sign Up</span>
            </div>
          </form>
          <ToastContainer />
        </div>
        <div className="image-side">
          <div className="tagline">Your Personal Job Finder</div>
        </div>
      </div>
    </>
  );
};

export default Login;
