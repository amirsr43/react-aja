// src/pages/Templates.jsx
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import TemplatesSection from "../components/TemplatesSection";
import ScrollToTop from "../components/ScrollToTop";
import SupportButton from "../components/SupportButton";
import Footer from "../components/Footer";

function Templates() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <TemplatesSection />
      <Footer />
      <ScrollToTop />
      <SupportButton />
    </>
  );
}

export default Templates;
