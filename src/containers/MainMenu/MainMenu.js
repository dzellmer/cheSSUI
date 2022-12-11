import appRoutes from '../../shared/appRoutes';

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChess, faCog } from '@fortawesome/free-solid-svg-icons'

export default function MainMenu(props) {
    console.log(props.cleanDatabase)
    function clean(){
        console.log('main menu call cleanDatabase')
        props.cleanDatabase()
    }

    return (
        <div className="MainMenu page">
            <h1>CheSSUI</h1>
            <div className="main-menu-buttons">
                <Link to={appRoutes.game}>
                    <Button onClick={clean} className="menu-button" color="primary" size="lg"><FontAwesomeIcon icon={faChess} className="btn-icon" />Start Game</Button>
                </Link>
                <Link to={appRoutes.gameOptions}>
                    <Button className="menu-button" color="primary" size="lg"><FontAwesomeIcon icon={faCog} className="btn-icon"/>Configure Game</Button>
                </Link>
            </div>
        </div>
    )
};