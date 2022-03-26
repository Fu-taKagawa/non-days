import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import firebase from '../config/firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');

    const handleSubmit = e => {
    e.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(({ user }) => {
        user.updateProfile({
            displayName: name,
        });
    })
    .catch(err => {
        console.log(err);
        });
    };
    

    return (
        <div>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='email'>Name</label>
                    <input
                        name='name' 
                        type='name' 
                        id='name' 
                        placeholder='name' 
                        value={name}
                        onChange={e=>{
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <input
                        name='email' 
                        type='email' 
                        id='email' 
                        placeholder='Email'
                        value={email}
                        onChange={e=>{
                            setEmail(e.target.value)
                        }}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input 
                        name='password' 
                        type='password' 
                        id='password' 
                        placeholder='Password' 
                        value={password}
                        onChange={e=>{
                            setPassword(e.target.value)
                        }}
                    />
                    <p color='red'>※パスワードは6文字以上の英数字で入力してください</p>
                </div>
                
                <button type='submit'>Sign Up</button>
            </form>

            <Link to="/login">To Login Page</Link>
        </div>
    )
}
export default SignUp