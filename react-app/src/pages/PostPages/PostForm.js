import {useState} from "react";
import Form from "./Form";
import {nanoid} from "nanoid";

const PostForm =()=>{
    const [posts, setPosts] = useState([]);
    const addPost = (text) => {
        setPosts([...posts, { content: text, id: nanoid() }]);
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