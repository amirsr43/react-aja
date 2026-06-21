import React from "react";
import ProfileCard from "../components/ui/ProfileCard";
import { profileCardCode } from "./codes/profileCard";
import ModernButtonShowcase, { ModernButton } from "../components/ui/ModernButton";
import {
  primaryButtonCode,
  outlineButtonCode,
  actionButtonCode
} from "./codes/modernButton";
import MagneticSlider from "../components/ui/MagneticSlider";
import { magneticSliderCode } from "./codes/magneticSlider";
import AnimatedProfileStack from "../components/ui/AnimatedProfileStack";
import { animatedProfileStackCode } from "./codes/animatedProfileStack";
import InteractiveTimeline from "../components/ui/InteractiveTimeline";
import { interactiveTimelineCode } from "./codes/interactiveTimeline";
import GlowingButtonShowcase from "../components/ui/GlowingButton";
import { glowingButtonCode } from "./codes/glowingButton";
import FluidSwitchShowcase from "../components/ui/FluidSwitch";
import { fluidSwitchCode } from "./codes/fluidSwitch";
import LoadingShowcase from "../components/ui/LoadingShowcase";
import { loadingShowcaseCode } from "./codes/loadingShowcase";
import ModernForm from "../components/ui/ModernForm";
import { modernFormCode } from "./codes/modernForm";
import ProductCardShowcase from "../components/ui/ProductCard";
import { productCardCode } from "./codes/productCard";
import ToastNotificationShowcase from "../components/ui/ToastNotification";
import { toastNotificationCode } from "./codes/toastNotification";
import SearchBarShowcase from "../components/ui/SearchBar";
import { searchBarCode } from "./codes/searchBar";
import CyberDecoderText from "../components/ui/CyberDecoderText";
import { cyberDecoderCode } from "./codes/cyberDecoder";
import InteractiveFloatText from "../components/ui/InteractiveFloatText";
import { floatingSpringCode } from "./codes/floatingSpring";
import FocusBlurText from "../components/ui/FocusBlurText";
import { focusBlurTextCode } from "./codes/focusBlurText";
import ExpandingSearch from "../components/ui/ExpandingSearch";
import { expandingSearchCode } from "./codes/expandingSearch";
import TextAnimationShowcase from "../components/ui/TextAnimation";
import { textAnimationCode } from "./codes/textAnimation";


export const docsData = {
  "introduction": {
    id: "introduction",
    title: "Introduction",
    description: "Welcome to ReactAja. A collection of premium, copy-paste UI components and animation designs for React projects.",
    category: "Getting Started",
    isGuide: true,
    content: (
      <div className="guide-content">
        <p className="guide-p">
          ReactAja is a catalog of highly polished, responsive, and customizable user interface components and micro-animations built with <strong>React</strong>, <strong>Tailwind CSS</strong>, and <strong>Vanilla CSS</strong>.
        </p>
        <p className="guide-p">
          Simply copy the code templates, customize the presets directly in the documentation view, and paste them straight into your project's component tree.
        </p>

        <h3 className="guide-subtitle">Why Choose ReactAja?</h3>
        <ul className="guide-list">
          <li><strong>Zero Dependency Lock-in:</strong> Copy and paste components directly. No bloat in your <code className="text-white bg-zinc-900 px-1 py-0.5 rounded text-xs">node_modules</code>.</li>
          <li><strong>Tailwind & Vanilla CSS Options:</strong> Select your preferred styling framework with a single click.</li>
          <li><strong>Interactive Theme Customizer:</strong> Tweak colors and content directly on the documentation pages and export your tailored component code instantly.</li>
        </ul>
      </div>
    )
  },

  "installation": {
    id: "installation",
    title: "Installation",
    description: "How to add components directly to your React project.",
    category: "Getting Started",
    isGuide: true,
    content: (
      <div className="guide-content">
        <h3 className="guide-subtitle">1. Copy and Paste Components</h3>
        <p className="guide-p">
          All components in this library are copy-paste. You do not need to install an npm package! Simply select the code style you prefer (JS/TS, CSS/Tailwind) from the documentation, copy it, and paste it directly into your codebase.
        </p>

        <h3 className="guide-subtitle">2. Setup Tailwind CSS (Optional)</h3>
        <p className="guide-p">
          If you plan to use the Tailwind CSS version of the components, make sure Tailwind CSS is installed in your project and your content paths in <code className="text-white bg-zinc-900 px-1 py-0.5 rounded text-xs">tailwind.config.js</code> cover your source files:
        </p>
        <pre className="p-3 bg-zinc-900 rounded-md text-zinc-100 text-xs overflow-x-auto">
          {`/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}`}
        </pre>

        <h3 className="guide-subtitle">3. Import and Render</h3>
        <p className="guide-p">
          Import the component locally using relative paths:
        </p>
        <pre className="p-3 bg-zinc-900 rounded-md text-zinc-100 text-xs overflow-x-auto">
          {`import ProfileCard from "./components/ui/ProfileCard";

export default function App() {
  return (
    <div>
      <ProfileCard />
    </div>
  );
}`}
        </pre>
      </div>
    )
  },

  "profile-card": {
    id: "profile-card",
    title: "Profile Card",
    description: "A premium interactive profile card with a clean dark theme, smooth hover height transitions for the cover photo, and a reactive verified badge.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ display: "flex", justifyContent: "center", padding: "20px 0" }}>
        <ProfileCard />
      </div>
    ),
    code: profileCardCode.code,
    css: profileCardCode.css,
    prompt: "Create a glassmorphic profile card in React. It should have a dark, translucent card body with a subtle white border, an interactive verified badge checkmark, hover animations that smoothly expand the cover image height, and a structured statistics grid (Followers, Posts).",
    props: [
      { name: "image", type: "string", default: "defaultProfileImg", description: "Profile photo image URL." },
      { name: "name", type: "string", default: '"Amir."', description: "Profile name heading." },
      { name: "bio", type: "string", default: '"A Frontend Developer focused on building beautiful & intuitive user experiences."', description: "Profile bio description." },
      { name: "followers", type: "string", default: '"12.5k"', description: "Followers count value displayed in the stats section." },
      { name: "posts", type: "string", default: '"148"', description: "Posts count value displayed in the stats section." },
      { name: "theme", type: "object", default: "{}", description: "Custom stylesheet theme override object (supports cardBg, accentColor, btnTextColor, badgeColor, textPrimary, textSecondary)." }
    ],
    dependencies: []
  },

  "button": {
    id: "button",
    title: "Button",
    description: "A set of modern, minimalist button variants including primary gradients, outline shapes, and unique sliding action buttons",
    category: "UI Components",
    isGuide: false,
    variants: [
      {
        name: "Default",
        description: "The default button style with a smooth gradient background and vibrant hover glow.",
        preview: (
          <ModernButton variant="primary" colorScheme="blue">
            Button
          </ModernButton>
        ),
        code: primaryButtonCode.code,
        css: primaryButtonCode.css,
        prompt: "Create a modern primary React button with a smooth gradient background (from blue-500 to indigo-600), rounded borders, subtle white shadow depth, and a vibrant outline shadow glow on hover."
      },
      {
        name: "Outline",
        description: "Subtle outline style for secondary actions or low-emphasis inputs.",
        preview: (
          <ModernButton variant="outline" colorScheme="blue">
            Outline
          </ModernButton>
        ),
        code: outlineButtonCode.code,
        css: outlineButtonCode.css,
        prompt: "Create a sleek outline React button with a semi-translucent dark background, thin white border, soft hover background highlight, and scale bounce feedback on click."
      },
      {
        name: "Action Button",
        description: "Interactive capsule button. Toggles states on click: starts as Blue (labeled 'Button'), and slides right to become Red (labeled 'Close').",
        preview: (
          <ModernButton variant="action" activeText="Close">
            Button
          </ModernButton>
        ),
        code: actionButtonCode.code,
        css: actionButtonCode.css,
        prompt: "Create an interactive segmented capsule toggle button in React that changes states when clicked: starting as a blue button and sliding out into a red close button on click with spring-loaded physical transitions."
      }
    ],
    props: [
      { name: "variant", type: "string", default: '"primary"', description: "Visual variant of the button: 'primary' | 'outline' | 'action'." },
      { name: "colorScheme", type: "string", default: '"blue"', description: "Theme color palette preset: 'blue' | 'red' | 'purple' | 'slate'." },
      { name: "disabled", type: "boolean", default: "false", description: "Disables interaction and applies grayed-out styling." },
      { name: "focused", type: "boolean", default: "false", description: "Forces a glowing focus ring indicator." },
      { name: "active", type: "boolean", default: "false", description: "Forces active styling or clicked/toggled state for action buttons." },
      { name: "activeText", type: "string", default: '"Close"', description: "The button label text shown when the action button variant is toggled." },
      { name: "onClick", type: "function", default: "undefined", description: "Click event handler function." },
      { name: "className", type: "string", default: '""', description: "Additional CSS class for the root button element." }
    ],
    dependencies: ["lucide-react"]
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

  "loading": {
    id: "loading",
    title: "Loading Indicators",
    description: "A selection of premium, responsive loading indicators including a glassmorphic shimmering skeleton card and an ambient glowing aura spinner.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <LoadingShowcase />
      </div>
    ),
    code: loadingShowcaseCode.code,
    css: loadingShowcaseCode.css,
    prompt: "Create two premium loading indicators in React. 1) A Skeleton Loader Card with a linear shimmer sweep animation over circles and text blocks. 2) A Cosmic Loading Spinner with a dual-toned border ring and a pulsing backdrop glow.",
    props: [
      { name: "variant", type: "string", default: '"skeleton"', description: "Active loading display mode: 'skeleton' | 'spinner'." }
    ],
    dependencies: ["framer-motion"]
  },

  "form": {
    id: "form",
    title: "Modern Form",
    description: "A dark glassmorphic signup/login form containing smooth floating input labels, real-time error glows, and a state-switching submit button.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <ModernForm />
      </div>
    ),
    code: modernFormCode.code,
    css: modernFormCode.css,
    prompt: "Create a dark glassmorphic signup/login form in React with floating labels that lift on focus, input validations with real-time error messages, and a multi-state submit button (idle, submitting, success).",
    props: [
      { name: "onSubmit", type: "function", default: "undefined", description: "Form submit callback function handler." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "product-card": {
    id: "product-card",
    title: "Premium Product Card",
    description: "A sleek e-commerce product display card featuring image hover parallax scaling, hover quick-action buttons, interactive color selectors, and add-to-cart operations.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <ProductCardShowcase />
      </div>
    ),
    code: productCardCode.code,
    css: productCardCode.css,
    prompt: "Create a premium product card in React with image parallax hover zooming, a heart like action button, dynamic color circle selection, and a glowing add-to-cart button.",
    props: [
      { name: "name", type: "string", default: '"AeroFlow Premium Pods"', description: "Name label of the e-commerce product." },
      { name: "category", type: "string", default: '"Audio & Sound"', description: "Department or category name." },
      { name: "price", type: "string", default: '"$249.00"', description: "Display price tag value." },
      { name: "rating", type: "number", default: "4.8", description: "Product star rating value." },
      { name: "colors", type: "array", default: '["#3b82f6", "#ef4444", "#ffffff"]', description: "List of Hex color strings for selection circles." },
      { name: "onAddToCart", type: "function", default: "undefined", description: "Action callback triggered by clicking the Add button." }
    ],
    dependencies: ["lucide-react"]
  },

  "toast-notification": {
    id: "toast-notification",
    title: "Toast Notifications Stack",
    description: "A triggerable notification queue manager that spawns stacked toast banners in the bottom-right viewport with customizable countdown progress bars.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <ToastNotificationShowcase />
      </div>
    ),
    code: toastNotificationCode.code,
    css: toastNotificationCode.css,
    prompt: "Create a notification queue manager in React with Framer Motion. Toasts stack in the bottom-right corner, feature sliding entry transitions, type variants (success, warning, info, error), and a countdown timer progress bar.",
    props: [
      { name: "type", type: "string", default: '"info"', description: "Toast alarm category theme: 'success' | 'warning' | 'info' | 'error'." },
      { name: "title", type: "string", default: '"Notification"', description: "Primary bold header message." },
      { name: "description", type: "string", default: '""', description: "Sub-level description text payload." },
      { name: "duration", type: "number", default: "4000", description: "Auto-dismiss timer delay in milliseconds." }
    ],
    dependencies: ["framer-motion", "lucide-react"]
  },

  "search-bar": {
    id: "search-bar",
    title: "Interactive SearchBar",
    description: "An elegant focus-expanding search input field, complete with a glassmorphic dropdown displaying search history caches and clickable suggested tag chips.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <SearchBarShowcase />
      </div>
    ),
    code: searchBarCode.code,
    css: searchBarCode.css,
    prompt: "Create an elegant search bar input field in React that expands on focus. It reveals a glassmorphic suggestion dropdown with search history entries (with individual close triggers) and clickable trending tags.",
    props: [
      { name: "placeholder", type: "string", default: '"Search documents..."', description: "Placeholder message inside empty field input." },
      { name: "recentQueries", type: "array", default: "[]", description: "List of previous text search strings." },
      { name: "suggestedTags", type: "array", default: "[]", description: "List of recommended click tags chips." },
      { name: "onSearch", type: "function", default: "undefined", description: "Triggers on pressing Enter or clicking tags." }
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
    items: [
      { id: "button", name: "Button" },
      { id: "profile-card", name: "Profile Card" },
      { id: "loading", name: "Loading Indicators" },
      { id: "form", name: "Modern Form" },
      { id: "product-card", name: "Product Card" },
      { id: "toast-notification", name: "Toast Notifications" },
      { id: "search-bar", name: "Interactive SearchBar" }
    ]
  },
  {
    title: "UI Animations",
    items: [
      { id: "magnetic-slider", name: "Magnetic Slider" },
      { id: "profile-stack", name: "Animated Profile Stack" },
      { id: "interactive-timeline", name: "Interactive Timeline" },
      { id: "glowing-button", name: "Glowing Outline Button" },
      { id: "fluid-switch", name: "Interactive Fluid Switch" },
      { id: "text-animation", name: "Text Animation" },
      { id: "focus-blur-text", name: "Spotlight Focus Blur" },
      { id: "expanding-search", name: "Expanding Search Bar" }
    ]
  }
];
