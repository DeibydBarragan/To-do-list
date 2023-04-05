import { FacebookAuthProvider, GithubAuthProvider, GoogleAuthProvider, getAuth } from 'firebase/auth'

/**
 * @fileoverview Firebase configuration
 */
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCjOIHwiE8i215DotRb3E0112foAS-TQiA',
  authDomain: 'to-do-list-2c301.firebaseapp.com',
  projectId: 'to-do-list-2c301',
  storageBucket: 'to-do-list-2c301.appspot.com',
  messagingSenderId: '124960001806',
  appId: '1:124960001806:web:1c52a404b201a8168bd15f'
}

/**
 * Initialize Firebase
 */
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
export const githubProvider = new GithubAuthProvider()
