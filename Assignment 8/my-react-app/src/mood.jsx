import { useState } from "react";

const MOODS = [
  {
    id: "ecstatic",
    emoji: "🤩",
    label: "Ecstatic",
    color: "#FFD166",
    bg: "linear-gradient(135deg, #fff9e6 0%, #fff3c4 100%)",
    shadow: "rgba(255,209,102,0.45)",
    message: "You're absolutely glowing today. Ride this wave!",
    accent: "#e6a800",
    particles: ["✨", "⭐", "🌟"],
  },
  {
    id: "happy",
    emoji: "😊",
    label: "Happy",
    color: "#06D6A0",
    bg: "linear-gradient(135deg, #e6fff8 0%, #c4f7eb 100%)",
    shadow: "rgba(6,214,160,0.40)",
    message: "A good day in the making. Keep the energy alive.",
    accent: "#00a87a",
    particles: ["🌿", "🍀", "💚"],
  },
  {
    id: "calm",
    emoji: "😌",
    label: "Calm",
    color: "#74B3CE",
    bg: "linear-gradient(135deg, #eaf4fb 0%, #cce4f0 100%)",
    shadow: "rgba(116,179,206,0.40)",
    message: "Still water runs deep. Enjoy this quiet moment.",
    accent: "#4a8cad",
    particles: ["🌊", "🫧", "💙"],
  },
  {
    id: "meh",
    emoji: "😐",
    label: "Meh",
    color: "#B5B5B5",
    bg: "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 100%)",
    shadow: "rgba(150,150,150,0.35)",
    message: "Not every day needs to sparkle. That's okay.",
    accent: "#888",
    particles: ["☁️", "🌫️", "⬜"],
  },
  {
    id: "anxious",
    emoji: "😰",
    label: "Anxious",
    color: "#F4A261",
    bg: "linear-gradient(135deg, #fff4eb 0%, #fde3c8 100%)",
    shadow: "rgba(244,162,97,0.40)",
    message: "Breathe in slowly. You've handled hard things before.",
    accent: "#c97a35",
    particles: ["🌀", "💛", "🍂"],
  },
  {
    id: "sad",
    emoji: "😢",
    label: "Sad",
    color: "#8B9DC3",
    bg: "linear-gradient(135deg, #f0f2f9 0%, #dde2f2 100%)",
    shadow: "rgba(139,157,195,0.40)",
    message: "It's okay to feel this. Gentle days count too.",
    accent: "#5a6fa0",
    particles: ["🌧️", "💜", "🌙"],
  },
  {
    id: "angry",
    emoji: "😤",
    label: "Angry",
    color: "#EF476F",
    bg: "linear-gradient(135deg, #fff0f3 0%, #fccdd5 100%)",
    shadow: "rgba(239,71,111,0.40)",
    message: "Your feelings are valid. Channel them with intention.",
    accent: "#b5003a",
    particles: ["🔥", "⚡", "❤️"],
  },
];

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function FloatingParticle({ char, style }) {
  return (
    <span
      style={{
        position: "absolute",
        fontSize: "1.2rem",
        animation: "floatUp 3s ease-in-out infinite",
        pointerEvents: "none",
        userSelect: "none",
        ...style,
      }}
    >
      {char}
    </span>
  );
}

export default function MoodTracker() {
  const [selected, setSelected] = useState(null);
  const [history, setHistory] = useState({});
  const [note, setNote] = useState("");
  const [savedNote, setSavedNote] = useState("");
  const [streak, setStreak] = useState(4);
  const [justSaved, setJustSaved] = useState(false);

  const mood = MOODS.find((m) => m.id === selected);
  const today = new Date().toDateString();

  function selectMood(id) {
    setSelected(id);
    setNote("");
    setSavedNote("");
    setJustSaved(false);
  }

  function saveNote() {
    if (!note.trim() || !selected) return;
    setSavedNote(note.trim());
    setHistory((h) => ({ ...h, [today]: selected }));
    setJustSaved(true);
    setTimeout(() => setJustSaved(false), 1800);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,700;1,9..144,400&family=Nunito:wght@400;500;600;700&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .mt-root {
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          background: ${mood ? mood.bg : "linear-gradient(135deg, #fafafa 0%, #f3f3f3 100%)"};
          transition: background 0.7s cubic-bezier(.4,0,.2,1);
          display: flex; align-items: flex-start; justify-content: center;
          padding: 40px 16px 60px;
        }

        .mt-card {
          width: 100%; max-width: 560px;
          background: rgba(255,255,255,0.78);
          backdrop-filter: blur(20px);
          border-radius: 32px;
          box-shadow: 0 8px 48px ${mood ? mood.shadow : "rgba(0,0,0,0.08)"};
          transition: box-shadow 0.6s ease;
          overflow: visible;
          padding: 36px 32px 32px;
          position: relative;
        }

        /* ── Header ── */
        .mt-header { text-align: center; margin-bottom: 32px; position: relative; }
        .mt-title {
          font-family: 'Fraunces', serif;
          font-size: 2.2rem; font-weight: 700;
          color: #1a1a2e; letter-spacing: -0.5px; line-height: 1.1;
        }
        .mt-title em { font-style: italic; color: ${mood ? mood.accent : "#888"}; transition: color .5s; }
        .mt-sub { font-size: .88rem; color: #999; margin-top: 6px; font-weight: 500; }

        .streak-badge {
          display: inline-flex; align-items: center; gap: 5px;
          background: #fff3cd; color: #a06800;
          font-size: .78rem; font-weight: 700; padding: 4px 12px;
          border-radius: 20px; margin-top: 10px;
          border: 1.5px solid #ffe08a;
        }

        /* ── Mood Grid ── */
        .mt-label {
          font-size: .72rem; font-weight: 700; letter-spacing: 1.5px;
          text-transform: uppercase; color: #aaa; margin-bottom: 14px;
        }
        .mood-grid {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
          margin-bottom: 28px;
        }
        .mood-btn {
          display: flex; flex-direction: column; align-items: center;
          gap: 5px; padding: 14px 8px 12px;
          border-radius: 18px; border: 2px solid transparent;
          background: rgba(255,255,255,0.7);
          cursor: pointer; transition: all 0.22s cubic-bezier(.4,0,.2,1);
          position: relative; overflow: hidden;
        }
        .mood-btn:hover { transform: translateY(-3px); background: #fff; }
        .mood-btn.active {
          background: ${mood ? mood.color + "22" : "#fff"};
          border-color: ${mood ? mood.color : "transparent"};
          box-shadow: 0 4px 18px ${mood ? mood.shadow : "transparent"};
          transform: translateY(-4px) scale(1.04);
        }
        .mood-emoji { font-size: 1.9rem; line-height: 1; transition: transform .2s; }
        .mood-btn:hover .mood-emoji { transform: scale(1.15); }
        .mood-btn.active .mood-emoji { transform: scale(1.2); }
        .mood-text { font-size: .72rem; font-weight: 700; color: #555; }
        .mood-btn.active .mood-text { color: ${mood ? mood.accent : "#555"}; }

        /* ── Display Panel ── */
        .display-panel {
          border-radius: 22px;
          background: ${mood ? mood.color + "18" : "#f7f7f7"};
          border: 1.5px solid ${mood ? mood.color + "44" : "#e8e8e8"};
          padding: 24px 22px;
          text-align: center;
          transition: all 0.5s cubic-bezier(.4,0,.2,1);
          margin-bottom: 20px;
          position: relative; overflow: hidden;
          min-height: 120px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
        }
        .display-emoji {
          font-size: 3.5rem; line-height: 1;
          animation: popIn .4s cubic-bezier(.34,1.56,.64,1);
        }
        .display-name {
          font-family: 'Fraunces', serif;
          font-size: 1.6rem; font-weight: 700;
          color: ${mood ? mood.accent : "#ccc"};
          margin: 6px 0 4px;
          transition: color .5s;
        }
        .display-message {
          font-size: .88rem; color: #666;
          line-height: 1.6; max-width: 300px;
        }
        .display-placeholder {
          font-size: .9rem; color: #bbb;
          font-style: italic;
          font-family: 'Fraunces', serif;
        }

        /* ── Note area ── */
        .note-area { margin-bottom: 20px; }
        .note-input {
          width: 100%; border-radius: 14px;
          border: 1.5px solid #e0e0e0;
          padding: 12px 16px; font-family: 'Nunito', sans-serif;
          font-size: .9rem; color: #333; resize: none;
          background: rgba(255,255,255,0.9);
          transition: border-color .25s, box-shadow .25s;
          outline: none; line-height: 1.6;
        }
        .note-input:focus {
          border-color: ${mood ? mood.color : "#aaa"};
          box-shadow: 0 0 0 3px ${mood ? mood.color + "33" : "#0001"};
        }
        .save-btn {
          margin-top: 10px; width: 100%;
          padding: 12px; border-radius: 14px; border: none;
          background: ${mood ? `linear-gradient(135deg, ${mood.color}, ${mood.accent})` : "#e0e0e0"};
          color: ${mood ? "#fff" : "#aaa"};
          font-family: 'Nunito', sans-serif; font-weight: 700;
          font-size: .95rem; cursor: ${mood ? "pointer" : "not-allowed"};
          transition: all .25s; letter-spacing: .3px;
        }
        .save-btn:hover:not(:disabled) { opacity: .88; transform: translateY(-1px); }
        .save-btn.saved { background: #06D6A0; color: #fff; }

        /* ── History strip ── */
        .history-strip { display: flex; justify-content: space-between; gap: 6px; }
        .hist-day {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; gap: 4px;
        }
        .hist-dot {
          width: 36px; height: 36px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.1rem;
          background: rgba(0,0,0,0.05);
        }
        .hist-label { font-size: .67rem; font-weight: 700; color: #bbb; letter-spacing: .5px; }

        /* ── Particles ── */
        .particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }

        @keyframes popIn {
          from { transform: scale(.5) rotate(-8deg); opacity: 0; }
          to   { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes floatUp {
          0%   { opacity: 0; transform: translateY(0) scale(.8); }
          30%  { opacity: 1; }
          100% { opacity: 0; transform: translateY(-60px) scale(1.1); }
        }

        @media (max-width: 400px) {
          .mood-grid { grid-template-columns: repeat(4, 1fr); gap: 7px; }
          .mood-btn { padding: 10px 4px; }
          .mt-card { padding: 24px 18px 24px; }
        }
      `}</style>

      <div className="mt-root">
        <div className="mt-card">
          {/* Floating particles */}
          {mood && (
            <div className="particles">
              {mood.particles.map((p, i) => (
                <FloatingParticle
                  key={i}
                  char={p}
                  style={{
                    left: `${15 + i * 28}%`,
                    bottom: "10%",
                    animationDelay: `${i * 1.1}s`,
                    animationDuration: `${2.5 + i * 0.4}s`,
                  }}
                />
              ))}
            </div>
          )}

          {/* Header */}
          <div className="mt-header">
            <h1 className="mt-title">
              How are you <em>feeling</em>?
            </h1>
            <p className="mt-sub">Check in with yourself — it only takes a moment.</p>
            <div className="streak-badge">🔥 {streak} day streak</div>
          </div>

          {/* Mood Grid */}
          <p className="mt-label">Pick your mood</p>
          <div className="mood-grid">
            {MOODS.map((m) => (
              <button
                key={m.id}
                className={`mood-btn${selected === m.id ? " active" : ""}`}
                onClick={() => selectMood(m.id)}
                title={m.label}
              >
                <span className="mood-emoji">{m.emoji}</span>
                <span className="mood-text">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Display panel */}
          <div className="display-panel">
            {mood ? (
              <>
                <div key={mood.id} className="display-emoji">{mood.emoji}</div>
                <div className="display-name">{mood.label}</div>
                <p className="display-message">{mood.message}</p>
                {savedNote && (
                  <p style={{
                    marginTop: 10, fontSize: ".82rem", color: "#888",
                    fontStyle: "italic", borderTop: "1px solid #e0e0e0",
                    paddingTop: 10, maxWidth: 300
                  }}>
                    💬 "{savedNote}"
                  </p>
                )}
              </>
            ) : (
              <p className="display-placeholder">
                Select a mood to see your reflection…
              </p>
            )}
          </div>

          {/* Note */}
          <div className="note-area">
            <textarea
              className="note-input"
              rows={2}
              placeholder={mood ? "Add a quick note about your day… (optional)" : "Select a mood first…"}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={!mood}
            />
            <button
              className={`save-btn${justSaved ? " saved" : ""}`}
              onClick={saveNote}
              disabled={!mood || !note.trim()}
            >
              {justSaved ? "✓ Saved!" : "Save Today's Mood"}
            </button>
          </div>

          {/* Week history */}
          <p className="mt-label">This week</p>
          <div className="history-strip">
            {DAYS.map((day, i) => {
              const pastMood = i < 4 ? MOODS[Math.floor(Math.random() * 4)] : null;
              return (
                <div className="hist-day" key={day}>
                  <div
                    className="hist-dot"
                    style={pastMood ? { background: pastMood.color + "33" } : {}}
                  >
                    {pastMood ? pastMood.emoji : "·"}
                  </div>
                  <span className="hist-label">{day}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}