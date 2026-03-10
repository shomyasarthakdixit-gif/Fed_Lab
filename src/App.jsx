import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProjectNavbar from "./experiments/Navbar.jsx";
import Exp1 from "./experiments/Exp-1.jsx";
import Exp2 from "./experiments/Exp-2.jsx";
import Exp3 from "./experiments/Exp-3.jsx";
import Exp4 from "./experiments/Exp-4.jsx";
import Exp5 from "./experiments/Exp-5.jsx";
import Exp6 from "./experiments/Exp-6.jsx";
import Exp7 from "./experiments/Exp-7.jsx";
import Exp8 from "./experiments/Exp-8.jsx";
import Exp9 from "./experiments/Exp-9.jsx";
import Exp10 from "./experiments/Exp-10.jsx";

function App() {
  return (
    <BrowserRouter>
      <ProjectNavbar />
      {/* Added paddingTop so content isn't hidden behind the fixed navbar */}
      <div style={{ padding: "80px 20px 20px 20px" }}>
        <Routes>
          <Route path="/" element={<h2>Select an Experiment from the Navbar</h2>} />
          <Route path="/exp1" element={<Exp1 />} />
          <Route path="/exp2" element={<Exp2 />} />
          <Route path="/exp3" element={<Exp3 />} />
          <Route path="/exp4" element={<Exp4 />} />
          <Route path="/exp5" element={<Exp5 />} />
          <Route path="/exp6" element={<Exp6 />} />
          <Route path="/exp7" element={<Exp7 />} />
          <Route path="/exp8" element={<Exp8 />} />
          <Route path="/exp9" element={<Exp9 />} />
          <Route path="/exp10" element={<Exp10 />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;