"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X, Lock, Copy, Check } from "lucide-react";

// ── Server definitions ─────────────────────────────────────────────────────

const SERVERS = [
  {
    id: "smp",
    label: "SMP",
    description: "Survival MMO RPG — เปิดให้เล่นแล้ววันนี้",
    ip: "15.235.132.72",
    port: 20804,
    color: "#55AD38",
    glowColor: "rgba(85,173,56,0.35)",
    badge: "🟢 Online",
    badgeColor: "text-green-400 bg-green-500/10 border-green-500/20",
    disabled: false,
    connectUrl: "minecraft://connect/?serverUrl=15.235.132.72&serverPort=20804",
  },
  {
    id: "roleplay",
    label: "Roleplay",
    description: "เปิดให้เล่น 14 มีนาคม 2568",
    ip: "15.235.132.87",
    port: 28593,
    color: "#FFAA00",
    glowColor: "rgba(255,170,0,0.25)",
    badge: "🔒 Coming Soon",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    disabled: true,
    connectUrl: null,
  },
] as const;

// ── Discord icon ───────────────────────────────────────────────────────────

const DISCORD_ICON = (
  <svg
    className="w-6 h-6 fill-current group-hover:rotate-12 transition-transform"
    viewBox="0 0 24 24"
  >
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

// ── Server status hook ─────────────────────────────────────────────────────

function useServerStatus() {
  const [playerCount, setPlayerCount] = useState<number | null>(null);
  const [gameVersion, setGameVersion] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch("/api/status");
        if (!res.ok) return;
        const data = await res.json();
        if (data.online) setPlayerCount(data.players);
        if (data.version) setGameVersion(data.version);
      } catch {
        // silently fail — status is non-critical
      }
    };
    fetchStatus();
  }, []);

  return { playerCount, gameVersion };
}

// ── Copy IP button ─────────────────────────────────────────────────────────

function CopyIPButton({ ip, port }: { ip: string; port: number }) {
  const [copied, setCopied] = useState(false);
  const full = `${ip}:${port}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-400 hover:text-white transition-all font-mono"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400 shrink-0" />
      ) : (
        <Copy className="w-3.5 h-3.5 shrink-0" />
      )}
      <span className={copied ? "text-green-400" : ""}>{copied ? "คัดลอกแล้ว!" : full}</span>
    </button>
  );
}

// ── Server selector modal ──────────────────────────────────────────────────

interface ServerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ServerModal({ isOpen, onClose }: ServerModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleJoin = (server: typeof SERVERS[number]) => {
    if (server.disabled || !server.connectUrl) return;
    window.location.href = server.connectUrl;
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-lg bg-[#141414] border border-white/10 rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/5">
          <div>
            <h2 className="text-lg font-bold text-white font-sans">เลือกเซิร์ฟเวอร์</h2>
            <p className="text-xs text-gray-500 mt-0.5">เลือกโหมดที่ต้องการเข้าเล่น</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Server cards */}
        <div className="p-4 flex flex-col gap-3">
          {SERVERS.map((server) => (
            <div
              key={server.id}
              onClick={() => handleJoin(server)}
              className={`
                relative group rounded-xl border p-4 transition-all duration-200 overflow-hidden
                ${server.disabled
                  ? "border-white/5 bg-white/[0.02] cursor-not-allowed opacity-60"
                  : "border-white/10 bg-[#1a1a1a] cursor-pointer hover:border-[#55AD38]/50 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(85,173,56,0.15)]"
                }
              `}
            >
              {/* Glow on hover (SMP only) */}
              {!server.disabled && (
                <div
                  className="absolute inset-x-0 -top-10 h-20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{ background: `radial-gradient(ellipse, ${server.glowColor}, transparent 70%)` }}
                />
              )}

              <div className="relative flex items-start justify-between gap-4">
                {/* Left: info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className="text-lg font-black font-sans tracking-tight"
                      style={{ color: server.disabled ? "#666" : server.color }}
                    >
                      {server.label}
                    </span>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${server.badgeColor}`}
                    >
                      {server.badge}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    {server.description}
                  </p>

                  <CopyIPButton ip={server.ip} port={server.port} />
                </div>

                {/* Right: action */}
                <div className="shrink-0 mt-1">
                  {server.disabled ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-[10px] text-gray-600 whitespace-nowrap">14 มี.ค. 68</span>
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ background: `${server.color}20`, border: `1px solid ${server.color}40` }}
                    >
                      <Play
                        className="w-4 h-4 fill-current"
                        style={{ color: server.color }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Disabled countdown label */}
              {server.disabled && (
                <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60 animate-pulse" />
                  <span className="text-xs text-yellow-600/80">
                    เปิดให้บริการ 14 มีนาคม 2568
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div className="px-6 pb-5">
          <p className="text-[11px] text-gray-600 text-center">
            ต้องการความช่วยเหลือ? เข้า Discord แล้วเปิด ticket ได้เลย
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Stats badges ───────────────────────────────────────────────────────────

function OnlineBadge({ count }: { count: number | null }) {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md">
      <div className="relative shrink-0">
        <div className="w-3 h-3 bg-green-500 rounded-full" />
        <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
      </div>
      <span className="text-sm text-gray-200">
        Online:{" "}
        <span className="text-green-400 font-bold">
          {count !== null ? count.toLocaleString() : "..."}
        </span>
      </span>
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: string | null }) {
  return (
    <span className="px-4 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md text-sm text-gray-300 flex items-center gap-2">
      {label}
      <span className="font-bold text-white">{value ?? "..."}</span>
    </span>
  );
}

// ── Main component ─────────────────────────────────────────────────────────

export function HeroSection() {
  const { playerCount, gameVersion } = useServerStatus();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <ServerModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <header
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-105"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-transparent to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-[#FFAA00]/20 via-transparent to-transparent opacity-60" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center text-center gap-6 py-28 md:py-20">

          {/* Title */}
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-150">
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black font-mono tracking-tighter text-white drop-shadow-2xl leading-none">
              KT{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-[#FFAA00] to-[#ff7a18]">
                THAIBAAN
              </span>
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#FFAA00]/20 blur-[100px] -z-10 rounded-full mix-blend-screen pointer-events-none" />
          </div>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-2xl text-gray-200 max-w-2xl font-light leading-relaxed drop-shadow-md animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 px-2">
            เปิดประสบการณ์เอาชีวิตรอดในรูปแบบใหม่
            <br className="hidden sm:block" />
            สังคมดี ทุง ทุง ทุง!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
            {/* Join server — opens modal */}
            <button
              onClick={() => setModalOpen(true)}
              className="group relative w-full sm:w-auto min-w-56 px-8 py-4 bg-[#FFAA00] text-black font-bold text-base sm:text-lg rounded-xl shadow-[0_10px_30px_rgba(255,170,0,0.3)] hover:shadow-[0_10px_40px_rgba(255,170,0,0.5)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center justify-center gap-3">
                <Play className="w-5 h-5 fill-current" />
                <span className="uppercase tracking-wider">เข้าเล่นเลย!</span>
              </span>
            </button>

            {/* Discord */}
            <a
              href="#discord"
              className="group w-full sm:w-auto min-w-50 px-8 py-4 bg-[#5865F2]/90 border border-[#5865F2]/50 text-white font-bold text-base sm:text-lg rounded-xl hover:bg-[#5865F2] hover:shadow-[0_10px_40px_rgba(88,101,242,0.4)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-3"
            >
              {DISCORD_ICON}
              Discord
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3 animate-in fade-in duration-1000 delay-700">
            <OnlineBadge count={playerCount} />
            <StatBadge label="Version" value={gameVersion} />
            <span className="px-4 py-2.5 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md text-sm text-gray-300">
              Bedrock
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
