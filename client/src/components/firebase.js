// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyArAOm5YGDhWNRfbc1dcITsPMfsUM5KCik',
  authDomain: 'streamy-333706.firebaseapp.com',
  projectId: 'streamy-333706',
  storageBucket: 'streamy-333706.appspot.com',
  messagingSenderId: '422788690469',
  appId: '1:422788690469:web:65acc6ea8fba5e61fa85cc',
  measurementId: 'G-3DPQQZVVS7',
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log(db);
export default db;
