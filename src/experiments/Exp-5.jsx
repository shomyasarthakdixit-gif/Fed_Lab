import React, { useState } from "react";

function Exp5_SignInSignUp() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const valid = email && password;

  return (
    <div>
      <h2>Experiment 5 – Sign In</h2>

      <input placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <br/>

      <input type="password"
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <br/>

      <button disabled={!valid}>
        Login
      </button>
    </div>
  );
}

export default Exp5_SignInSignUp;