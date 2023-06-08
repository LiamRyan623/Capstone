const router = require("express").Router();
const Job = require("../models/jobs.model");
const validateSession = require ("../middleware/validate-session");

router.get("/:id", async (req, res) => {
  try {
      const jobs = await Job.find({room: req.params.id});
      res.status(200).json({
        status: "Job Found",
        jobs,
      });


      } catch (err) {
    res.json({message:err.message})
  }
});

router.post("/createjob/:id", validateSession, async (req, res) => {
  try {
    const body = req.body;
    const {id} = req.params;
    const job = new Job({
        userId: req.user._id,
        when: new Date().getFullYear(),
        user: req.user.firstName,
        job: body.job,
    }); // using values from req.body to form our object.

    const newJob = await job.save(); // Writes to database. Returns a response - why it should be an "await".

    res.status(200).json({
      newJob,
      message: `Success! ${newJob} Created!`,
    });
  } catch (err) {
    res.status(500).json({
      ERROR: err.message,
    });
  }
});

//! Update a message within a room endpoint

router.patch("/:id", validateSession, async (req, res) => {
    try {
      //1. Pull value from parameter
      // Create a filter to check both id from req.params & owner_id against id from the token
      const filter = {
        _id: req.params.id,
        // owner_id: req.user._id
      };
  
  
      //2. Pull data from the body.
      const info = req.body;
      
      //3. Use method to locate document based off ID and pass in new information.
      const returnOption = {new: true}// 
  
      // returnOptions allows us to view the updated document
      const updatedJob = await Job.findOneAndUpdate(filter, info, returnOption);

      //4. Respond to client.
      res.status(200).json({
        message: `${updatedJob} has been updated successfully!`,
        updatedJob,
      });
    } catch (err) {
      errorResponse(res, err);
    }
  });

// Delete Message
  router.delete('/:id', validateSession, async (req,res) => {
  try {
      //1. Capture ID
      const id = req.params.id;
      //2. use delete method to locate and remove based off ID
      const deletedJob = await Job.deleteOne({_id: id})
      //3. Respond to Client
      res.status(200).json({
        message: `Job has been deleted successfully.`,
      deletedJob,
      })
        
  } catch (err) {
      errorResponse(res, err);
  }
});

module.exports = router;