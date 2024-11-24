import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";


const Login = () => {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('User logged in:', userCredential.user);
        navigate("/");
      })
      .catch((error) => {
        console.log('Login error:', error);
        setError(true);
        alert("Ошибка входа: " + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-center bg-cover bg-image"style={{ backgroundImage: 'url(src/assets/background.png)' }}>
      <div className=" p-8 rounded-lg shadow-md bg-white bg-opacity-75">
        <img src="src/assets/Logo.svg" alt="Logo" className="mx-auto mb-10 w-35 h-35" />
        <h1 className="text-2xl font-bold mb-6 text-center unbounded">Вход</h1>
        <p className="text-gray-800 mb-6 text-center">Войдите или зарегистрируйтесь чтобы получить доступ в личный кабинет.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Почта"
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            />
          </div>
          <div>
           
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Пароль"
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>
          <div className=" relative ">
            <button
              type="submit"
              className="bg-main hover:bg-secondary w-full text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Войти
            </button>
          </div>
          <div className="relative ">
            <button
              type="button"
              className="bg-transparent border unbounded border-main w-full text-sm text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <Link to="/register" className="text-main no-underline">Регистрация</Link>
            </button>
          </div>
          
          {error && <span className="text-red-500 text-sm">Неправильный пароль или почта</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;