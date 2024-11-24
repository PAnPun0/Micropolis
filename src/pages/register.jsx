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
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover bg-image" style={{ backgroundImage: 'url(src/assets/background.png)' }}>
      <div className="p-8 rounded-lg shadow-md bg-white bg-opacity-75">
        <img src="src/assets/Logo.svg" alt="Logo" className="mx-auto mb-10 w-35 h-35" />
        <h1 className="text-2xl font-bold mb-6 text-center unbounded">Регистрация</h1>
        <p className="text-gray-800 mb-6 text-center">Зарегистрируйтесь или войдите чтобы получить доступ в личный кабинет.</p>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <input
              id="name"
              type="text"
              placeholder="Имя"
              name="name"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          <div>
            <input
              id="lastName"
              type="text"
              placeholder="Фамилия"
              name="lastName"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          <div>
            <input
              id="email"
              type="email"
              placeholder="Почта"
              name="email"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          <div>
            <input
              id="password"
              type="password"
              placeholder="Пароль"
              name="password"
              onChange={handleInput}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          <div className="relative">
            <button
              type="submit"
              className="bg-main hover:bg-secondary w-full text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Зарегистрироваться
            </button>
          </div>
          <button
              type="button"
              className="bg-transparent border unbounded border-main w-full text-sm text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Link to="/login" className="text-main no-underline">Войти</Link>
            </button>
        </form>
      </div>
    </div>
  );
};

export default Register;