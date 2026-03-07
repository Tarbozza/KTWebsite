"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DiscordIcon } from "@/components/shared/discord-icon";

const NAV_LINKS = [
  { id: "home", href: "/", label: "หน้าแรก", enabled: true },
  { id: "rules", href: "/rules", label: "กฏหมู่บ้าน", enabled: true },
  { id: "about", href: "/about", label: "เกี่ยวกับ", enabled: false },
];



function NavLink({ item, onClick }: { item: typeof NAV_LINKS[number]; onClick?: () => void }) {
  const { toast } = useToast();

  const handleDisabledClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "🔒 อยู่ระหว่างปรับปรุง",
      description: "ขออภัย หน้านี้กำลังอยู่ในระหว่างการพัฒนา",
      variant: "destructive",
    });
  };

  if (item.enabled) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        className="text-white hover:text-[#FFAA00] transition-colors"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <button
      onClick={handleDisabledClick}
      className="group relative text-white/40 hover:text-white/60 transition-colors flex items-center gap-1 cursor-not-allowed"
    >
      {item.label}
      <Lock className="w-3 h-3" />
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/90 text-xs text-white/60 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50">
        อยู่ระหว่างปรับปรุง
      </span>
    </button>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [discordMemberCount, setDiscordMemberCount] = useState<number | null>(null);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const fetchDiscordMembers = async () => {
      try {
        const res = await fetch("/api/status");
        if (!res.ok) return;
        const data = await res.json();
        if (data?.discord?.members !== undefined) {
          setDiscordMemberCount(data.discord.members);
        }
      } catch {
        // silently fail — member count is non-critical
      }
    };

    fetchDiscordMembers();
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) closeMobileMenu();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="fixed w-full z-50 bg-black/75 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      {/* Main bar */}
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="font-mono font-bold text-white text-lg tracking-tight">
          KT <span className="text-[#FFAA00]">Thaiban</span>
        </Link>

        {/* Desktop nav links + Discord button (grouped on the right) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {NAV_LINKS.map((item) => (
            <NavLink key={item.id} item={item} />
          ))}

          {/* Desktop Discord button */}
          <Link
            href="/discord"
            className="inline-flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] px-4 py-2 rounded-lg text-white text-sm transition-all hover:-translate-y-0.5"
          >
            <DiscordIcon />
            Discord
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {discordMemberCount !== null ? discordMemberCount.toLocaleString() : "..."}
            </span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <div className="px-4 pb-5 pt-2 flex flex-col gap-4 border-t border-white/10 bg-black/80 backdrop-blur-xl">
          {/* Nav links */}
          <div className="flex flex-col gap-3 text-sm font-medium">
            {NAV_LINKS.map((item) => (
              <NavLink key={item.id} item={item} onClick={closeMobileMenu} />
            ))}
          </div>

          {/* Discord button */}
          <Link
            href="/discord"
            onClick={closeMobileMenu}
            className="inline-flex items-center justify-center gap-2 bg-[#5865F2] hover:bg-[#4752c4] px-4 py-2.5 rounded-lg text-white text-sm font-medium transition-colors"
          >
            <DiscordIcon />
            Discord
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-xs text-gray-200">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {discordMemberCount !== null ? discordMemberCount.toLocaleString() : "..."}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
