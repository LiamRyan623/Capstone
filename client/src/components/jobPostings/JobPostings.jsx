import { useEffect, useState } from 'react'
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
<<<<<<< HEAD
=======
  const [currentIndexA, setCurrentIndexA] = useState(0);
  const [currentIndexB, setCurrentIndexB] = useState(0);

>>>>>>> eab4b1b (jobPosting working)
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

      setJobs(data.getAllJobs)
      //console.log(data.getAllJobs)
      // call the fn to make random #s
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (props.token) {
      fetchJobs();
    }
  }, [props.token])

  // console.log("jobs", jobs[0])
  // <h1>{jobs[currentIndex].job}</h1>

  let displayJobs = () => {
    if (jobs[currentIndexA, currentIndexB] !== undefined) {
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
                <CardTitle tag="h5">{jobs[currentIndexA].job}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">{jobs[currentIndexA].company}</CardSubtitle>
                <CardText>{jobs[currentIndexA].description}</CardText>
                <Button>No thanks!</Button>
                <Button>Hire me!</Button>
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
                <CardTitle tag="h5">{jobs[currentIndexB].job}</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">{jobs[currentIndexB].company}</CardSubtitle>
                <CardText>{jobs[currentIndexB].description}</CardText>
                <Button>No thanks!</Button>
                <Button>Hire me!</Button>
              </CardBody>
            </Card>
          </CardGroup>
        </>
      ) 
      } else {
        return (
          <>
          <h1>currently looking for jobs</h1>
        </>
        )
      }
    }
  



  return (
    <>
    {displayJobs()}
    </>
  )
}    
