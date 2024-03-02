import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import firebaseConfig from './config';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(() => {
        // Persistence set successfully
        console.log('Persistence set to SESSION');
    })
    .catch((error) => {
        // Handle any errors
        console.error('Error setting persistence:', error);
    });

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage().ref();

export { firebase, db, auth, storage };

