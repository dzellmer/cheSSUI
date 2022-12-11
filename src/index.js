import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnTi9djJNjBgkg_GK41YKhcQlkMzSEzTA",
  authDomain: "chess-qdxh.firebaseapp.com",
  projectId: "chess-qdxh",
  storageBucket: "chess-qdxh.appspot.com",
  messagingSenderId: "38527090475",
  appId: "1:38527090475:web:f2e1f698e07533886c8f6e"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App app={app}/>
  </React.StrictMode>
);
reportWebVitals();
export default db;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
