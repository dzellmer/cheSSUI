import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState } from "react";
import { Button } from "reactstrap";

export default function GamePage(props) {
    const [chessObj, setChessObj] = useState(new Chess(props.position));
    const [position, setPosition] = useState(chessObj.fen());

    const makeMove = (move) => {
        chessObj.move(move);
        setPosition(chessObj.fen());
    }

    return (
        <div className="GamePage">
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
                <Button className="game-menu-button" color="warning" size="lg" disabled>Undo Move</Button>
                <Button className="game-menu-button" color="warning" size="lg" disabled>Restart Game</Button>
                <Button className="game-menu-button" color="warning" size="lg">Main Menu</Button>
            </div>
        </div>
    )
};