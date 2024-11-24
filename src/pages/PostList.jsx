import { useEffect, useState } from "react";
import { collection, query, orderBy, onSnapshot, where } from "firebase/firestore";
import { db } from "../firebase";
import Post from "./Post";

const PostList = ({ searchQuery }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let q;
    if (searchQuery) {
      q = query(
        collection(db, "posts"),
        where("title", ">=", searchQuery),
        where("title", "<=", searchQuery + "\uf8ff"),
        orderBy("title")
      );
    } else {
      q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [searchQuery]);

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;