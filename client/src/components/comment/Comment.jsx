import React, { useState, useEffect } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

import "./Comment.scss"

function Comment() {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(true); // Initialiser le Backdrop à ouvert
  const theme = useTheme().palette;

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/comment/${id}`
        );
        setComments(response.data);
        setOpen(false); // Fermer le Backdrop une fois les données chargées
      } catch (error) {
        console.error(error);
        setOpen(false); // Fermer le Backdrop en cas d'erreur
      }
    };

    fetchComments();
  }, []); 

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
        ): null}

        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className='comment-content'>
              <div className='comment-infos-top'>
                <p className='comment-author'>{comment.author}</p>
                <p className='comment-date'>{new Date(comment.date).toLocaleString()}</p>
              </div>
              <p className='comment-text'>{comment.text}</p>
              <div className='comment-infos-bottom'>
                <p className='comment-like'>Likes: {comment.like}</p>
                <p className='comment-dislike'>Dislikes: {comment.dislike}</p>
                <button className='comment-reply'>Reply</button>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </>
  );
}

export default Comment;