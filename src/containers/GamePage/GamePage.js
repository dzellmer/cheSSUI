import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import appRoutes from '../../shared/appRoutes';

export default function GamePage(props) {

    const [chessObj, setChessObj] = useState(props.gameMode === "Puzzle" ? new Chess(props.initPosition) : new Chess());
    const [mirrorChessObj, setMirrorChessObj] = useState(props.gameMode === "Puzzle" ? new Chess(props.initPosition) : new Chess());
    const [position, setPosition] = useState(props.initPosition);

    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const setVisibility = (moves) => {
        if (props.gameMode === "Fog of War" && props.opponent === "Computer") {

            mirrorChessObj.load(chessObj.fen());

            let visibleSpaces = moves.map(m => m.slice(-2));
            chessObj.board().forEach(row => {
                row.forEach(col => {
                    if (col !== null && col.color === 'w') {
                        visibleSpaces.push(col.square)
                    }
                })
            });

            visibleSpaces = visibleSpaces.filter(onlyUnique);

            let squaresToClear = [];

            chessObj.board().forEach(row => {
                row.forEach(col => {
                    if (col !== null && !visibleSpaces.includes(col.square)) {
                        squaresToClear.push(col.square)
                    }
                })
            });

            squaresToClear.forEach(square => mirrorChessObj.remove(square))

            setPosition(mirrorChessObj.fen());
        } else {
            setPosition(chessObj.fen());
        }
    }

    const makeMove = (move) => {
        if (props.opponent === "Computer") {
            if (chessObj.move(move)) {
                setTimeout(() => {
                    const moves = chessObj.moves();
                    if (moves.length > 0) {
                        const computerMove = moves[Math.floor(Math.random() * moves.length)];
                        chessObj.move(computerMove);
                        console.log("SETTING VISIBILITY")
                        setVisibility(chessObj.moves());
                    }
                }, 300);
                console.log("SETTING POSITION")
                setVisibility(chessObj.moves());
                // setPosition(chessObj.fen());
            }
        } else {
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
                <h2 class="white-and-underlined">Move</h2>
                <h2 class="white">{chessObj.turn() === 'w' ? "White" : "Black"}</h2>
                <Button className="game-menu-button" color="primary" size="lg" disabled>Undo Move</Button>
                <Button className="game-menu-button" color="primary" size="lg" disabled>Restart Game</Button>
                <Link to={appRoutes.menu}>
                    <Button className="game-menu-button" color="primary" size="lg">Main Menu</Button>
                </Link>

            </div>
        </div>
    )
};