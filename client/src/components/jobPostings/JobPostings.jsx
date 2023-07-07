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
  const [currentIndexA, setCurrentIndexA] = useState(0);
  const [currentIndexB, setCurrentIndexB] = useState(15);
  const [likedJobs, setLikedJobs] = useState([]);
  const [dislikedJobs, setDislikedJobs] = useState([]);
  
  function getRandomIndices(arr) {
    // nested fn to create a random num
    let makeNum = () => {
      return Math.floor(Math.random() * (arr.length - 1));
    }

    // Assign values
    let numA = makeNum();
    let numB = makeNum();
    console.log(`Pre if else log: numA is ${numA}, numB is ${numB}`)
    // nested fn to check if valid num, return from nested fun
      if (numA !== numB) {
        // only return the values when all if cases pass
        setCurrentIndexA(numA)
      setCurrentIndexB(numB)
      } else if (numA < 0 || numB < 0) {
        // if check for num A and if check 
        if (numA < 0) {
          return numA * -1
        }
        if (numB < 0) {
          return numB * -1
        }
        setCurrentIndexA(numA)
      setCurrentIndexB(numB)
      } else {
        numA = 0;
        numB = makeNum();
        setCurrentIndexA(numA)
      setCurrentIndexB(numB)
      }
    console.log(`Post if else log: numA is ${numA}, numB is ${numB}`)
    
    
  }

  const getNewA = (arr) => {
    let newA =  Math.floor(Math.random() * (arr.length - 1));

    if (newA != currentIndexB) {
      console.log(newA, currentIndexB)
      return setCurrentIndexA(newA);
    } else {
      console.log("same number")
    }
  }

  const getNewB = (arr) => {
    let newB =  Math.floor(Math.random() * (arr.length - 1));

    if (newB != currentIndexA) {
      console.log(newB, currentIndexA)
      return setCurrentIndexB(newB);
    } else {
      console.log("same number")
    }
  }

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
      getRandomIndices(jobs)
        // const [numA, numB] = getRandomIndices(jobs)
        // setCurrentIndexA(numA)
        // setCurrentIndexB(numB)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (props.token) {
      fetchJobs();
    }
  }, [props.token])

  let displayJobs = () => {
    if (jobs[currentIndexA] !== undefined && jobs[currentIndexB] !== undefined) {
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
                <Button onClick={() => getNewA(jobs)}>No thanks!</Button>
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
                <Button onClick={() => getNewB(jobs)}>No thanks!</Button>
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
