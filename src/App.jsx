import { useState } from "react";
import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import CodePreview from "./components/CodePreview";
import HowItWorks from "./components/HowItWorks";
import TemplatesSection from "./components/TemplatesSection";
import ScrollToTop from "./components/ScrollToTop";
import FeedbackButton from "./components/FeedbackButton";
import SupportButton from "./components/SupportButton";
import Footer from "./components/Footer";

function App() {
  const [dark, setDark] = useState(true);

  return (
    <>
      <GlobalStyles dark={dark} />
      <Navbar dark={dark} toggleDark={() => setDark(!dark)} />
      <Hero />
      <StatsSection />
      <CodePreview />
      <HowItWorks />
      <TemplatesSection />
      <Footer />
      <ScrollToTop />
      <FeedbackButton />
      <SupportButton />
    </>
  );
}

export default App;