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

export default function JobPostings(props) {
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);
  const [currentJobs, setCurrentJobs] = useState([]);

  useEffect(() => {
    if (props.token) {
      fetchJobs();
    }
  }, [props.token]);

  useEffect(() => {
    setCurrentJobs([getRandomJob(), getRandomJob()]);
  }, [availableJobs]);

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
      console.log(availableJobs);
    } catch (err) {
      console.log(err);
    }
  };

  function getRandomJob() {
    let filteredJobs = availableJobs.filter(
      (job) =>
        !likedJobs.includes(job._id) &&
        !dislikedJobs.includes(job._id) &&
        !currentJobs.find(
          (currentJob) => currentJob && currentJob._id === job._id
        )
    );

    if (filteredJobs.length === 0) {
      // No more available jobs
      return null;
    }

    const randomIndex = Math.floor(Math.random() * filteredJobs.length);
    const randomJob = filteredJobs[randomIndex];

    return randomJob;
  }

  useEffect(() => {
    const job1 = getRandomJob();
    let job2 = getRandomJob();

    // Ensure job2 is not the same as job1
    while (job1 && job2 && job1._id === job2._id) {
      job2 = getRandomJob();
    }

    setCurrentJobs([job1, job2]);
  }, [availableJobs, likedJobs, dislikedJobs]);

  function handleLike(jobId) {
    const likedJob = currentJobs.find((job) => job._id === jobId);
    setLikedJobs((prevLikedJobs) => [...prevLikedJobs, likedJob]);
    setAvailableJobs((prevAvailableJobs) =>
      prevAvailableJobs.filter((job) => job._id !== jobId)
    );

    if (availableJobs.length === 1) {
      setCurrentJobs([getRandomJob()]);
    } else {
      setCurrentJobs((prevCurrentJobs) =>
        prevCurrentJobs.map((job) => (job._id === jobId ? getRandomJob() : job))
      );
    }
  }

  function handleDislike(jobId) {
    const dislikedJob = currentJobs.find((job) => job._id === jobId);
    setDislikedJobs((prevDislikedJobs) => [...prevDislikedJobs, dislikedJob]);
    setAvailableJobs((prevAvailableJobs) =>
      prevAvailableJobs.filter((job) => job._id !== jobId)
    );

    if (availableJobs.length === 1) {
      setCurrentJobs([getRandomJob()]);
    } else {
      setCurrentJobs((prevCurrentJobs) =>
        prevCurrentJobs.map((job) => (job._id === jobId ? getRandomJob() : job))
      );
    }
  }

  useEffect(() => {
    console.log("Available Jobs:", availableJobs);
  }, [availableJobs]);

  return (
    <>
      <div id="background">
        <img
          id="logo"
          style={{
            margin: "1em",
            height: "70px",
            width: "100px",
          }}
          src="https://i.ibb.co/7NpG7dv/Career-Clash.png"
          alt="Logo"
        ></img>
        <Container id="mainCont">
          {!availableJobs || availableJobs.length === 0 ? (
            <div id="noJobsMessage">
              <h2>Currently searching for new jobs...</h2>
            </div>
          ) : (
            currentJobs.map(
              (job) =>
                job && ( // Add a null check for the job
                  <Card id="jobCard" key={job._id}>
                    <CardImg
                      alt="Card image cap"
                      src="https://picsum.photos/318/180"
                      top
                      width="100%"
                    />
                    <CardBody className="job-card-content">
                      <CardTitle tag="h5">{job.job}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {job.company}
                      </CardSubtitle>
                      <CardText className="card-text">
                        {job.description}
                      </CardText>
                      <Button onClick={() => handleDislike(job._id)}>
                        No thanks!
                      </Button>
                      <Button onClick={() => handleLike(job._id)}>
                        Hire me!
                      </Button>
                    </CardBody>
                  </Card>
                )
            )
          )}
        </Container>
        <div className="job-list">
          <h3 className="listTitle">My Jobs</h3>
          {likedJobs.map((job) => (
            <div className="job-item" key={job._id}>
              <h4 className="job-title">{job.job}</h4>
              <p className="company">{job.company}</p>
              <p className="description">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
