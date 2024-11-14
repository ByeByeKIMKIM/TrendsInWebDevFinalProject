import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require('/Users/kimkim/trends-in-webdev/final-project/backend/service_account.json');



const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();


export { db };

//here

// // Import the functions you need from the SDKs you need
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAB33nYzhorRK0CwsZ8-wnqSvcDTrcO-vE",
//   authDomain: "trendsinwebdevfinalproject.firebaseapp.com",
//   projectId: "trendsinwebdevfinalproject",
//   storageBucket: "trendsinwebdevfinalproject.firebasestorage.app",
//   messagingSenderId: "524099176427",
//   appId: "1:524099176427:web:ffdc7a398b0572c620bbae",
//   measurementId: "G-93J7DGZNY4"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);