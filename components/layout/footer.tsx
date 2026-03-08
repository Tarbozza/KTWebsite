import Link from "next/link";
import { DiscordIcon } from "@/components/shared/discord-icon";

const QUICK_LINKS = [
  { label: "หน้าแรก", href: "/" },
  { label: "กฏหมู่บ้าน", href: "/rules" },
  { label: "ติดต่อทีมงาน", href: "#" },
];

const SERVER_STATUS = [
  { label: "Server", status: "ออนไลน์", color: "bg-green-500" }
];

const SERVER_IP = "kt-thaiban.online";
const SERVER_IP_FULL = "15.235.132.72:20804";

function FacebookIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: <FacebookIcon />,
    bg: "hover:bg-[#1877F2]",
  },
  {
    label: "Discord",
    href: "#",
    icon: <DiscordIcon className="w-4 h-4" />,
    bg: "hover:bg-[#5865F2]",
  },
  {
    label: "YouTube",
    href: "#",
    icon: <YouTubeIcon />,
    bg: "hover:bg-red-600",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-500 border-t border-white/8">

      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#FFAA00]/40 to-transparent" />

      {/* Main footer grid */}
      <div className="container mx-auto px-5 sm:px-8 pt-10 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-10">

          {/* Brand — spans 2 cols on mobile, 2 on sm */}
          <div className="col-span-2">
            {/* Logo */}
            <div className="mb-4">
              <span className="font-mono font-black text-2xl text-white tracking-tight">
                KT{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #FFD060 0%, #FFAA00 60%, #ff8c00 100%)",
                  }}
                >
                  Thaibaan
                </span>
              </span>
              <p className="text-[11px] text-gray-600 font-mono mt-0.5 tracking-wider uppercase">
                Minecraft Server
              </p>
            </div>

            <p className="text-sm leading-relaxed text-gray-500 mb-5 max-w-[18rem]">
              เซิร์ฟเวอร์มายคราฟคุณภาพ สังคมดี ระบบเสถียร มุ่งเน้นความสนุก
              และความยุติธรรมสำหรับผู้เล่นทุกคน
            </p>

            {/* Social icons */}
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`
                    w-9 h-9 rounded-xl flex items-center justify-center
                    bg-white/5 border border-white/8 text-gray-500
                    hover:text-white hover:border-transparent
                    ${social.bg} transition-all duration-200 hover:-translate-y-0.5
                  `}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-[#FFAA00]/70 inline-block" />
              เมนูลัด
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-gray-500 hover:text-gray-200 transition-colors"
                  >
                    <span className="w-0 h-px bg-[#FFAA00] group-hover:w-3 transition-all duration-200 rounded-full shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Server status */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
              <span className="w-1 h-4 rounded-full bg-green-500/70 inline-block" />
              สถานะ
            </h4>
            <ul className="space-y-3 text-sm">
              {SERVER_STATUS.map((item) => (
                <li key={item.label} className="flex items-center justify-between gap-3">
                  <span className="text-gray-500">{item.label}</span>
                  <span className="inline-flex items-center gap-1.5 text-green-400 text-xs font-medium">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.color} shrink-0`} />
                    {item.status}
                  </span>
                </li>
              ))}
            </ul>

            {/* Mini Discord CTA */}
            <a
              href="#"
              className="mt-5 flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#5865F2]/10 border border-[#5865F2]/20 hover:bg-[#5865F2]/20 hover:border-[#5865F2]/40 text-[#8b9ef4] hover:text-white transition-all duration-200 text-xs font-medium group"
            >
              <DiscordIcon className="w-4 h-4 shrink-0" />
              <span>เข้าร่วม Discord</span>
              <svg
                className="w-3 h-3 ml-auto opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/6">
        <div className="container mx-auto px-5 sm:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} KT Thaibaan. ไม่ได้เป็นส่วนหนึ่งของ Mojang AB.
          </p>
          <p className="text-gray-700">
            Made with{" "}
            <span className="text-red-700/70">♥</span>{" "}
            for the community
          </p>
        </div>
      </div>

    </footer>
  );
}
