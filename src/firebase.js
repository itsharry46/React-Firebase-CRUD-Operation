import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage'

var firebaseConfig = {
  apiKey: "AIzaSyAwZr3a8Pturievq8Qx9NjRdWHLmuvdEwk",
  authDomain: "react-crud-operations.firebaseapp.com",
  databaseURL: "https://react-crud-operations.firebaseio.com",
  projectId: "react-crud-operations",
  storageBucket: "react-crud-operations.appspot.com",
  messagingSenderId: "830913205231",
  appId: "1:830913205231:web:364adfdd67dc334b041c1a"
};
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
