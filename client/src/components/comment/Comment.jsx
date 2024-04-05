import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Comment.scss"

function Comment() {
  const [comments, setComments] = useState({});

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/comment/${id}`
        );
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, []); 

  return (
    <div className='comment-container'>
      <h1 className='comment-title'>Commentaire</h1>

      <div className='comment-content'>
        <div className='comment-infos-top'>
          <p className='comment-author'>Auteur</p>
          <p className='comment-date'>Date</p>
        </div>
        <p className='comment-text'>Cet épisode est le meilleure épisode de la saison je veux rien savoir</p>
        <div className='comment-infos-bottom'>
          <p className='comment-like'>Like</p>
          <p className='comment-dislike'>Dislike</p>
          <button className='comment-reply'>Reply</button>
        </div>
      </div>
    </div>
  );
}

export default Comment;