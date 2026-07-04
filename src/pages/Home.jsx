// src/pages/Home.jsx
import React, { useEffect } from "react";
import GlobalStyles from "../styles/GlobalStyles";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LandingFeatures from "../components/LandingFeatures";
import ShowcaseGrid from "../components/ShowcaseGrid";
import ScrollToTop from "../components/ScrollToTop";
import SupportButton from "../components/SupportButton";
import Footer from "../components/Footer";

function Home() {
  useEffect(() => {
    document.title = "ReactAja - Premium React UI Components & Animations Library";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "ReactAja provides a curated collection of premium, copy-paste React UI components and Framer Motion animations. Save time and build stunning web interfaces in minutes.");
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <LandingFeatures />
      <ShowcaseGrid />
      <Footer />
      <ScrollToTop />
      <SupportButton />
    </>
  );
}

export default Home;
