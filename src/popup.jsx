import React from "react";
import {render} from "react-dom"

function Popup(){
   return( <div id="react_target">
        <h1>Dummy Text</h1>
        <p>Hello World!</p>
    </div>)
}


render(<Popup/>,document.getElementById("react_target"))