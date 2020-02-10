import FirebaseContext from './context';
import Firebase from './firebase';
export { FirebaseContext };

const config = {
    apiKey: YOUR_API_KEY,
    authDomain: YOUR_AUTH_DOMAIN,
    databaseURL: YOUR_DATABASE_URL,
    projectId: YOUR_PROJECT_ID,
    storageBucket: '',
    messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

class Firebase {
    constructor() {
    app.initializeApp(config);
    }
    }
    export default Firebase;