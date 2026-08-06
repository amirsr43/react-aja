// src/data/codes/profileCard.js

export const profileCardCode = {
  code: {
    js: {
      css: `// ProfileCard.jsx (JavaScript + Custom CSS)
import React, { useState } from "react";

const profileImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";

export default function ProfileCard({
  image = profileImg,
  name = "Amir.",
  bio = "A Frontend Developer focused on building beautiful & intuitive user experiences.",
  followers = "12.5k",
  posts = "148",
  theme = {}
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const customStyles = {
    "--card-bg": theme.cardBg || "#1a1a1f",
    "--accent-color": theme.accentColor || "#ffffff",
    "--btn-text-color": theme.btnTextColor || "#111113",
    "--badge-color": theme.badgeColor || "#22c55e",
    "--text-primary": theme.textPrimary || "#f0f0f5",
    "--text-secondary": theme.textSecondary || "rgba(255, 255, 255, 0.45)"
  };

  return (
    <div className="card" style={customStyles}>
      {/* Photo — expands from half to full on hover */}
      <div className="photo-wrapper">
        <img src={image} alt="Profile" className="profile-photo" />
        <div className="photo-overlay" />
      </div>

      {/* Info — always pinned to bottom, bg fades on hover */}
      <div className="card-body">
        <div className="name-row">
          <h1 className="name">{name}</h1>
          <span className="verified-badge" title="Verified">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
        </div>
        <p className="bio">{bio}</p>

        {/* Bottom Row: Stats & Action Button */}
        <div className="bottom-row">
          <div className="stats-group">
            {/* Followers Stat */}
            <div className="stats-item" title="Followers">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="stats-value">{followers}</span>
            </div>

            {/* Posts Stat */}
            <div className="stats-item" title="Posts">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="stats-value">{posts}</span>
            </div>
          </div>

          <button
            className={"btn btn-primary " + (isFollowing ? "following" : "")}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// ProfileCard.jsx (JavaScript + Tailwind CSS)
import React, { useState } from "react";

const profileImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";

export default function ProfileCard({
  image = profileImg,
  name = "Amir.",
  bio = "A Frontend Developer focused on building beautiful & intuitive user experiences.",
  followers = "12.5k",
  posts = "148"
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="group relative w-[300px] h-[460px] rounded-[28px] bg-[#1a1a1f] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] mx-auto text-left">
      {/* Photo wrapper — Default: ~55% height, Hover: 100% height */}
      <div className="absolute top-3 left-3 right-3 h-[55%] overflow-hidden rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:h-[calc(100%-24px)] group-hover:rounded-[18px]">
        <img src={image} alt="Profile" className="w-full h-full object-cover object-top block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-b from-transparent to-[#1a1a1f] opacity-0 transition-opacity duration-500 ease pointer-events-none group-hover:opacity-100" />
      </div>

      {/* Info — always pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-[18px_20px_20px] flex flex-col gap-3 bg-[#1a1a1f] transition-colors duration-500 ease group-hover:bg-transparent">
        <div className="flex items-center gap-1.5">
          <h1 className="text-[1.25rem] font-bold text-[#f0f0f5] tracking-tight leading-[1.2] m-0">{name}</h1>
          <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#22c55e] rounded-full shrink-0 transition-colors duration-300 ease group-hover:bg-white/25" title="Verified">
            <svg viewBox="0 0 24 24" fill="currentColor" className="fill-white w-[13px] h-[13px]">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
        </div>
        <p className="text-[0.82rem] text-white/45 leading-[1.55] transition-colors duration-300 ease group-hover:text-white/65 m-0">{bio}</p>

        {/* Bottom Row: Stats & Action Button */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3.5">
            {/* Followers Stat */}
            <div className="flex items-center gap-1.25" title="Followers">
              <svg className="text-white/35 group-hover:text-white/55 w-[15px] h-[15px] shrink-0 transition-colors duration-300 ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-[0.86rem] font-bold text-[#f0f0f5] leading-none">{followers}</span>
            </div>

            {/* Posts Stat */}
            <div className="flex items-center gap-1.25" title="Posts">
              <svg className="text-white/35 group-hover:text-white/55 w-[15px] h-[15px] shrink-0 transition-colors duration-300 ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-[0.86rem] font-bold text-[#f0f0f5] leading-none">{posts}</span>
            </div>
          </div>

          <button
            className={"flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-full font-semibold text-[0.78rem] cursor-pointer transition-all duration-180 ease active:translate-y-0 border-none min-w-[100px] " + (isFollowing ? "bg-white/10 text-white border border-white/15 shadow-none hover:bg-white/15" : "bg-white text-[#111113] shadow-[0_2px_12px_rgba(255,255,255,0.15)] hover:bg-[#e8e8f0] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)]")}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}`
    },
    ts: {
      css: `// ProfileCard.tsx (TypeScript + Custom CSS)
import React, { useState } from "react";

const profileImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";

interface ProfileCardProps {
  image?: string;
  name?: string;
  bio?: string;
  followers?: string;
  posts?: string;
}

export default function ProfileCard({
  image = profileImg,
  name = "Amir.",
  bio = "A Frontend Developer focused on building beautiful & intuitive user experiences.",
  followers = "12.5k",
  posts = "148",
  theme = {}
}: ProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  const customStyles = {
    "--card-bg": theme.cardBg || "#1a1a1f",
    "--accent-color": theme.accentColor || "#ffffff",
    "--btn-text-color": theme.btnTextColor || "#111113",
    "--badge-color": theme.badgeColor || "#22c55e",
    "--text-primary": theme.textPrimary || "#f0f0f5",
    "--text-secondary": theme.textSecondary || "rgba(255, 255, 255, 0.45)"
  };

  return (
    <div className="card" style={customStyles}>
      {/* Photo — expands from half to full on hover */}
      <div className="photo-wrapper">
        <img src={image} alt="Profile" className="profile-photo" />
        <div className="photo-overlay" />
      </div>

      {/* Info — always pinned to bottom, bg fades on hover */}
      <div className="card-body">
        <div className="name-row">
          <h1 className="name">{name}</h1>
          <span className="verified-badge" title="Verified">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
        </div>
        <p className="bio">{bio}</p>

        {/* Bottom Row: Stats & Action Button */}
        <div className="bottom-row">
          <div className="stats-group">
            {/* Followers Stat */}
            <div className="stats-item" title="Followers">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="stats-value">{followers}</span>
            </div>

            {/* Posts Stat */}
            <div className="stats-item" title="Posts">
              <svg className="stats-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="stats-value">{posts}</span>
            </div>
          </div>

          <button
            className={"btn btn-primary " + (isFollowing ? "following" : "")}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}`,
      tailwind: `// ProfileCard.tsx (TypeScript + Tailwind CSS)
import React, { useState } from "react";

const profileImg = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80";

interface ProfileCardProps {
  image?: string;
  name?: string;
  bio?: string;
  followers?: string;
  posts?: string;
}

export default function ProfileCard({
  image = profileImg,
  name = "Amir.",
  bio = "A Frontend Developer focused on building beautiful & intuitive user experiences.",
  followers = "12.5k",
  posts = "148"
}: ProfileCardProps) {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="group relative w-[300px] h-[460px] rounded-[28px] bg-[#1a1a1f] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 hover:shadow-[0_24px_64px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.08)] mx-auto text-left">
      {/* Photo wrapper — Default: ~55% height, Hover: 100% height */}
      <div className="absolute top-3 left-3 right-3 h-[55%] overflow-hidden rounded-[24px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:h-[calc(100%-24px)] group-hover:rounded-[18px]">
        <img src={image} alt="Profile" className="w-full h-full object-cover object-top block transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[160px] bg-gradient-to-b from-transparent to-[#1a1a1f] opacity-0 transition-opacity duration-500 ease pointer-events-none group-hover:opacity-100" />
      </div>

      {/* Info — always pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-[18px_20px_20px] flex flex-col gap-3 bg-[#1a1a1f] transition-colors duration-500 ease group-hover:bg-transparent">
        <div className="flex items-center gap-1.5">
          <h1 className="text-[1.25rem] font-bold text-[#f0f0f5] tracking-tight leading-[1.2] m-0">{name}</h1>
          <span className="flex items-center justify-center w-[22px] h-[22px] bg-[#22c55e] rounded-full shrink-0 transition-colors duration-300 ease group-hover:bg-white/25" title="Verified">
            <svg viewBox="0 0 24 24" fill="currentColor" className="fill-white w-[13px] h-[13px]">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </span>
        </div>
        <p className="text-[0.82rem] text-white/45 leading-[1.55] transition-colors duration-300 ease group-hover:text-white/65 m-0">{bio}</p>

        {/* Bottom Row: Stats & Action Button */}
        <div className="flex items-center justify-between gap-4 mt-1">
          <div className="flex items-center gap-3.5">
            {/* Followers Stat */}
            <div className="flex items-center gap-1.25" title="Followers">
              <svg className="text-white/35 group-hover:text-white/55 w-[15px] h-[15px] shrink-0 transition-colors duration-300 ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <span className="text-[0.86rem] font-bold text-[#f0f0f5] leading-none">{followers}</span>
            </div>

            {/* Posts Stat */}
            <div className="flex items-center gap-1.25" title="Posts">
              <svg className="text-white/35 group-hover:text-white/55 w-[15px] h-[15px] shrink-0 transition-colors duration-300 ease" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-[0.86rem] font-bold text-[#f0f0f5] leading-none">{posts}</span>
            </div>
          </div>

          <button
            className={"flex-1 inline-flex items-center justify-center py-2.5 px-4 rounded-full font-semibold text-[0.78rem] cursor-pointer transition-all duration-180 ease active:translate-y-0 border-none min-w-[100px] " + (isFollowing ? "bg-white/10 text-white border border-white/15 shadow-none hover:bg-white/15" : "bg-white text-[#111113] shadow-[0_2px_12px_rgba(255,255,255,0.15)] hover:bg-[#e8e8f0] hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(255,255,255,0.25)]")}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}`
    }
  },
  css: `.card {
  position: relative;
  width: 300px;
  height: 460px;
  /* fixed height — both states live inside this */
  border-radius: 28px;
  background: var(--card-bg, #1a1a1f);
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow:
    0 8px 40px rgba(0, 0, 0, 0.6),
    0 1px 0 rgba(255, 255, 255, 0.05) inset;
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.4s ease;
  margin: 0 auto;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow:
    0 24px 64px rgba(0, 0, 0, 0.8),
    0 1px 0 rgba(255, 255, 255, 0.08) inset;
}

/* ── Photo wrapper ── */
.photo-wrapper {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  height: 55%;
  overflow: hidden;
  border-radius: 24px;
  transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    top 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    left 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    right 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    border-radius 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .photo-wrapper {
  height: calc(100% - 24px);
  border-radius: 18px;
}

.profile-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover .profile-photo {
  transform: none;
}

/* Gradient at bottom of photo */
.photo-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 160px;
  background: linear-gradient(to bottom, transparent, var(--card-bg, #1a1a1f));
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card:hover .photo-overlay {
  opacity: 1;
}

/* ── Card body ── */
.card-body {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: var(--card-bg, #1a1a1f);
  transition: background 0.5s ease;
}

.card:hover .card-body {
  background: transparent;
}

/* ── Name row ── */
.name-row {
  display: flex;
  align-items: center;
  gap: 7px;
}

.name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--text-primary, #f0f0f5);
  letter-spacing: -0.02em;
  line-height: 1.2;
  margin: 0;
}

.verified-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  background: var(--badge-color, #22c55e);
  border-radius: 50%;
  flex-shrink: 0;
  transition: background 0.3s ease;
}

.card:hover .verified-badge {
  background: rgba(255, 255, 255, 0.25);
}

.verified-badge svg {
  fill: #fff;
  width: 13px;
  height: 13px;
}

/* ── Bio ── */
.bio {
  font-size: 0.82rem;
  color: var(--text-secondary, rgba(255, 255, 255, 0.45));
  line-height: 1.55;
  transition: color 0.3s ease;
  margin: 0;
}

.card:hover .bio {
  color: var(--text-primary, #f0f0f5);
  opacity: 0.65;
}

/* ── Bottom Row Layout ── */
.bottom-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 4px;
}

.stats-group {
  display: flex;
  align-items: center;
  gap: 14px;
}

.stats-item {
  display: flex;
  align-items: center;
  gap: 5px;
}

.stats-icon {
  color: var(--text-secondary, rgba(255, 255, 255, 0.35));
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  transition: color 0.3s ease;
}

.card:hover .stats-icon {
  color: var(--text-primary, #f0f0f5);
  opacity: 0.55;
}

.stats-value {
  font-size: 0.86rem;
  font-weight: 700;
  color: var(--text-primary, #f0f0f5);
  line-height: 1;
}

/* ── Buttons ── */
.btn {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
  white-space: nowrap;
  border: none;
  min-width: 100px;
}

/* Primary (Follow) */
.btn-primary {
  background: var(--accent-color, #fff);
  color: var(--btn-text-color, #111113);
  box-shadow: 0 2px 12px rgba(255, 255, 255, 0.15);
}

.btn-primary:hover {
  background: var(--accent-color, #fff);
  filter: brightness(0.9);
  transform: translateY(-1px);
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.25);
}

/* Active/Following State */
.btn-primary.following {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary, #ffffff);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: none;
}

.btn-primary.following:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-1px);
}

.btn:active {
  transform: translateY(0);
}
`
};
