import React, { useState } from "react";

function Exp6_ProductAdvanced() {

  const [count,setCount] = useState(0);

  const handleClick = () => {
    setTimeout(()=>{
      setCount(prev => prev + 1);
    },1000);
  };

  return (
    <div>
      <h2>Experiment 6 – Stale State</h2>

      <p>Count: {count}</p>

      <button onClick={handleClick}>
        Increment
      </button>
    </div>
  );
}

export default Exp6_ProductAdvanced;