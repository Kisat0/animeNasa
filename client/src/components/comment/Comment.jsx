import React, { useState, useEffect } from "react";
import axios from "axios";
import { Backdrop, CircularProgress, useTheme } from "@mui/material";

import { ThemeProvider, createTheme } from "@mui/material";

import "./Comment.scss"

function Comment() {
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(true); // Initialiser le Backdrop à ouvert
  const [text, setText] = useState({ text: '' }); // Nouvel état local pour le texte du commentaire
  const theme = useTheme().palette;

  const url = window.location.href;
  const videoID = url.substring(url.lastIndexOf("/") + 1);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (videoID && localStorage.getItem('username') && text.text) {
        console.log(videoID, localStorage.getItem('username'), text.text);
        await axios.post('http://localhost:5001/comment/', {
          videoID: videoID,
          author: localStorage.getItem('username'),
          text: text.text,
        });
        setText({ text: '' }); // Réinitialiser le champ de texte après la soumission
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentTextChange = (e) => {
    // Supprimer les espaces multiples
    setText({ text: e.target.value.replace(/\s+/g, ' ') });
  };
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_ADDRESS}/comment/${videoID}`
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
      <ThemeProvider theme={darkTheme}>
        <div className='comment-container'>
          {comments.length == 1 ? (
            <h1 className='comment-title'>{comments.length} commentaire</h1>
          ) : null}
          
          {comments.length > 1 ? (
            <h1 className='comment-title'>{comments.length} commentaires</h1>
          ) : null}
          
          <form onSubmit={handleSubmit} className="youtube-comment-input">
            <textarea
              rows="2"
              placeholder="Ajouter un commentaire..."
              value={text.text}
              onChange={handleCommentTextChange}
            ></textarea>
            <button type="submit">Publier</button>
          </form>

          <div className="comment-list">
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

        </div>
      </ThemeProvider>
    </>
  );
}

export default Comment