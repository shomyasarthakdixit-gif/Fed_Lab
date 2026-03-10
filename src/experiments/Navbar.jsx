import React from "react";
import { Link } from "react-router-dom";

const experiments = [
  { name: "Exp1", path: "/exp1" },
  { name: "Exp2", path: "/exp2" },
  { name: "Exp3", path: "/exp3" },
  { name: "Exp4", path: "/exp4" },
  { name: "Exp5", path: "/exp5" },
  { name: "Exp6", path: "/exp6" },
  { name: "Exp7", path: "/exp7" },
  { name: "Exp8", path: "/exp8" },
  { name: "Exp9", path: "/exp9" },
  { name: "Exp10", path: "/exp10" }
];

function ProjectNavbar() {
  return (
    <nav style={{ 
      background: "#1e293b", 
      padding: "15px", 
      position: "fixed", // Keeps it at the top
      top: 0, 
      left: 0, 
      width: "100%", 
      zIndex: 1000,
      display: "flex",
      justifyContent: "center"
    }}>
      {experiments.map((exp) => (
        <Link
          key={exp.path}
          to={exp.path}
          style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
        >
          {exp.name}
        </Link>
      ))}
    </nav>
  );
}

export default ProjectNavbar;