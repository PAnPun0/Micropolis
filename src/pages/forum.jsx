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
            <Header />
            <SearchBar onSearch={handleSearch}/>
            <PostForm/>
            <PostList/>
        </>
    );
};

export default Forum;