import React from "react";
import { Link } from "react-router-dom";

import firebase from "firebase/compat/app";

export const Header =()=>{
    return(
        <header>
            <h1 className="title">React-app</h1>
            <div className="menu-item">
                <Link
                    className=""
                    onClick={
                        () => firebase.auth().signOut()
                    }
                    >Logout
                </Link>
            </div>
        </header>
    )
}
