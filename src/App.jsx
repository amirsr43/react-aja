import GlobalStyles from "./styles/GlobalStyles";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StatsSection from "./components/StatsSection";
import HowItWorks from "./components/HowItWorks";
import TemplatesSection from "./components/TemplatesSection";
import FAQSection from "./components/FAQSection";
import ScrollToTop from "./components/ScrollToTop";
import FeedbackButton from "./components/FeedbackButton";
import SupportButton from "./components/SupportButton";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <StatsSection />
      <HowItWorks />
      <TemplatesSection />
      <FAQSection />
      <Footer />
      <ScrollToTop />
      <FeedbackButton />
      <SupportButton />
    </>
  );
}

export default App;