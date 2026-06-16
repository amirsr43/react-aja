import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Animations from "./pages/Animations";
import Templates from "./pages/Templates";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animations" element={<Animations />} />
        <Route path="/templates" element={<Templates />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;