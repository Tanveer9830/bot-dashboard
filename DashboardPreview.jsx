import { useState } from "react";
import {
  LayoutGrid,
  ShieldAlert,
  ShieldCheck,
  Ticket,
  Music2,
  Coins,
  TrendingUp,
  Gift,
  Crown,
  ChevronDown,
  Circle,
  Play,
  Pause,
  SkipForward,
  Check,
  Globe,
  Lock,
  ArrowRight,
} from "lucide-react";

const PALETTE = {
  void: "#0A0C10",
  surface: "#12151B",
  raised: "#181C24",
  line: "#242832",
  lineSoft: "#1B1F27",
  textPrimary: "#ECEEF3",
  textDim: "#848DA0",
  textFaint: "#565D6C",
  signal: "#4FE8C9",
  signalDim: "#1F3A36",
  warn: "#F2B84B",
  warnDim: "#3A3121",
  danger: "#FF6B6B",
  dangerDim: "#3A2020",
};

const NAV_ITEMS = [
  { key: "overview", label: "Overview", icon: LayoutGrid },
  { key: "botpanel", label: "Bot Panel", icon: Globe, ownerOnly: true },
  { key: "moderation", label: "Moderation", icon: ShieldAlert },
  { key: "automod", label: "AutoMod", icon: ShieldCheck },
  { key: "tickets", label: "Tickets", icon: Ticket },
  { key: "music", label: "Music", icon: Music2 },
  { key: "economy", label: "Economy", icon: Coins },
  { key: "leveling", label: "Leveling", icon: TrendingUp },
  { key: "giveaways", label: "Giveaways", icon: Gift },
  { key: "owner", label: "Owner", icon: Crown },
];

const SERVERS = [
  { id: 1, name: "Nova Community", members: "12,480", initials: "NC", status: "online", tickets: 3, mods: 6, joinedAgo: "8 months ago" },
  { id: 2, name: "Pixel Lounge", members: "3,102", initials: "PL", status: "online", tickets: 0, mods: 2, joinedAgo: "3 months ago" },
  { id: 3, name: "The Arcade", members: "890", initials: "TA", status: "online", tickets: 1, mods: 1, joinedAgo: "2 weeks ago" },
];

const IS_OWNER_PREVIEW = true; // preview always shows the owner view — real gating happens after real login exists

const AUTOMOD_FEATURES = [
  { key: "spam", label: "Anti-spam", desc: "Rate-limits repeated messages" },
  { key: "flood", label: "Anti-flood", desc: "Blocks rapid-fire message bursts" },
  { key: "raid", label: "Anti-raid / anti-nuke", desc: "Flags mass joins and destructive actions" },
  { key: "mention", label: "Mention spam", desc: "Caps mentions per message" },
  { key: "invite", label: "Invite filter", desc: "Blocks Discord invite links" },
  { key: "link", label: "Link filter", desc: "Blocks external links" },
  { key: "caps", label: "Caps filter", desc: "Flags excessive capitalization" },
  { key: "dup", label: "Duplicate filter", desc: "Catches repeated identical messages" },
];

const MOD_CASES = [
  { id: 214, user: "kai_vega", action: "timeout", reason: "Spam in #general", mod: "Aria", time: "12m ago" },
  { id: 213, user: "ghostpine", action: "warn", reason: "Excessive caps", mod: "AutoMod", time: "48m ago" },
  { id: 212, user: "run.exe", action: "kick", reason: "Advertising", mod: "Milo", time: "2h ago" },
  { id: 211, user: "sable", action: "ban", reason: "Raid participant", mod: "AutoMod", time: "5h ago" },
];

const ECONOMY_LEADERS = [
  { rank: 1, user: "brine_", amount: "48,210" },
  { rank: 2, user: "quillon", amount: "39,875" },
  { rank: 3, user: "8bit.mara", amount: "31,402" },
  { rank: 4, user: "hollow_k", amount: "27,990" },
];

const LEVEL_LEADERS = [
  { rank: 1, user: "quillon", level: 62, xp: "184,220" },
  { rank: 2, user: "sable", level: 58, xp: "162,004" },
  { rank: 3, user: "brine_", level: 55, xp: "149,873" },
  { rank: 4, user: "run.exe", level: 51, xp: "131,660" },
];

const TICKETS_OPEN = [
  { id: "ticket-042", user: "newuser22", category: "Technical Support", claimed: "Unclaimed", time: "3m ago" },
  { id: "ticket-041", user: "moth_light", category: "Purchase", claimed: "Aria", time: "22m ago" },
  { id: "ticket-040", user: "verawinter", category: "Report", claimed: "Milo", time: "1h ago" },
];

const GIVEAWAYS_ACTIVE = [
  { id: 1, prize: "Discord Nitro (1 month)", entries: 214, endsIn: "1d 4h" },
  { id: 2, prize: "Custom role + 5,000 coins", entries: 89, endsIn: "6h 12m" },
];

const BOT_ADMINS = [
  { name: "Aria", role: "Bot Administrator", since: "Mar 2026" },
  { name: "Milo", role: "Bot Administrator", since: "Jun 2026" },
];

function Toggle({ on, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        border: `1px solid ${on ? PALETTE.signal : PALETTE.line}`,
        background: on ? PALETTE.signalDim : PALETTE.lineSoft,
        position: "relative",
        cursor: "pointer",
        flexShrink: 0,
        transition: "all 150ms ease",
      }}
      aria-pressed={on}
    >
      <span
        style={{
          position: "absolute",
          top: 2,
          left: on ? 20 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: on ? PALETTE.signal : PALETTE.textFaint,
          transition: "left 150ms ease",
        }}
      />
    </button>
  );
}

function StatusDot({ color = PALETTE.signal }) {
  return (
    <span
      style={{
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: color,
        display: "inline-block",
        boxShadow: `0 0 0 3px ${color}22`,
      }}
    />
  );
}

function SectionTitle({ eyebrow, title }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: PALETTE.textFaint,
          marginBottom: 4,
        }}
      >
        {eyebrow}
      </div>
      <div style={{ fontSize: 20, fontWeight: 600, color: PALETTE.textPrimary }}>{title}</div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: PALETTE.surface,
        border: `1px solid ${PALETTE.line}`,
        borderRadius: 10,
        padding: 18,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StatReadout({ label, value, accent }) {
  return (
    <div
      style={{
        background: PALETTE.surface,
        border: `1px solid ${PALETTE.line}`,
        borderRadius: 10,
        padding: "14px 16px",
      }}
    >
      <div style={{ fontSize: 11, color: PALETTE.textFaint, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 22,
          fontWeight: 600,
          color: accent || PALETTE.textPrimary,
        }}
      >
        {value}
      </div>
    </div>
  );
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: { bg: PALETTE.lineSoft, fg: PALETTE.textDim },
    signal: { bg: PALETTE.signalDim, fg: PALETTE.signal },
    warn: { bg: PALETTE.warnDim, fg: PALETTE.warn },
    danger: { bg: PALETTE.dangerDim, fg: PALETTE.danger },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        fontSize: 11,
        fontFamily: "'JetBrains Mono', monospace",
        padding: "3px 8px",
        borderRadius: 5,
        background: t.bg,
        color: t.fg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ActionBadge({ action }) {
  const map = {
    ban: "danger",
    kick: "warn",
    timeout: "warn",
    warn: "neutral",
  };
  return <Badge tone={map[action] || "neutral"}>{action}</Badge>;
}

export default function DashboardPreview() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [section, setSection] = useState("overview");
  const [serverMenuOpen, setServerMenuOpen] = useState(false);
  const [activeServer, setActiveServer] = useState(SERVERS[0]);
  const [automodState, setAutomodState] = useState({
    spam: true,
    flood: true,
    raid: false,
    mention: true,
    invite: false,
    link: false,
    caps: false,
    dup: true,
  });
  const [levelingOn, setLevelingOn] = useState(true);
  const [economyOn, setEconomyOn] = useState(true);
  const [playing, setPlaying] = useState(true);

  const fontImport = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
    `}</style>
  );

  if (!loggedIn) {
    return (
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          background: PALETTE.void,
          minHeight: 560,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
          padding: 24,
        }}
      >
        {fontImport}
        <div style={{ width: "100%", maxWidth: 360, textAlign: "center" }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: PALETTE.signalDim,
              border: `1px solid ${PALETTE.signal}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <Crown size={24} color={PALETTE.signal} strokeWidth={1.75} />
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: PALETTE.textPrimary, marginBottom: 6 }}>
            Bot control panel
          </div>
          <div style={{ fontSize: 13, color: PALETTE.textDim, marginBottom: 28, lineHeight: 1.6 }}>
            Preview only — this mockup uses sample data and isn't connected
            to a real server yet.
          </div>
          <button
            onClick={() => setLoggedIn(true)}
            style={{
              width: "100%",
              padding: "11px 16px",
              borderRadius: 8,
              border: "none",
              background: PALETTE.textPrimary,
              color: PALETTE.void,
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
          >
            Sign in with Discord
          </button>
          <div style={{ fontSize: 11, color: PALETTE.textFaint, marginTop: 16 }}>
            No real login is wired up yet — this button just opens the preview.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: PALETTE.void,
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${PALETTE.line}`,
        display: "flex",
        minHeight: 620,
      }}
    >
      {fontImport}

      {/* Sidebar */}
      <div
        style={{
          width: 208,
          borderRight: `1px solid ${PALETTE.line}`,
          background: PALETTE.surface,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
        }}
      >
        <div style={{ padding: "18px 16px", borderBottom: `1px solid ${PALETTE.line}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <StatusDot />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textPrimary, fontWeight: 600 }}>
              CONTROL PANEL
            </span>
          </div>
          <div style={{ fontSize: 11, color: PALETTE.textFaint, marginLeft: 14 }}>Preview build</div>
        </div>

        <div style={{ flex: 1, padding: "12px 8px" }}>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = section === item.key;
            return (
              <div key={item.key}>
                {item.key === "botpanel" && (
                  <div style={{ height: 1, background: PALETTE.line, margin: "8px 10px" }} />
                )}
                <button
                  onClick={() => setSection(item.key)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "8px 10px",
                    marginBottom: 2,
                    borderRadius: 7,
                    border: "none",
                    background: active ? PALETTE.raised : "transparent",
                    color: active ? PALETTE.textPrimary : PALETTE.textDim,
                    fontSize: 13,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: active ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <Icon size={16} strokeWidth={1.75} color={active ? PALETTE.signal : PALETTE.textFaint} />
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.ownerOnly && <Lock size={11} color={PALETTE.textFaint} />}
                </button>
                {item.key === "botpanel" && (
                  <div style={{ height: 1, background: PALETTE.line, margin: "8px 10px" }} />
                )}
              </div>
            );
          })}
        </div>

        <div style={{ padding: 12, borderTop: `1px solid ${PALETTE.line}` }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 10px",
              borderRadius: 7,
              background: PALETTE.raised,
            }}
          >
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                background: PALETTE.signalDim,
                color: PALETTE.signal,
                fontSize: 11,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              YOU
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 12, color: PALETTE.textPrimary, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                yourname
              </div>
              <div style={{ fontSize: 10, color: PALETTE.textFaint }}>Server admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "14px 24px",
            borderBottom: `1px solid ${PALETTE.line}`,
            position: "relative",
          }}
        >
          <button
            onClick={() => setServerMenuOpen((o) => !o)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "transparent",
              border: `1px solid ${PALETTE.line}`,
              borderRadius: 8,
              padding: "7px 12px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                background: PALETTE.lineSoft,
                color: PALETTE.textDim,
                fontSize: 10,
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {activeServer.initials}
            </div>
            <span style={{ fontSize: 13, color: PALETTE.textPrimary, fontWeight: 500 }}>{activeServer.name}</span>
            <ChevronDown size={14} color={PALETTE.textFaint} />
          </button>

          {serverMenuOpen && (
            <div
              style={{
                position: "absolute",
                top: 52,
                left: 24,
                width: 220,
                background: PALETTE.raised,
                border: `1px solid ${PALETTE.line}`,
                borderRadius: 8,
                padding: 6,
                zIndex: 10,
              }}
            >
              {SERVERS.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActiveServer(s);
                    setServerMenuOpen(false);
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 6,
                    border: "none",
                    background: s.id === activeServer.id ? PALETTE.lineSoft : "transparent",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div>
                    <div style={{ fontSize: 12.5, color: PALETTE.textPrimary }}>{s.name}</div>
                    <div style={{ fontSize: 10.5, color: PALETTE.textFaint }}>{s.members} members</div>
                  </div>
                  {s.id === activeServer.id && <Check size={14} color={PALETTE.signal} />}
                </button>
              ))}
            </div>
          )}

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusDot />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: PALETTE.textDim }}>ONLINE</span>
          </div>
        </div>

        {/* Panel content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          {section === "botpanel" && (
            <div>
              <SectionTitle eyebrow="Owner Access" title="Bot Panel — All Servers" />

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: PALETTE.warnDim,
                  border: `1px solid ${PALETTE.warn}33`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  marginBottom: 20,
                  fontSize: 12,
                  color: PALETTE.warn,
                }}
              >
                <Lock size={13} />
                Only the Global Bot Owner and Bot Administrators can see this page. Everyone else only ever
                sees the one server they're managing.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <StatReadout label="Servers" value={String(SERVERS.length)} accent={PALETTE.signal} />
                <StatReadout label="Total members" value="16,472" />
                <StatReadout
                  label="Open tickets (all servers)"
                  value={String(SERVERS.reduce((sum, s) => sum + s.tickets, 0))}
                />
              </div>

              <div style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary, marginBottom: 10 }}>
                Every server the bot is in
              </div>

              <Card style={{ padding: 0 }}>
                {SERVERS.map((s, i) => (
                  <div
                    key={s.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 12,
                      padding: "14px 16px",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          background: PALETTE.lineSoft,
                          color: PALETTE.textDim,
                          fontSize: 11,
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        {s.initials}
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                          <span style={{ fontSize: 13, color: PALETTE.textPrimary, fontWeight: 500 }}>{s.name}</span>
                          <StatusDot />
                        </div>
                        <div style={{ fontSize: 11, color: PALETTE.textFaint }}>
                          {s.members} members • {s.mods} mods • added {s.joinedAgo}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                      {s.tickets > 0 && <Badge tone="warn">{s.tickets} open ticket{s.tickets > 1 ? "s" : ""}</Badge>}
                      <button
                        onClick={() => {
                          setActiveServer(s);
                          setSection("overview");
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          padding: "6px 12px",
                          borderRadius: 7,
                          border: `1px solid ${PALETTE.line}`,
                          background: PALETTE.raised,
                          color: PALETTE.textPrimary,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Manage <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </Card>

              <div style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary, margin: "20px 0 10px" }}>
                Global controls
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, color: PALETTE.textPrimary, fontWeight: 500 }}>Maintenance mode</div>
                    <div style={{ fontSize: 11.5, color: PALETTE.textFaint, marginTop: 2 }}>
                      Pauses commands bot-wide, across every server
                    </div>
                  </div>
                  <Toggle on={false} onClick={() => {}} />
                </Card>
                <Card style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontSize: 13, color: PALETTE.textPrimary, fontWeight: 500 }}>Global blacklist</div>
                    <div style={{ fontSize: 11.5, color: PALETTE.textFaint, marginTop: 2 }}>
                      3 users blocked from using the bot anywhere
                    </div>
                  </div>
                  <button
                    style={{
                      padding: "6px 12px",
                      borderRadius: 7,
                      border: `1px solid ${PALETTE.line}`,
                      background: PALETTE.raised,
                      color: PALETTE.textPrimary,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                  >
                    Manage
                  </button>
                </Card>
              </div>
            </div>
          )}

          {section === "overview" && (
            <div>
              <SectionTitle eyebrow="Dashboard" title="Overview" />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <StatReadout label="Uptime" value="14d 06:22" />
                <StatReadout label="Commands today" value="1,842" accent={PALETTE.signal} />
                <StatReadout label="Open tickets" value="3" />
                <StatReadout label="Active giveaways" value="2" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 12 }}>
                <Card>
                  <div style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary, marginBottom: 12 }}>
                    Recent moderation activity
                  </div>
                  {MOD_CASES.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "8px 0",
                        borderTop: `1px solid ${PALETTE.lineSoft}`,
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <ActionBadge action={c.action} />
                        <span style={{ fontSize: 12.5, color: PALETTE.textPrimary }}>{c.user}</span>
                      </div>
                      <span style={{ fontSize: 11.5, color: PALETTE.textFaint }}>{c.time}</span>
                    </div>
                  ))}
                </Card>
                <Card>
                  <div style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary, marginBottom: 12 }}>
                    Modules
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0" }}>
                    <span style={{ fontSize: 12.5, color: PALETTE.textDim }}>Leveling</span>
                    <Toggle on={levelingOn} onClick={() => setLevelingOn((v) => !v)} />
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderTop: `1px solid ${PALETTE.lineSoft}` }}>
                    <span style={{ fontSize: 12.5, color: PALETTE.textDim }}>Economy</span>
                    <Toggle on={economyOn} onClick={() => setEconomyOn((v) => !v)} />
                  </div>
                </Card>
              </div>
            </div>
          )}

          {section === "moderation" && (
            <div>
              <SectionTitle eyebrow="Moderation" title="Case history" />
              <Card style={{ padding: 0 }}>
                {MOD_CASES.map((c, i) => (
                  <div
                    key={c.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "56px 1fr 1.6fr 90px 80px",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: PALETTE.textFaint }}>
                      #{c.id}
                    </span>
                    <span style={{ fontSize: 12.5, color: PALETTE.textPrimary }}>{c.user}</span>
                    <span style={{ fontSize: 12, color: PALETTE.textDim, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {c.reason}
                    </span>
                    <ActionBadge action={c.action} />
                    <span style={{ fontSize: 11, color: PALETTE.textFaint, textAlign: "right" }}>{c.time}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {section === "automod" && (
            <div>
              <SectionTitle eyebrow="Security" title="AutoMod" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 10 }}>
                {AUTOMOD_FEATURES.map((f) => (
                  <Card key={f.key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 13, color: PALETTE.textPrimary, fontWeight: 500 }}>{f.label}</div>
                      <div style={{ fontSize: 11.5, color: PALETTE.textFaint, marginTop: 2 }}>{f.desc}</div>
                    </div>
                    <Toggle
                      on={automodState[f.key]}
                      onClick={() => setAutomodState((s) => ({ ...s, [f.key]: !s[f.key] }))}
                    />
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section === "tickets" && (
            <div>
              <SectionTitle eyebrow="Support" title="Open tickets" />
              <Card style={{ padding: 0 }}>
                {TICKETS_OPEN.map((t, i) => (
                  <div
                    key={t.id}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "110px 1fr 1fr 100px 70px",
                      alignItems: "center",
                      gap: 10,
                      padding: "12px 16px",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, color: PALETTE.textDim }}>{t.id}</span>
                    <span style={{ fontSize: 12.5, color: PALETTE.textPrimary }}>{t.user}</span>
                    <span style={{ fontSize: 12, color: PALETTE.textDim }}>{t.category}</span>
                    <Badge tone={t.claimed === "Unclaimed" ? "warn" : "signal"}>{t.claimed}</Badge>
                    <span style={{ fontSize: 11, color: PALETTE.textFaint, textAlign: "right" }}>{t.time}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {section === "music" && (
            <div>
              <SectionTitle eyebrow="Voice" title="Now playing" />
              <Card style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 8,
                      background: PALETTE.lineSoft,
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, color: PALETTE.textPrimary, fontWeight: 500 }}>Nightdrive Synthesis</div>
                    <div style={{ fontSize: 11.5, color: PALETTE.textFaint, marginBottom: 8 }}>Requested by sable</div>
                    <div style={{ height: 3, borderRadius: 2, background: PALETTE.lineSoft, position: "relative" }}>
                      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "38%", background: PALETTE.signal, borderRadius: 2 }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, color: PALETTE.textFaint, marginTop: 4 }}>
                      <span>01:34</span>
                      <span>04:02</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setPlaying((p) => !p)}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: `1px solid ${PALETTE.line}`,
                      background: PALETTE.raised,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    {playing ? <Pause size={14} color={PALETTE.textPrimary} /> : <Play size={14} color={PALETTE.textPrimary} />}
                  </button>
                  <button
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: "50%",
                      border: `1px solid ${PALETTE.line}`,
                      background: PALETTE.raised,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      flexShrink: 0,
                    }}
                  >
                    <SkipForward size={14} color={PALETTE.textPrimary} />
                  </button>
                </div>
              </Card>
              <Card>
                <div style={{ fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary, marginBottom: 10 }}>Up next</div>
                {["Halftone Static", "Glass Corridor", "Low Orbit"].map((title, i) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "8px 0",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: PALETTE.textFaint, width: 14 }}>
                      {i + 1}
                    </span>
                    <span style={{ fontSize: 12.5, color: PALETTE.textPrimary }}>{title}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {section === "economy" && (
            <div>
              <SectionTitle eyebrow="Economy" title="Leaderboard" />
              <Card style={{ padding: 0 }}>
                {ECONOMY_LEADERS.map((row, i) => (
                  <div
                    key={row.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textFaint, width: 16 }}>
                        {row.rank}
                      </span>
                      <span style={{ fontSize: 13, color: PALETTE.textPrimary }}>{row.user}</span>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: PALETTE.signal }}>
                      {row.amount} coins
                    </span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {section === "leveling" && (
            <div>
              <SectionTitle eyebrow="Leveling" title="Leaderboard" />
              <Card style={{ padding: 0 }}>
                {LEVEL_LEADERS.map((row, i) => (
                  <div
                    key={row.rank}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderTop: i === 0 ? "none" : `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textFaint, width: 16 }}>
                        {row.rank}
                      </span>
                      <span style={{ fontSize: 13, color: PALETTE.textPrimary }}>{row.user}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Badge tone="signal">Lvl {row.level}</Badge>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: PALETTE.textFaint }}>
                        {row.xp} XP
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {section === "giveaways" && (
            <div>
              <SectionTitle eyebrow="Giveaways" title="Active" />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
                {GIVEAWAYS_ACTIVE.map((g) => (
                  <Card key={g.id}>
                    <div style={{ fontSize: 13.5, fontWeight: 500, color: PALETTE.textPrimary, marginBottom: 10 }}>{g.prize}</div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: PALETTE.textDim }}>
                      <span>{g.entries} entries</span>
                      <span>Ends in {g.endsIn}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {section === "owner" && (
            <div>
              <SectionTitle eyebrow="Access" title="Permissions" />
              <Card style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: PALETTE.textFaint, marginBottom: 4 }}>Global bot owner</div>
                <div style={{ fontSize: 13.5, color: PALETTE.textPrimary, fontFamily: "'JetBrains Mono', monospace" }}>
                  1131248987173814336
                </div>
              </Card>
              <Card style={{ padding: 0 }}>
                <div style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: PALETTE.textPrimary }}>
                  Bot administrators
                </div>
                {BOT_ADMINS.map((a, i) => (
                  <div
                    key={a.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderTop: `1px solid ${PALETTE.lineSoft}`,
                    }}
                  >
                    <span style={{ fontSize: 13, color: PALETTE.textPrimary }}>{a.name}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 11.5, color: PALETTE.textFaint }}>since {a.since}</span>
                      <Badge tone="signal">{a.role}</Badge>
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
