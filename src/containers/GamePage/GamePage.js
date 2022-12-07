import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import db from "./index";

export default function GamePage(props) {
    console.log(props.origin)
    console.log(props.destination)
    console.log(props.updateMoveResult)

    const [chessObj, setChessObj] = useState(new Chess(props.position));
    const [position, setPosition] = useState(chessObj.fen());
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    readDataFromDatabase()

    // if(props.origin !== start) {
    //     console.log('update start')
    //     setStart(props.origin)
    // }

    // if(props.destination !== end) {
    //     console.log('unpdate end')
    //     setEnd(props.destination)
    // }

    const makeMove = (move) => {
        chessObj.move(move);
        setPosition(chessObj.fen());
    }

    
    // let rr = chessObj.move({from: props.origin, to: props.destination}) 
    // console.log(rr)
    // setPosition(chessObj.fen());

    // useEffect(() => {
    //     console.log(start)
    //     console.log(end)
    //     if(props.readyToMove === true) {
    //         let r = chessObj.move({from: start, to: end}) 
    //         console.log(r)
    //         if(r != null) {
    //             console.log("come to set position")
    //             setPosition(chessObj.fen());
    //         }
    //         if(r == null) {
    //             console.log('come to r == null branch')
    //             props.updateMoveResult(false);
    //         }else{
    //             props.updateMoveResult(true)
    //         }
    //         props.setReadyToMove(false)
    //     }
    // })

    function readDataFromDatabase(){
        onSnapshot(doc(db, "chessmove", "move"), (doc) => {
            let d = doc.data()
            let orig = d.origin[0]
            let dest = d.destination[0]
            console.log(dest)
            console.log(orig)

            let r = chessObj.move({from: orig, to: dest})

            if(r !== null) {
                setPosition(chessObj.fen());
                db.collection("moveresult").doc("result").update({success: true})
            }else{
                db.collection("moveresult").doc("result").update({success: false})

            }
        });   
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

            {/* <div className="mode-menu">
                <Button className="game-menu-button" color="warning" size="lg" >Standard gameplay</Button>
                <Button className="game-menu-button" color="warning" size="lg" disabled>Fog of war</Button>
                <Button className="game-menu-button" color="warning" size="lg" disabled>Board solver mode</Button>
            </div> */}
            
        </div>
    )
};