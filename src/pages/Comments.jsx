import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Comment = ({ comment }) => {
  const [authorData, setAuthorData] = useState(null);

  useEffect(() => {
    const fetchAuthorData = async () => {
      const authorDoc = await getDoc(doc(db, "users", comment.author));
      if (authorDoc.exists()) {
        setAuthorData(authorDoc.data());
      }
    };

    fetchAuthorData();
  }, [comment.author]);

  return (
    <div>
      <p>{comment.content}</p>
      <p>Автор: {authorData ? `${authorData.name} ${authorData.lastName}` : "Загрузка..."}</p>
    </div>
  );
};

export default Comment;