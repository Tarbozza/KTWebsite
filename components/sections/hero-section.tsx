"use client";

import { useState, useEffect, useRef } from "react";
import { Play, X, Lock, Copy, Check, ChevronRight, Users, Wifi } from "lucide-react";
import { DiscordIcon } from "../shared/discord-icon";

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
    badge: "Online",
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
    badge: "Coming Soon",
    badgeColor: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
    disabled: true,
    connectUrl: null,
  },
] as const;

// ── Discord SVG ────────────────────────────────────────────────────────────

function DiscordSVG({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={`${className} fill-current`} viewBox="0 0 24 24">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286z" />
    </svg>
  );
}

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
        // silently fail
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
      // fallback
    }
  };

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        handleCopy();
      }}
      className={`
        flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-mono transition-all duration-200
        ${copied
          ? "bg-green-500/15 border border-green-500/30 text-green-400"
          : "bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-gray-400 hover:text-gray-200"
        }
      `}
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 shrink-0" />
      ) : (
        <Copy className="w-3.5 h-3.5 shrink-0" />
      )}
      <span>{copied ? "คัดลอกแล้ว!" : full}</span>
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

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleJoin = (server: (typeof SERVERS)[number]) => {
    if (server.disabled || !server.connectUrl) return;
    window.location.href = server.connectUrl;
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-100 flex items-end sm:items-center justify-center sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Sheet on mobile, modal on desktop */}
      <div className="relative w-full sm:max-w-md bg-[#111111] sm:rounded-2xl rounded-t-2xl border border-white/10 shadow-2xl animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-250">

        {/* Drag handle (mobile) */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden">
          <div className="w-10 h-1 rounded-full bg-white/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-3 sm:pt-5 border-b border-white/5">
          <div>
            <h2 className="text-base font-bold text-white">เลือกเซิร์ฟเวอร์</h2>
            <p className="text-xs text-gray-500 mt-0.5">เลือกโหมดที่ต้องการเข้าเล่น</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Server cards */}
        <div className="p-3 sm:p-4 flex flex-col gap-2.5">
          {SERVERS.map((server) => (
            <div
              key={server.id}
              onClick={() => handleJoin(server)}
              className={`
                relative group rounded-xl border p-4 transition-all duration-200 overflow-hidden
                ${server.disabled
                  ? "border-white/5 bg-white/2 cursor-not-allowed opacity-55"
                  : "border-white/10 bg-[#1a1a1a] cursor-pointer hover:border-[#55AD38]/50 active:scale-[0.99] hover:shadow-[0_6px_24px_rgba(85,173,56,0.12)]"
                }
              `}
            >
              {!server.disabled && (
                <div
                  className="absolute inset-x-0 -top-10 h-20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse, ${server.glowColor}, transparent 70%)`,
                  }}
                />
              )}

              <div className="relative flex items-start justify-between gap-3">
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span
                      className="text-base font-black tracking-tight"
                      style={{ color: server.disabled ? "#555" : server.color }}
                    >
                      {server.label}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${server.badgeColor}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${server.disabled ? "bg-yellow-500" : "bg-green-500 animate-pulse"}`}
                      />
                      {server.badge}
                    </span>
                  </div>

                  <p className="text-xs text-gray-400 mb-3 leading-relaxed">
                    {server.description}
                  </p>

                  <CopyIPButton ip={server.ip} port={server.port} />
                </div>

                {/* Action icon */}
                <div className="shrink-0 mt-0.5">
                  {server.disabled ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <Lock className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="text-[10px] text-gray-600 whitespace-nowrap">
                        14 มี.ค. 68
                      </span>
                    </div>
                  ) : (
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{
                        background: `${server.color}20`,
                        border: `1px solid ${server.color}40`,
                      }}
                    >
                      <Play className="w-4 h-4 fill-current" style={{ color: server.color }} />
                    </div>
                  )}
                </div>
              </div>

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

      </div>
    </div>
  );
}

// ── Scroll indicator ───────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-1.5 text-white/30 animate-bounce">
      <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path d="M12 5v14M5 12l7 7 7-7" />
      </svg>
    </div>
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
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* ── Background ── */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        />

        {/* Darkening layers */}
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0a] via-[#0a0a0a]/10 to-black/30" />
        {/* Radial gold glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_40%,rgba(255,170,0,0.12),transparent)]" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.5))]" />

        {/* ── Floating noise texture ── */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")", backgroundSize: "200px 200px" }} />

        {/* ── Content ── */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 flex flex-col items-center text-center pt-24 pb-16 sm:pt-28 sm:pb-20 gap-7 sm:gap-8">

          {/* Live badge pill */}
          <div className="animate-in fade-in slide-in-from-top-3 duration-700">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-xs text-gray-300 font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              เซิร์ฟเวอร์เปิดให้บริการแล้ว
              <span className="text-[#FFAA00]">✦</span>
            </div>
          </div>

          {/* Main title */}
          <div className="relative animate-in fade-in zoom-in-95 duration-700 delay-100">
            <h1 className="font-mono font-black tracking-tighter text-white leading-[0.9] select-none
              text-[clamp(3.5rem,16vw,8rem)]
            ">
              KT{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: "linear-gradient(160deg, #FFD060 0%, #FFAA00 45%, #ff8c00 100%)",
                  filter: "drop-shadow(0 0 40px rgba(255,170,0,0.4))",
                }}
              >
                THAIBAAN
              </span>
            </h1>

            {/* Glow behind title */}
            <div className="absolute inset-0 -z-10 blur-[80px] opacity-30 pointer-events-none"
              style={{ background: "radial-gradient(ellipse, rgba(255,170,0,0.5) 0%, transparent 70%)" }} />
          </div>

          {/* Subtitle */}
          <p className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200
            text-gray-300 font-light leading-relaxed max-w-lg
            text-base sm:text-lg md:text-xl
          ">
            เปิดประสบการณ์เอาชีวิตรอดในรูปแบบใหม่
            <br className="hidden xs:block" />
            <span className="text-white/80">สังคมดี ระบบเสถียร รองรับทั้ง Bedrock</span>
          </p>

          {/* CTA buttons */}
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 delay-300 w-full max-w-sm sm:max-w-none">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center">

              {/* Primary: Join server */}
              <button
                onClick={() => setModalOpen(true)}
                className="group relative overflow-hidden flex items-center justify-center gap-3
                  px-8 py-4 sm:py-3.5 rounded-2xl
                  bg-[#FFAA00] hover:bg-[#ffb929] active:bg-[#e59900]
                  text-black font-bold text-base sm:text-sm
                  shadow-[0_8px_32px_rgba(255,170,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,170,0,0.5)]
                  hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200
                "
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <Play className="w-5 h-5 fill-current shrink-0" />
                <span className="tracking-wide">เข้าเล่นเลย!</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </button>

              {/* Secondary: Discord */}
              <a
                href="#discord"
                className="group flex items-center justify-center gap-2.5
                  px-8 py-4 sm:py-3.5 rounded-2xl
                  bg-[#5865F2]/20 hover:bg-[#5865F2]/30 active:bg-[#5865F2]/40
                  border border-[#5865F2]/40 hover:border-[#5865F2]/70
                  text-white font-semibold text-base sm:text-sm
                  hover:shadow-[0_8px_32px_rgba(88,101,242,0.3)]
                  hover:-translate-y-0.5 active:translate-y-0
                  transition-all duration-200 backdrop-blur-sm
                "
              >
                <DiscordIcon className="w-5 h-5" />
                <span>เข้าร่วม Discord</span>
              </a>
            </div>
          </div>

          {/* Stats row */}
          <div className="animate-in fade-in duration-700 delay-500 w-full">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">

              {/* Online players */}
              <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/8 backdrop-blur-md">
                <div className="relative shrink-0">
                  <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-60" />
                </div>
                <div className="flex items-center gap-1.5 text-sm">
                  <Users className="w-3.5 h-3.5 text-gray-400" />
                  <span className="text-gray-300">ออนไลน์</span>
                  <span className="font-bold text-green-400 tabular-nums">
                    {playerCount !== null ? playerCount.toLocaleString() : "—"}
                  </span>
                </div>
              </div>

              {/* Version */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/8 backdrop-blur-md text-sm">
                <Wifi className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span className="text-gray-300">Version</span>
                <span className="font-bold text-white tabular-nums">
                  {gameVersion ?? "—"}
                </span>
              </div>

              {/* Platform badge */}
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-black/40 border border-white/8 backdrop-blur-md text-sm text-gray-300">
                <span className="text-base">📱</span>
                <span>Bedrock</span>
              </div>

            </div>
          </div>

        </div>

        {/* ── Scroll indicator (hidden on small screens) ── */}
        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden sm:block animate-in fade-in duration-700 delay-700">
          <ScrollIndicator />
        </div>

        {/* ── Bottom gradient bleed ── */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
      </header>
    </>
  );
}
