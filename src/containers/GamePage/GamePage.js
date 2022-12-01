import Chessboard from "chessboardjsx";
import React, { useState } from "react";
import { Button } from "reactstrap";

export default function GamePage(props) {
    const [position, setPosition] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");

    return (
        <div className="GamePage">
            <Chessboard width={600} position={position}/>
            <div className="game-menu">
                <Button size="lg" disabled>Undo Move</Button>
                <Button size="lg" disabled>Restart Game</Button>
                <Button size="lg">Main Menu</Button>
            </div>
        </div>
    )
};