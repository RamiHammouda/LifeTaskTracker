const router = require('express').Router();
let User = require('../models/User');

//Bcrypt
const bcrypt = require('bcrypt');
const { findById } = require('../models/User');
const saltRounds = 10;


//Shows all users
// /users/
router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

//Gets user by ID
// /users/:id
router.route('/:id').get(async (req, res) => {
  await User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});


//Creates a new User
// /users/add
router.route('/add').post((req, res) => {
  const email = req.body.email;
  const password = bcrypt.hashSync(req.body.password, saltRounds);
  const name = req.body.name;
  const lastName = req.body.lastName;

  const newUser = new User({ email, password, name, lastName });

  newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Deletes the user
// /users/delete/:id
router.route("/delete/:id").delete((req, res) => {
  const user = User.findByIdAndDelete(req.params.id)
    .then(() => res.json("deleted successfully"))
    .catch(() => res.status(400).json("could not delete ! Error: " + err));
});

//updates the user
// /user/update/:id
router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      
      user.email = req.body.email;
      user.password = bcrypt.hashSync(req.body.password, saltRounds);
      user.name = req.body.name;
      user.lastName = req.body.lastName;
      user.profilePicture = req.body.profilePicture;
      user.address = req.body.address;
      user.city = req.body.city;
      user.country = req.body.country;
      user.postalCode = req.body.postalCode;
      user.bio = req.body.bio;
      user.facebook = req.body.facebook;
      user.twitter = req.body.twitter;
      user.linkedin = req.body.linkedin;

      user.save()
        .then(() => res.json("updated successfully !"))
        .catch(() => res.status(400).json("Error: " + err));
    })
    .catch(() => res.status(400).json("Error: " + err));
});

module.exports = router;