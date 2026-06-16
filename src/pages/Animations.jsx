// src/pages/Animations.jsx
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import AnimationsSection from "../components/AnimationsSection";
import ScrollToTop from "../components/ScrollToTop";
import SupportButton from "../components/SupportButton";
import Footer from "../components/Footer";

function Animations() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <AnimationsSection />
      <Footer />
      <ScrollToTop />
      <SupportButton />
    </>
  );
}

export default Animations;
