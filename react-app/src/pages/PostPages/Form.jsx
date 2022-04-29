import {useState, useContext}from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'
import moment from "moment";
import shortid from "shortid";

const Form=({addPost})=>{
    const [title,setTitle]=useState("")
    const [text, setText]=useState("")
    const user = useContext(AuthContext)
    const initialState = shortid.generate();
    const [postId, setPostId] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();
        var timestamp = moment().valueOf();
        firebase.firestore().collection('posts')
            .doc(`${postId}`).set({
                user: user.displayName,
                title:title,
                text: text,
                timestamp:timestamp,
                id:postId,
            })
        if (text.trim() === '') return alert('文字を入力してください');
        addPost(title,text,timestamp);
        setTitle('');
        setText('');
        setPostId(postId)
    };


    return(
        <>
            <Header/>
            <div className='body'>
                <Link to={'/'}>to Home</Link>
                <h1>Post Page</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Write a title"
                    />
                    <br />
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
                    >投稿</button>
                </form>
            </div>
        </>
    )
}

export default Form