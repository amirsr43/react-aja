import React from "react";
import CollageAnimator from "../../components/ui/animations/CollageAnimator";
import { collageAnimatorCode } from "../codes/collageAnimator";
import MagneticSlider from "../../components/ui/animations/MagneticSlider";
import { magneticSliderCode } from "../codes/magneticSlider";
import CardCarousel3D from "../../components/ui/animations/CardCarousel3D";
import { cardCarousel3DCode } from "../codes/cardCarousel3D";
import AnimatedProfileStack from "../../components/ui/animations/AnimatedProfileStack";
import { animatedProfileStackCode } from "../codes/animatedProfileStack";
import InteractiveTimeline from "../../components/ui/animations/InteractiveTimeline";
import { interactiveTimelineCode } from "../codes/interactiveTimeline";
import GlowingButtonShowcase from "../../components/ui/animations/GlowingButton";
import { glowingButtonCode } from "../codes/glowingButton";
import FluidSwitchShowcase from "../../components/ui/animations/FluidSwitch";
import { fluidSwitchCode } from "../codes/fluidSwitch";
import TextAnimationShowcase from "../../components/ui/animations/TextAnimation";
import { textAnimationCode } from "../codes/textAnimation";
import CyberDecoderText from "../../components/ui/animations/CyberDecoderText";
import { cyberDecoderCode } from "../codes/cyberDecoder";
import InteractiveFloatText from "../../components/ui/animations/InteractiveFloatText";
import { floatingSpringCode } from "../codes/floatingSpring";
import FocusBlurText from "../../components/ui/animations/FocusBlurText";
import { focusBlurTextCode } from "../codes/focusBlurText";
import ExpandingSearch from "../../components/ui/animations/ExpandingSearch";
import { expandingSearchCode } from "../codes/expandingSearch";

import { Link } from "react-router-dom";
import { ToggleLeft, Users, Calendar, Sparkles, Sliders, Type, Binary, MessageSquare, Eye, Search, ArrowRight, Layers } from "lucide-react";

export const animationsDocs = {
  "ui-animations": {
    id: "ui-animations",
    title: "UI Animations",
    description: "Explore our collection of premium, highly interactive Framer Motion animations designed for modern web apps.",
    category: "UI Animations",
    isGuide: true,
    content: (
      <div className="category-landing-page">
        <style>{`
          .category-card {
            display: flex;
            flex-direction: column;
            padding: 24px;
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.05);
            border-radius: 16px;
            color: #ffffff;
            text-decoration: none;
            transition: all 0.3s ease;
          }
          .category-card:hover {
            transform: translateY(-4px);
            background: rgba(255, 255, 255, 0.04) !important;
            border-color: rgba(167, 139, 250, 0.3) !important;
            box-shadow: 0 12px 30px rgba(124, 58, 237, 0.08);
          }
        `}</style>
        <div className="category-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: "20px",
          marginTop: "24px"
        }}>
          {[
            { id: "collage-animator", name: "Collage Animator", desc: "Interactive overlapping collage layouts with timeline scrubbing and live spring physics tuning.", icon: <Layers size={20} /> },
            { id: "card-carousel-3d", name: "3D Card Carousel", desc: "A premium travel card stack featuring 3D depth, scale adjustments, and spring mechanics.", icon: <Layers size={20} /> },
            { id: "magnetic-slider", name: "Magnetic Slider", desc: "Glassmorphic slider with a floating magnetic sphere snapping on spring physics.", icon: <Sliders size={20} /> },
            { id: "profile-stack", name: "Animated Profile Stack", desc: "Expandable avatar stack with silhouette slide-ins and volume pulsing.", icon: <Users size={20} /> },
            { id: "interactive-timeline", name: "Interactive Timeline", desc: "Curved timeline scrolling years along a circular arc with drag snaps.", icon: <Calendar size={20} /> },
            { id: "glowing-button", name: "Glowing Outline Button", desc: "Aurora/ember rotating gradient outline with soft glow ambient shadow.", icon: <Sparkles size={20} /> },
            { id: "fluid-switch", name: "Interactive Fluid Switch", desc: "Segmented slide, celestial day/night, and 3D toggle tactile switch suite.", icon: <ToggleLeft size={20} /> },
            { id: "text-animation", name: "Text Animation", desc: "Matrix style reveal decryptor and interactive spring float letter wave.", icon: <Type size={20} /> },
            { id: "cyber-decoder", name: "Cyber Decoder Text", desc: "Staggered letter wave decrypting and matrix decoding on hover.", icon: <Binary size={20} /> },
            { id: "floating-spring", name: "Floating Spring Text", desc: "Staggered interactive floating letters with spring neon transitions.", icon: <MessageSquare size={20} /> },
            { id: "focus-blur-text", name: "Spotlight Focus Blur", desc: "Magnifying lens effect sharpening blurred backdrop text under cursor.", icon: <Eye size={20} /> },
            { id: "expanding-search", name: "Expanding Search Bar", desc: "Spring-loaded search pill expanding from a search icon on hover/click.", icon: <Search size={20} /> },
          ].map((item) => (
            <Link to={`/docs/${item.id}`} key={item.id} className="category-card">
              <div className="category-card-icon" style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                color: "#a78bfa"
              }}>
                {item.icon}
              </div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", fontWeight: 700 }}>{item.name}</h3>
              <p style={{ margin: "0 0 16px 0", fontSize: "13px", color: "#8e8e93", lineHeight: "1.5", flexGrow: 1 }}>{item.desc}</p>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12.5px", fontWeight: 600, color: "#a78bfa" }}>
                <span>Explore Animation</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  },
  "collage-animator": {
    id: "collage-animator",
    title: "Collage Animator Pro",
    description: "A premium hover-reactive collage card featuring spring physics. On mouse hover (or touch on mobile), 8 overlapping assets spiral outwards in a circular layout, rotating around the center while spinning on their own axes.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "10px 0", display: "flex", justifyContent: "center", width: "100%", overflow: "visible" }}>
        <CollageAnimator />
      </div>
    ),
    code: collageAnimatorCode.code,
    css: collageAnimatorCode.css,
    prompt: "Create a hover-reactive orbiting collage card in React using Framer Motion. The container has a set of 8 overlapping themed cards (images, text badges, and typography blocks). Initially, they collapse into a tight stacked center pile. When the mouse hovers over the container (or on touch for mobile), the cards spiral outwards to form a circular ring, rotating 360 degrees around the center while spinning on their own axes, using a spring transition (e.g. stiffness 130, damping 14, mass 0.9).",
    props: [
      { name: "(self-contained)", type: "—", default: "—", description: "Hover-driven widget. Import and render directly to let users hover and interact with the collage." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },
  "card-carousel-3d": {
    id: "card-carousel-3d",
    title: "3D Card Carousel Effect",
    description: "A premium travel card stack carousel displaying items in a curved 3D layout with spring animations and interactive scale/rotate focus snapping.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "10px 0", display: "flex", justifyContent: "center", width: "100%" }}>
        <CardCarousel3D />
      </div>
    ),
    code: cardCarousel3DCode.code,
    css: cardCarousel3DCode.css,
    prompt: "Create a 3D travel card stack carousel in React with Framer Motion. The cards should align in a circular 3D arrangement with left/right tilt angles, automatic sliding, and center-card scale focus.",
    props: [
      { name: "cards", type: "array", default: "DEFAULT_CARDS", description: "Array of card objects containing title, location, image, badge, rating." },
      { name: "autoplay", type: "boolean", default: "true", description: "Automatically cycle cards." },
      { name: "interval", type: "number", default: "5000", description: "Delay in milliseconds between auto cycles." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },
  "magnetic-slider": {
    id: "magnetic-slider",
    title: "Magnetic Slider",
    description: "A futuristic glassmorphic slider featuring a floating magnetic sphere, hover drift interaction, dynamic pulsing light guides, and spring physics snapping.",
    category: "UI Animations",
    isGuide: false,
    variants: [
      {
        name: "Interactive Slider",
        description: "Move the mouse cursor over the glass sphere to feel the magnetic drift attraction. Drag the handle or click the 'Sleep' and 'Work' text to toggle states.",
        preview: (
          <div style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
            <MagneticSlider />
          </div>
        ),
        code: magneticSliderCode.code,
        css: magneticSliderCode.css,
        prompt: "Create a futuristic glassmorphic toggle slider in React with Framer Motion. It should feature a floating glass sphere handle that feels magnetically drawn to the mouse cursor on hover. Snapping snapped positions (Sleep, Idle, Work) with spring physics transitions, and change status icons dynamically."
      }
    ],
    props: [
      { name: "initialState", type: "string", default: '"idle"', description: "The starting active state for the slider: 'sleep' | 'idle' | 'work'." },
      { name: "sleepLabel", type: "string", default: '"Sleep"', description: "Text label for the left option." },
      { name: "workLabel", type: "string", default: '"Work"', description: "Text label for the right option." },
      { name: "sleepIcon", type: "React.Component", default: "Moon", description: "Lucide icon component displayed when active in the sleep state." },
      { name: "workIcon", type: "React.Component", default: "Briefcase", description: "Lucide icon component displayed when active in the work state." },
      { name: "idleIcon", type: "React.Component", default: "User", description: "Lucide icon component displayed when active in the center idle state." },
      { name: "onChange", type: "function", default: "undefined", description: "Callback function triggered when the slider state changes." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for the slider container." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "profile-stack": {
    id: "profile-stack",
    title: "Animated Profile Stack",
    description: "A clean, minimalist expandable profile avatar stack featuring slide-out spreading transitions, a pulsing dark audio status badge, and fade-in silhouette avatars.",
    category: "UI Animations",
    isGuide: false,
    variants: [
      {
        name: "Interactive Stack",
        description: "Hover over the white pill container to trigger the layout expansion. Original avatars will spread out, text counter fades, and 3 dark silhouettes fade in.",
        preview: (
          <div style={{ padding: "10px 0", display: "flex", justifyContent: "center" }}>
            <AnimatedProfileStack />
          </div>
        ),
        code: animatedProfileStackCode.code,
        css: animatedProfileStackCode.css,
        prompt: "Create an expandable profile avatar stack pill in React. The pill is styled in white glassmorphism. On hover, the avatars spread out, a text badge fades out, and 3 dark silhouette placeholder avatars slide in from the right. Include an interactive pulsing active audio volume indicator dot."
      }
    ],
    props: [
      { name: "avatars", type: "array", default: "BASE_AVATARS", description: "Array of image URLs for the base profile avatar stack." },
      { name: "extraAvatars", type: "array", default: "SILHOUETTE_AVATARS", description: "Array of image URLs for the additional dark silhouette avatars appearing on hover." },
      { name: "extraCount", type: "number", default: "3", description: "Count indicator number shown beside the avatar stack when collapsed (e.g. +3)." },
      { name: "pulse", type: "boolean", default: "true", description: "Whether to render the pulsing status indicator bubble on the left." },
      { name: "pulseIcon", type: "React.Component", default: "Volume2", description: "Lucide icon component rendered inside the pulsing status bubble." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for the stack container." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "interactive-timeline": {
    id: "interactive-timeline",
    title: "Interactive Timeline",
    description: "A vertical representation of time aligning scrolling year labels along a dynamic circular arc path, featuring center index snapping and a bobbing pointing finger indicator.",
    category: "UI Animations",
    isGuide: false,
    variants: [
      {
        name: "Interactive Timeline Scroller",
        description: "Scroll using the mouse wheel over the year list, click on any year directly, or drag vertically to scroll.",
        preview: (
          <div style={{ padding: "10px 0", display: "flex", justifyContent: "center", width: "100%" }}>
            <InteractiveTimeline />
          </div>
        ),
        code: interactiveTimelineCode.code,
        css: interactiveTimelineCode.css,
        prompt: "Create a vertical curved scroller timeline in React with Framer Motion. The year labels are aligned along a circular arc path. When scrolled or dragged, the active item snaps to the center with a pointer glow, featuring a bobbing index finder indicator."
      }
    ],
    props: [
      { name: "years", type: "array", default: '["2021", "2022", "2023", "2024", "2025", "2026"]', description: "Array of year strings or numbers to render in the scroll wheel." },
      { name: "initialYear", type: "string", default: "undefined", description: "Starting active year to select on mount." },
      { name: "accentColor", type: "string", default: '"#3b82f6"', description: "Hex theme accent color used for the active year glow." },
      { name: "onChange", type: "function", default: "undefined", description: "Callback function triggered when the active year changes." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for the container element." }
    ],
    dependencies: ["framer-motion"]
  },

  "glowing-button": {
    id: "glowing-button",
    title: "Glowing Outline Button",
    description: "A premium button featuring a rotating, vibrant gradient border outline that casts an ambient blurred glow backdrop.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <GlowingButtonShowcase />
      </div>
    ),
    code: glowingButtonCode.code,
    css: glowingButtonCode.css,
    prompt: "Create a premium CTA button in React featuring a rotating vibrant gradient border outline (aurora colors) that casts a soft, blurred ambient backdrop underglow shadow.",
    props: [
      { name: "preset", type: "string", default: '"aurora"', description: "Color gradient theme: 'aurora' | 'cyber' | 'ember' | 'glass'." },
      { name: "speed", type: "string", default: '"normal"', description: "Rotation animation speed: 'slow' | 'normal' | 'fast'." },
      { name: "glowIntensity", type: "string", default: '"medium"', description: "Ambient blur glow magnitude: 'none' | 'low' | 'medium' | 'high'." },
      { name: "shape", type: "string", default: '"pill"', description: "Button border shape: 'pill' | 'rounded'." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and shuts off glow/border spin." },
      { name: "icon", type: "React.Component", default: "undefined", description: "Lucide icon component rendered inside the button content." },
      { name: "onClick", type: "function", default: "undefined", description: "Click event handler function." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for container custom overrides." }
    ],
    dependencies: ["lucide-react"]
  },

  "fluid-switch": {
    id: "fluid-switch",
    title: "Interactive Fluid Switch",
    description: "A premium suite of interactive switcher and toggle components featuring spring-physics layout morphs, celestial light/dark mode transitions, and tactile 3D mechanical button triggers.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <FluidSwitchShowcase />
      </div>
    ),
    code: fluidSwitchCode.code,
    css: fluidSwitchCode.css,
    prompt: "Create a suite of modern switchers in React with Framer Motion, including: 1) a segmented sliding tab bar switcher, 2) a celestial theme toggler that transitions from sun to moon, and 3) a tactile mechanical 3D button switch that presses down on click.",
    props: [
      { name: "options", type: "array", default: '["Tab 1", "Tab 2", "Tab 3"]', description: "List of string labels for the segmented switch options." },
      { name: "icons", type: "array", default: "[]", description: "Array of Lucide icon component classes corresponding to options." },
      { name: "activeIdx", type: "number", default: "0", description: "Active index for FluidSegmentSwitch control." },
      { name: "isDark", type: "boolean", default: "true", description: "Day/Night theme active toggle state for CosmicThemeSwitch." },
      { name: "checked", type: "boolean", default: "false", description: "On/Off active toggle state for Tactile3DToggle." },
      { name: "onChange", type: "function", default: "undefined", description: "State change listener callback handler." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "text-animation": {
    id: "text-animation",
    title: "Text Animations",
    description: "Futuristic text reveal decryption and spring-physics letter float animations.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "35px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <TextAnimationShowcase />
      </div>
    ),
    code: textAnimationCode.code,
    css: textAnimationCode.css,
    prompt: "Create a text animation suite in React with Framer Motion. Includes two variants: (1) Cyber Decoder Text: a matrix-style text decryptor that randomizes characters before revealing the target letters on click/mount, and (2) Floating Spring Text: an interactive letter layout where characters float up and scale on mouse hover with spring physics.",
    props: [
      { name: "text", type: "string", default: '"DECRYPTING SECTOR 7" / "Hover over this sentence"', description: "The string content to animate." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "cyber-decoder": {
    id: "cyber-decoder",
    title: "Cyber Decoder Text",
    description: "A futuristic text reveal animation that decrypts random characters into target letters.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "35px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <CyberDecoderText />
      </div>
    ),
    code: cyberDecoderCode.code,
    css: cyberDecoderCode.css,
    prompt: "Create a futuristic matrix text decryptor animation in React. Characters randomize and decrypt into target letters from left to right. Trigger the decryption reveal on mount and on button click.",
    props: [
      { name: "text", type: "string", default: '"DECRYPTING SECTOR 7"', description: "Target string to decrypt and reveal." }
    ],
    dependencies: ["lucide-react"]
  },

  "floating-spring": {
    id: "floating-spring",
    title: "Floating Spring Text",
    description: "Staggered letter wave animations that float and scale up on pointer hover.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "35px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <InteractiveFloatText />
      </div>
    ),
    code: floatingSpringCode.code,
    css: floatingSpringCode.css,
    prompt: "Create an interactive spring-physics floating text wave in React. Hovering over letters floats them upwards and scales them up with staggered neon color transitions.",
    props: [
      { name: "text", type: "string", default: '"Hover or drag over these characters"', description: "Sentence characters to animate." }
    ],
    dependencies: ["framer-motion"]
  },

  "focus-blur-text": {
    id: "focus-blur-text",
    title: "Spotlight Focus Blur",
    description: "A premium circular magnifying glass effect where letters blur out unless under mouse cursor spotlight focus.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "35px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <FocusBlurText />
      </div>
    ),
    code: focusBlurTextCode.code,
    css: focusBlurTextCode.css,
    prompt: "Create a spotlight magnifying lens focus blur text container in React. Text is blurred out by default, but hovering a magnifying glass circle reveals sharp, scaled-up, gradient-colored text.",
    props: [
      { name: "text", type: "string", default: '"Hover mouse to resolve and focus letters"', description: "Text content to display." }
    ],
    dependencies: []
  },

  "expanding-search": {
    id: "expanding-search",
    title: "Expanding Search Bar",
    description: "A minimal search icon that springs open into a full-width glassmorphic input field on hover.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "60px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505", position: "relative" }}>
        <ExpandingSearch />
      </div>
    ),
    code: expandingSearchCode.code,
    css: expandingSearchCode.css,
    prompt: "Create a search icon in React that springs open into a glassmorphic input pill on hover or click.",
    props: [
      { name: "placeholder", type: "string", default: '"Search components..."', description: "Placeholder text shown inside the expanded input field." },
      { name: "onSearch", type: "function", default: "undefined", description: "Callback fired on Enter key, receives the search query string." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for the root wrapper element." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  }
};
