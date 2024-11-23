import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import PostForm from "./PostForm";
import PostList from "./PostList";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log('Auth state changed:', currentUser);
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          console.log('User data fetched:', userDoc.data());
          setUserData(userDoc.data());
        } else {
          console.log('User data not found');
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      console.log('User not logged in, navigating to login page...');
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      console.log('Fetching user data for:', user.uid);
      getDoc(doc(db, "users", user.uid)).then((userDoc) => {
        if (userDoc.exists()) {
          console.log('User data fetched:', userDoc.data());
          setUserData(userDoc.data());
        } else {
          console.log('User data not found');
        }
      }).catch((error) => {
        console.log('Error fetching user data:', error);
      });
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      console.log('Navigating to login page...');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (user) {
    return (
      <>
        <h1>МПИТ</h1>
        {userData && (
          <div>
            <p>Email: {user.email}</p>
            <p>Имя: {userData.name}</p>
            <p>Фамилия: {userData.lastName}</p>
          </div>
        )}
        <button onClick={handleSignOut}>Sign out</button>
        <PostForm />
        <PostList />
      </>
    );
  } else {
    return (
      <>
        <p>Please log in to access this page.</p>
        <button><Link to="/login">Login</Link></button>
      </>
    );
  }
};

export default Home;