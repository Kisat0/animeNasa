import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Backdrop, CircularProgress, useTheme } from "@mui/material";

import CommentInput from "../CommentInput/CommentInput";

import "./Comment.scss";

function Comment() {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState({}); // Nouvel état local pour suivre l'affichage des réponses
  const [open, setOpen] = useState(true);
  const [text, setText] = useState({ text: "" });
  const [isReply, setIsReply] = useState(false);
  const [commentIdToReply, setCommentIdToReply] = useState(null);

  comments.sort((a, b) => new Date(b.date) - new Date(a.date));

  const url = window.location.href;
  const videoID = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/comment/${videoID}`
        );
        const commentsWithReplyInput = response.data.map((comment) => ({
          ...comment,
          showReplyInput: false,
          isReply: false,
          reply: comment.reply || [],
        }));
        setComments(commentsWithReplyInput);
        console.log(commentsWithReplyInput);
        setOpen(false);
      } catch (error) {
        console.error(error);
        setOpen(false);
      }
    };

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (videoID && localStorage.getItem("username") && text.text) {
        if (isReply) {
          await axios
            .post(`${process.env.REACT_APP_API_ADDRESS}/comment/reply`, {
              author: localStorage.getItem("username"),
              text: text.text,
              videoID: videoID,
              reply_to: commentIdToReply,
            })
            .then((response) => {
              if (response.statusText === "Created") {
                const newReply = response.data;
                newReply.showReplyInput = false;
                newReply.isReply = false;
                setComments((prevComments) =>
                  prevComments.map((comment) =>
                    comment._id === commentIdToReply
                      ? { ...comment, reply: [...comment.reply, newReply] }
                      : comment
                  )
                );
              }
            });
        } else {
          await axios
            .post(`${process.env.REACT_APP_API_ADDRESS}/comment/`, {
              videoID: videoID,
              author: localStorage.getItem("username"),
              text: text.text,
            })
            .then((response) => {
              if (response.statusText === "Created") {
                const newComment = response.data;
                newComment.showReplyInput = false;
                newComment.isReply = false;
                newComment.reply = [];
                comments.push(newComment);
                comments.sort((a, b) => new Date(b.date) - new Date(a.date));
                setComments([...comments]);
              }
            });
        }
        setText({ text: "" });
        setIsReply(false);
        setCommentIdToReply(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleReplyClick = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? {
              ...comment,
              showReplyInput: !comment.showReplyInput,
              isReply: !comment.isReply,
            }
          : comment
      )
    );
    setIsReply(!isReply);
    setCommentIdToReply(commentId);
  };

  const handleOpenReply = async (commentId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/comment/reply/${commentId}`
      );
      setReplies(response.data);
      setShowReplies((prevState) => ({
        ...prevState,
        [commentId]: !prevState[commentId], // Inverser l'état d'affichage des réponses
      }));
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  return (
    <>
      {open && (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className="comment-container">
        {comments.length === 1 ? (
          <h1 className="comment-title">{comments.length} commentaire</h1>
        ) : (
          <h1 className="comment-title">{comments.length} commentaires</h1>
        )}

        <CommentInput
          text={text}
          setText={setText}
          handleSubmit={handleSubmit}
        />

        <div className="comment-list">
          {comments.length > 0 &&
            comments.map((comment) => (
              <div key={comment._id} className="comment-content">
                <Avatar src={comment?.avatar} alt={comment.author} />
                <div className="comment-infos-top">
                  <p className="comment-author">{comment.author}</p>
                  <p className="comment-date">
                    {new Date(comment.date).toLocaleString().slice(0, 16)}
                  </p>
                </div>
                <p className="comment-text">{comment.text}</p>
                <div className="comment-infos-bottom">
                  <p className="comment-like">Likes: {comment.like}</p>
                  <p className="comment-dislike">Dislikes: {comment.dislike}</p>
                  {comment.reply.length > 0 && (
                    <p
                      className="comment-reply"
                      onClick={() => handleOpenReply(comment._id)}
                    >
                      {showReplies[comment._id]
                        ? "Masquer les commentaires"
                        : "Voir les commentaires"}
                    </p>
                  )}
                  <button
                    className="comment-reply"
                    onClick={() => handleReplyClick(comment._id)}
                  >
                    Reply
                  </button>
                </div>

                {comment.showReplyInput && (
                  <CommentInput
                    text={text}
                    setText={setText}
                    handleSubmit={handleSubmit}
                  />
                )}

                {/* Affichage de la liste des réponses */}
                {showReplies[comment._id] && (
                  <div className="replies-container">
                    {replies.map((reply) => (
                      <div key={reply._id} className="comment-content">
                        <div className="comment-infos-top">
                          <p className="comment-author">{reply.author}</p>
                          <p className="comment-date">
                            {new Date(reply.date).toLocaleString().slice(0, 16)}
                          </p>
                        </div>
                        <p className="comment-text">{reply.text}</p>
                        <div className="comment-infos-bottom">
                          <p className="comment-like">Likes: {reply.like}</p>
                          <p className="comment-dislike">
                            Dislikes: {reply.dislike}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Comment;
