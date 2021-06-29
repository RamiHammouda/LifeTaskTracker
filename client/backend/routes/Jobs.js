const router = require('express').Router();
let Job = require('../models/Job');

//Bcrypt
const bcrypt = require('bcrypt');
const { findById } = require('../models/Job');
const saltRounds = 10;


//Shows all Jobs
// /Jobs/
router.route('/').get((req, res) => {
  Job.find()
    .then(Jobs => res.json(Jobs))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Gets Job by ID
// /Jobs/:id
router.route('/:id').get(async (req, res) => {
  await Job.find({
      "user":req.params.id
    }
  )
    .then(Job => res.json(Job))
    .catch(err => res.status(400).json("Error: " + err));
});


//Creates a new Job
// /Jobs/add
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const user = req.body.userId;

  const newJob = new Job({ title, user});

  newJob.save()
    .then(() => res.json('Job added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Deletes the Job
// /Jobs/delete/:id
router.route("/delete/:id").delete((req, res) => {
  const Job = Job.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch(() => res.status(400).json("could not delete ! Error: " + err));
});

//updates the Job
// /Job/update/:id
router.route("/update/:id").post((req, res) => {
  Job.findById(req.params.id)
    .then(Job => {
      
      Job.email = req.body.email;
      Job.password = bcrypt.hashSync(req.body.password, saltRounds);
      Job.name = req.body.name;
      Job.lastName = req.body.lastName;
      Job.profilePicture = req.body.profilePicture;
      Job.address = req.body.address;
      Job.city = req.body.city;
      Job.country = req.body.country;
      Job.postalCode = req.body.postalCode;
      Job.bio = req.body.bio;
      Job.facebook = req.body.facebook;
      Job.twitter = req.body.twitter;
      Job.linkedin = req.body.linkedin;

      Job.save()
        .then(() => res.json("updated successfully !"))
        .catch(() => res.status(400).json("Error: " + err));
    })
    .catch(() => res.status(400).json("Error: " + err));
});

module.exports = router;