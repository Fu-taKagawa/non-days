import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBjmWlwAbAzatVYRJKf2Dd4dpjAvCBJhwo",
    authDomain: "react-app-f2c37.firebaseapp.com",
    projectId: "react-app-f2c37",
    storageBucket: "gs://react-app-f2c37.appspot.com/",
    messagingSenderId: "401612508894",
    appId: "1:401612508894:web:bf1bba1dac216648553c4f",
    measurementId: "G-T2G468M95Z"
}

firebase.initializeApp(firebaseConfig)

export default firebase 
