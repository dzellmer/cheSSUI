import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import appRoutes from '../../shared/appRoutes';

export default function GamePage(props) {
    console.log(props.origin)
    console.log(props.destination)
    console.log(props.updateMoveResult)
    let db = props.db

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [chessObj, setChessObj] = useState(props.gameMode === "Puzzle" ? new Chess(props.initPosition) : new Chess());
    const [mirrorChessObj, setMirrorChessObj] = useState(props.gameMode === "Puzzle" ? new Chess(props.initPosition) : new Chess());
    const [position, setPosition] = useState(props.initPosition);

    if(props.origin !== start) {
        console.log('update start')
        setStart(props.origin)
    }

    if(props.destination !== end) {
        console.log('unpdate end')
        setEnd(props.destination)
    }

    useEffect(() => {
        if(props.readyToMove === true) {
            
            let r = chessObj.move({from: start, to: end}) 
            console.log(r)
            if(r != null) {
                setPosition(chessObj.fen());
            }
            if(r === null) {
                props.updateMoveResult(false);
            }else{
                props.updateMoveResult(true)
            }

            let checkmate = chessObj.inCheck()
            if(checkmate === true) {
                props.setInCheck(true)
            }

            let over = chessObj.isGameOver()
            console.log(over)
            if(over === true) {
                let t = chessObj.turn()
                if(t == 'w') {
                    props.setWinner('black')
                }else{
                    props.setWinner('white')
                }
            }
            props.setReadyToMove(false)
        }
    })
    
    const onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    const setVisibility = (moves = [], color = "") => {
        if (props.gameMode === "Fog of War") {

            mirrorChessObj.load(chessObj.fen());

            let visibleSpaces = moves.map(m => m.slice(-2));
            chessObj.board().forEach(row => {
                row.forEach(col => {
                    if (col !== null && col.color === color) {
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
                        setVisibility(chessObj.moves(), 'w');
                    }
                }, 300);
                setVisibility(chessObj.moves(), 'w');
            }
        } else {
            if (chessObj.move(move))
                setVisibility(chessObj.moves(), chessObj.turn());
        }

        if (chessObj.history().length > 0) {
            const undoMoveBtn = document.getElementById("undo-move-btn");
            const restartGameBtn = document.getElementById("restart-game-btn");

            undoMoveBtn.classList.remove("disabled");
            restartGameBtn.classList.remove("disabled");
        }
    }

    const undoMove = () => {
        chessObj.undo();
        setVisibility();

        if (chessObj.history().length === 0) {
            const undoMoveBtn = document.getElementById("undo-move-btn");
            const restartGameBtn = document.getElementById("restart-game-btn");

            undoMoveBtn.classList.add("disabled");
            restartGameBtn.classList.add("disabled");
        }
    }

    const restartGame = () => {
        chessObj.load(props.initPosition);
        setVisibility();

        const undoMoveBtn = document.getElementById("undo-move-btn");
        const restartGameBtn = document.getElementById("restart-game-btn");

        undoMoveBtn.classList.add("disabled");
        restartGameBtn.classList.add("disabled");
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
                <Button id="undo-move-btn" className="game-menu-button disabled" color="primary" size="lg" onClick={undoMove}>Undo Move</Button>
                <Button id="restart-game-btn" className="game-menu-button disabled" color="primary" size="lg" onClick={restartGame}>Restart Game</Button>
                <Link to={appRoutes.menu}>
                    <Button className="game-menu-button" color="primary" size="lg">Main Menu</Button>
                </Link>
            </div> 
        </div>
    )
};