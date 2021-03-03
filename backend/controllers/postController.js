const PostModel = require("../models/postModels");
const slugify = require("slugify");

exports.create = (req, res) => {
  //console.log(req.body);
  const { title, content, user } = req.body;
  const slug = slugify(title); // My Post  -> will be my-post --> on the url

  //validate
  if (!title) {
    return res.status(400).json({
      error: "Title is required",
    });
  } else if (!content) {
    return res.status(400).json({
      error: "Content is required",
    });
  }

  //create new post
  PostModel.create({ title, content, user, slug }, (err, post) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Duplicate post. Try another title please",
      });
    }
    res.json(post);
  });
};

// find post from database
exports.list = (req, res) => {
  PostModel.find({})
    .limit(10)
    .sort({ createdAt: -1 })
    .exec((err, posts) => {
      if (err) console.log(err);
      res.json(posts);
    });
};

// read on single page
exports.read = (req, res) => {
  const { slug } = req.params;
  PostModel.findOne({ slug }).exec((err, post) => {
    if (err) console.log(err);
    res.json(post);
  });
};

// update post
exports.update = (req, res) => {
  const { slug } = req.params;
  const { title, content, user } = req.body;
  PostModel.findOneAndUpdate(
    { slug },
    { title, content, user },
    { new: true }
  ).exec((err, post) => {
    if (err) console.log(err);
    res.json(post);
  });
};

// delete post
exports.remove = (req, res) => {
  const { slug } = req.params;
  PostModel.findOneAndRemove({ slug }).exec((err, post) => {
    if (err) console.log(err);
    res.json({
      message: "Post Deleted",
    });
  });
};
