"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Lock, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiscordIcon } from "@/components/shared/discord-icon";
import { useServerStatus } from "@/context/server-status-context";

const NAV_LINKS = [
  { id: "home", href: "/", label: "หน้าแรก", emoji: "🏠", enabled: true },
  { id: "rules", href: "/rules", label: "กฏหมู่บ้าน", emoji: "📜", enabled: true },
  { id: "about", href: "/about", label: "เกี่ยวกับ", emoji: "⭐", enabled: false },
];

function NavLink({
  item,
  onClick,
  mobile = false,
}: {
  item: (typeof NAV_LINKS)[number];
  onClick?: () => void;
  mobile?: boolean;
}) {
  const { toast } = useToast();

  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "🔒 อยู่ระหว่างปรับปรุง",
      description: "ขออภัย หน้านี้กำลังอยู่ในระหว่างการพัฒนา",
      variant: "destructive",
    });
  };

  if (mobile) {
    if (item.enabled) {
      return (
        <Link
          href={item.href}
          onClick={onClick}
          className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-white transition-all group"
        >
          <span className="flex items-center gap-3">
            <span className="text-lg">{item.emoji}</span>
            <span className="font-medium">{item.label}</span>
          </span>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
        </Link>
      );
    }

    return (
      <button
        onClick={handleDisabledClick}
        className="flex items-center justify-between w-full px-4 py-3.5 rounded-xl bg-white/[0.02] border border-white/5 text-white/40 cursor-not-allowed"
      >
        <span className="flex items-center gap-3">
          <span className="text-lg opacity-40">{item.emoji}</span>
          <span className="font-medium">{item.label}</span>
        </span>
        <Lock className="w-3.5 h-3.5 text-gray-600" />
      </button>
    );
  }

  // Desktop
  if (item.enabled) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className="relative text-gray-300 hover:text-white transition-colors text-sm font-medium group"
      >
        {item.label}
        <span className="absolute -bottom-0.5 left-0 h-[2px] w-0 bg-[#FFAA00] rounded-full group-hover:w-full transition-all duration-300" />
      </Link>
    );
  }

  return (
    <button
      onClick={handleDisabledClick}
      className="group relative text-white/35 hover:text-white/55 transition-colors text-sm font-medium flex items-center gap-1 cursor-not-allowed"
    >
      {item.label}
      <Lock className="w-3 h-3" />
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-zinc-900 text-xs text-white/60 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 border border-white/10">
        อยู่ระหว่างปรับปรุง
      </span>
    </button>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { discordMembers } = useServerStatus();

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeMobileMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrolled
          ? "bg-black/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm"
          }`}
      >
        <div className="container mx-auto px-4 sm:px-6 h-16 grid grid-cols-3 items-center">
          {/* Left — Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-white text-lg tracking-tight shrink-0 z-10 justify-self-start"
            onClick={closeMobileMenu}
          >
            KT{" "}
            <span className="text-[#FFAA00] drop-shadow-[0_0_8px_rgba(255,170,0,0.5)]">
              Thaibaan
            </span>
          </Link>

          {/* Center — Desktop nav links */}
          <div className="hidden md:flex items-center justify-center gap-7 text-sm font-medium">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.id} item={item} />
            ))}
          </div>

          {/* Right — Desktop Discord button */}
          <div className="hidden md:flex items-center justify-end">
            <Link
              href="https://discord.gg/uRqNTSGgG6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] active:bg-[#3c45a5] px-4 py-2 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(88,101,242,0.35)] shadow-[0_2px_10px_rgba(88,101,242,0.2)]"
            >
              <DiscordIcon />
              Discord
              {discordMembers !== null && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 text-xs text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {discordMembers.toLocaleString()}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile: Discord mini + hamburger */}
          <div className="md:hidden flex items-center gap-2 justify-self-end col-start-3">
            <Link
              href="https://discord.gg/uRqNTSGgG6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#5865F2]/90 hover:bg-[#5865F2] px-3 py-2 rounded-xl text-white text-xs font-semibold transition-colors"
              onClick={closeMobileMenu}
            >
              <DiscordIcon className="w-4 h-4" />
              <span>Discord</span>
            </Link>

            <button
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`transition-all duration-200 ${isMobileMenuOpen ? "rotate-90 opacity-0 absolute" : "rotate-0 opacity-100"
                  }`}
              >
                <Menu className="w-5 h-5" />
              </span>
              <span
                className={`transition-all duration-200 ${isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0 absolute"
                  }`}
              >
                <X className="w-5 h-5" />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={closeMobileMenu}
        />

        {/* Slide-down panel */}
        <div
          className={`absolute top-0 left-0 right-0 bg-[#0d0d0d]/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl transition-all duration-300 ease-out ${isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
        >
          {/* Panel header */}
          <div className="flex items-center justify-between px-5 h-16 border-b border-white/5">
            <span className="font-mono font-bold text-white text-lg">
              KT <span className="text-[#FFAA00]">Thaibaan</span>
            </span>
            <button
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-colors"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav links */}
          <div className="px-4 py-4 flex flex-col gap-2">
            {NAV_LINKS.map((item, i) => (
              <div
                key={item.id}
                className={`transition-all duration-300 ${isMobileMenuOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
                  }`}
                style={{ transitionDelay: isMobileMenuOpen ? `${i * 50 + 80}ms` : "0ms" }}
              >
                <NavLink item={item} onClick={closeMobileMenu} mobile />
              </div>
            ))}
          </div>

          {/* Discord CTA */}
          <div
            className={`px-4 pb-6 transition-all duration-300 ${isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              }`}
            style={{ transitionDelay: isMobileMenuOpen ? "240ms" : "0ms" }}
          >
            <Link
              href="https://discord.gg/uRqNTSGgG6"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center justify-center gap-2.5 w-full bg-[#5865F2] hover:bg-[#4752c4] active:bg-[#3c45a5] py-3.5 rounded-xl text-white font-semibold text-base transition-colors shadow-[0_4px_20px_rgba(88,101,242,0.3)]"
            >
              <DiscordIcon className="w-5 h-5" />
              เข้าร่วม Discord
              {discordMembers !== null && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 text-xs text-white/90">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {discordMembers.toLocaleString()} คน
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
