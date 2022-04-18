import React,{useState, useEffect, useContext} from 'react'
import {Header} from '../../components/header/Header'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'
import { AuthContext } from '../../AuthService'
import moment from 'moment'

const Chat = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    const user = useContext(AuthContext)
    messages.sort((a, b) => {
        return a.timestamp - b.timestamp
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        var timestamp = moment().valueOf();
        firebase.firestore().collection('messages')
            .add({
                content: value,
                user: user.displayName,
                timestamp:timestamp,
                avatar: user.photoURL
            })
            
        setValue('')
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
            <div className='body'>
                <ul className='chatArea'>
                    {
                        React.Children.toArray(messages.map(messages=> <li>{messages.user}:{messages.content}</li>))
                    }
                </ul>
                <form className='chatForm' onSubmit={handleSubmit}>
                    <textarea
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
            </div>
        </>
    )
}

export default Chat