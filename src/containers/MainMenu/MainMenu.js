import React from "react";
import { Link } from 'react-router-dom';

export default function MainMenu(props) {

    return (
        <div id="main-menu">
            <div >
                    <Link>
                        <button><b>Standard GamePlay</b></button>
                    </Link>                  
            </div> 

            <div >
                    <Link>
                        <button><b>Fog of War</b></button>
                    </Link>                  
            </div> 

            <div >
                    <Link>
                        <button><b>Board Solver Mode</b></button>
                    </Link>                  
            </div> 



        </div>
    )
};