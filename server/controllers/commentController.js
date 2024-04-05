const Comment = require("../models/comment");

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getCommentsByvideoID = async (req, res) => {
  const { videoID } = req.params;
  try {
    const comments = await Comment.find({ videoID });
    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const createComment = async (req, res) => {
  const comment = new Comment(req.body);
  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getComments,
  getCommentsByvideoID,
  createComment,
}