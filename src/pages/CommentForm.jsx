import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, "comments"), {
        postId,
        content,
        author: auth.currentUser.uid, // Сохраняем ID пользователя
        createdAt: serverTimestamp()
      });
      setContent("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Ваш комментарий"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Добавить комментарий</button>
    </form>
  );
};

export default CommentForm;