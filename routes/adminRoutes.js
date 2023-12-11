const { signup, login, getSignup, getLogin } = require("../controllers/adminControllers");

const router = require("express").Router();

router.get("/signup",getSignup);
router.get("/login",getLogin)
router.post("/signup", signup);
router.post("/login", login);


module.exports = router;