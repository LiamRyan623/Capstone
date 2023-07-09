import React from "react";
import {
  Card,
  CardGroup,
  CardTitle,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";
import "./JobCards.css";

export default function JobCard({ job, handleLike, handleDislike }) {
  if (!job) {
    return null;
  }

  return (
    <div>
      <Container id="mainCont">
        <CardGroup>
          <Card id="jobCard">
            <CardImg
              alt="Card image cap"
              src="https://picsum.photos/318/180"
              top
              width="100%"
            />
            <CardBody className="job-card-content">
              <CardTitle tag="h5">{job.job}</CardTitle>
              <CardSubtitle tag="h6" className="mb-2 text-muted">
                {job.company}
              </CardSubtitle>
              <CardText className="card-text">{job.description}</CardText>
              <Button id="dislikeBtn" onClick={() => handleDislike(job._id)}>
                No thanks!
              </Button>
              <Button id="likeBtn" onClick={() => handleLike(job._id)}>
                Hire me!
              </Button>
            </CardBody>
          </Card>
        </CardGroup>
      </Container>
    </div>
  );
}
