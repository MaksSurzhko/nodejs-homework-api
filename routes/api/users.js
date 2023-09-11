const express = require("express");
const auth = require("../../middlewares/auth");
const upload = require("../../middlewares/upload");
const router = express.Router();

const { users: controller } = require("../../controllers/index");
const errorHandler = require("../../helpers/errorHandler");

router.post("/register", errorHandler(controller.register));
router.post("/login", errorHandler(controller.login));
router.get("/current", auth, errorHandler(controller.getCurrent));
router.post("/logout", auth, errorHandler(controller.logout));
router.patch("/", auth, errorHandler(controller.updateSubscription));
router.patch("/avatars", auth, upload.single("avatar"), errorHandler(controller.avatar));

module.exports = router;