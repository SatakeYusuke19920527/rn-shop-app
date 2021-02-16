import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import Constants from 'expo-constants';
import { Shop } from '../types/Shop';
import {initialUser, User} from '../types/User'
import { Review } from '../types/review';

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
      (doc) => ({...doc.data(), id: doc.id} as Shop)
    );
  return shops
};

export const signin = async () => {
  const userCredintial = await firebase.auth().signInAnonymously();
  const { uid } = userCredintial.user!;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  await db.collection('users')
    .doc(userId)
    .update(params)
}

export const addReview = async (shopId: string, review: Review) => {
  await db.collection('shops').doc(shopId).collection('reviews').add(review)
}