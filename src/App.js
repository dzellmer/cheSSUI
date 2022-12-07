import './App.css';

import appRoutes from './shared/appRoutes';
import MainMenu from './containers/MainMenu/MainMenu';
import GamePage from './containers/GamePage/GamePage'; 

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import db from "./index";
import {getFirestore,collection, addDoc, query, onSnapshot,setDoc,updateDoc,doc, getDocs, where, deleteDoc, getDoc } from 'firebase/firestore';



function App() {
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('')
  const [moveResult, setMoveResult] = useState(true)
  const [readyToMove, setReadyToMove] = useState(false)

  function updateMoveResult(r) {
    setMoveResult(r)
    console.log('come to updateMoveResult')
    setTimeout(writeResultToDb, 1000)

  }

  function writeResultToDb() {
    console.log(moveResult)
    db.collection("moveresult").doc("result").update({success: moveResult})
    console.log("Document written")
  }


  useEffect(() =>{
    const unsub = onSnapshot(doc(db, "chessmove", "move"), (doc) => {
      let d = doc.data()
      let orig = d.origin[0]
      let dest = d.destination[0]
      console.log(dest)
      console.log(orig)
      if(orig !== origin || dest !== destination) {
        setReadyToMove(true)
      }
      if(orig !== origin) {
          setOrigin(orig)
      }
      if(dest !== destination) {
        setDestination(dest)
      } 
  });   
})
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path={appRoutes.menu} element={<MainMenu />}></Route> */}
          <Route path={appRoutes.game} element={<GamePage initPosition={position}  origin={origin} destination = {destination} updateMoveResult= {updateMoveResult} readyToMove={readyToMove} setReadyToMove={setReadyToMove}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
