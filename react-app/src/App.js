import React from "react";
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import {AuthProvider} from './AuthService';
import LoggedInRoute from "./LoggedInRoute";

import Home from "./pages/MainPage/Home";
import Login  from './pages/Login';
import SignUp  from './pages/SignUp';
import Chat from "./pages/ChatPages/Chat";
import Profile from "./pages/ProfilePages/Profile";
import PostForm from "./pages/PostPages/PostForm";

const App=()=>{
    return(
        <AuthProvider>
            <Router>
                <Switch>
                    <LoggedInRoute exact path='/' component={Home} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/signup' component={SignUp} />
                    <Route exact path='/chat' component={Chat}/>
                    <Route exact path='/profile' component={Profile}/>
                    <Route exact path='/postform' component={PostForm}/>
                </Switch>
            </Router>
        </AuthProvider>
    )
}

export default App