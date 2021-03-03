const express = require("express");
const router = express.Router();

// import controller method
const {
  create,
  list,
  read,
  update,
  remove,
} = require("../controllers/postController");

// passing on controllers
router.post("/post", create);
router.get("/posts", list);
router.get("/post/:slug", read);
router.put("/post/:slug", update);
router.delete("/post/:slug", remove);

module.exports = router;
