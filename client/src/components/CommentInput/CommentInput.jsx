
function CommentInput({ text, setText, handleSubmit }) {

  const handleCommentTextChange = (e) => {
    // Supprimer les espaces multiples
    setText({ text: e.target.value.replace(/\s+/g, ' ') });
  };

  return (
    <form onSubmit={handleSubmit} className="youtube-comment-input">
      <textarea
        rows="2"
        placeholder="Ajouter un commentaire..."
        value={text.text}
        onChange={handleCommentTextChange}
      ></textarea>
      <button type="submit">Publier</button>
    </form>
  )
}

export default CommentInput;