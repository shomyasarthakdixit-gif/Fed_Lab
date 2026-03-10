import React, { useState, useRef } from "react";

function Exp4_StylingStrategies() {

  const [text, setText] = useState("");
  const inputRef = useRef();

  return (
    <div>
      <h2>Experiment 4 – Inputs</h2>

      <input
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Controlled input"
      />

      <br/><br/>

      <input ref={inputRef} placeholder="Uncontrolled input"/>

      <button onClick={()=>alert(inputRef.current.value)}>
        Show Value
      </button>
    </div>
  );
}

export default Exp4_StylingStrategies;