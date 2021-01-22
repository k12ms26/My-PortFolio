import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCzSBy1pY5OiTiWFKyWnjZ83jK7PZihXc0",
    authDomain: "madcamp2-f5aa4.firebaseapp.com",
    databaseURL: "https://madcamp2-f5aa4-default-rtdb.firebaseio.com",
    projectId: "madcamp2-f5aa4",
    storageBucket: "madcamp2-f5aa4.appspot.com",
    messagingSenderId: "364591324231",
    appId: "1:364591324231:web:1dfbb74d564426c2aea562",
    measurementId: "G-BMQ8QMYF3G"
  };

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    
    /*** Authentication  ***/
    doCreateUserWithEmailAndPassword = (email, password) => 
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) => 
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);
    
    /*** Database ***/
    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');

    addActivity = (uid, activity) => {
        const ref = this.db.ref().child(`users/${uid}/activities`);
        ref.push(activity);
    };

    updateActivity = (uid, activity, activityKey) => {
        const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
        ref.update(activity);
    }
}

export default Firebase;