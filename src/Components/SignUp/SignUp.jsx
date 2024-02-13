import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./SignUp.css";
// const baseurl = "https://joblisting-backend-jmsf.onrender.com"

const SignUp = () => {
  const navigate = useNavigate();
  const [UserState, setUserState] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const validateValues = (UserState) => {
    const errors = {};
    if (!UserState.name) {
      errors.name = "*Name field is required";
    }
    if (!UserState.email) {
      errors.email = "*Email field is required";
    } else if (!/^\S+@\S+\.\S+$/.test(UserState.email)) {
      errors.email = "Invalid email format";
    }

    if (!UserState.mobile) {
      errors.mobile = "*Mobile number is required";
    } else if (UserState.mobile.length !== 10) {
      errors.mobile = "*Enter valid mobile number";
    }
    if (!UserState.password) {
      errors.password = "*Password field is required";
    }
    if (!UserState.acceptTerms) {
      errors.acceptTerms = "*Check this box if you want to proceed";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  // axios.defaults.withCredentials = true;
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValid = validateValues(UserState);
      if (isValid) {
        const response = await axios.post("https://joblisting-backend-jmsf.onrender.com/register", {
          name: UserState.name,
          email: UserState.email,
          mobile: UserState.mobile,
          password: UserState.password,
          acceptTerms: UserState.acceptTerms,
        });

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("UserName", response.data.recruiterName);
        toast.success("Register successful!", {
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
  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const updateForm = (e) => {
    let { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setUserState({
      ...UserState,
      [name]: inputValue,
    });
  };
  return (
    <>
      <div className="container1">
        <div className="signup">
          <div className="heading">
            <div id="h">Create an account</div>
            <div id="p">Your personal job finder is here</div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                name="name"
                value={UserState.name}
                onChange={updateForm}
                className="input-box"
                placeholder="Name"
              />
              <br />
              <span className="error">{errors.name}</span>
              <br />
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
                name="mobile"
                value={UserState.mobile}
                onChange={updateForm}
                className="input-box"
                placeholder="Mobile"
              />
              <br />
              <span className="error">{errors.mobile}</span>
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
            <div className="checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={UserState.acceptTerms}
                onChange={updateForm}
                className="check-box"
              />
              <label>
                By creating an account, I agree to our terms of use and privacy
                policy
              </label>
              <br />
              <span className="error">{errors.acceptTerms}</span>
              <br />
            </div>
            <div>
              <button type="submit" className="signup-btn">
                <div id="signbut">Create Account</div>
              </button>
            </div>
            <div className="rule">
              Already have an account?{" "}
              <span onClick={handleSignUp}>Sign In</span>
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

export default SignUp;
