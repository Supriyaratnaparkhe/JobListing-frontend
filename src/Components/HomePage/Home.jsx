import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import JobList from "../JobList/JobList";
import { isUserLoggedIn } from "../../utils/utils";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    try {
      setIsLoggedIn(isUserLoggedIn());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <>
      {!loading ? (
        <div>
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <JobList isLoggedIn={isLoggedIn} />
        </div>
      ) : (
        loading && <Spinner />
      )}
    </>
  );
};

export default Home;
