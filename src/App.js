import './App.css';

import appRoutes from './shared/appRoutes';
import MainMenu from './containers/MainMenu/MainMenu';
import GamePage from './containers/GamePage/GamePage'; 

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* <Route path={appRoutes.menu} element={<MainMenu />}></Route> */}
          <Route path={appRoutes.game} element={<GamePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
