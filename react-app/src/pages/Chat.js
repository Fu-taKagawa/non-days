import React,{useState, useEffect, useContext} from 'react'
import {Header} from '../components/header/Header'
import firebase from '../config/firebase'
import { Link } from 'react-router-dom'
import { AuthContext } from '../AuthService'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const user = useContext(AuthContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        firebase.firestore().collection('messages')
            .add({
                content: value,
                user: user.displayName
            })
            
    }

    useEffect(() => {
        firebase.firestore().collection('messages')
            .onSnapshot((snapshot) => {
                const messages = snapshot.docs.map(doc => {
                    return doc.data()
                })
                setMessages(messages)
            })
    }, [])

    return (
        <>
            <Header/>
            <ul>
                {
                    React.Children.toArray(messages.map(messages=> <li>{messages.user}:{messages.content}</li>))
                }
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button
                    type="submit"
                >送信</button>
            </form>
            <Link to={"/profile"}>To Profile</Link>
            <br />
            <Link to={"/"}>To Home</Link>
        </>
    )
}

export default Chat