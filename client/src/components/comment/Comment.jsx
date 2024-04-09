import React, { useState, useEffect } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

import CommentInput from "../CommentInput/CommentInput";

import "./Comment.scss"

function Comment() {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(true); // Initialiser le Backdrop à ouvert
  const [text, setText] = useState({ text: '' }); // Nouvel état local pour le texte du commentaire
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
          reply: comment.reply || [], // Use the 'reply' field from the server-side response
        }));
        setComments(commentsWithReplyInput);
        console.log(commentsWithReplyInput);
        setOpen(false); // Fermer le Backdrop une fois les données chargées
      } catch (error) {
        console.error(error);
        setOpen(false); // Fermer le Backdrop en cas d'erreur
      }
    };

    fetchComments();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (videoID && localStorage.getItem('username') && text.text) {
        if (isReply) {
          // Appel back-end pour une réponse à un commentaire
          await axios.post(`${process.env.REACT_APP_API_ADDRESS}/comment/reply`, {
            author: localStorage.getItem('username'),
            text: text.text,
            videoID: videoID,
            reply_to: commentIdToReply,
          })
          .then((response) => {
            console.log(response);
            if (response.statusText === 'Created') {
              const newReply = response.data;
              newReply.showReplyInput = false;
              newReply.isReply = false;
              setComments((prevComments) =>
                prevComments.map((comment) =>
                  comment._id === commentIdToReply
                    ? { ...comment, reply: [...comment.reply, newReply] } // Use the 'reply' field
                    : comment
                )
              );
            }
          });
        } else {
          // Appel back-end pour un commentaire global
          await axios.post(`${process.env.REACT_APP_API_ADDRESS}/comment/`, {
            videoID: videoID,
            author: localStorage.getItem('username'),
            text: text.text,
          })
          .then((response) => {
            if (response.statusText === 'Created') {
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
        setText({ text: '' }); // Réinitialiser le champ de texte après la soumission
        setIsReply(false);
        setCommentIdToReply(null);
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const handleReplyClick = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, showReplyInput: !comment.showReplyInput, isReply: !comment.isReply }
          : comment
      )
    );
    setIsReply(!isReply);
    setCommentIdToReply(commentId);
  };

  return (
    <>
      {open && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <div className='comment-container'>
        {comments.length == 1 ? (
          <h1 className='comment-title'>{comments.length} commentaire</h1>
        ) : null}
        
        {comments.length > 1 ? (
          <h1 className='comment-title'>{comments.length} commentaires</h1>
        ) : null}
        
        <CommentInput text={text} setText={setText} handleSubmit={handleSubmit} />

        <div className="comment-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment._id} className='comment-content'>
                <div className='comment-infos-top'>
                  <p className='comment-author'>{comment.author}</p>
                  <p className='comment-date'>{new Date(comment.date).toLocaleString()}</p>
                </div>
                <p className='comment-text'>{comment.text}</p>
                <div className='comment-infos-bottom'>
                  <p className='comment-like'>Likes: {comment.like}</p>
                  <p className='comment-dislike'>Dislikes: {comment.dislike}</p>
                  <p className='comment-reply'>Replies: {comment.reply.length}</p>
                  <button className='comment-reply' onClick={() => handleReplyClick(comment._id)}>
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
              </div>
            ))
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Comment;