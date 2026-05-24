import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";  // ← import Hero
import TemplatesSection from "./components/TemplatesSection";
import CodePreview from "./components/CodePreview";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(true);

  return (
    <>
      <GlobalStyles dark={dark} />
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero /> 
      <CodePreview />
      <TemplatesSection />
      <Footer />
    </>
  );
}

export default App;