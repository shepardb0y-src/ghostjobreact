import React from "react";
import {render} from "react-dom";
import { createRoot } from 'react-dom/client';

function Popup(){
   return( <div id="react_target">
        <h1>Dummy Text</h1>
        <p>Hello World!</p>
    </div>)
}


const root = createRoot(document.getElementById('root'));
root.render(<Popup/>);


