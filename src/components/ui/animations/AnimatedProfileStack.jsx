// src/components/ui/AnimatedProfileStack.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX, Sparkles } from "lucide-react";

export const STACK_STYLES = `
/* ── PREMIUM ANIMATED PROFILE STACK STYLES ── */
.profile-stack-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
  font-family: 'Outfit', 'Inter', sans-serif;
  user-select: none;
}

/* Audio indicator pill button */
.audio-pulse-circle {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  position: relative;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.audio-pulse-circle.active {
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.35);
  box-shadow: 
    0 10px 25px rgba(124, 58, 237, 0.1),
    0 0 15px rgba(124, 58, 237, 0.05);
}

/* Ring wave animation */
.pulse-wave {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid #7c3aed;
  opacity: 0;
  pointer-events: none;
}

/* Glassmorphic main pill */
.profile-stack-pill {
  height: 56px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 9999px;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 
    0 10px 30px rgba(0, 0, 0, 0.06),
    0 1px 3px rgba(0, 0, 0, 0.02);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.profile-stack-pill.hovered {
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 
    0 15px 35px rgba(124, 58, 237, 0.08),
    0 0 20px rgba(124, 58, 237, 0.03);
}

.avatars-list-container {
  display: flex;
  align-items: center;
  position: relative;
}

/* Avatar element */
.stack-avatar-wrapper {
  position: relative;
  flex-shrink: 0;
  display: block;
}

.stack-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #ffffff; /* Mask backing matching white background */
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
  display: block;
}

/* Online/Busy dot highlights */
.avatar-status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2.5px solid #ffffff; /* Mask backing matching white background */
  box-shadow: 0 0 8px currentColor;
}

.avatar-status-dot.online { background-color: #10b981; color: #10b981; }
.avatar-status-dot.busy { background-color: #f59e0b; color: #f59e0b; }
.avatar-status-dot.offline { background-color: #8e8e93; color: #8e8e93; }

/* Glowing Counter Capsule Badge */
.stack-counter {
  font-size: 11px;
  font-weight: 750;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  color: #6d28d9;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-left: 14px;
  letter-spacing: 0.05em;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(124, 58, 237, 0.05);
}
`;

const BASE_AVATARS = [
  { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", status: "online" },
  { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", status: "busy" },
  { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80", status: "online" }
];

const SILHOUETTE_AVATARS = [
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80", status: "online" },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80", status: "offline" },
  { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80", status: "online" }
];

export function AnimatedProfileStack({
  avatars = BASE_AVATARS,
  extraAvatars = SILHOUETTE_AVATARS,
  extraCount = 3,
  pulse = true,
  className = "",
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAudioActive, setIsAudioActive] = useState(true);

  const springTransition = {
    type: "spring",
    stiffness: 180,
    damping: 16,
    mass: 0.8
  };

  return (
    <div className={`profile-stack-wrapper ${className}`} {...props}>
      <style>{STACK_STYLES}</style>

      {/* Audio toggle circle (left) */}
      {pulse && (
        <div 
          className={`audio-pulse-circle ${isAudioActive ? "active" : ""}`}
          onClick={() => setIsAudioActive(!isAudioActive)}
        >
          {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {isAudioActive && (
            <motion.div 
              className="pulse-wave"
              animate={{ 
                scale: [1, 1.45], 
                opacity: [0.6, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5,
                ease: "easeOut"
              }}
            />
          )}
        </div>
      )}

      {/* Glassmorphic Pill */}
      <motion.div
        className={`profile-stack-pill ${isHovered ? "hovered" : ""}`}
        initial={{ width: 196 }}
        animate={{ width: isHovered ? 330 : 196 }}
        transition={springTransition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="avatars-list-container">
          {/* Base Avatars */}
          {avatars.map((item, index) => (
            <motion.div
              key={`base-${index}`}
              className="stack-avatar-wrapper"
              initial={{ marginLeft: index === 0 ? 0 : -14 }}
              animate={{ marginLeft: index === 0 ? 0 : isHovered ? 6 : -14 }}
              transition={springTransition}
            >
              <img src={item.src} alt="user" className="stack-avatar" />
              <span className={`avatar-status-dot ${item.status}`} />
            </motion.div>
          ))}

          {/* Extra Avatars appearing on hover */}
          <AnimatePresence>
            {isHovered && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {extraAvatars.map((item, index) => (
                  <motion.div
                    key={`sil-${index}`}
                    className="stack-avatar-wrapper"
                    initial={{ opacity: 0, x: -15, marginLeft: 6 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10, transition: { duration: 0.15 } }}
                    transition={{
                      type: "spring",
                      stiffness: 140,
                      damping: 15,
                      delay: index * 0.04
                    }}
                  >
                    <img src={item.src} alt="extra user" className="stack-avatar" />
                    <span className={`avatar-status-dot ${item.status}`} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Stats Counter Capsule */}
          <AnimatePresence>
            {!isHovered && (
              <motion.span
                className="stack-counter"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.12 } }}
                transition={{ duration: 0.2 }}
              >
                +{extraCount}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default AnimatedProfileStack;
