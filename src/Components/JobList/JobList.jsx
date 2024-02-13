import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./JobList.css";
import image3 from "../assets/image3.png";
// import Spinner from "../Spinner/Spinner";

const JobList = ({ isLoggedIn }) => {
  const [jobs, setJobs] = useState([]);
  const [position, setPosition] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  // const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `https://joblisting-backend-jmsf.onrender.com/listjobs?skills=${selectedSkills.join(
            ","
          )}&position=${position}`
        );
        setJobs(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
      } 
      // finally {
      //   setLoading(false);
      // }
    };

    fetchJobs();
  }, [selectedSkills, position]);

  const handleSkillsChange = (e) => {
    const selectedSkill = e.target.value;
    if (!selectedSkills.includes(selectedSkill)) {
      setSelectedSkills((prevSelectedSkills) => [
        ...prevSelectedSkills,
        selectedSkill,
      ]);
    }
    e.target.value = "";
  };

  const removeSkill = (removedSkill) => {
    setSelectedSkills((prevSelectedSkills) =>
      prevSelectedSkills.filter(
        (selectedSkills) => selectedSkills !== removedSkill
      )
    );
  };
  const handlePositionChange = (e) => {
    setPosition(e.target.value);
  };
  const handleclearAll = () => {
    setSelectedSkills([]);
    setPosition("");
  };
  const handleAddJob = (e) => {
    e.preventDefault();
    navigate("/addJob");
  };

  return (
    <>

        <div>
          <div className="search-container">
            <div>
              <form>
                <input
                  className="nosubmit"
                  id="position"
                  type="search"
                  name="position"
                  value={position}
                  onChange={handlePositionChange}
                  placeholder="Type any job title"
                />
              </form>
            </div>
            <div className="container2">
              <div className="skills-container">
                <div className="select-option">
                  <select
                    id="skills"
                    name="selectedSkills"
                    value={selectedSkills.join(",")}
                    onChange={handleSkillsChange}
                  >
                    <option value="">Skills</option>
                    <option value="html">HTML</option>
                    <option value="css">CSS</option>
                    <option value="js">Javascript</option>
                    <option value="react">React</option>
                    <option value="angular">Angular</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                </div>
                <div>
                  <div className="selected-skill">
                    {selectedSkills.map((selectedSkill) => (
                      <div className="display-skill" key={selectedSkill}>
                        <div className="skill-name">{selectedSkill}</div>
                        <div className="close">
                          <button onClick={() => removeSkill(selectedSkill)}>
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {isLoggedIn ? (
                <div className="add-job">
                  <button onClick={handleAddJob}> + Add Job</button>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="clear" onClick={handleclearAll}>
              clear
            </div>
          </div>
          <div className="jobs-container">
            <div>
              {jobs.map((job) => (
                <div key={job._id} id="job-detail">
                  <div className="job-item">
                    <div className="logo">
                      <img src={job.logoURL} alt="alt" />
                    </div>
                    <div className="job-details">
                      <div id="job-position">{job.position}</div>

                      <div id="salary">₹ {job.salary}</div>

                      <div className="job-det1">
                        <div id="remote">{job.remote}</div>
                        <div id="jobtype">{job.jobType}</div>
                      </div>
                    </div>
                    <div className="job-details2">
                      <div>
                        <img src={image3} alt="" />
                      </div>
                      <div id="location">{job.location}</div>
                    </div>
                    <div className="job-details3">
                      <div className="skills">
                        {job.skills.map((skill, index) => (
                          <div key={index} className="skills-list">
                            <div id="skills-list">{skill}</div>
                          </div>
                        ))}
                      </div>
                      <div className="job-buttons">
                        {isLoggedIn ? (
                          <div id="edit-but">
                            <Link to={`/editJob/${job._id}`}>
                              <button>Edit Job</button>
                            </Link>
                          </div>
                        ) : (
                          ""
                        )}
                        <div id="view-but">
                          <Link to={`/viewJob/${job._id}`}>
                            <button>View details</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

    </>
  );
};

export default JobList;
