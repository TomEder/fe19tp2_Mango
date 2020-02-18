import FirebaseContext from './context';
// import Firebase from './firebase';
import app from 'firebase/app';
import 'firebase/auth'
import 'firebase/database';

const prodConfig = {

    apiKey: "AIzaSyBbghIOR3TxnoTrfIhwQm-ht-ZRHPOERpM",
    authDomain: "fe19tp2-mango.firebaseapp.com",
    databaseURL: "https://fe19tp2-mango.firebaseio.com",
    projectId: "fe19tp2-mango",
    storageBucket: "fe19tp2-mango.appspot.com",
    messagingSenderId: "450659239563",
    appId: "1:450659239563:web:8a09930ee04d5315f9768e",
    measurementId: "G-Q8KBVMG7KV"
};

const devConfig = {
    apiKey: "AIzaSyBbghIOR3TxnoTrfIhwQm-ht-ZRHPOERpM",
    authDomain: "fe19tp2-mango.firebaseapp.com",
    databaseURL: "https://fe19tp2-mango.firebaseio.com",
    projectId: "fe19tp2-mango",
    storageBucket: "fe19tp2-mango.appspot.com",
    messagingSenderId: "450659239563",
    appId: "1:450659239563:web:12476f4c1649c5d1f9768e",
    measurementId: "G-EW1DHF0NSC"
};

// const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;
const config = {
  
};

class Firebase {
    constructor() {
        app.initializeApp(prodConfig);
        //app.initializeApp(devConfig);

        this.auth = app.auth();
        this.db = app.database();
    }
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
    
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();
                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = [];
                        }
                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    user = uid => this.db.ref(`users/${uid}`);
    users = () => this.db.ref('users');


}

export default Firebase;
export { FirebaseContext };