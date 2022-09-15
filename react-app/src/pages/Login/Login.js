import React,{useState, useContext} from 'react'
import { Link , Redirect} from 'react-router-dom'
import firebase from 'firebase/compat/app';
import { AuthContext } from '../../AuthService'

export const Login = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const user = useContext(AuthContext)

    const handleSubmit = e => {
    e.preventDefault();
    firebase
        .auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            history.push('/');
        })
        .catch(err => {
            console.log(err);
            alert('メールアドレス・パスワードに間違いがあります。')
        });
    };
    if (user) {
        return <Redirect to="/" />
    }

    return (
        <div className='Login'>
            <div className='LoginBox'>
                <h1>Login</h1>        
                <form onSubmit={handleSubmit}>
                    <div className='LoginBox__email'>
                        <label htmlFor='email'>E-mail</label>
                        <br />
                        <input
                            type='email' 
                            id='email' 
                            name='email' 
                            placeholder='Enter your Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='LoginBox__pass'>
                        <label htmlFor='password'>Password</label>
                        <br />
                        <input 
                            type='password' 
                            id='password' 
                            name='password'
                            placeholder='Enter your Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='btn btn-border-shadow btn-border-shadow--color'>Login</button>
                </form>
                <Link to="/signup">sign up</Link>
            </div>
        </div>
    )
}

export default Login