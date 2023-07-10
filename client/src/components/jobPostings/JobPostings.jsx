import { useEffect, useState } from "react";
import "./JobPostings.css";
import {
  Container,
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardGroup,
  CardSubtitle,
  CardImg,
  Button,
} from "reactstrap";
import JobCard from "./JobCards";

export default function JobPostings(props) {
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState({});
  const [currentJobA, setCurrentJobA] = useState({});
  const [currentJobB, setCurrentJobB] = useState({});
  const [image1, setImage1] = useState(
    "https://picsum.photos/318/180?random=1"
  );
  const [image2, setImage2] = useState(
    "https://picsum.photos/318/180?random=2"
  );

  useEffect(() => {
    if (props.token) {
      fetchJobs();

      const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
      setLikedJobs(savedJobs);
    }
  }, [props.token]);

  // useEffect(() => {
  //   setCurrentJobA(currentJobs.jobA);
  //   setCurrentJobB(currentJobs.jobB);
  // }, []);

  const fetchJobs = async () => {
    const url = "http://localhost:4000/job/";
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();

      setAvailableJobs(data.getAllJobs);
      setCurrentJobA(data.getAllJobs[0]);
      setCurrentJobB(data.getAllJobs[1]);
    } catch (err) {
      console.log(err);
    }
  };

  function getRandomJob() {
    let filteredJobs = availableJobs.filter(
      (job) =>
        !likedJobs.includes(job._id) &&
        !dislikedJobs.includes(job._id) &&
        (currentJobA ? currentJobA._id !== job._id : true) &&
        (currentJobB ? currentJobB._id !== job._id : true)
    );

    // console.log(filteredJobs);
    // console.log(currentJobs);

    if (filteredJobs.length === 0) {
      // No more available jobs
      return null;
    }

    if (filteredJobs.length === 1) {
      // Only one job left
      return filteredJobs[0];
    }

    const randomIndex = Math.floor(Math.random() * filteredJobs.length);
    const randomJob = filteredJobs[randomIndex];

    return randomJob;
  }

  useEffect(() => {
    setCurrentJobs((prevCurrentJobs) => ({
      ...prevCurrentJobs,
      jobA: currentJobA,
      jobB: currentJobB,
    }));

    // setCurrentJobs((prevCurrentJobs) => ({
    //   ...prevCurrentJobs,

    // }));

    console.log(currentJobs);
    // console.log("Job A", currentJobA);
  }, [availableJobs, likedJobs, dislikedJobs]);

  // useEffect(() => {
  //   setCurrentJobs((prevCurrentJobs) => ({
  //     ...prevCurrentJobs,
  //     jobA: getRandomJob(),
  //   }));
  //   // setCurrentJobA(currentJobs.jobA);
  // }, [availableJobs, likedJobs, dislikedJobs]);

  // useEffect(() => {
  //   setCurrentJobs((prevCurrentJobs) => ({
  //     ...prevCurrentJobs,
  //     jobB: getRandomJob(),
  //   }));
  //   // setCurrentJobB(currentJobs.jobB);
  // }, [availableJobs, likedJobs, dislikedJobs]);

  // useEffect(() => {
  //   setCurrentJobA(currentJobs.jobA);
  //   setCurrentJobB(currentJobs.jobB);
  // }, [availableJobs]);

  useEffect(() => {
    const job1 = getRandomJob();
    let job2 = getRandomJob();

    // Ensure job2 is not the same as job1
    while (job1 && job2 && job1._id === job2._id) {
      job2 = getRandomJob();
    }

    setCurrentJobs({ jobA: job1, jobB: job2 });
  }, [availableJobs, likedJobs, dislikedJobs]);

  function handleLike(jobId) {
    // const { jobA, jobB } = currentJobs;

    if (currentJobA._id === jobId) {
      setLikedJobs((prevLikedJobs) => [...prevLikedJobs, currentJobA]);
      setAvailableJobs((prevAvailableJobs) =>
        prevAvailableJobs.filter((job) => job._id !== jobId)
      );
      setCurrentJobA(getRandomJob());
      setImage1(newImgString());
      //console.log(currentJobA);
    }

    if (currentJobB._id === jobId) {
      setLikedJobs((prevLikedJobs) => [...prevLikedJobs, currentJobB]);
      setAvailableJobs((prevAvailableJobs) =>
        prevAvailableJobs.filter((job) => job._id !== jobId)
      );
      localStorage.setItem("savedJobs", JSON.stringify(likedJobs));

      setCurrentJobB(getRandomJob());
      setImage2(newImgString());
      //console.log(currentJobB);
    }
  }

  function handleDislike(jobId) {
    // const { jobA, jobB } = currentJobs;

    if (currentJobA._id === jobId) {
      setDislikedJobs((prevDislikedJobs) => [...prevDislikedJobs, currentJobA]);
      setAvailableJobs((prevAvailableJobs) =>
        prevAvailableJobs.filter((job) => job._id !== jobId)
      );
      setCurrentJobA(getRandomJob());
      setImage1(newImgString());
    }

    if (currentJobB._id === jobId) {
      setDislikedJobs((prevDislikedJobs) => [...prevDislikedJobs, currentJobB]);
      setAvailableJobs((prevAvailableJobs) =>
        prevAvailableJobs.filter((job) => job._id !== jobId)
      );
      setCurrentJobB(getRandomJob());
      setImage2(newImgString());
    }
  }

  function newImgString() {
    const num = Math.floor(Math.random() * 60);

    let futureSrc = `https://picsum.photos/318/180?random=${num}`;

    return futureSrc;
  }

  useEffect(() => {
    console.log("Available Jobs:", availableJobs);
  }, [availableJobs]);

  return (
    <>
      <div id="background">
        <a href="/profile">
          <img
            id="logo"
            style={{
              margin: "1em",
              height: "70px",
              width: "100px",
            }}
            src="https://i.ibb.co/7NpG7dv/Career-Clash.png"
            alt="Logo"
          />
        </a>
        <Container id="mainCont">
          {!availableJobs || availableJobs.length === 0 ? (
            <div id="noJobsMessage">
              <h2>Currently searching for new jobs...</h2>
            </div>
          ) : (
            <>
              {currentJobA && (
                <Card id="jobCard" key={currentJobA._id}>
                  <CardImg alt="Card image cap" src={image1} top width="100%" />
                  <CardBody className="job-card-content">
                    <CardTitle tag="h5">{currentJobA.job}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {currentJobA.company}
                    </CardSubtitle>
                    <CardText className="card-text">
                      {currentJobA.description}
                    </CardText>
                    <Button
                      className="btn"
                      onClick={() => handleDislike(currentJobA._id)}
                    >
                      No thanks!
                    </Button>
                    <Button
                      className="btn"
                      onClick={() => handleLike(currentJobA._id)}
                    >
                      Hire me!
                    </Button>
                  </CardBody>
                </Card>
              )}
              {currentJobB && (
                <Card id="jobCard" key={currentJobB._id}>
                  <CardImg alt="Card image cap" src={image2} top width="100%" />
                  <CardBody className="job-card-content">
                    <CardTitle tag="h5">{currentJobB.job}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {currentJobB.company}
                    </CardSubtitle>
                    <CardText className="card-text">
                      {currentJobB.description}
                    </CardText>
                    <Button
                      className="btn"
                      onClick={() => handleDislike(currentJobB._id)}
                    >
                      No thanks!
                    </Button>
                    <Button
                      className="btn"
                      onClick={() => handleLike(currentJobB._id)}
                    >
                      Hire me!
                    </Button>
                  </CardBody>
                </Card>
              )}
            </>
          )}
        </Container>
        <div className="job-list">
          <h2 className="listTitle">My Jobs</h2>
          {likedJobs.map((job) => (
            <div className="job-item" key={job._id}>
              <h3 className="job-title">{job.job}</h3>
              <p className="company">{job.company}</p>
              <p className="description">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
