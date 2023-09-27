import React from "react";

export default function JobsList({ likedJobs, token }) {
  if (token) {
    return (
      <>
        <div>
          {likedJobs.map((job) => (
            <div key={job._id}>
              <h4>{job.job}</h4>
              <p>{job.company}</p>
              <p>{job.description}</p>
            </div>
          ))}
        </div>
      </>
    );
  }
}
