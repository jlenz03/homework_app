export function User(firebaseUser) {
    return {
        displayName: firebaseUser && firebaseUser.displayName ? firebaseUser.displayName : '',
        email: firebaseUser && firebaseUser.email ? firebaseUser.email : '',
        photoURL: firebaseUser && firebaseUser.photoURL ? firebaseUser.photoURL : '',
        uid: firebaseUser && firebaseUser.uid ? firebaseUser.uid : '',
    };
}