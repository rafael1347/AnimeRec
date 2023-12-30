const { Signup, Login, me } = require("../AuthController");
const router = require("express").Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/me", me);

module.exports = router;
