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
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Вопрос"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <textarea
        placeholder="Описание"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border border-gray-300 rounded-lg px-4 py-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-main text-white px-4 py-2 rounded-lg hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Спросить
      </button>
    </form>
  );
};

export default PostForm;