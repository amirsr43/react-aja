// src/data/codes/cardCarousel3D.js

export const cardCarousel3DCode = {
  code: {
    js: {
      css: `// CardCarousel3D.jsx (JavaScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Navigation, Star } from "lucide-react";
import "./CardCarousel3D.css"; // Save the CSS below into this file

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
    title: "The Great Pyramid",
    location: "Giza, Egypt",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80",
    badge: "Must see",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  }
];

export default function CardCarousel3D({ cards = DEFAULT_CARDS, autoplay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalCards = cards.length;

  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex, autoplay, isHovered, interval]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalCards);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);

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
    >
      <div className="carousel-3d-container">
        {cards.map((card, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isActive = relativeIndex === 0;
          const isLeft = relativeIndex === -1;
          const isRight = relativeIndex === 1;

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
          } else if (isLeft) {
            translateX = -180;
            scale = 0.82;
            rotateY = 28;
            zIndex = 5;
            opacity = 0.8;
          } else if (isRight) {
            translateX = 180;
            scale = 0.82;
            rotateY = -28;
            zIndex = 5;
            opacity = 0.8;
          } else {
            translateX = relativeIndex > 0 ? 300 : -300;
            scale = 0.65;
            rotateY = relativeIndex > 0 ? -45 : 45;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIndex(index)}
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
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="carousel-card-3d"
            >
              <div className="card-inner">
                {card.badge && (
                  <div className="card-badge">
                    <Star size={11} fill="#fbbf24" stroke="none" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <button className="card-action-btn">
                  <Navigation size={15} style={{ transform: "rotate(45deg)", marginLeft: "-2px" }} />
                </button>

                <div className="card-img-container">
                  <img src={card.image} alt={card.title} />
                </div>

                <div className="card-details">
                  <div className="details-header">
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.location}</p>
                    </div>
                    <div className="rating-tag">⭐ {card.rating}</div>
                  </div>

                  <button className="book-now-btn">Book Now</button>
                </div>
              </div>
              {!isActive && <div className="card-overlay" />}
            </motion.div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-nav-btn">
          <ChevronLeft size={20} />
        </button>

        <div className="bullet-indicators">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={\`bullet \${index === activeIndex ? "active" : ""}\`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="carousel-nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}`,
      tailwind: `// CardCarousel3D.jsx (JavaScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
    title: "The Great Pyramid",
    location: "Giza, Egypt",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80",
    badge: "Must see",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  }
];

export default function CardCarousel3D({ cards = DEFAULT_CARDS, autoplay = true, interval = 5000 }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const totalCards = cards.length;

  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex, autoplay, isHovered, interval]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalCards);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);

  const getRelativeIndex = (index) => {
    let diff = index - activeIndex;
    const half = Math.floor(totalCards / 2);
    while (diff > half) diff -= totalCards;
    while (diff < -half) diff += totalCards;
    return diff;
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center py-10 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[460px] w-full max-w-[750px] relative flex items-center justify-center [perspective:1200px]">
        {cards.map((card, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isActive = relativeIndex === 0;
          const isLeft = relativeIndex === -1;
          const isRight = relativeIndex === 1;

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
          } else if (isLeft) {
            translateX = -180;
            scale = 0.82;
            rotateY = 28;
            zIndex = 5;
            opacity = 0.8;
          } else if (isRight) {
            translateX = 180;
            scale = 0.82;
            rotateY = -28;
            zIndex = 5;
            opacity = 0.8;
          } else {
            translateX = relativeIndex > 0 ? 300 : -300;
            scale = 0.65;
            rotateY = relativeIndex > 0 ? -45 : 45;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: "absolute",
                width: "280px",
                height: "400px",
                cursor: isActive ? "default" : "pointer",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
              }}
              animate={{
                x: translateX,
                scale: scale,
                rotateY: rotateY,
                opacity: opacity
              }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
            >
              <div className="w-full h-full bg-white/95 border border-white/50 rounded-[24px] p-4 shadow-xl flex flex-col relative overflow-hidden box-border">
                {card.badge && (
                  <div className="absolute top-6 left-6 bg-black/35 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[20px] z-10 flex items-center gap-1">
                    <Star size={11} fill="#fbbf24" stroke="none" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <button className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black border-none text-white flex items-center justify-center cursor-pointer z-10 shadow-md hover:scale-110 hover:bg-violet-400 transition-all">
                  <Navigation size={15} className="rotate-45 -ml-0.5" />
                </button>

                <div className="w-full h-[220px] rounded-[18px] overflow-hidden relative bg-zinc-200">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>

                <div className="pt-4 px-2 pb-1 flex flex-col flex-grow justify-between text-zinc-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="m-0 text-[19px] font-extrabold text-zinc-950 tracking-tight">{card.title}</h3>
                      <p className="mt-1 text-[12.5px] text-zinc-500 font-medium">{card.location}</p>
                    </div>
                    <div className="flex items-center gap-0.5 bg-zinc-100 px-2 py-1 rounded-lg text-xs font-bold text-zinc-900">
                      ⭐ {card.rating}
                    </div>
                  </div>

                  <button className="w-full h-10 rounded-[20px] bg-zinc-900 border-none text-white text-[13px] font-semibold cursor-pointer hover:bg-violet-500 active:scale-95 transition-all mt-3">
                    Book Now
                  </button>
                </div>
              </div>
              {!isActive && <div className="absolute inset-0 bg-black/5 rounded-[24px] pointer-events-none transition-opacity" />}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-2.5">
        <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-violet-400 hover:border-violet-500/30 transition-all">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={\`h-2 rounded-full transition-all duration-300 \${index === activeIndex ? "w-6 bg-violet-400" : "w-2 bg-white/20"}\`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-violet-400 hover:border-violet-500/30 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// CardCarousel3D.tsx (TypeScript + Custom CSS)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Navigation, Star } from "lucide-react";
import "./CardCarousel3D.css";

interface CardItem {
  id: number;
  title: string;
  location: string;
  image: string;
  badge?: string;
  rating: string;
}

interface CardCarousel3DProps {
  cards?: CardItem[];
  autoplay?: boolean;
  interval?: number;
}

const DEFAULT_CARDS: CardItem[] = [
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
    title: "The Great Pyramid",
    location: "Giza, Egypt",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80",
    badge: "Must see",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  }
];

export default function CardCarousel3D({ cards = DEFAULT_CARDS, autoplay = true, interval = 5000 }: CardCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const totalCards = cards.length;

  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex, autoplay, isHovered, interval]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalCards);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);

  const getRelativeIndex = (index: number): number => {
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
    >
      <div className="carousel-3d-container">
        {cards.map((card, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isActive = relativeIndex === 0;
          const isLeft = relativeIndex === -1;
          const isRight = relativeIndex === 1;

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
          } else if (isLeft) {
            translateX = -180;
            scale = 0.82;
            rotateY = 28;
            zIndex = 5;
            opacity = 0.8;
          } else if (isRight) {
            translateX = 180;
            scale = 0.82;
            rotateY = -28;
            zIndex = 5;
            opacity = 0.8;
          } else {
            translateX = relativeIndex > 0 ? 300 : -300;
            scale = 0.65;
            rotateY = relativeIndex > 0 ? -45 : 45;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: "absolute",
                width: "280px",
                height: "400px",
                cursor: isActive ? "default" : "pointer",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
              }}
              animate={{
                x: translateX,
                scale: scale,
                rotateY: rotateY,
                opacity: opacity
              }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
              className="carousel-card-3d"
            >
              <div className="card-inner">
                {card.badge && (
                  <div className="card-badge">
                    <Star size={11} fill="#fbbf24" stroke="none" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <button className="card-action-btn">
                  <Navigation size={15} style={{ transform: "rotate(45deg)", marginLeft: "-2px" }} />
                </button>

                <div className="card-img-container">
                  <img src={card.image} alt={card.title} />
                </div>

                <div className="card-details">
                  <div className="details-header">
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.location}</p>
                    </div>
                    <div className="rating-tag">⭐ {card.rating}</div>
                  </div>

                  <button className="book-now-btn">Book Now</button>
                </div>
              </div>
              {!isActive && <div className="card-overlay" />}
            </motion.div>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button onClick={handlePrev} className="carousel-nav-btn">
          <ChevronLeft size={20} />
        </button>

        <div className="bullet-indicators">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={\`bullet \${index === activeIndex ? "active" : ""}\`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="carousel-nav-btn">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}`,
      tailwind: `// CardCarousel3D.tsx (TypeScript + Tailwind CSS)
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Navigation, Star } from "lucide-react";

interface CardItem {
  id: number;
  title: string;
  location: string;
  image: string;
  badge?: string;
  rating: string;
}

interface CardCarousel3DProps {
  cards?: CardItem[];
  autoplay?: boolean;
  interval?: number;
}

const DEFAULT_CARDS: CardItem[] = [
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
    title: "The Great Pyramid",
    location: "Giza, Egypt",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b31d468?auto=format&fit=crop&w=600&q=80",
    badge: "Must see",
    rating: "4.8"
  },
  {
    id: 3,
    title: "Great Wall",
    location: "Beijing, China",
    image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=600&q=80",
    badge: "Top rated",
    rating: "4.9"
  }
];

export default function CardCarousel3D({ cards = DEFAULT_CARDS, autoplay = true, interval = 5000 }: CardCarousel3DProps) {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const totalCards = cards.length;

  useEffect(() => {
    if (!autoplay || isHovered) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalCards);
    }, interval);
    return () => clearInterval(timer);
  }, [activeIndex, autoplay, isHovered, interval]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % totalCards);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);

  const getRelativeIndex = (index: number): number => {
    let diff = index - activeIndex;
    const half = Math.floor(totalCards / 2);
    while (diff > half) diff -= totalCards;
    while (diff < -half) diff += totalCards;
    return diff;
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center py-10 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-[460px] w-full max-w-[750px] relative flex items-center justify-center [perspective:1200px]">
        {cards.map((card, index) => {
          const relativeIndex = getRelativeIndex(index);
          const isActive = relativeIndex === 0;
          const isLeft = relativeIndex === -1;
          const isRight = relativeIndex === 1;

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
          } else if (isLeft) {
            translateX = -180;
            scale = 0.82;
            rotateY = 28;
            zIndex = 5;
            opacity = 0.8;
          } else if (isRight) {
            translateX = 180;
            scale = 0.82;
            rotateY = -28;
            zIndex = 5;
            opacity = 0.8;
          } else {
            translateX = relativeIndex > 0 ? 300 : -300;
            scale = 0.65;
            rotateY = relativeIndex > 0 ? -45 : 45;
            zIndex = 1;
            opacity = 0;
          }

          return (
            <motion.div
              key={card.id}
              onClick={() => setActiveIndex(index)}
              style={{
                position: "absolute",
                width: "280px",
                height: "400px",
                cursor: isActive ? "default" : "pointer",
                transformStyle: "preserve-3d",
                zIndex: zIndex,
              }}
              animate={{
                x: translateX,
                scale: scale,
                rotateY: rotateY,
                opacity: opacity
              }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
            >
              <div className="w-full h-full bg-white/95 border border-white/50 rounded-[24px] p-4 shadow-xl flex flex-col relative overflow-hidden box-border">
                {card.badge && (
                  <div className="absolute top-6 left-6 bg-black/35 backdrop-blur-md border border-white/15 text-white text-[11px] font-semibold px-2.5 py-1 rounded-[20px] z-10 flex items-center gap-1">
                    <Star size={11} fill="#fbbf24" stroke="none" />
                    <span>{card.badge}</span>
                  </div>
                )}

                <button className="absolute top-6 right-6 w-9 h-9 rounded-full bg-black border-none text-white flex items-center justify-center cursor-pointer z-10 shadow-md hover:scale-110 hover:bg-violet-400 transition-all">
                  <Navigation size={15} className="rotate-45 -ml-0.5" />
                </button>

                <div className="w-full h-[220px] rounded-[18px] overflow-hidden relative bg-zinc-200">
                  <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                </div>

                <div className="pt-4 px-2 pb-1 flex flex-col flex-grow justify-between text-zinc-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="m-0 text-[19px] font-extrabold text-zinc-950 tracking-tight">{card.title}</h3>
                      <p className="mt-1 text-[12.5px] text-zinc-500 font-medium">{card.location}</p>
                    </div>
                    <div className="flex items-center gap-0.5 bg-zinc-100 px-2 py-1 rounded-lg text-xs font-bold text-zinc-900">
                      ⭐ {card.rating}
                    </div>
                  </div>

                  <button className="w-full h-10 rounded-[20px] bg-zinc-900 border-none text-white text-[13px] font-semibold cursor-pointer hover:bg-violet-500 active:scale-95 transition-all mt-3">
                    Book Now
                  </button>
                </div>
              </div>
              {!isActive && <div className="absolute inset-0 bg-black/5 rounded-[24px] pointer-events-none transition-opacity" />}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center gap-6 mt-2.5">
        <button onClick={handlePrev} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-violet-400 hover:border-violet-500/30 transition-all">
          <ChevronLeft size={20} />
        </button>

        <div className="flex gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={\`h-2 rounded-full transition-all duration-300 \${index === activeIndex ? "w-6 bg-violet-400" : "w-2 bg-white/20"}\`}
            />
          ))}
        </div>

        <button onClick={handleNext} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center cursor-pointer hover:bg-white/10 hover:text-violet-400 hover:border-violet-500/30 transition-all">
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}`
    },
  },
  css: `/* CardCarousel3D.css */
.carousel-3d-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 0;
  position: relative;
  overflow: hidden;
}

.carousel-3d-container {
  height: 460px;
  width: 100%;
  max-width: 750px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
}

.carousel-card-3d {
  position: absolute;
  width: 280px;
  height: 400px;
  transform-style: preserve-3d;
  origin-x: 0.5;
  origin-y: 0.5;
}

.card-inner {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 24px;
  padding: 16px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.carousel-card-3d.active .card-inner {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 40px rgba(124, 58, 237, 0.15);
}

.card-badge {
  position: absolute;
  top: 24px;
  left: 24px;
  background: rgba(10, 10, 10, 0.35);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  padding: 5px 10px;
  borderRadius: 20px;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 4px;
}

.card-action-btn {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #000000;
  border: none;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  transition: transform 0.2s, background-color 0.2s;
}

.card-action-btn:hover {
  transform: scale(1.1) rotate(5deg);
  background-color: #a78bfa;
}

.card-img-container {
  width: 100%;
  height: 220px;
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  background: #e4e4e7;
}

.card-img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-details {
  padding: 16px 8px 4px 8px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  color: #18181b;
}

.details-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.details-header h3 {
  margin: 0;
  font-size: 19px;
  font-weight: 800;
  color: #09090b;
  letter-spacing: -0.02em;
}

.details-header p {
  margin: 4px 0 0 0;
  font-size: 12.5px;
  color: #71717a;
  fontWeight: 500;
}

.rating-tag {
  display: flex;
  align-items: center;
  gap: 3px;
  background: #f4f4f5;
  padding: 4px 8px;
  borderRadius: 8px;
  font-size: 12px;
  font-weight: 700;
  color: #18181b;
}

.book-now-btn {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background: #18181b;
  border: none;
  color: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
}

.book-now-btn:hover {
  background: #a78bfa;
  transform: translateY(-1px);
}

.book-now-btn:active {
  transform: scale(0.98);
}

.card-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 24px;
  pointer-events: none;
  transition: opacity 0.3s;
}

.carousel-controls {
  display: flex;
  align-items: center;
  gap: 24px;
  margin-top: 10px;
}

.carousel-nav-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.carousel-nav-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #a78bfa;
  border-color: rgba(167, 139, 250, 0.3);
}

.bullet-indicators {
  display: flex;
  gap: 8px;
}

.bullet {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.bullet.active {
  width: 24px;
  background: #a78bfa;
}`
};
