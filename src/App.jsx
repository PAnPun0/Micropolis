import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import './assets/css/Global.css';
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import { auth } from './firebase';
import Forum from './pages/forum';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log('Auth state changed in App:', user);
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const RequireAuth = ({ children }) => {
    console.log('RequireAuth rendered', currentUser);
    return currentUser ? children : <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
        <Route path="/forum" element={<Forum/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;