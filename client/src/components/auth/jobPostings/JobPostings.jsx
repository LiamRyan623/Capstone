import React, { useEffect, useState } from "react";

import { Card, CardTitle, CardBody, CardText, CardGroup, CardSubtitle, CardImg, Button } from 'reactstrap';

export default function JobPostings(props) {
  const [ job, setJobs ] = useState("")
import { useNavigate } from "react-router-dom";

import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  CardSubtitle,
  CardImg,
  Button,
  CardGroup,
} from "reactstrap";

export default function JobPostings(props) {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const url = "http://localhost:4000/job/";
    const requestOptions = {
      method: "GET",
      headers: new Headers({
        Authorization: props.token,
      }),
    };

    // ! Research tinder copy-cat!!!
    // Get-All jobs for array of jobs - pick random index from array - Kate say make a random number generator function - [;'conditionals so you aren't doing same number so no same jobs - easiest way to do this!!  jobs length -1 //! RESEARCH THIS
    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();


      if (data.status === "Job Found") {
        setJobs(data.getAllJobs);
      } else {
        setJobs([{ company: "Host", body: "Oops! No jobs." }]);
      }

      if (data.message === "We did it!") {
        setJobs(data.getJobs);
      } else {
        setJobs([
          { company: "Host", body: "Oops! No jobs."},
        ]);
      }
      // if (data.status === "Job Found") {
      setJobs(data.getAllJobs);
      // } else {
      //   setJobs([{ company: "Host", body: "Oops! No jobs." }]);
      // }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchJobs();
    }
  }, [props.token]);
// let jobs;
  const displayJobs = job?.map((job) => {
    return (
      <>
      <CardGroup>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        {job.job}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
  <Card>
    <CardImg
      alt="Card image cap"
      src="https://picsum.photos/318/180"
      top
      width="100%"
    />
    <CardBody>
      <CardTitle tag="h5">
        Card title
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
        This card has supporting text below as a natural lead-in to additional content.
      </CardText>
      <Button>
        Button
      </Button>
    </CardBody>
  </Card>
</CardGroup>
      </>
    )
  });

  console.log(jobs);
  return (
    <>
      <CardGroup>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">{jobs[3].job}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {jobs[3].company}
            </CardSubtitle>
            <CardText>{jobs[3].description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
        <Card>
          <CardImg
            alt="Card image cap"
            src="https://picsum.photos/318/180"
            top
            width="100%"
          />
          <CardBody>
            <CardTitle tag="h5">{jobs[2].job}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {jobs[2].company}
            </CardSubtitle>
            <CardText>{jobs[2].description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  )};
  );
}
