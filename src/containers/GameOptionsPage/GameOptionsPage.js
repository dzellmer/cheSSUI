import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import Chessboard from "chessboardjsx";

import chessPuzzles from "../../shared/chessPuzzles";
import appRoutes from "../../shared/appRoutes";

export default function GameOptionsPage(props) {
    const [gameMode, setGameMode] = useState("Standard");

    const gameModeOptions = ["Standard", "Puzzle", "Fog of War"].map((val) => <option value={val}>{val}</option>);
    const opponentOptions = ["Human", "Computer"].map((val) => <option value={val}>{val}</option>);

    const puzzles = chessPuzzles.map(p => {
        return (
            <div className="puzzle-option">
                <Chessboard width={250} position={p} />
                <Button color="primary" onClick={() => selectPuzzle(p)}>Select</Button>
            </div>
        )
    })

    const selectGameMode = (e) => {
        let mode = e.target.value;
        let puzzleDisplay = document.getElementById("puzzle-selection");
        if (mode === "Puzzle") {
            puzzleDisplay.style.visibility = "visible";
        } else {
            puzzleDisplay.style.visibility = "hidden";
        }
        setGameMode(mode);
    }

    const selectOpponent = (e) => {
        let opponent = e.target.value;
        props.setOpponent(opponent);
    }

    const selectPuzzle = (p) => {
        console.log(`In GAME OPTIONS ${p}`);
        props.setGameMode(gameMode);
        props.setPosition(p);
    }

    return (
        <div className="GameOptionsPage page">
            <h1>Configure Game</h1>
            <div className="game-options">
                <div className="game-option">
                    <h2>Opponent</h2>
                    <select name="opponentType" id="opponentType" class="option-selector selection" onChange={selectOpponent}>
                        {opponentOptions}
                    </select>
                </div>
                <div className="game-option">
                    <h2>Game Mode</h2>
                    <select name="gameMode" id="gameMode" class="option-selector selection" onChange={selectGameMode}>
                        {gameModeOptions}
                    </select>
                </div>
                <div id="puzzle-selection">{puzzles}</div>

                <div className="horizontal-buttons">
                    <Link to={appRoutes.game}>
                        <Button className="menu-button" color="primary" size="lg">Start Game</Button>
                    </Link>
                    <Link to={appRoutes.menu}>
                        <Button className="menu-button" color="primary" size="lg">Return to Main Menu</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
};