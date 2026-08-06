// src/data/codes/productCard.js

export const productCardCode = {
  code: {
    js: {
      css: `// ProductCard.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import "./ProductCard.css"; // Include the CSS stylesheet below

export default function ProductCard({
  name = "AeroFlow Premium Pods",
  category = "Audio & Sound",
  price = "$249.00",
  rating = 4.8,
  image = "",
  colors = ["#3b82f6", "#ef4444", "#ffffff"],
  onAddToCart
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="product-card">
      <div className="product-tag">Hot Choice</div>

      {/* Media Cover */}
      <div className="product-img-wrapper">
        {image ? (
          <img src={image} alt={name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">
            <ShoppingCart size={18} className="placeholder-icon" />
            <div className="placeholder-glow" />
          </div>
        )}
        <div className="product-img-overlay">
          <button 
            className={\`product-overlay-action \${isLiked ? "liked" : ""}\`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#fff" : "none"} />
          </button>
          <button className="product-overlay-action">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-info-box">
        <div className="product-category-row">
          <span className="product-category">{category}</span>
          <div className="product-rating">
            <Star size={11} fill="#eab308" color="#eab308" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>{rating}</span>
          </div>
        </div>

        <h4 className="product-name">{name}</h4>

        {/* Color Switch Dots */}
        <div className="product-color-selector">
          <span style={{ fontSize: "11px", color: "#8e8e93", marginRight: "4px" }}>Color:</span>
          {colors.map((c) => (
            <span
              key={c}
              className={\`product-color-dot \${selectedColor === c ? "active" : ""}\`}
              style={{ 
                backgroundColor: c, 
                borderColor: selectedColor === c ? "#3b82f6" : "rgba(255,255,255,0.15)"
              }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>

        <div className="product-footer">
          <div className="product-price-wrapper">
            <span className="product-price-label">PRICE</span>
            <span className="product-price">{price}</span>
          </div>

          <button className="product-cart-btn" onClick={onAddToCart}>
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// ProductCard.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";

export default function ProductCard({
  name = "AeroFlow Premium Pods",
  category = "Audio & Sound",
  price = "$249.00",
  rating = 4.8,
  image = "",
  colors = ["#3b82f6", "#ef4444", "#ffffff"],
  onAddToCart
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="group relative w-full max-w-[320px] bg-zinc-950/45 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(59,130,246,0.05)]">
      <div className="absolute top-3.5 left-3.5 bg-blue-500/15 border border-blue-500/30 text-blue-500 text-[10px] font-extrabold px-2 py-1 rounded-lg backdrop-blur-sm z-10">
        Hot Choice
      </div>

      {/* Media Cover */}
      <div className="relative w-full h-[220px] overflow-hidden bg-zinc-900">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.08]" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/8 to-purple-500/12 flex items-center justify-center relative">
            <ShoppingCart size={18} className="text-zinc-500 z-10" />
            <div className="absolute w-[100px] h-[100px] rounded-full bg-radial-gradient from-blue-500/15 to-transparent blur-xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          <button 
            className={\`w-10 h-10 rounded-full border backdrop-blur-[6px] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 \${
              isLiked 
                ? "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600" 
                : "bg-white/10 border-white/15 hover:bg-white hover:text-zinc-950"
            }\`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#fff" : "none"} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 border border-white/15 backdrop-blur-[6px] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white hover:text-zinc-950 hover:scale-110">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold text-zinc-500 tracking-wider">{category}</span>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#eab308" color="#eab308" />
            <span className="text-[11px] font-bold text-white">{rating}</span>
          </div>
        </div>

        <h4 className="text-[17px] font-extrabold text-white tracking-tight leading-tight">{name}</h4>

        {/* Color Switch Dots */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-500 mr-1">Color:</span>
          {colors.map((c) => (
            <span
              key={c}
              className={\`w-3.5 h-3.5 rounded-full cursor-pointer border-2 transition-all duration-200 \${
                selectedColor === c ? "scale-110" : ""
              }\`}
              style={{ 
                backgroundColor: c, 
                borderColor: selectedColor === c ? "#3b82f6" : "rgba(255,255,255,0.15)"
              }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-500 font-extrabold tracking-wider">PRICE</span>
            <span className="text-lg font-black text-blue-500">{price}</span>
          </div>

          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none rounded-xl px-4 py-2 text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-200 shadow-[0_4px_10px_rgba(59,130,246,0.25)] hover:scale-105"
            onClick={onAddToCart}
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// ProductCard.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import "./ProductCard.css"; // Include the CSS stylesheet below

interface ProductCardProps {
  name?: string;
  category?: string;
  price?: string;
  rating?: number;
  image?: string;
  colors?: string[];
  onAddToCart?: () => void;
}

export default function ProductCard({
  name = "AeroFlow Premium Pods",
  category = "Audio & Sound",
  price = "$249.00",
  rating = 4.8,
  image = "",
  colors = ["#3b82f6", "#ef4444", "#ffffff"],
  onAddToCart
}: ProductCardProps): React.JSX.Element {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="product-card">
      <div className="product-tag">Hot Choice</div>

      {/* Media Cover */}
      <div className="product-img-wrapper">
        {image ? (
          <img src={image} alt={name} className="product-img" />
        ) : (
          <div className="product-img-placeholder">
            <ShoppingCart size={18} className="placeholder-icon" />
            <div className="placeholder-glow" />
          </div>
        )}
        <div className="product-img-overlay">
          <button 
            className={\`product-overlay-action \${isLiked ? "liked" : ""}\`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#fff" : "none"} />
          </button>
          <button className="product-overlay-action">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="product-info-box">
        <div className="product-category-row">
          <span className="product-category">{category}</span>
          <div className="product-rating">
            <Star size={11} fill="#eab308" color="#eab308" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>{rating}</span>
          </div>
        </div>

        <h4 className="product-name">{name}</h4>

        {/* Color Switch Dots */}
        <div className="product-color-selector">
          <span style={{ fontSize: "11px", color: "#8e8e93", marginRight: "4px" }}>Color:</span>
          {colors.map((c) => (
            <span
              key={c}
              className={\`product-color-dot \${selectedColor === c ? "active" : ""}\`}
              style={{ 
                backgroundColor: c, 
                borderColor: selectedColor === c ? "#3b82f6" : "rgba(255,255,255,0.15)"
              }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>

        <div className="product-footer">
          <div className="product-price-wrapper">
            <span className="product-price-label">PRICE</span>
            <span className="product-price">{price}</span>
          </div>

          <button className="product-cart-btn" onClick={onAddToCart}>
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// ProductCard.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";

interface ProductCardProps {
  name?: string;
  category?: string;
  price?: string;
  rating?: number;
  image?: string;
  colors?: string[];
  onAddToCart?: () => void;
}

export default function ProductCard({
  name = "AeroFlow Premium Pods",
  category = "Audio & Sound",
  price = "$249.00",
  rating = 4.8,
  image = "",
  colors = ["#3b82f6", "#ef4444", "#ffffff"],
  onAddToCart
}: ProductCardProps): React.JSX.Element {
  const [selectedColor, setSelectedColor] = useState<string>(colors[0]);
  const [isLiked, setIsLiked] = useState<boolean>(false);

  return (
    <div className="group relative w-full max-w-[320px] bg-zinc-950/45 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-400 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:-translate-y-2 hover:border-white/10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_30px_rgba(59,130,246,0.05)]">
      <div className="absolute top-3.5 left-3.5 bg-blue-500/15 border border-blue-500/30 text-blue-500 text-[10px] font-extrabold px-2 py-1 rounded-lg backdrop-blur-sm z-10">
        Hot Choice
      </div>

      {/* Media Cover */}
      <div className="relative w-full h-[220px] overflow-hidden bg-zinc-900">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.25,0.8,0.25,1)] group-hover:scale-[1.08]" 
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-500/8 to-purple-500/12 flex items-center justify-center relative">
            <ShoppingCart size={18} className="text-zinc-500 z-10" />
            <div className="absolute w-[100px] h-[100px] rounded-full bg-radial-gradient from-blue-500/15 to-transparent blur-xl" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          <button 
            className={\`w-10 h-10 rounded-full border backdrop-blur-[6px] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:scale-110 \${
              isLiked 
                ? "bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600" 
                : "bg-white/10 border-white/15 hover:bg-white hover:text-zinc-950"
            }\`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#fff" : "none"} />
          </button>
          <button className="w-10 h-10 rounded-full bg-white/10 border border-white/15 backdrop-blur-[6px] text-white flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-white hover:text-zinc-950 hover:scale-110">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase font-bold text-zinc-500 tracking-wider">{category}</span>
          <div className="flex items-center gap-1">
            <Star size={11} fill="#eab308" color="#eab308" />
            <span className="text-[11px] font-bold text-white">{rating}</span>
          </div>
        </div>

        <h4 className="text-[17px] font-extrabold text-white tracking-tight leading-tight">{name}</h4>

        {/* Color Switch Dots */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-zinc-500 mr-1">Color:</span>
          {colors.map((c) => (
            <span
              key={c}
              className={\`w-3.5 h-3.5 rounded-full cursor-pointer border-2 transition-all duration-200 \${
                selectedColor === c ? "scale-110" : ""
              }\`}
              style={{ 
                backgroundColor: c, 
                borderColor: selectedColor === c ? "#3b82f6" : "rgba(255,255,255,0.15)"
              }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-zinc-500 font-extrabold tracking-wider">PRICE</span>
            <span className="text-lg font-black text-blue-500">{price}</span>
          </div>

          <button 
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white border-none rounded-xl px-4 py-2 text-xs font-bold cursor-pointer flex items-center gap-1.5 transition-all duration-200 shadow-[0_4px_10px_rgba(59,130,246,0.25)] hover:scale-105"
            onClick={onAddToCart}
          >
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}`
    }
  },
  css: `/* Product Glass Card layout */
.product-card {
  width: 100%;
  max-width: 320px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(59, 130, 246, 0.05);
}

.product-img-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #18181b;
}

.product-img-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.12) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.placeholder-icon {
  color: #71717a;
}

.placeholder-glow {
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  filter: blur(16px);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.product-card:hover .product-img {
  transform: scale(1.08);
}

/* Photo Hover overlay */
.product-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-img-overlay {
  opacity: 1;
}

.product-overlay-action {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(6px);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.product-overlay-action:hover {
  background: #ffffff;
  color: #09090b;
  transform: scale(1.1);
}

.product-overlay-action.liked {
  background: #ef4444;
  border-color: #ef4444;
}

.product-info-box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-category-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-category {
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 700;
  color: #8e8e93;
}

.product-name {
  font-size: 17px;
  font-weight: 750;
  color: #ffffff;
}

/* Color Dot Selectors */
.product-color-selector {
  display: flex;
  align-items: center;
  gap: 8px;
}

.product-color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.product-color-dot.active {
  transform: scale(1.2);
}

/* Price & Button Footer */
.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.product-price {
  font-size: 18px;
  font-weight: 800;
  color: #3b82f6;
}

.product-cart-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(59, 130, 246, 0.25);
}

.product-cart-btn:hover {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  top: 14px;
  left: 14px;
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  font-size: 10px;
  font-weight: 750;
  padding: 4px 8px;
  border-radius: 8px;
  backdrop-filter: blur(4px);
  z-index: 5;
}`
};
