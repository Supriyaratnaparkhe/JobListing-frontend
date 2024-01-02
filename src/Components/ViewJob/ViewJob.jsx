import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ViewJob.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";
import { isUserLoggedIn } from "../../utils/utils";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
// const baseurl = "https://joblisting-backend-jmsf.onrender.com"

const ViewJob = () => {
  const [jobs, setJobs] = useState({
    companyName: "",
    remote: "",
    skills: [],
    logoURL: "",
    position: "",
    salary: "",
    jobType: "",
    location: "",
    description: "",
    about: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const { jobId } = useParams();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    try {
      setIsLoggedIn(isUserLoggedIn());
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `https://joblisting-backend-jmsf.onrender.com/viewJob/${jobId}`
        );
        setJobs(response.data.jobPost);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      }
    };

    fetchJobs();
  }, [jobId]);

  return (
    <div className="display-job">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="jobcontainer">
        <div className="highlight">
          <div>
            {jobs.position} {jobs.remote} job/internship at {jobs.companyName}{" "}
            Private Limited{" "}
          </div>
        </div>
        <div className="job-poster">
          <div className="flex-box1">
            <div id="job-type">{jobs.jobType}</div>
            <div id="joblogo">
              <img src={jobs.logoURL} alt="alt" />
            </div>
            <div id="jobcompany">{jobs.companyName}</div>
          </div>
          <div className="flex-box2">
            <div id="jobposition">{jobs.position}</div>
            <div>
              {isLoggedIn ? (
                <div id="editbut">
                  <Link to={`/editJob/${jobId}`}>
                    <button>Edit Job</button>
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div id="joblocation">{jobs.location}</div>
          <div className="flex-box3">
            <div id="jobsalary">
              <span id="sub">
                <img src={image4} alt="" />
                Salary
              </span>
              {jobs.salary}
            </div>
            <div id="jobremote">
              <span id="sub">
                {" "}
                <img src={image5} alt="" />
                Work Mode{" "}
              </span>
              {jobs.remote}
            </div>
          </div>
          <div className="jobheadline">About Company</div>
          <div className="jobinfo">{jobs.about}</div>
          <div className="jobheadline">About the job/Internship</div>
          <div className="jobinfo">{jobs.description}</div>
          <div className="jobheadline">Skill(s) required</div>
          <div className="jobskills">
            {jobs.skills.map((skill, index) => (
              <div key={index} className="skillsLists">
                <div id="skillsLists">{skill}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewJob;
