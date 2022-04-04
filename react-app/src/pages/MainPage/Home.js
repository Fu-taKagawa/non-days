import React ,{useState,useEffect}from 'react'
import {Header} from '../../components/header/Header'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'

const Home = () => {
    const [posts, setPosts] = useState([])
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
    return (
        <>
            <Header/>
            <div className='body'>
                <Link 
                    to={'/postform'}
                    onClick={()=>{console.log(posts)}}
                >Go Post</Link>
                <ul className='postArea'>
                    {
                        React.Children.toArray(posts.map(posts=> 
                            <li className='postItem'>
                                <p className='postItem__user'>{posts.user}</p>
                                <div className='postItem__textbox'>
                                    <h1>{posts.title}</h1>
                                    <p>{posts.text}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                <Link to={'/profile'}>To Profile</Link>
            </div>
        </>
    )
}

export default Home