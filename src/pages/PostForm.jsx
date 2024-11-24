import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;

    try {
      await addDoc(collection(db, "posts"), {
        title,
        content,
        author: auth.currentUser.uid, // Сохраняем ID пользователя
        createdAt: serverTimestamp(),
        likes: []
      });
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Содержание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Добавить пост</button>
    </form>
  );
};

export default PostForm;