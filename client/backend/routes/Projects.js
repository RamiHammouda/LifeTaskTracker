const router = require('express').Router();
let Project = require('../models/Project');
let User = require("../models/User");

//Bcrypt
const bcrypt = require('bcrypt');
const { findById } = require('../models/Project');
const saltRounds = 10;


//Shows all Projects
// /Projects/
router.route('/').get((req, res) => {
  Project.find()
    .then(Projects => res.json(Projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Gets Project by ID
// /Projects/:id
router.route('/:id').get(async (req, res) => {
  await Project.find({
      "user":req.params.id
    }
  )
    .then(Project => res.json(Project))
    .catch(err => res.status(400).json("Error: " + err));
});


//Creates a new Project
// /Projects/add
router.route('/add').post((req, res) => {
  const title = req.body.title;
  const link = req.body.link;
  const user = req.body.userId;

  const newProject = new Project({ title, link, user});

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Deletes the Project
// /Projects/delete/:id
router.route("/delete/:id").delete((req, res) => {
  const Project = Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch(() => res.status(400).json("could not delete ! Error: " + err));
});

//updates the Project
// /Project/update/:id
router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(Project => {
      
      Project.email = req.body.email;
      Project.password = bcrypt.hashSync(req.body.password, saltRounds);
      Project.name = req.body.name;
      Project.lastName = req.body.lastName;
      Project.profilePicture = req.body.profilePicture;
      Project.address = req.body.address;
      Project.city = req.body.city;
      Project.country = req.body.country;
      Project.postalCode = req.body.postalCode;
      Project.bio = req.body.bio;
      Project.facebook = req.body.facebook;
      Project.twitter = req.body.twitter;
      Project.linkedin = req.body.linkedin;

      Project.save()
        .then(() => res.json("updated successfully !"))
        .catch(() => res.status(400).json("Error: " + err));
    })
    .catch(() => res.status(400).json("Error: " + err));
});

module.exports = router;