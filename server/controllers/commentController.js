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

const getRepliesByCommentID = async (req, res) => {
  const { commentID } = req.params;
  try {
    const replies = await Comment.find({ reply_to: commentID });
    res.json(replies);
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
  const { videoID, author, text, reply_to: commentID } = req.body;

  try {
    // Create the new reply
    const newReply = new Comment({
      videoID,
      author,
      text,
      reply_to: commentID,
    });
    const savedReply = await newReply.save();

    // Update the original comment with the new reply
    const originalComment = await Comment.findById(commentID);
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

// véirifié si l'utilisateur est déjà dans la liste des user_like, si oui on enleve son like sinon on ajoute le like

const toggleLike = async (req, res) => {
  const { userID, commentID } = req.body;
  try {
    const comment = await Comment.findById(commentID);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.users_like.includes(userID)) {
      comment.users_like.pull(userID);  
      comment.like--;
    } else {
      comment.users_like.push(userID);
      comment.like++;
    }

    if (comment.users_dislike.includes(userID)) {
      comment.users_dislike.pull(userID);  
      comment.dislike--;
    }

    await comment.save();
    res.json(comment); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const toggleDislike = async (req, res) => {
  const { userID, commentID } = req.body;
  try {
    const comment = await Comment.findById(commentID);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.users_like.includes(userID)) {
      comment.users_like.pull(userID);  
      comment.like--;
    }
    if (comment.users_dislike.includes(userID)) {
      comment.users_dislike.pull(userID);  
      comment.dislike--;
    } else {
      comment.users_dislike.push(userID);
      comment.dislike++;
    }

    if (comment.users_like.includes(userID)) {
      comment.users_like.pull(userID);  
      comment.like--;
    }

    await comment.save();
    res.json(comment); 
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } 
};

module.exports = {
  getComments,
  getCommentsByvideoID,
  getRepliesByCommentID,
  createComment,
  createReplyToComment,
  toggleLike,
  toggleDislike
}