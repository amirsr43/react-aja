// src/components/ui/animations/CardCarousel3D.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Navigation, Star } from "lucide-react";

const DEFAULT_CARDS = [
  {
    id: 1,
    title: "Cappadocia",
    location: "Göreme, Turkey",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  },
  {
    id: 2,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  },
  {
    id: 3,
    title: "Colosseum",
    location: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
    rating: "4.7"
  },
  {
    id: 4,
    title: "Machu Picchu",
    location: "Cusco, Peru",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80",
    badge: "Iconic",
    rating: "4.9"
  }
];

export default function CardCarousel3D({ cards = DEFAULT_CARDS, autoplay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalCards = cards.length;

  // Autoplay effect
  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex, autoplay, isHovered, interval]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  const handleCardClick = (index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  };

  // Helper to calculate relative distance for circular list
  const getRelativeIndex = (index) => {
    let diff = index - activeIndex;
    const half = Math.floor(totalCards / 2);
    while (diff > half) diff -= totalCards;
    while (diff < -half) diff += totalCards;
    return diff;
  };

  return (
    <div 
      className="carousel-3d-wrapper"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 0",
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div 
        className="carousel-3d-container"
        style={{
          height: "460px",
          width: "100%",
          maxWidth: "750px",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1200px" // Creates the 3D depth context
        }}
      >
        {cards.map((card, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isActive = relativeIndex === 0;
          const isLeft = relativeIndex === -1;
          const isRight = relativeIndex === 1;
          const isFar = Math.abs(relativeIndex) > 1;

          // Compute transform properties based on index distance
          let translateX = 0;
          let scale = 1;
          let rotateY = 0;
          let zIndex = 0;
          let opacity = 1;

          if (isActive) {
            translateX = 0;
            scale = 1;
            rotateY = 0;
            zIndex = 10;
            opacity = 1;
          } else if (isLeft) {
            translateX = -180;
            scale = 0.82;
            rotateY = 28; // Tilted facing center
            zIndex = 5;
            opacity = 0.8;
          } else if (isRight) {
            translateX = 180;
            scale = 0.82;
            rotateY = -28; // Tilted facing center
            zIndex = 5;
            opacity = 0.8;
          } else {
            // Far background cards
            translateX = relativeIndex > 0 ? 300 : -300;
            scale = 0.65;
            rotateY = relativeIndex > 0 ? -45 : 45;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              onClick={() => handleCardClick(index)}
              style={{
                position: "absolute",
                width: "280px",
                height: "400px",
                cursor: isActive ? "default" : "pointer",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
                originX: 0.5,
                originY: 0.5
              }}
              animate={{
                x: translateX,
                scale: scale,
                rotateY: rotateY,
                opacity: opacity
              }}
              transition={{
                type: "spring",
                stiffness: 160,
                damping: 22
              }}
              className="carousel-card-3d"
            >
              {/* Card Container */}
              <div style={{
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                borderRadius: "24px",
                padding: "16px",
                boxShadow: isActive 
                  ? "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(124, 58, 237, 0.15)"
                  : "0 10px 25px -5px rgba(0, 0, 0, 0.15)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                overflow: "hidden",
                boxSizing: "border-box"
              }}>
                {/* Top Rated Badge */}
                {card.badge && (
                  <div style={{
                    position: "absolute",
                    top: "24px",
                    left: "24px",
                    background: "rgba(10, 10, 10, 0.35)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 600,
                    padding: "5px 10px",
                    borderRadius: "20px",
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <Star size={11} fill="#fbbf24" stroke="none" />
                    <span>{card.badge}</span>
                  </div>
                )}

                {/* Top Right Action Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{
                    position: "absolute",
                    top: "24px",
                    right: "24px",
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "#000000",
                    border: "none",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    zIndex: 2,
                    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                    transition: "transform 0.2s"
                  }}
                  className="card-action-btn"
                >
                  <Navigation size={15} style={{ transform: "rotate(45deg)", marginLeft: "-2px" }} />
                </button>

                {/* Card Image */}
                <div style={{
                  width: "100%",
                  height: "220px",
                  borderRadius: "18px",
                  overflow: "hidden",
                  position: "relative",
                  background: "#e4e4e7"
                }}>
                  <img 
                    src={card.image} 
                    alt={card.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }}
                  />
                </div>

                {/* Card Details */}
                <div style={{
                  padding: "16px 8px 4px 8px",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  justifyContent: "space-between",
                  color: "#18181b"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <h3 style={{
                        margin: 0,
                        fontSize: "19px",
                        fontWeight: 800,
                        color: "#09090b",
                        letterSpacing: "-0.02em"
                      }}>
                        {card.title}
                      </h3>
                      <p style={{
                        margin: "4px 0 0 0",
                        fontSize: "12.5px",
                        color: "#71717a",
                        fontWeight: 500
                      }}>
                        {card.location}
                      </p>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      background: "#f4f4f5",
                      padding: "4px 8px",
                      borderRadius: "8px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#18181b"
                    }}>
                      ⭐ {card.rating}
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    style={{
                      width: "100%",
                      height: "40px",
                      borderRadius: "20px",
                      background: "#18181b",
                      border: "none",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s, transform 0.1s",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: "12px"
                    }}
                    className="book-now-btn"
                  >
                    Book Now
                  </button>
                </div>
              </div>

              {/* Inactive overlay layer to shade side cards */}
              {!isActive && (
                <div style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0, 0, 0, 0.05)",
                  borderRadius: "24px",
                  pointerEvents: "none",
                  transition: "opacity 0.3s"
                }} />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Manual Indicator Controls */}
      <div 
        className="carousel-controls"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "24px",
          marginTop: "10px"
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          className="carousel-nav-btn"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Bullet indicators */}
        <div style={{ display: "flex", gap: "8px" }}>
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              style={{
                width: index === activeIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: index === activeIndex ? "#a78bfa" : "rgba(255, 255, 255, 0.2)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              }}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s"
          }}
          className="carousel-nav-btn"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style>{`
        .carousel-nav-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #a78bfa !important;
          border-color: rgba(167, 139, 250, 0.3) !important;
        }
        .card-action-btn:hover {
          transform: scale(1.1) rotate(5deg);
          background: #a78bfa !important;
        }
        .book-now-btn:hover {
          background: #a78bfa !important;
          transform: translateY(-1px);
        }
        .book-now-btn:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
