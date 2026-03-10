import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function Child() {
  const {theme,setTheme} = useContext(ThemeContext);

  return (
    <button onClick={()=>setTheme(theme==="light"?"dark":"light")}>
      Toggle Theme
    </button>
  );
}

function Exp8_ContextAPI() {

  const [theme,setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{theme,setTheme}}>
      <h2>Theme: {theme}</h2>
      <Child/>
    </ThemeContext.Provider>
  );
}

export default Exp8_ContextAPI;