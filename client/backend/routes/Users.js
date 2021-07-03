const router = require('express').Router();
var multer = require('multer');
//Multer setup

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, '../public/img/');
  },
  filename: function (req, file, cb) {
      cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
      // cb(null,file.originalname);
  }
});

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === "image/*"){
    cb(null,true);
  }else{
    cb(null,false);
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  // fileFilter : fileFilter
}).single("profilePicture");
//Setup end
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
router.route("/update/:id").post(upload, (req, res) => {
  // console.log(req.body);
  var filePath ="";
  filePath = req.file.path;
  console.log(filePath)
  
  filePath = filePath.substr(filePath.lastIndexOf('\\')+1,filePath.length);
  console.log(filePath);
  User.findById(req.params.id)
    .then(user => {
      user.email = req.body.email;
      user.password = bcrypt.hashSync(req.body.password, saltRounds);
      user.name = req.body.name;
      user.lastName = req.body.lastName;
      user.profilePicture = filePath;
      // user.address = req.body.address;
      user.city = req.body.city;
      user.country = req.body.country;
      // user.postalCode = req.body.postalCode;
      user.bio = req.body.bio;
      user.facebook = req.body.facebook;
      user.twitter = req.body.twitter;
      user.linkedin = req.body.linkedin;

      user.save()
        .then(() => res.status(200).json("updated successfully !"))
        .catch((err) => {
          res.status(400).json("Error: " + err);
          console.log(err);
        });
    })
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
});

module.exports = router;