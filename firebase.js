import firebase from "firebase";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAzX7tysxJH1YxRkEG3b4j1rFMYunP0oKU",
  authDomain: "e-minutia-327113.firebaseapp.com",
  projectId: "e-minutia-327113",
  storageBucket: "e-minutia-327113.appspot.com",
  messagingSenderId: "224680021405",
  appId: "1:224680021405:web:46281efacad753cab53374"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;