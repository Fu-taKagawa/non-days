import React,{useState, useContext,useEffect}from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'
import moment from "moment";

const PostEdit=()=>{
    const [title,setTitle]=useState("")
    const [text, setText]=useState("")
    const [posts, setPosts] = useState([])
    const user = useContext(AuthContext)

    useEffect(() => {
        firebase.firestore().collection('posts')
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setPosts(posts)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        var timestamp = moment().valueOf();
        firebase.firestore().collection('posts')
            .doc().update({
                user: user.displayName,
                title:title,
                text:text,
                timestamp:timestamp,
            })
        if (text.trim() === '') return alert('文字を入力してください');
    };


    return(
        <>
            <Header/>
            <div className='body'>
                <Link to={'/'}>to Home</Link>
                <h1>Edit Posts</h1>
                
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write a title"
                    />
                    <br/>
                    <textarea
                        className="postForm__text"
                        value={text}
                        type="text" 
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a caption"
                    />
                    <br />
                    <button 
                        disabled={text.trim() === ''} 
                        id="js-show-popup"
                    >修正完了</button>
                </form>
            </div>
        </>
    )
}

export default PostEdit