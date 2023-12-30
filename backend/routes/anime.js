const router = require("express").Router();
let Anime = require("../models/anime.model");
const jwt = require("jsonwebtoken");

router.route("/").get((req, res) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, `${process.env.JWT_PRIVATE_KEY}`);
  const user = decoded.id;

  Anime.find({ user: user })
    .then((watchlist) => res.json(watchlist))
    .catch((err) => res.status(400).json("Error: " + err));
});
router.route("/delete").delete(async (req, res) => {
  const id = req.body._id;
  const animeDelete = await Anime.findById(id);
  animeDelete.deleteOne().then(() => res.json("Anime Deleted!"));
});

router.route("/add").post((req, res) => {
  const user = req.body.user;
  const title = req.body.title;
  const description = req.body.description;
  const genre = req.body.genre;
  const id = req.body.id;
  const imgSrc = req.body.imgSrc;
  const compositeKey = { user: user, id: id };

  const newAnime = new Anime({
    compositeKey,
    user,
    title,
    description,
    genre,
    id,
    imgSrc,
  });
  newAnime
    .save()
    .then(() => res.json("new anime added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
