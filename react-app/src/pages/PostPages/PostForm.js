import React,{useState} from "react";
import Form from "./Form";
import {nanoid} from "nanoid";
import List from "./List";

const PostForm =()=>{
    const [posts, setPosts] = useState([]);
    const addPost = (text) => {
        setPosts([...posts, { content: text, id: nanoid() }]);
    };
    const deletePost = (id) => {
        const newPosts = posts.filter((post) => post.id !== id);
        setPosts(newPosts);
    };
    return(
        <>
            <Form 
                addPost={addPost} 
            />
        </>
    )
}

export default PostForm