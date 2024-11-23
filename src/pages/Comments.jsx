const Comment = ({ comment }) => {
    return (
      <div>
        <p>{comment.content}</p>
        <p>Автор: {comment.author}</p>
      </div>
    );
  };
  
  export default Comment;