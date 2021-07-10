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
    "user": req.params.id
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

  const newProject = new Project({ title, link, user });

  newProject.save()
    .then(() => res.json('Project added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Deletes the Project
// /Projects/delete/:id
router.route("/delete/:id").delete((req, res) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch((err) => res.status(400).json("could not delete ! Error: " + err));
});

//updates the Project
// /Project/update/:id
router.route("/update/:id").post((req, res) => {
  Project.findById(req.params.id)
    .then(Project => {

      Project.title = req.body.title;
      Project.link = req.body.link;

      Project.save()
        .then(() => res.json("updated successfully !"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;