import React,{useContext} from "react";
import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { AuthContext } from "../../AuthService";

export const Header =()=>{
    const user = useContext(AuthContext);
    return(
        <header>
            <h1 className="logo"><Link to={'/'}>React-app</Link></h1>
            <div className="menu-item">
                <Link 
                    className="postPageBtn pc-only"
                    to={'/postform'}>Go Post</Link>
                <Link 
                    className="chatPageBtn pc-only"
                    to={'/chat'}>Chat Page</Link>
                <Link 
                    className="profilePageBtn pc-only"
                    to={'/profile'}>To Profile</Link>
                <a
                    className="logoutBtn pc-only"
                    href="/"
                    onClick={
                        ()=>{
                            firebase.auth().signOut()
                        }
                    }
                    >Logout
                </a>
                <p>ようこそ <br className="sp-only"/> {user.displayName} さん</p>
                <div className="menu-item-sp">
                    <Link 
                        className="postPage sp-only"
                        to={'/postform'}>
                        Post
                    </Link>
                    <Link 
                        className="chatPage sp-only"
                        to={'/chat'}>
                        Chat
                    </Link>
                    <Link 
                        className="profilePage sp-only"
                        to={'/profile'}>
                        Profile
                    </Link>
                    <a className="logout sp-only"
                        href="/"
                        onClick={
                            ()=>{
                                firebase.auth().signOut()
                            }
                        }
                        >Logout
                    </a>
                </div>
            </div>
        </header>
    )
}
