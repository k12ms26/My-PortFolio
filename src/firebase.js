import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyCzSBy1pY5OiTiWFKyWnjZ83jK7PZihXc0",
    authDomain: "madcamp2-f5aa4.firebaseapp.com",
    databaseURL: "https://madcamp2-f5aa4-default-rtdb.firebaseio.com",
    projectId: "madcamp2-f5aa4",
    storageBucket: "madcamp2-f5aa4.appspot.com",
    messagingSenderId: "364591324231",
    appId: "1:364591324231:web:1dfbb74d564426c2aea562",
    measurementId: "G-BMQ8QMYF3G"
};

var fireDb = firebase.initializeApp(config);

export default fireDb.database().ref();