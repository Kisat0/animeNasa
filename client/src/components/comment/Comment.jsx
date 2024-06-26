import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, Backdrop, CircularProgress, useTheme } from "@mui/material";

import { useUser } from "../../utils/useUser";

import CommentInput from "../commentInput/CommentInput";

import "./Comment.scss";
import { DislikeIcon, LikeIcon } from "../../utils/Icons";

function Comment({animeColor,episodeID}) {
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [showReplies, setShowReplies] = useState({});
  const [open, setOpen] = useState(true);
  const [text, setText] = useState({ text: "" });
  const [isReply, setIsReply] = useState(false);
  const [commentIDToReply, setCommentIdToReply] = useState(null);

  const { user } = useUser();

  comments.sort((a, b) => new Date(b.date) - new Date(a.date));

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/comment/${episodeID}`
        );
        const commentsWithReplyInput = response.data.map((comment) => ({
          ...comment,
          showReplyInput: false,
          isReply: false,
          reply: comment.reply || [],
        }));
        setComments(commentsWithReplyInput);
        setOpen(false);
      } catch (error) {
        console.error(error);
        setOpen(false);
      }
    };

    fetchComments();
  }, [episodeID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (episodeID && user.username && text.text) {
        if (isReply) {
          await axios
            .post(`${process.env.REACT_APP_API_ADDRESS}/comment/reply`, {
              author: user.username,
              text: text.text,
              videoID: episodeID,
              reply_to: commentIDToReply,
            })
            .then((response) => {
              if (response.statusText === "Created") {
                const newReply = response.data;
                newReply.showReplyInput = false;
                newReply.isReply = false;
                setComments((prevComments) =>
                  prevComments.map((comment) =>
                    comment._id === commentIDToReply
                      ? { ...comment, reply: [...comment.reply, newReply] }
                      : comment
                  )
                );
              }
            });
        } else {
          await axios
            .post(`${process.env.REACT_APP_API_ADDRESS}/comment/`, {
              videoID: episodeID,
              author: user.username,
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

  const handleReplyClick = (commentID) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment._id === commentID
          ? {
              ...comment,
              showReplyInput: !comment.showReplyInput,
              isReply: !comment.isReply,
            }
          : comment
      )
    );
    setIsReply(!isReply);
    setCommentIdToReply(commentID);
  };

  const handleOpenReply = async (commentID) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}/comment/reply/${commentID}`
      );
      setReplies(response.data);
      setShowReplies((prevState) => ({
        ...prevState,
        [commentID]: !prevState[commentID], // Inverser l'état d'affichage des réponses
      }));
    } catch (error) {
      console.error(error);
      setOpen(false);
    }
  };

  const toggleLike = async (commentID) => {
    try {
      const comment = comments.find((c) => c._id === commentID);
      if (comment.users_like.includes(user._id)) {
        // L'utilisateur a déjà liké le commentaire, on retire le like
        await axios.post(`${process.env.REACT_APP_API_ADDRESS}/comment/like`, {
          commentID,
          userID: user._id,
        });
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === commentID
              ? {
                  ...c,
                  like: c.like - 1,
                  users_like: c.users_like.filter((id) => id !== user._id),
                }
              : c
          )
        );
      } else {
        // L'utilisateur n'a pas encore liké le commentaire, on ajoute le like
        await axios.post(`${process.env.REACT_APP_API_ADDRESS}/comment/like`, {
          commentID,
          userID: user._id,
        });
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === commentID
              ? {
                  ...c,
                  like: c.like + 1,
                  users_like: [...c.users_like, user._id],
                  users_dislike: c.users_dislike.filter(
                    (id) => id !== user._id
                  ),
                }
              : c
          )
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleDislike = async (commentID) => {
    try {
      const comment = comments.find((c) => c._id === commentID);
      if (comment.users_dislike.includes(user._id)) {
        // L'utilisateur a déjà disliké le commentaire, on retire le dislike
        await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}/comment/dislike`,
          {
            commentID,
            userID: user._id,
          }
        );
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === commentID
              ? {
                  ...c,
                  dislike: c.dislike - 1,
                  users_dislike: c.users_dislike.filter(
                    (id) => id !== user._id
                  ),
                }
              : c
          )
        );
      } else {
        // L'utilisateur n'a pas encore disliké le commentaire, on ajoute le dislike
        await axios.post(
          `${process.env.REACT_APP_API_ADDRESS}/comment/dislike`,
          {
            commentID,
            userID: user._id,
          }
        );
        setComments((prevComments) =>
          prevComments.map((c) =>
            c._id === commentID
              ? {
                  ...c,
                  dislike: c.dislike + 1,
                  users_dislike: [...c.users_dislike, user._id],
                  users_like: c.users_like.filter((id) => id !== user._id),
                }
              : c
          )
        );
      }
    } catch (error) {
      console.error(error);
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
                <div>
                  <div className="comment-infos-top">
                    <p className="comment-author">{comment.author}</p>
                    <p className="comment-date">
                      {new Date(comment.date).toLocaleString().slice(0, 16)}
                    </p>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-infos-bottom">
                    <div>
                      <p
                        className={"comment-like"}
                        style={{
                          color: comment.users_like.includes(user._id)
                            ? animeColor
                            : "white",
                        }}
                        onClick={() => toggleLike(comment._id)}
                      >
                        <LikeIcon
                          color={
                            comment.users_like.includes(user._id)
                              ? animeColor
                              : "white"
                          }
                        />{" "}
                        {comment.like}
                      </p>
                      <p
                        className={
                          "comment-dislike" +
                          (comment.users_dislike.includes(user._id)
                            ? " clicked"
                            : "")
                        }
                        onClick={() => toggleDislike(comment._id)}
                      >
                        <DislikeIcon
                          color={
                            comment.users_dislike.includes(user._id)
                              ? animeColor
                              : "white"
                          }
                        />{" "}
                        {comment.dislike}
                      </p>
                    </div>
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
                              {new Date(reply.date)
                                .toLocaleString()
                                .slice(0, 16)}
                            </p>
                          </div>
                          <p className="comment-text">{reply.text}</p>
                          <div className="comment-infos-bottom">
                            <p
                              className="comment-like"
                              onClick={() => toggleLike(reply._id)}
                            >
                              Likes: {reply.like}
                            </p>
                            <p
                              className="comment-dislike"
                              onClick={() => toggleDislike(reply._id)}
                            >
                              Dislikes: {reply.dislike}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Comment;
