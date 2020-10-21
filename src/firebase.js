import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB9lpEAu_CEKXPVGmnKsgUQUSkp3MQNSEg",
    authDomain: "react-crud-operation.firebaseapp.com",
    databaseURL: "https://react-crud-operation.firebaseio.com",
    projectId: "react-crud-operation",
    storageBucket: "react-crud-operation.appspot.com",
    messagingSenderId: "117692492985",
    appId: "1:117692492985:web:97dc89691f97f68410ff68"
  };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();