import React  from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import Chessboard from "chessboardjsx";

import appRoutes from "../../shared/appRoutes";
import chessPuzzles from "../../shared/chessPuzzles";
import { standardStartingPositon, fogOfWarStartingPosition } from "../../shared/positions";

export default function GameOptionsPage(props) {

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
        if (mode !== "Select") {
            if (mode === "Puzzle") {
                puzzleDisplay.style.visibility = "visible";
            } else {
                puzzleDisplay.style.visibility = "hidden";
                if (mode === "Fog of War") {
                    console.log(fogOfWarStartingPosition)
                    props.setPosition(fogOfWarStartingPosition)
                } else if (mode === "Standard") {
                    props.setPosition(standardStartingPositon)
                }
            }
            props.setGameMode(mode);
        }
    }

    const selectOpponent = (e) => {
        if (e.target.value !== "Select")
            props.setOpponent(e.target.value);
    }

    const selectPuzzle = (p) => {
        props.setPosition(p);
    }

    return (
        <div className="GameOptionsPage page">
            <h1>Configure Game</h1>
            <div className="game-options">
                <div className="game-option">
                    <h2>Opponent</h2>
                    <select name="opponentType" id="opponentType" class="option-selector selection" onChange={selectOpponent}>
                        <option value="Select">Select</option>
                        {opponentOptions}
                    </select>
                </div>
                <div className="game-option">
                    <h2>Game Mode</h2>
                    <select name="gameMode" id="gameMode" class="option-selector selection" onChange={selectGameMode}>
                        <option value="Select">Select</option>
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