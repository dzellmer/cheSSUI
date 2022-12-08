import './App.css';

import appRoutes from './shared/appRoutes';
import MainMenu from './containers/MainMenu/MainMenu';
import GamePage from './containers/GamePage/GamePage'; 

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GameOptionsPage from './containers/GameOptionsPage/GameOptionsPage';


function App() {
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
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
