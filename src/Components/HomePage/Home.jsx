import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import JobList from "../JobList/JobList";
import { isUserLoggedIn } from "../../utils/utils";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  useEffect(() => {
    try {
      setIsLoggedIn(isUserLoggedIn());
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <JobList isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default Home;
