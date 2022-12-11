import { Chess } from "chess.js";
import Chessboard from "chessboardjsx";
import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";
import {getFirestore,collection, addDoc, query, onSnapshot,setDoc,updateDoc,doc, getDocs, where, deleteDoc, getDoc } from 'firebase/firestore';

// import db from "./index";

export default function GamePage(props) {
    console.log(props.origin)
    console.log(props.destination)
    console.log(props.updateMoveResult)
    let db = props.db

    const [chessObj, setChessObj] = useState(new Chess(props.position));
    const [position, setPosition] = useState(chessObj.fen());
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    // readAndWriteDatabase()

    if(props.origin !== start) {
        console.log('update start')
        setStart(props.origin)
    }

    if(props.destination !== end) {
        console.log('unpdate end')
        setEnd(props.destination)
    }

    const makeMove = (move) => {
        let res = chessObj.move(move);
        console.log(res)
        setPosition(chessObj.fen());
        let c = chessObj.inCheck()
        console.log(c)
        let over = chessObj.isGameOver()
        console.log(over)
        let t = chessObj.turn()
        // if(t == 'w') {
        //     props.setWinner('black')
        // }else{
        //     props.setWinner('white')

        // }

    }

    
    // let rr = chessObj.move({from: props.origin, to: props.destination}) 
    // console.log(rr)
    // setPosition(chessObj.fen());

    useEffect(() => {
        console.log(start)
        console.log(end)
        if(props.readyToMove === true) {
            
            let r = chessObj.move({from: start, to: end}) 
            console.log(r)
            if(r != null) {
                console.log("come to set position")
                setPosition(chessObj.fen());
            }
            if(r == null) {
                console.log('come to r == null branch')
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
            



            // let win = chessObj.inCheckmate()
            // if(win === true) {
            //     let winner = chessObj.turn();
            //     props.setWinner(winner)
                
            // }

            props.setReadyToMove(false)
        }
    })

    function readAndWriteDatabase(){
        
        onSnapshot(doc(db, "chessmove", "move"), (doc) => {
            console.log("come into onSnapshot")
            let d = doc.data()
            let orig = d.origin[0]
            let dest = d.destination[0]
            console.log(dest)
            console.log(typeof(dest))
            console.log(orig)
            console.log(typeof(orig))

            if(orig !== start || dest !== end) {
                let r = chessObj.move({from: orig, to: dest})
                console.log(r)

                if(r !== null) {
                    setPosition(chessObj.fen());
                    db.collection("moveresult").doc("result").update({success: true})
                }else{
                    db.collection("moveresult").doc("result").update({success: false})

                }

                let checkmate = chessObj.inCheck()
                if(checkmate === true) {
                    db.collection("checkmate").doc("check").update({checking: true})
                }
                start = orig
                end = dest

            // let win = chessObj.inCheckmate()
            // if(win === true) {
            //     let winner = chessObj.turn();
            //     db.collection("checkwinner").doc("winner").update({win: winner})
            // }

               
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