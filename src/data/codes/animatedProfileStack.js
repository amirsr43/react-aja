// src/data/codes/animatedProfileStack.js

export const animatedProfileStackCode = {
  code: `import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function AnimatedProfileStack({
  avatars = [
    { src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", status: "online" },
    { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", status: "busy" },
    { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", status: "online" }
  ],
  extraAvatars = [
    { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", status: "online" },
    { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150", status: "offline" },
    { src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150", status: "online" }
  ],
  extraCount = 3,
  pulse = true
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
    <div className="profile-stack-wrapper">
      {/* Audio indicator ring wave bubble */}
      {pulse && (
        <div 
          className={\`audio-pulse-circle \${isAudioActive ? "active" : ""}\`}
          onClick={() => setIsAudioActive(!isAudioActive)}
        >
          {isAudioActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
          {isAudioActive && (
            <motion.div 
              className="pulse-wave"
              animate={{ scale: [1, 1.45], opacity: [0.6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
            />
          )}
        </div>
      )}

      {/* Glassmorphic Pill */}
      <motion.div
        className={\`profile-stack-pill \${isHovered ? "hovered" : ""}\`}
        initial={{ width: 196 }}
        animate={{ width: isHovered ? 330 : 196 }}
        transition={springTransition}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="avatars-list-container">
          {avatars.map((item, index) => (
            <motion.div
              key={\`base-\${index}\`}
              className="stack-avatar-wrapper"
              initial={{ marginLeft: index === 0 ? 0 : -14 }}
              animate={{ marginLeft: index === 0 ? 0 : isHovered ? 6 : -14 }}
              transition={springTransition}
            >
              <img src={item.src} alt="user" className="stack-avatar" />
              <span className={\`avatar-status-dot \${item.status}\`} />
            </motion.div>
          ))}

          <AnimatePresence>
            {isHovered && (
              <div style={{ display: "flex", alignItems: "center" }}>
                {extraAvatars.map((item, index) => (
                  <motion.div
                    key={\`sil-\${index}\`}
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
                    <span className={\`avatar-status-dot \${item.status}\`} />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

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
}`,
  css: `/* Core Stack Pill */
.profile-stack-wrapper {
  display: flex;
  align-items: center;
  gap: 16px;
}

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
  position: relative;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

.audio-pulse-circle.active {
  color: #7c3aed;
  border-color: rgba(124, 58, 237, 0.35);
  box-shadow: 0 10px 25px rgba(124, 58, 237, 0.1), 0 0 15px rgba(124, 58, 237, 0.05);
}

.pulse-wave {
  position: absolute;
  inset: -1px;
  border-radius: 50%;
  border: 1px solid #7c3aed;
}

/* Glassmorphic Pill background */
.profile-stack-pill {
  height: 56px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 9999px;
  backdrop-filter: blur(16px);
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
}

.profile-stack-pill.hovered {
  border-color: rgba(124, 58, 237, 0.3);
  box-shadow: 0 15px 35px rgba(124, 58, 237, 0.08), 0 0 20px rgba(124, 58, 237, 0.03);
}

.stack-avatar-wrapper {
  position: relative;
}

.stack-avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.avatar-status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 2.5px solid #ffffff;
}

.avatar-status-dot.online { background-color: #10b981; }
.avatar-status-dot.busy { background-color: #f59e0b; }
.avatar-status-dot.offline { background-color: #8e8e93; }

.stack-counter {
  font-size: 11px;
  font-weight: 750;
  background: rgba(124, 58, 237, 0.08);
  border: 1px solid rgba(124, 58, 237, 0.25);
  color: #6d28d9;
  padding: 4px 10px;
  border-radius: 9999px;
  margin-left: 14px;
  box-shadow: 0 2px 6px rgba(124, 58, 237, 0.05);
}`
};
