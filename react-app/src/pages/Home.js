import React from 'react'
import {Header} from '../components/header/Header'
import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Header/>
            <h1>Home</h1>

            <Link to={'/profile'}>To Profile</Link>
        </>
    )
}

export default Home