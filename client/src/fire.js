import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0rZEgLnsFwiEPPCz14DjKXGz3SenwId8",
    authDomain: "event-planner-website.firebaseapp.com",
    databaseURL: "https://event-planner-website.firebaseio.com",
    projectId: "event-planner-website",
    storageBucket: "event-planner-website.appspot.com",
    messagingSenderId: "1087585064663"
};
var fire = firebase.initializeApp(config);

export default fire;