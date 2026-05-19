import { initializeApp } from 'firebase/app'

import {
  getAuth,
} from 'firebase/auth'

import {
  getFirestore,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfySmne9VAyYkPK75bFxtcC5kkPjgR1Lg",
  authDomain: "planora-f4770.firebaseapp.com",
  projectId: "planora-f4770",
  storageBucket: "planora-f4770.firebasestorage.app",
  messagingSenderId: "180979291018",
  appId: "1:180979291018:web:78751009e77b11b1ccae73",
  measurementId: "G-9K8BWRBK88"
};

const app =
  initializeApp(firebaseConfig)

export const auth =
  getAuth(app)

export const db =
  getFirestore(app)