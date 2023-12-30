const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((watchlist) => res.json(watchlist))
    .catch((err) => res.status(400).json("Error: " + err));
});
// router.route("/signup").post((req, res) => {
//   const newUser = new User({
//     req,
//   });
//   newUser
//     .save()
//     .then(() => res.json("new user added"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/login").get((req, res) => {
//   const title = req.body.title;
//   const description = req.body.description;
//   const genre = req.body.genre;
//   const id = req.body.id;
//   const imgSrc = req.body.imgSrc;

//   const newAnime = new Anime({
//     title,
//     description,
//     genre,
//     id,
//     imgSrc,
//   });
//   newAnime
//     .save()
//     .then(() => res.json("new anime added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });
module.exports = router;
