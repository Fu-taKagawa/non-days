import React,{useState, useContext,useEffect}from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'
import moment from "moment";

const PostEdit=()=>{
    const [editTitle,setEditTitle]=useState("")
    const [editText, setEditText]=useState("")
    const [posts, setPosts] = useState([])
    const user = useContext(AuthContext)
    const [editId, setEditId] = useState("")
    

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
        // function confirmId(snapshot) {
        //     return snapshot.forEach(confirmIds);
        // }
        // function confirmIds(doc) {
        //     const editId = doc.id
        // }
        firebase.firestore().collection('postEdit')
            .orderBy("timestamp", "desc")
            .limit(1)
            .onSnapshot(function(snapshot) {
                snapshot.forEach(function(doc) {
                    const editId = doc.id
                    setEditId(editId)
                    return editId
                });
            });
        console.log(editId)
        firebase.firestore().collection('posts')
            .doc(editId).update({
                user: user.displayName,
                title:editTitle,
                text:editText,
                timestamp:timestamp,
            })
        if (editText.trim() === '') return alert('文字を入力してください');
    };


    return(
        <>
            <Header/>
            <div className='body'>
                <Link to={'/'}>to Home</Link>
                <h1>Edit Posts</h1>
                
                <form onSubmit={handleSubmit}>
                    <input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        placeholder="Write a title"
                    />
                    <br/>
                    <textarea
                        className="postForm__text"
                        value={editText}
                        type="text" 
                        onChange={(e) => setEditText(e.target.value)}
                        placeholder="Write a caption"
                    />
                    <br />
                    <button 
                        disabled={editText.trim() === ''} 
                        id="js-show-popup"
                    >修正完了</button>
                </form>
            </div>
        </>
    )
}

export default PostEdit