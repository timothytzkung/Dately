import { firebase_auth, db } from './firebaseConfig';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile 
} from 'firebase/auth';
import { Alert } from 'react-native'
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';


export const signUp = async (email, password, firstName, lastName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(firebase_auth, email, password);
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      email: email,
      createdAt: new Date(),
      firstName: firstName,
      lastName: lastName, 
      preferences: {
        outingTypes: [],
        budgetRange: '',
        transportType: ''
      }
    });
    updateProfile(userCredential.user, {
        displayName: firstName
    }).then(() => {
        console.log("Profile updated")
    }).catch((e) => {
        console.log("Error in updating profile: ", e)
    })
    
    return userCredential.user;
  } catch (e) {
    console.error('Sign up error:', e);
    Alert.alert("There was in issue with your sign-up: ", e)
    throw e;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(firebase_auth, email, password);
    return userCredential.user;
  } catch (e) {
    console.error('Sign in error:', e);
    Alert.alert("There was an error with you login information", e)
    // throw e;
  }
};

export const signOut = async () => {
  try {
    console.log("Sign out in firebase service called")
    await firebaseSignOut(firebase_auth);
  } catch (e) {
    console.error('Sign out error:', e);
    Alert.alert("There was an issue in signing out. Please try again.")
    throw e;
  }
};
