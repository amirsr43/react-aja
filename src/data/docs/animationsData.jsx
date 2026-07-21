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
import MaskedSlideText from "../../components/ui/animations/MaskedSlideText";
import { maskedSlideTextCode } from "../codes/maskedSlideText";
import CinematicBlurText from "../../components/ui/animations/CinematicBlurText";
import { cinematicBlurTextCode } from "../codes/cinematicBlurText";
import HeroWordSwapper from "../../components/ui/animations/HeroWordSwapper";
import { heroWordSwapperCode } from "../codes/heroWordSwapper";
import DoubleHoverText from "../../components/ui/animations/DoubleHoverText";
import { doubleHoverTextCode } from "../codes/doubleHoverText";
import GradientSweepText from "../../components/ui/animations/GradientSweepText";
import { gradientSweepTextCode } from "../codes/gradientSweepText";
import Interactive3DText from "../../components/ui/animations/Interactive3DText";
import { interactive3DTextCode } from "../codes/interactive3DText";
import SpotifyLyrics from "../../components/ui/animations/SpotifyLyrics";
import { spotifyLyricsCode } from "../codes/spotifyLyrics";
import FallingLetters from "../../components/ui/animations/FallingLetters";
import { fallingLettersCode } from "../codes/fallingLetters";
import FallingLettersCustomizer from "../../components/docs/FallingLettersCustomizer";

import { Link } from "react-router-dom";
import { ToggleLeft, Users, Calendar, Sparkles, Sliders, Type, Binary, MessageSquare, Eye, Search, ArrowRight, Layers, Smartphone } from "lucide-react";

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
            { id: "masked-slide-text", name: "Masked Slide-Up Text", desc: "Elegant word slide-up reveal from an overflow mask, perfect for clean portfolio titles.", icon: <Type size={20} /> },
            { id: "cinematic-blur-text", name: "Cinematic Blur Reveal", desc: "Atmospheric letter fade-in with a transitioning blur-to-sharp effect for headers.", icon: <Eye size={20} /> },
            { id: "hero-word-swapper", name: "Hero Word Swapper", desc: "Sleek vertical word swapper for dynamic tagline rotation in hero sections.", icon: <Sliders size={20} /> },
            { id: "double-hover-text", name: "Double-Layer Hover Slide", desc: "Satisfying hover slide duplicate copy text shift for premium navigation items.", icon: <ArrowRight size={20} /> },
            { id: "gradient-sweep-text", name: "Gradient Sweep Reveal", desc: "A colorful gradient sweeps over the text to fill it from left to right on load.", icon: <Sparkles size={20} /> },
            { id: "interactive-3d-text", name: "Interactive 3D Letters", desc: "Tactile, glossy 3D letters with spring tilts and custom coloring on hover.", icon: <Sparkles size={20} /> },
            { id: "falling-letters", name: "Falling Letters", desc: "Physics-driven outline letters that tumble from above and land with spring bounce, overlapping into an organic typographic pile.", icon: <Type size={20} /> },
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
    prompt: "Create a spotlight magnifying lens focus blur text container in React. Text is blurred out by default, but hovering a magnifying glass circle reveals sharp, scaled-up, solid white text.",
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
      <div style={{ padding: "60px 16px", display: "flex", justifyContent: "center", width: "100%", background: "#050505", position: "relative", boxSizing: "border-box" }}>
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
  },
  "masked-slide-text": {
    id: "masked-slide-text",
    title: "Masked Slide-Up Text",
    description: "An elegant editorial-style reveal animation that slides words up from an overflow-hidden mask. Extremely popular in agency portfolios and modern brand websites.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", width: "100%", background: "#050505", fontSize: "36px", fontWeight: "700", letterSpacing: "-0.02em" }}>
        <MaskedSlideText text="We design digital experiences that scale." />
      </div>
    ),
    code: maskedSlideTextCode.code,
    css: maskedSlideTextCode.css,
    prompt: "Create a masked text reveal animation in React using Framer Motion. Split the text into words and animate them translating vertically from 100% to 0% with custom cubic-bezier transitions when they enter the viewport.",
    props: [
      { name: "text", type: "string", default: '"Sleek Editorial Text Animation"', description: "The text string to animate." },
      { name: "once", type: "boolean", default: "true", description: "Whether to trigger the animation only once when scrolling into view." },
      { name: "showReplay", type: "boolean", default: "true", description: "Whether to render a button to replay the animation." }
    ],
    dependencies: ["framer-motion"]
  },
  "cinematic-blur-text": {
    id: "cinematic-blur-text",
    title: "Cinematic Blur Reveal",
    description: "A soft, atmospheric text reveal that staggers individual letters, fading and de-blurring them sequentially. Ideal for hero headings in minimalist portfolios.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", width: "100%", background: "#050505", fontSize: "32px", fontWeight: "600", letterSpacing: "-0.01em", color: "#e2e8f0" }}>
        <CinematicBlurText text="A quiet revolution in digital craft." />
      </div>
    ),
    code: cinematicBlurTextCode.code,
    css: cinematicBlurTextCode.css,
    prompt: "Create a cinematic staggered text reveal in React using Framer Motion. Text characters fade in and de-blur sequentially using opacity, blur filter, and y-translation animation on scroll/load.",
    props: [
      { name: "text", type: "string", default: '"Atmospheric Cinematic Blur"', description: "The text string to animate." },
      { name: "once", type: "boolean", default: "true", description: "Whether to trigger the animation only once when scrolling into view." },
      { name: "showReplay", type: "boolean", default: "true", description: "Whether to render a button to replay the animation." }
    ],
    dependencies: ["framer-motion"]
  },
  "hero-word-swapper": {
    id: "hero-word-swapper",
    title: "Hero Word Swapper",
    description: "A smooth, professional vertical keyword cycler designed for hero taglines and intro sentences on company profile landing pages.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", background: "#050505", fontSize: "28px", fontWeight: "600", gap: "8px" }}>
        <span style={{ color: "rgba(255,255,255,0.6)" }}>We deliver</span>
        <HeroWordSwapper words={["Performance", "Aesthetics", "Scalability", "Reliability"]} interval={2500} className="text-purple-400 font-bold" />
      </div>
    ),
    code: heroWordSwapperCode.code,
    css: heroWordSwapperCode.css,
    prompt: "Create an auto-playing vertical word swapper inside a sentence in React. Use Framer Motion's AnimatePresence mode='wait' to cycle words with smooth vertical sliding and fade transitions.",
    props: [
      { name: "words", type: "array", default: '["Experiences", "Interfaces", "Platforms", "Solutions"]', description: "List of string words to cycle through." },
      { name: "interval", type: "number", default: "3000", description: "Duration in milliseconds for showing each word." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class names for styling the swapper element." }
    ],
    dependencies: ["framer-motion"]
  },
  "double-hover-text": {
    id: "double-hover-text",
    title: "Double-Layer Hover Slide",
    description: "A premium hover interaction for navigation menus, buttons, and footers. The text slides up and out of view while a duplicated version slides up into view in an accent color.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", background: "#050505", fontSize: "22px", fontWeight: "600" }}>
        <DoubleHoverText text="EXPLORE PORTFOLIO" />
      </div>
    ),
    code: doubleHoverTextCode.code,
    css: doubleHoverTextCode.css,
    prompt: "Create a dual-layer hover slide-up navigation link in React using Framer Motion. On hover, the primary text slides up and out of view, and a cloned styled copy slides up into view from the bottom.",
    props: [
      { name: "text", type: "string", default: '"Hover Me"', description: "The link or button text label." },
      { name: "className", type: "string", default: '""', description: "Additional CSS classes." }
    ],
    dependencies: ["framer-motion"]
  },
  "gradient-sweep-text": {
    id: "gradient-sweep-text",
    title: "Gradient Sweep Reveal",
    description: "A premium typographic entrance animation where a colorful gradient sweeps across the text to reveal and fill it from left to right, creating a sleek, premium brand look.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 20px", display: "flex", justifyContent: "center", alignItems: "center", width: "100%", background: "#050505", fontSize: "36px", fontWeight: "800", letterSpacing: "-0.02em" }}>
        <GradientSweepText text="Crafting Digital Aesthetics" />
      </div>
    ),
    code: gradientSweepTextCode.code,
    css: gradientSweepTextCode.css,
    prompt: "Create a gradient sweep text reveal in React using Framer Motion. Text should start with a transparent fill showing a muted color/border background, then slide in background-position to fill with a vibrant gradient from left to right.",
    props: [
      { name: "text", type: "string", default: '"Premium Gradient Sweep Reveal"', description: "The text content to render and animate." },
      { name: "once", type: "boolean", default: "true", description: "Whether to animate only once when entering viewport." },
      { name: "showReplay", type: "boolean", default: "true", description: "Whether to render a button to replay the animation." },
      { name: "colors", type: "array", default: '["#a78bfa", "#ec4899"]', description: "Array of color strings to use for the sweep gradient." },
      { name: "baseColor", type: "string", default: '"rgba(255, 255, 255, 0.15)"', description: "CSS color for the un-highlighted text state." },
      { name: "duration", type: "number", default: "1.2", description: "Animation duration in seconds (larger is slower)." }
    ],
    dependencies: ["framer-motion"]
  },
  "interactive-3d-text": {
    id: "interactive-3d-text",
    title: "Interactive 3D Letters",
    description: "Glossy, jelly-like 3D display text where individual letters bounce and tilt in 3D perspective using physics-based springs and mouse position tracking.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ width: "100%" }}>
        <Interactive3DText text="LOOP" />
      </div>
    ),
    code: interactive3DTextCode.code,
    css: interactive3DTextCode.css,
    prompt: "Create a glossy 3D typographic hover block in React using Framer Motion. Separate the word into letters and track the cursor position on each to dynamically map rotateX, rotateY, and translateZ values on spring physics.",
    props: [
      { name: "text", type: "string", default: '"LOOP"', description: "The word to display and animate." },
      { name: "colors", type: "array", default: "/* Alternating purple/pink themes */", description: "Array of color definition objects ({ gradient, depthGradient, depth, glow }) for each letter." }
    ],
    dependencies: ["framer-motion"]
  },
  "spotify-lyrics": {
    id: "spotify-lyrics",
    title: "Spotify-Style Scroll Text",
    description: "An interactive, scroll-synchronized text reveal animation. Sentences smoothly focus, scale up, and turn bright white as they scroll to the center of the viewport, while out-of-focus lines fade and blur.",
    category: "UI Animations",
    isGuide: false,
    preview: (
      <div style={{ padding: "40px 16px", display: "flex", justifyContent: "center", width: "100%", background: "#050505", boxSizing: "border-box" }}>
        <SpotifyLyrics />
      </div>
    ),
    code: spotifyLyricsCode.code,
    css: spotifyLyricsCode.css,
    prompt: "Create an interactive scroll-synchronized text reveal in React. Sentences focus, scale up, and turn bright white as they scroll to the vertical center of the container viewport, while outer lines fade and blur away.",
    props: [
      { name: "lines", type: "array", default: "/* Array of 9 default text strings */", description: "Array of text strings/sentences to render in the scrollable view." },
      { name: "height", type: "string", default: '"260px"', description: "Custom height of the scroll viewport container." }
    ],
    dependencies: []
  },
  "falling-letters": {
    id: "falling-letters",
    title: "Falling Letters",
    description: "Physics-driven outline text animation where each letter tumbles from above, spins in mid-air, and lands with a spring bounce — creating an organic, typographic tumble effect. Fully customizable text, color, and spring physics.",
    category: "UI Animations",
    isGuide: false,
    preview: null, // handled by customizer
    customizer: <FallingLettersCustomizer />,
    code: fallingLettersCode.code,
    css: fallingLettersCode.css,
    prompt: "Create a falling letters animation in React using Framer Motion. Split a text string into individual characters, each falling from off-screen with a random spin and x-drift, landing with spring bounce physics at a slightly random rotation (±12°) and position. Render letters as outline/stroke text only (-webkit-text-stroke, transparent fill) with no background container. Letters fall in staggered sequence. Include an optional blurred drop-shadow per letter for depth, a seeded RNG for reproducible layouts, and a replay button.",
    props: [
      { name: "text", type: "string", default: '"PORTFOLIO"', description: "The text to display. Each character becomes an independent animated element." },
      { name: "color", type: "string", default: '"#ffffff"', description: "CSS color for the letter stroke outline." },
      { name: "strokeWidth", type: "number", default: "2", description: "Thickness in pixels of the text outline stroke." },
      { name: "fontSize", type: "number | string", default: '"clamp(52px, 12vw, 96px)"', description: "Font size — accepts px, em, rem, or clamp()." },
      { name: "fontFamily", type: "string", default: "'Inter', Arial Black, sans-serif", description: "CSS font-family stack for the letters." },
      { name: "staggerDelay", type: "number", default: "0.12", description: "Delay in seconds between each successive letter starting its fall." },
      { name: "fallDuration", type: "number", default: "0.6", description: "Approximate fall duration in seconds (spring physics override the exact timing)." },
      { name: "bounciness", type: "number", default: "0.5", description: "0–1 scale controlling spring bounce intensity on landing (0 = no bounce, 1 = very springy)." },
      { name: "position", type: "string", default: '"center"', description: "Letter cluster anchor: 'bottom-right' | 'bottom-left' | 'center'." },
      { name: "dropShadow", type: "boolean", default: "true", description: "Adds a blurred depth shadow behind each letter after landing for a 3D feel." },
      { name: "seed", type: "number", default: "undefined", description: "Optional integer seed for a reproducible, consistent layout across renders." },
      { name: "showReplay", type: "boolean", default: "true", description: "Whether to render a replay button to re-trigger the animation." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class names for the container wrapper." }
    ],
    dependencies: ["framer-motion"]
  }
};
