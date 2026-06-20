// src/pages/Home.jsx
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ScrollToTop from "../components/ScrollToTop";
import SupportButton from "../components/SupportButton";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <Footer />
      <ScrollToTop />
      <SupportButton />
    </>
  );
}

export default Home;
