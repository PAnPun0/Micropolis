import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { name, lastName, email, password } = data;
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      await setDoc(doc(db, "users", userId), {
        name,
        lastName,
        email,
        history: '/'
      });
      console.log("setDoc called with data: ", { name, lastName, email });
    } catch (err) {
      console.log("неполучилось нубас", err);
      alert("Ошибка регистрации: " + err.message);
    }
    navigate("/");
  };

  return (
    <div className="register">
      <form onSubmit={handleAdd}>
        <input id="name" type="text" placeholder="Имя" name="name" onChange={handleInput} />
        <input id="lastName" type="text" placeholder="Фамилия" name="lastName" onChange={handleInput} />
        <input id="email" type="email" placeholder="Почта" name="email" onChange={handleInput} />
        <input id="password" type="password" placeholder="Пароль" name="password" onChange={handleInput} />
        <button type="submit">Зарегистрироваться</button>
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </form>
    </div>
  );
};

export default Register;