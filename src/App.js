import './App.css';

import appRoutes from './shared/appRoutes';
import MainMenu from './containers/MainMenu/MainMenu';
import GamePage from './containers/GamePage/GamePage'; 

import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path={appRoutes.menu} element={<MainMenu />}></Route> */}
          <Route path={appRoutes.game} element={<GamePage initPosition={position} />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
