import { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    } else {
      setHistory((prev) => [...prev, newMode]);
    }
  };

  const back = () => {
    if (history.length >= 2) {
      history.pop();
      setHistory((prev) => [...history]);
      setMode(history[history.length - 1]);
    }
  };

  return {
    mode,
    transition,
    back,
  };
}

// import { sendStatus } from "express/lib/response"
// import { useState } from "react"

// export default function useVisualMode(initial) {
//   const [mode, setMode] = useState(initial);
//   const [history, setHistory] = useState([initial]);//with first mode as first element


//   const transition = (newMode,replace=false) => {
//     setMode(newMode);
    
//     if(replace) {
      
//       setHistory(prev => [...prev.slice(0, prev.length - 1),newMode]); 
//      // setHistory(prev=> [newMode])
     
//     }
//     else {
//       setHistory(prev => [...prev, newMode]);
//     }
//   }

//   function back() {
//     //console.log("mode:",mode)
//     if (mode !== initial) {
//       setHistory(prev => [...prev.slice(0, prev.length - 1)]); //going back to previous mode, set mode to previous mode
//       //console.log("history:",history)
//       //console.log(history[history.length - 1]);
//       setMode(history[history.length - 1]);
//     }
//   }


//   return { mode: history[history.length - 1], transition, back } //{mode:mode}

// }