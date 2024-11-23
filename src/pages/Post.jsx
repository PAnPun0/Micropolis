import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || []);

  const handleLike = async () => {
    if (!auth.currentUser) return;

    const postRef = doc(db, "posts", post.id);
    if (likes.includes(auth.currentUser.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(auth.currentUser.uid)
      });
      setLikes(likes.filter((uid) => uid !== auth.currentUser.uid));
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(auth.currentUser.uid)
      });
      setLikes([...likes, auth.currentUser.uid]);
    }
  };

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>Автор: {post.author}</p>
      <button onClick={handleLike}>
        {likes.includes(auth.currentUser?.uid) ? "Unlike" : "Like"} ({likes.length})
      </button>
      <CommentForm postId={post.id} />
      <CommentList postId={post.id} />
    </div>
  );
};

export default Post;