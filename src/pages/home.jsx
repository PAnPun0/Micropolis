import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import Header from "./Header";
import RutubeVideo from "./RutubeVideo";


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
        <div >
          <div className="min-h-screen  items-center justify-center bg-center bg-cover bg-image w-full h-[250px] mb-8 md:h-[350px]"style={{ backgroundImage: 'url(src/assets/DarkBG.png)' }}>
          
          <Header/>
            <img src="src/assets/whiteLogo.svg" alt="Logo" className="flex justify-items-center items-center mx-auto mb-10 w-96 h-96" />
            
            
            
          </div>
          {userData && (
              <div className="mx-auto text-center">
                <p className="unbounded">Здравствуйте! {userData.name} {userData.lastName}</p>
                
              </div>
            )}
            <div className="flex justify-center">
              <button onClick={handleSignOut} className="text-center mx-auto  top-1/2 left-1/2">Sign out</button>
            </div>
          <div className="p-10">
            <p className="unbounded text-2xl text-center p-5">
              Наш документальный сериал
            </p>
            <div className="flex md:flex-row flex-col 2xl:flex-row flex-col ml:flex-row flex-col">
              <div className="py-3 px-6">
                <RutubeVideo videoId="0e035288a84e0dfc566e378e8d1e76d8" />
              </div>
              <div className="py-3 px-6">
                <RutubeVideo videoId="c8931ac11021827e8a27dd7b6578901a" />
              </div>
              <div className="py-3 px-6">
                <RutubeVideo videoId="cc7015d5a9523089caef91b6bfa6952b" />
              </div>
            </div>
            <div className="py-3 px-6">
              <button className=" bg-main hover:bg-secondary text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline"><a href="https://rutube.ru/channel/29381530/videos/">Посмотреть все</a></button>
            </div>
          </div>
          <div>
            <p className="unbounded text-2xl text-center p-5">
              Наши проекты
            </p>
            <div className="flex justify-center items-center pb-20">
              <div className="flex flex-wrap justify-center gap-4">
                <div>
                  <img src="src/assets/projects.png" alt="Project" className="w-72 h-96"/>
                  <button className="bg-main hover:bg-secondary text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full">Подробнее о проекте</button>
                </div>
                <div>
                  <img src="src/assets/projects.png" alt="Project" className="w-72 h-96"/>
                  <button className="bg-main hover:bg-secondary text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full">Подробнее о проекте</button>
                </div>
                <div>
                  <img src="src/assets/projects.png" alt="Project" className="w-72 h-96"/>
                  <button className="bg-main hover:bg-secondary text-white text-sm unbounded py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2 w-full">Подробнее о проекте</button>
                </div>
              </div>
            </div>
            <footer className="bg-bruh text-white pt-4">
              <div className="container mx-auto text-center text-sm">
                <p className="unbounded">&copy; {new Date().getFullYear()} Микрополис. Все права защищены.</p>
                <p className="unbounded"><a href="https://www.youtube.com/channel/UC2e2xqtFKiTjr1jbrpDk" >Youtube</a></p>
                <p className="unbounded"><a href="https://www.youtube.com/channel/UC2e2xqtFKiTjr1jbrpDk">RuTube</a></p>
                <p className="unbounded"><a href="https://www.youtube.com/channel/UC2e2xqtFKiTjr1jbrpDk">Telegram</a></p>
                <p className="unbounded"><a href="https://www.youtube.com/channel/UC2e2xqtFKiTjr1jbrpDk">VK</a></p>
                <p className="pt-4 unbounded">Контакты:</p>
                <p className="pt-4 unbounded">Телефон: +7 (985) 435-35-93</p>
                <p className="pt-4 unbounded">Почта: anofutureindustry@gmail.com</p>
                <img src="src/assets/industry.png" alt="Logo" className="pt-4  w-48 h-15" />
              </div>
            </footer>

          </div>
            
          
        </div>
        
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