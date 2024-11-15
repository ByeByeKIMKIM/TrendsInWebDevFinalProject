import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
const serviceAccount = require('/Users/kimkim/trends-in-webdev/final-project/backend/service_account.json');



const app = initializeApp({
  credential: cert(serviceAccount),
});
const db = getFirestore();


export { db };
