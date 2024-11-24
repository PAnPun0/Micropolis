import {  useState } from "react";
import Header from './Header';
import PostForm from './PostForm';
import PostList from './PostList';
import SearchBar from './SearchBar';

const Forum = () => {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (query) => {
        setSearchQuery(query);
      };
    return (
        <>
            <div>
                <div className="min-h-screen  items-center justify-center bg-center bg-cover bg-image w-full h-[250px]  md:h-[350px]"style={{ backgroundImage: 'url(src/assets/DarkBG.png)' }}>
                    
                    <Header />
                    <div className=" min-h-screen flex items-center justify-center">
                        <h1 className="text-4xl font-bold mb-6 text-center unbounded text-white">Здесь вы найдете ответы на все ваши вопросы </h1>
                        
                    </div>
                    
                    <div className=" items-center justify-center p-4">
                        <SearchBar onSearch={handleSearch}/>
                        <PostForm/>
                        <PostList/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Forum;