import { useEffect, useState } from "react";
import {
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
  const [jobs, setJobs] = useState([]);
  const fetchJobs = async () => {
    const url = "http://localhost:4000/job/";
    const requestOptions = {
      method: 'GET',
      headers: new Headers({
        Authorization: props.token
      })
    }

    try {
      const res = await fetch(url, requestOptions);
      const data = await res.json();
      console.log(data);

        setJobs(data.getAllJobs);
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (props.token) {
      fetchJobs();
    }
  }, [props.token]);

  console.log(jobs);

  const [randomNum, setRandomNum] = useState(null)

  const genRandomNum = () => {
    const num = Math.floor(Math.random() * jobs.length)
    setRandomNum(num)
  }

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
            <CardTitle tag="h5"></CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              {jobs[3].company}
            </CardSubtitle>
            <CardText>{jobs[3].description}</CardText>
            <Button>Button</Button>
          </CardBody>
        </Card>
      </CardGroup>
    </>
  );
}
