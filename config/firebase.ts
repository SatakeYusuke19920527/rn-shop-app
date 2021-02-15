import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { Shop } from '../types/Shop';
import {initialUser, User} from '../types/User'

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest.extra.firebase); 
}

export const db = firebase.firestore()
export const auth = firebase.auth()

export const getShops = async () => {
  const snapshot = await db.collection('shops')
    .orderBy("score", "desc")
    .get();
    const shops: Shop[] = snapshot.docs.map(
      (doc) => doc.data() as Shop
    );
  return shops
};

export const signin = async () => {
  const userCredencial = await auth.signInAnonymously()
  const user = userCredencial.user
  const userDoc = await firebase.firestore().collection('users').doc(user?.uid).get()
  if (!userDoc) {
    await firebase.firestore().collection('users').doc(user?.uid).set(initialUser)
    return {
      ...initialUser,
      id: user?.uid,
    } as User
  } else {
    return {
      id: user?.uid,
      ...userDoc.data()
    } as User
  }
}