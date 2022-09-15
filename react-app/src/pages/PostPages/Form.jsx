import {useState, useContext}from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/header/Header";
import firebase, { storage } from '../../config/firebase';
import { AuthContext } from '../../AuthService';
import moment from "moment";
import shortid from "shortid";

const Form=({addPost})=>{
    const [title,setTitle]=useState("")
    const [text, setText]=useState("")
    const user = useContext(AuthContext)
    const initialState = shortid.generate();
    const [postId, setPostId] = useState(initialState);
    const [image, setImage] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const handleImage = event => {
        const image = event.target.files[0];
        setImage(image);
    };

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
        setPostId(postId);
        if (image === "") {
            console.log("ファイルが選択されていません");
        }
        // アップロード処理
        const uploadTask = storage.ref(`/images/${image.name}`).put(image);
        uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            next,
            error,
            complete
        );
        const next = snapshot => {
            // 進行中のsnapshotを得る
            // アップロードの進行度を表示
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percent + "% done");
            console.log(snapshot);
        };
        const error = error => {
            // エラーハンドリング
            console.log(error);
        };
        const complete = () => {
            // 完了後の処理
            // 画像表示のため、アップロードした画像のURLを取得
            storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then(fireBaseUrl => {
                setImageUrl(fireBaseUrl);
            });
        };
    };
    return(
        <>
            <Header/>
            <Link to={'/'}>to Home</Link>
            <div className='appBody'>
                <h1>Post Page</h1>
                <img src={imageUrl} alt="uploaded" />
                <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleImage} />
                    <br/>
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
                    >投稿</button>
                </form>
            </div>
        </>
    )
}

export default Form