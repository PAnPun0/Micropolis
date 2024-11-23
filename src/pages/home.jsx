import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  console.log('home rendered');

  return (
    <>
      <h1>МПИТ</h1>
      {user && (
        <div>
          <p>Email: {user.email}</p>
          <p>Имя: {user.displayName}</p>
          <p>Фамилия: {user.lastName}</p>
        </div>
      )}
      <button onClick={handleSignOut}>Sign out</button>
    </>
  );
};

export default Home;