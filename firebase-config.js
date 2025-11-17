// FIREBASE CONFIG
// Replace the config below with your project's values (from Firebase Console -> Project Settings).
/* Example:
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "...",
  appId: "..."
};
*/
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmWcS2SFTdXOnSBFfBeS6DaYm-is0J6nA",
  authDomain: "brandboost-dc51d.firebaseapp.com",
  projectId: "brandboost-dc51d",
  storageBucket: "brandboost-dc51d.firebasestorage.app",
  messagingSenderId: "182060627582",
  appId: "1:182060627582:web:0bbf7be095d8e3de42ca2f",
  measurementId: "G-2WT69JFPY4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// The code below assumes Firebase v9 modular SDK is loaded in your pages.
// To use, include the Firebase scripts in your HTML or install via npm in a build.

// Minimal loader (dynamic) - will try to load SDK from CDN when pages run.
(function(){
  const base = 'https://www.gstatic.com/firebasejs/9.22.0';
  const libs = [
    base + '/firebase-app-compat.js',
    base + '/firebase-auth-compat.js',
    base + '/firebase-firestore-compat.js',
    base + '/firebase-storage-compat.js'
  ];

  function loadLib(i){
    if(i>=libs.length) return initFirebase();
    const s = document.createElement('script'); s.src = libs[i]; s.onload = ()=> loadLib(i+1); document.head.appendChild(s);
  }
  loadLib(0);

  window.initFirebase = function(){
    if(!window.firebase) return console.warn('Firebase SDK not loaded.');
    // Paste your firebaseConfig object below (or replace this variable programmatically)
    window.firebaseConfig = window.firebaseConfig || {};
    try{
      if(!firebase.apps.length) firebase.initializeApp(window.firebaseConfig);
      window.auth = firebase.auth();
      window.db = firebase.firestore();
      window.storage = firebase.storage();
      console.log('Firebase initialized (compat).');
    }catch(e){console.error(e)}
  }
})();
