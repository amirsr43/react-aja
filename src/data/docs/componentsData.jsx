import React from "react";
import ProfileCard from "../../components/ui/components/ProfileCard";
import { profileCardCode } from "../codes/profileCard";
import ModernButtonShowcase, { ModernButton } from "../../components/ui/components/ModernButton";
import {
  primaryButtonCode,
  outlineButtonCode,
  actionButtonCode
} from "../codes/modernButton";
import LoadingShowcase from "../../components/ui/components/LoadingShowcase";
import { loadingShowcaseCode } from "../codes/loadingShowcase";
import ModernForm from "../../components/ui/components/ModernForm";
import { modernFormCode } from "../codes/modernForm";
import ProductCardShowcase from "../../components/ui/components/ProductCard";
import { productCardCode } from "../codes/productCard";
import ToastNotificationShowcase from "../../components/ui/components/ToastNotification";
import { toastNotificationCode } from "../codes/toastNotification";
import SearchBarShowcase from "../../components/ui/components/SearchBar";
import { searchBarCode } from "../codes/searchBar";
import PortfolioNavbar from "../../components/ui/components/PortfolioNavbar";
import { portfolioNavbarCode } from "../codes/portfolioNavbar";

import { Link } from "react-router-dom";
import { Square, User, Loader, Clipboard, ShoppingBag, Bell, Search, ArrowRight, Menu } from "lucide-react";

export const componentsDocs = {
  "ui-components": {
    id: "ui-components",
    title: "UI Components",
    description: "Explore our collection of premium, highly interactive UI components designed for modern web apps.",
    category: "UI Components",
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
            { id: "button", name: "Button", desc: "A set of modern, minimalist button variants including primary gradients and outline shapes.", icon: <Square size={20} /> },
            { id: "profile-card", name: "Profile Card", desc: "A premium interactive profile card with hover cover expansion and verified badge.", icon: <User size={20} /> },
            { id: "loading", name: "Loading Indicators", desc: "Premium skeleton loaders and ambient cosmic spinners.", icon: <Loader size={20} /> },
            { id: "form", name: "Modern Form", desc: "Dark glassmorphic signup/login form with floating labels and error states.", icon: <Clipboard size={20} /> },
            { id: "product-card", name: "Product Card", desc: "Sleek product display card with parallax zoom and color selectors.", icon: <ShoppingBag size={20} /> },
            { id: "toast-notification", name: "Toast Notifications", desc: "Triggerable notification queue manager with progress countdowns.", icon: <Bell size={20} /> },
            { id: "search-bar", name: "Interactive SearchBar", desc: "Focus-expanding search input with history cache and trend tags.", icon: <Search size={20} /> },
            { id: "portfolio-navbar", name: "Portfolio Navbar", desc: "Frosted-glass floating pill navbar with active-pill transitions and mobile overlay.", icon: <Menu size={20} /> },
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
                <span>Explore Component</span>
                <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
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

  "loading": {
    id: "loading",
    title: "Loading Indicators",
    description: "A selection of premium, responsive loading indicators including a glassmorphic shimmering skeleton card and an elegant Concentric Gyroscope Spinner.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "30px 0", display: "flex", justifyContent: "center", width: "100%", background: "#050505" }}>
        <LoadingShowcase />
      </div>
    ),
    code: loadingShowcaseCode.code,
    css: loadingShowcaseCode.css,
    prompt: "Create two premium loading indicators in React. 1) A Skeleton Loader Card with a linear shimmer sweep animation over circles and text blocks. 2) A minimalist, clean Concentric Gyroscope Spinner featuring an inner pulsing core dot and two concentric border rings spinning in opposite directions, all using a unified violet accent color scheme.",
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
  "portfolio-navbar": {
    id: "portfolio-navbar",
    title: "Portfolio Navbar",
    description: "A premium, floating glassmorphic navbar designed specifically for personal portfolios and modern agency landing pages. Features smooth, layout-interpolated active item indicators, dynamic background opacity blending on scroll, and a polished mobile menu dropdown.",
    category: "UI Components",
    isGuide: false,
    preview: (
      <div style={{ padding: "80px 20px 20px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", background: "#050505", minHeight: "150px", position: "relative", overflow: "hidden", borderRadius: "16px" }}>
        <PortfolioNavbar fixed={false} />
        <div style={{ color: "rgba(255,255,255,0.3)", fontSize: "12px", marginTop: "20px" }}>Scroll the page or hover items to test the interactive state</div>
      </div>
    ),
    code: portfolioNavbarCode.code,
    css: portfolioNavbarCode.css,
    prompt: "Create a floating glassmorphic navbar in React using Framer Motion. It should have a pill shape, dynamic background blending on scroll, a slide-up layoutId pill tracking the active item, a custom gradient CTA button, and a fully animated mobile overlay menu.",
    props: [
      { name: "logo", type: "string", default: '"amir."', description: "The logo text shown on the left." },
      { name: "links", type: "array", default: "/* Home, About, Work, Contact */", description: "Array of nav link objects ({ label, href })." },
      { name: "ctaLabel", type: "string", default: '"Hire Me"', description: "The label text on the gradient CTA button." },
      { name: "onCtaClick", type: "function", default: "() => {}", description: "Event handler fired when the CTA button is clicked." },
      { name: "onLinkClick", type: "function", default: "() => {}", description: "Event handler fired when a nav link is clicked." }
    ],
    dependencies: ["framer-motion"]
  }
};
