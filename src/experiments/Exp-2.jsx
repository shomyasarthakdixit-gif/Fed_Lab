import React from "react";

function UserCard({ name }) {
  return <h3>User: {name}</h3>;
}

function Exp2_ModularComponents() {
  return (
    <div>
      <h2>Experiment 2 – Modular Components</h2>
      <UserCard name="Alice" />
      <UserCard name="Bob" />
    </div>
  );
}

export default Exp2_ModularComponents;