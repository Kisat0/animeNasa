import React from 'react';

import "./Comment.scss"

function Comment() {

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