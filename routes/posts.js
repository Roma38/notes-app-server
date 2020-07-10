var express = require("express");
var router = express.Router();
var Post = require("../models/post");

// Get posts
router.get("/", function (req, res, next) {
  Post.find()
    .then(posts => res.status(201).json(posts))
    .catch(error => {
      console.log(error);
      res.status(500).json({ error });//TODO: status code
    });
});

// Add post
router.post("/", function (req, res, next) {
  const post = new Post(req.body);

  post
    .save()
    .then(post => res.status(201).json(post))
    .catch(error => {
      if (error.code === 11000) {
        res
          .status(422)
          .json({ error: "Post with such title already exists" });
      }
      console.error(error);
      res.status(500).json(error);//TODO: status code
    });
});

//Edit post
router.put("/", function (req, res, next) {
  Post.findByIdAndUpdate(req.body._id, req.body)
    .then(({ _id }) => res.status(201).json(req.body))
    .catch(error => {
      if (error.code === 11000) {
        res
          .status(422)
          .json({ error: "Post with such title already exists" });
      }
      console.error(error);
      res.status(500).json(error);//TODO: status code
    });
});

//Delete post
router.delete("/", function (req, res, next) {
  Post.findByIdAndDelete(req.body._id)
    .then(() => res.status(200).json({ message: "Successfully deleted" }))
    .catch(error => {
      console.error(error);
      res.status(500).json(error); //TODO: status code
    });
  res.status(200).json(req.body);
});

module.exports = router;
