import React from 'react'
import { HashRouter } from 'react-router-dom'
import Header from "../../Header";
import SwitchRoutes from "../../SwitchRoutes";


export function StartPage() {
    return (
        <div>
            <HashRouter>

                <Header/>
                <SwitchRoutes/>

            </HashRouter>
        </div>
    )
}


