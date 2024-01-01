import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./EditJob.css";
import axios from "axios";
import { isUserLoggedIn } from "../../utils/utils";
// const baseurl = "https://joblisting-backend-jmsf.onrender.com"


const EditJob = () => {
  const navigate = useNavigate();
  const [JobState, setJobState] = useState({
    companyName: "",
    remote: "",
    skills: "",
    logoURL: "",
    position: "",
    salary: "",
    jobType: "",
    location: "",
    description: "",
    about: "",
  });
  const { jobId } = useParams();
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(
          `https://joblisting-backend-jmsf.onrender.com/viewJob/${jobId}`
        );
        setJobState(response.data.jobPost);
       
      } catch (error) {
        console.error("Error fetching job details:", error.message);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const [isLoggedIn] = useState(isUserLoggedIn());

  const handleEditJob = async (e) => {
    e.preventDefault();
    try {
      if (isLoggedIn) {
        const response = await axios.put(
          `https://joblisting-backend-jmsf.onrender.com/editJob/${jobId}`,
          JobState,
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success("Job Edited successful!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setTimeout(() => {
          navigate(-1);
        }, 1500);
        console.log("Job edited successfully:", response.data);
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.error(error.response.data);
      if (error.message === "tokenExpired") {
        localStorage.removeItem("token");
        localStorage.removeItem("UserName");
      }
    }
  };
  const updateForm = (e) => {
    setJobState({
      ...JobState,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="container2">
        <div className="editjob">
          <div className="heading1">
            <div id="h1">Edit Job Description</div>
          </div>
          <form onSubmit={handleEditJob}>
            <table className="input-field1">
              <tr className="row">
                <td className="ele1">Company Name</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="companyName"
                    value={JobState.companyName}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter your company name here"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Edit logo URL</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="logoURL"
                    value={JobState.logoURL}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter the link"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Job Type</td>
                <td className="ele2">
                  <select
                    id="select-box"
                    name="jobType"
                    value={JobState.jobType}
                    onChange={updateForm}
                  >
                    <option value="">Select</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Intern">Intern</option>
                  </select>
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Remote/office</td>
                <td className="ele2">
                  <select
                    id="select-box"
                    name="remote"
                    value={JobState.remote}
                    onChange={updateForm}
                  >
                    <option value="">Select</option>
                    <option value="Office">Office</option>
                    <option value="Remote">Remote</option>
                  </select>
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Job Position</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="position"
                    value={JobState.position}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter job position"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Monthly salary</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="salary"
                    value={JobState.salary}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter Amount in rupees"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Location</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="location"
                    value={JobState.location}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter Location"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Job Description</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="description"
                    value={JobState.description}
                    onChange={updateForm}
                    className="input-box1"
                    id="box2"
                    placeholder="Type the job description"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">About Company</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="about"
                    value={JobState.about}
                    onChange={updateForm}
                    className="input-box1"
                    id="box2"
                    placeholder="Type about your company"
                  />
                </td>
              </tr>
              <tr className="row">
                <td className="ele1">Skills Required</td>
                <td className="ele2">
                  <input
                    type="text"
                    name="skills"
                    value={JobState.skills}
                    onChange={updateForm}
                    className="input-box1"
                    placeholder="Enter the must have skills"
                  />
                </td>
              </tr>
            </table>
            <div className="but">
              <button onClick={() => navigate(-1)} className="cancle-btn">
                <div id="canclebut">Cancle</div>
              </button>
              <button type="submit" className="editjob-btn">
                <div id="editbut">+ Edit Job</div>
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
        <div className="image-side1">
          <div className="tagline1">Recruiter Edit job details here</div>
        </div>
      </div>
    </>
  );
};

export default EditJob;
