import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, db } from "../firebase";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

const Post = ({ post }) => {
  const [authorData, setAuthorData] = useState(null);
  const [likes, setLikes] = useState(post.likes || []);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const authorDoc = await getDoc(doc(db, "users", post.author));
      if (authorDoc.exists()) {
        setAuthorData(authorDoc.data());
      }
    };

    fetchAuthorData();
  }, [post.author]);

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
      <h2>Вопрос: {post.title}</h2>
      <p>Описание:{post.content}</p>
      <p>Автор: {authorData ? `${authorData.name} ${authorData.lastName}` : "Загрузка..."}</p>
      <button onClick={handleLike}>
        {likes.includes(auth.currentUser?.uid) ? <img src="src/assets/filledheart.png" alt="" className="w-6 h-7"/> : <img src="src/assets/heart.png" alt="" className="w-6 h-7"/>} ({likes.length})
      </button>
      <CommentForm postId={post.id} />
      <CommentList postId={post.id} />
    </div>
  );
};

export default Post;