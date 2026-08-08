import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./Signup";
import Home from "./Home";
import Topic from "./Topic";
import About from "./About";
import Contact from "./Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/topic/:name" element={<Topic />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
