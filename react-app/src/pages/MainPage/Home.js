import React ,{useState,useEffect, useContext}from 'react'
import {Header} from '../../components/header/Header'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'


const Home = () => {
    const [posts, setPosts] = useState([])
    const [liked, setLiked] = useState(false)
    const noLike = document.getElementsByClassName("noLiking")
    const Like = document.getElementsByClassName("Liking")
    const user = useContext(AuthContext)
    posts.sort((a, b) => a.timestamp - b.timestamp)
    useEffect(() => {
        firebase.firestore().collection('posts')
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setPosts(posts)
            })
    }, [])
    const handleLike = (e)=>{
        e.preventDefault()
        setLiked(!liked)
        Like.classList.add("hidden")
        console.log(liked)
    }
    const handleNoLike = (e)=>{
        e.preventDefault()
        setLiked(!liked)
        Like.classList.add("")
    }
    return (
        <>
            <Header/>
            <div className='body'>
                <ul className='postArea'>
                    {
                        React.Children.toArray(posts.map(posts=>
                            <li className='postItem'>
                                <div className='postTop'>
                                    <Link
                                        to={'/postEdit'}
                                        onClick={()=>{
                                            const postId = firebase.firestore().collection('posts').doc(`${posts.id}`).id
                                            firebase.firestore().collection('postEdit').doc(`${postId}`)
                                                .set({
                                                    user: user.displayName,
                                                    id: postId,
                                                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                                                })
                                            console.log(firebase.firestore().collection('posts').doc(`${posts.id}`))
                                        }}
                                    >Edit</Link>
                                    <button onClick={(e)=>{
                                        e.preventDefault();
                                        firebase.firestore().collection('posts').doc(`${posts.id}`).delete();
                                        firebase.firestore().collection('postEdit').doc(`${posts.id}`).delete();
                                    }}>Delete</button>
                                </div>
                                <p className='postItem__user'>{posts.user}</p>
                                <div className='postItem__textbox'>
                                    <h1>{posts.title}</h1>
                                    <p>{posts.text}</p>
                                </div>
                                <div>
                                    <button 
                                        id='noLiking'
                                        onClick={handleLike}>noLike
                                    </button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </>
    )
}

export default Home