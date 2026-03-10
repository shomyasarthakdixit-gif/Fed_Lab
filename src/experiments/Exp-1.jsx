import React, { useState } from "react";

function Exp1_ProfileDashboard() {
  const [status, setStatus] = useState("Offline");

  return (
    <div>
      <h2>Experiment 1 – Profile Dashboard</h2>
      <h3>Name: John</h3>
      <p>Role: Developer</p>
      <p>Status: {status}</p>

      <button onClick={() => setStatus("Online")}>
        Go Online
      </button>
    </div>
  );
}

export default Exp1_ProfileDashboard;