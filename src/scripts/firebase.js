// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-y3fOnRfYEmobDfHLFirDPTQAEx45vC0",
  authDomain: "schedule-bot-41320.firebaseapp.com",
  projectId: "schedule-bot-41320",
  storageBucket: "schedule-bot-41320.appspot.com",
  messagingSenderId: "355421301932",
  appId: "1:355421301932:web:826f67bf51a294191fc309"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = {
  db: getFirestore()
};
