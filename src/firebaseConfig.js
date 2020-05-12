import firebase from 'firebase'
import 'firebase/firestore'

// firebase init goes here
const firebaseConfig = {
    apiKey: "AIzaSyDBIKhTYn7oY1Nwmv8YfqNOfLDBWuH6sTE",
    authDomain: "jam-along-1ec4d.firebaseapp.com",
    databaseURL: "https://jam-along-1ec4d.firebaseio.com",
    projectId: "jam-along-1ec4d",
    storageBucket: "jam-along-1ec4d.appspot.com",
    messagingSenderId: "920694412221",
    appId: "1:920694412221:web:dfa848268d37308418f8d4",
    measurementId: "G-7CR6HV95ML"
};
firebase.initializeApp(firebaseConfig)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {}
db.settings(settings)

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
    db,
    auth,
    currentUser,
    usersCollection,
    postsCollection,
    commentsCollection,
    likesCollection
}