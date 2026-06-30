import { introductionDoc } from "./docs/introduction";
import { installationDoc } from "./docs/installation";
import { componentsDocs } from "./docs/componentsData";
import { animationsDocs } from "./docs/animationsData";
import { developerToolsDocs } from "./docs/developerToolsData";

export const docsData = {
  introduction: introductionDoc,
  installation: installationDoc,
  ...componentsDocs,
  ...animationsDocs,
  ...developerToolsDocs
};

export const docsCategories = [
  {
    title: "Getting Started",
    items: [
      { id: "introduction", name: "Introduction" },
      { id: "installation", name: "Installation" }
    ]
  },
  {
    title: "UI Components",
    id: "ui-components",
    items: [
      { id: "button", name: "Button" },
      { id: "profile-card", name: "Profile Card" },
      { id: "loading", name: "Loading Indicators" },
      { id: "form", name: "Modern Form" },
      { id: "product-card", name: "Product Card" },
      { id: "toast-notification", name: "Toast Notifications" },
      { id: "search-bar", name: "Interactive SearchBar" },
      { id: "portfolio-navbar", name: "Portfolio Navbar" }
    ]
  },
  {
    title: "UI Animations",
    id: "ui-animations",
    items: [
      { id: "collage-animator", name: "Collage Animator" },
      { id: "card-carousel-3d", name: "3D Card Carousel" },
      { id: "magnetic-slider", name: "Magnetic Slider" },
      { id: "profile-stack", name: "Animated Profile Stack" },
      { id: "interactive-timeline", name: "Interactive Timeline" },
      { id: "glowing-button", name: "Glowing Outline Button" },
      { id: "fluid-switch", name: "Interactive Fluid Switch" },
      { id: "text-animation", name: "Text Animation" },
      { id: "focus-blur-text", name: "Spotlight Focus Blur" },
      { id: "expanding-search", name: "Expanding Search Bar" },
      { id: "masked-slide-text", name: "Masked Slide-Up Text" },
      { id: "cinematic-blur-text", name: "Cinematic Blur Reveal" },
      { id: "hero-word-swapper", name: "Hero Word Swapper" },
      { id: "double-hover-text", name: "Double-Layer Hover" },
      { id: "gradient-sweep-text", name: "Gradient Sweep Reveal" },
      { id: "interactive-3d-text", name: "Interactive 3D Letters" }
    ]
  },
  {
    title: "Developer Tools",
    id: "developer-tools",
    items: [
      { id: "svg-to-jsx", name: "SVG to JSX" },
      { id: "theme-generator", name: "Theme Generator" },
      { id: "px-to-rem", name: "Px to Rem Spacing" }
    ]
  }
];
