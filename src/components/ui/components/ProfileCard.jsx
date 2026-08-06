// src/components/ui/ProfileCard.jsx
import React, { useState } from "react";

const defaultProfileImg = "https://i.pinimg.com/736x/26/b2/08/26b20833119002e53675a9a7d545c60d.jpg";

export default function ProfileCard({
  image = defaultProfileImg,
  name = "Amir.",
  bio = "A Frontend Developer focused on building beautiful & intuitive user experiences.",
  followers = "12.5k",
  posts = "148",
  theme = {},
}) {
  const [isFollowing, setIsFollowing] = useState(false);

  const customStyles = {
    "--card-bg": theme.cardBg || "#1a1a1f",
    "--accent-color": theme.accentColor || "#ffffff",
    "--btn-text-color": theme.btnTextColor || "#111113",
    "--badge-color": theme.badgeColor || "#22c55e",
    "--text-primary": theme.textPrimary || "#f0f0f5",
    "--text-secondary": theme.textSecondary || "rgba(255, 255, 255, 0.45)",
  };

  return (
    <div className="card" style={customStyles}>
      <style>{`
        .card {
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
          text-align: left;
        }

        .card:hover {
          transform: translateY(-6px);
          box-shadow:
            0 24px 64px rgba(0, 0, 0, 0.8),
            0 1px 0 rgba(255, 255, 255, 0.08) inset;
        }

        /* ── Photo wrapper ── */
        /* Default: covers top ~55% of the card */
        /* Hover: expands to cover 100% of the card */
        .photo-wrapper {
          position: absolute;
          top: 12px;
          left: 12px;
          right: 12px;
          height: 55%;
          overflow: hidden;
          border-radius: 24px; /* Increased border radius before hover */
          transition: height 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            top 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            left 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            right 0.5s cubic-bezier(0.4, 0, 0.2, 1),
            border-radius 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card:hover .photo-wrapper {
          height: calc(100% - 24px);
          border-radius: 18px; /* Slightly tighter radius when expanded */
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

        /* Gradient at bottom of photo — invisible by default, fades in on hover */
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
        /* Always pinned to the bottom of the card */
        .card-body {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 18px 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          /* default: solid dark bg below the photo */
          background: var(--card-bg, #1a1a1f);
          transition: background 0.5s ease;
        }

        /* On hover: photo covers it, so bg becomes transparent (gradient takes over) */
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

        /* On hover badge turns dark/monochrome like the reference right card */
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

        /* ── Button ── */
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
      `}</style>

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
            className={`btn btn-primary ${isFollowing ? "following" : ""}`}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            {isFollowing ? "Following" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}
