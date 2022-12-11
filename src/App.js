import './App.css';
import db from "./index";
import appRoutes from './shared/appRoutes';
import MainMenu from './containers/MainMenu/MainMenu';
import GamePage from './containers/GamePage/GamePage'; 
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {onSnapshot,doc } from 'firebase/firestore';
import GameOptionsPage from './containers/GameOptionsPage/GameOptionsPage';

function App() {
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('')
  const [moveResult, setMoveResult] = useState(true)
  const [readyToMove, setReadyToMove] = useState(false)
  const [incheck, setInCheck] = useState(false)
  const [winner, setWinner] = useState('')

  function updateMoveResult(r) {
    setMoveResult(r)
    console.log('come to updateMoveResult')
    setTimeout(writeResultToDb, 1000)
  }

  function writeResultToDb() {
    console.log(moveResult)
    db.collection("moveresult").doc("result").update({success: moveResult})
    console.log("write move result to database")
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
      console.log(incheck)
      console.log(winner)
    }); 
      
    if(incheck === true) {
      db.collection("checkmate").doc("check").update({checking: true})
      console.log("write checkmate to database")
    }

    if(winner !== '') {
      db.collection("checkwinner").doc("winner").update({win: winner})
      console.log("write winner to database")
    }
})
  
  const [gameMode, setGameMode] = useState("Standard");
  const [opponent, setOpponent] = useState("Computer");

  useEffect(() => {
    setPosition(window.localStorage.getItem('position'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('position', position);
  }, [position]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path={appRoutes.game} element={<GamePage initPosition={position} db={db} origin={origin} destination = {destination} updateMoveResult= {updateMoveResult} readyToMove={readyToMove} setReadyToMove={setReadyToMove} setInCheck= {setInCheck} setWinner={setWinner} />}></Route>
          <Route path={appRoutes.menu} element={<MainMenu />}></Route>
          <Route 
            path={appRoutes.game} 
            element={
              <GamePage 
                initPosition={position} 
                gameMode={gameMode} 
                opponent={opponent}
              />
            }>
          </Route>
          <Route 
            path={appRoutes.gameOptions} 
            element={
              <GameOptionsPage 
                setGameMode={setGameMode} 
                setOpponent={setOpponent}
                setPosition={setPosition}
              />
            }>
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
