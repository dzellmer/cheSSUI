import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import appRoutes from '../../shared/appRoutes';

export default function GamePage(props) {

    const [chessObj, setChessObj] = useState(new Chess(props.initPosition));
    const [position, setPosition] = useState(chessObj.fen());

    const makeMove = (move) => {
        if (props.opponent === "Computer") {
            if (chessObj.move(move)) {
                setTimeout(() => {
                  const moves = chessObj.moves();
          
                  if (moves.length > 0) {
                    const computerMove = moves[Math.floor(Math.random() * moves.length)];
                    chessObj.move(computerMove);
                    setPosition(chessObj.fen());
                  }
                }, 300);
          
                setPosition(chessObj.fen());
              }
        } else {
            chessObj.move(move);
            setPosition(chessObj.fen());
        }
    }

    return (
        <div className="GamePage page">
            <Chessboard 
                width={600} 
                position={position}
                onDrop={(move) => makeMove({ 
                    from: move.sourceSquare, 
                    to: move.targetSquare, 
                    piece: move.piece
                })}
            />
            <div className="game-menu">
                <Button className="game-menu-button" color="primary" size="lg" disabled>Undo Move</Button>
                <Button className="game-menu-button" color="primary" size="lg" disabled>Restart Game</Button>
                <Link to={appRoutes.menu}>
                    <Button className="game-menu-button" color="primary" size="lg">Main Menu</Button>
                </Link>
                
            </div>
        </div>
    )
};