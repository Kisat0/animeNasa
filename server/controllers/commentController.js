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
    const comments = await Comment.find({
      videoID,
      reply_to: { $exists: false },
    });
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

const createReplyToComment = async (req, res) => {
  const { videoID, author, text, reply_to: commentId } = req.body;

  try {
    // Create the new reply
    const newReply = new Comment({
      videoID,
      author,
      text,
      reply_to: commentId,
    });
    const savedReply = await newReply.save();

    // Update the original comment with the new reply
    const originalComment = await Comment.findById(commentId);
    if (originalComment) {
      originalComment.reply.push(savedReply._id);
      await originalComment.save();
    } else {
      // If the original comment doesn't exist, delete the saved reply
      await Comment.deleteOne({ _id: savedReply._id });
      return res.status(404).json({ error: 'Original comment not found' });
    }

    res.status(201).json(savedReply);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports = {
  getComments,
  getCommentsByvideoID,
  createComment,
  createReplyToComment
}