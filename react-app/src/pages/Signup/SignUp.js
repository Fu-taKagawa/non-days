import React ,{useState} from 'react'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'

const SignUp = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('');

    class Popup extends React.Component {
        render() {
            return (
            <div className='popup'>
                <div className='popup_inner'>
                <h1>{this.props.text}</h1>
                <button onClick={this.props.closePopup}>close me</button>
                </div>
            </div>
            );
        }
    }

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
        setEmail('')
        setName('')
        setPassword('')
    };
    

    return (
        <div className='SignUp'>
            <div className='SignUpBox'>
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit}>
                    <div className='SignUpBox__email'>
                        <label htmlFor='email'>E-mail</label>
                        <br />
                        <input
                            name='email' 
                            type='email' 
                            id='email' 
                            placeholder='Register your Email address'
                            value={email}
                            onChange={e=>{
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className='SignUpBox__pass'>
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input 
                            name='password' 
                            type='password' 
                            id='password' 
                            placeholder='Set the Password' 
                            value={password}
                            onChange={e=>{
                                setPassword(e.target.value)
                            }}
                        />
                        <p color='red'>※パスワードは6文字以上の英数字で入力してください</p>
                    </div>
                    <div className='SignUpBox__name'>
                        <label htmlFor='email'>User Name</label>
                        <br />
                        <input
                            name='name' 
                            type='name' 
                            id='name' 
                            placeholder='Enter your optional user name' 
                            value={name}
                            onChange={e=>{
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    
                    <button type='submit' className='btn btn-border-shadow btn-border-shadow--color'>Sign Up</button>
                </form>
                <Link to="/login">To Login Page</Link>
            </div>
        </div>
    )
}
export default SignUp