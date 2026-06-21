// src/components/ui/ProductCard.jsx
import React, { useState } from "react";
import { Star, ShoppingCart, Eye, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const PRODUCT_STYLES = `
/* ── PRODUCT CARD CORE STYLES ── */
.product-showcase {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  font-family: 'Outfit', 'Inter', sans-serif;
}

.product-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.product-card {
  width: 100%;
  max-width: 320px;
  background: rgba(10, 10, 12, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  overflow: hidden;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  box-sizing: border-box;
}

.product-card:hover {
  transform: translateY(-8px);
  border-color: rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.4),
    0 0 30px rgba(59, 130, 246, 0.05);
}

.product-img-wrapper {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  background: #18181b; /* dark zinc-800 */
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

/* Glass overlay actions list */
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
  -webkit-backdrop-filter: blur(6px);
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
  color: #ffffff;
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
  font-weight: 750;
  color: #8e8e93;
  letter-spacing: 0.08em;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 2px;
}

.product-name {
  font-size: 17px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

/* Color dot selector */
.product-color-selector {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 2px;
}

.product-color-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
  box-sizing: border-box;
}

.product-color-dot.active {
  transform: scale(1.2);
}

/* Bottom pricing & trigger section */
.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 6px;
}

.product-price-wrapper {
  display: flex;
  flex-direction: column;
}

.product-price-label {
  font-size: 10px;
  color: #8e8e93;
}

.product-price {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
}

.product-price.neon {
  color: #3b82f6; /* blue neon accent */
}

.product-cart-btn {
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #ffffff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-family: inherit;
  font-size: 12.5px;
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
  box-shadow: 0 6px 14px rgba(59, 130, 246, 0.35);
}

/* Float tag */
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
  text-transform: uppercase;
  letter-spacing: 0.05em;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
`;

export function ProductCard({
  id = "1",
  name = "AeroFlow Premium Pods",
  category = "Audio & Sound",
  price = "$249.00",
  rating = 4.8,
  image = "", // empty by default
  colors = ["#3b82f6", "#ef4444", "#ffffff"],
  onAddToCart
}) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="product-card">
      <style>{PRODUCT_STYLES}</style>
      
      {/* Popular tag badge */}
      <div className="product-tag">Hot Choice</div>

      {/* Product Image and Overlay triggers */}
      <div className="product-img-wrapper">
        {image ? (
          <img src={image} alt={name} className="product-img" />
        ) : (
          <div 
            style={{ 
              width: "100%", 
              height: "100%", 
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.08) 0%, rgba(139, 92, 246, 0.12) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative"
            }}
          >
            <div 
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ShoppingCart size={18} className="text-zinc-500" />
            </div>
            {/* Subtle glow */}
            <div 
              style={{
                position: "absolute",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
                filter: "blur(16px)"
              }}
            />
          </div>
        )}
        <div className="product-img-overlay">
          <button 
            className={`product-overlay-action ${isLiked ? "liked" : ""}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart size={16} fill={isLiked ? "#fff" : "none"} />
          </button>
          <button className="product-overlay-action">
            <Eye size={16} />
          </button>
        </div>
      </div>

      {/* Info elements */}
      <div className="product-info-box">
        <div className="product-category-row">
          <span className="product-category">{category}</span>
          <div className="product-rating">
            <Star size={11} fill="#eab308" color="#eab308" />
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#fff" }}>{rating}</span>
          </div>
        </div>

        <h4 className="product-name">{name}</h4>

        {/* Dynamic color dot selectors */}
        <div className="product-color-selector">
          <span style={{ fontSize: "11px", color: "#8e8e93", marginRight: "4px" }}>Color:</span>
          {colors.map((c) => (
            <span
              key={c}
              className={`product-color-dot ${selectedColor === c ? "active" : ""}`}
              style={{ 
                backgroundColor: c, 
                borderColor: selectedColor === c ? "#3b82f6" : "rgba(255,255,255,0.15)"
              }}
              onClick={() => setSelectedColor(c)}
            />
          ))}
        </div>

        {/* Footer actions */}
        <div className="product-footer">
          <div className="product-price-wrapper">
            <span className="product-price-label">PRICE</span>
            <span className="product-price neon">{price}</span>
          </div>

          <button className="product-cart-btn" onClick={() => onAddToCart && onAddToCart()}>
            <ShoppingCart size={13} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Showcase Page ──
export default function ProductCardShowcase() {
  return (
    <div className="product-showcase">
      <div className="product-container">
        <ProductCard />
      </div>
    </div>
  );
}
