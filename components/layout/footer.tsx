import Link from "next/link";
import { DiscordIcon } from "@/components/shared/discord-icon";

const QUICK_LINKS = [
  { label: "หน้าแรก", href: "#home" },
  { label: "เติมเงิน", href: "#store" },
  { label: "กฎระเบียบ", href: "#" },
  { label: "ติดต่อทีมงาน", href: "#" },
];

const SERVER_STATUS = [
  { label: "Server", status: "Online" },
  { label: "Web Store", status: "Online" },
];

const SERVER_IP = "kt-thaiban.online";

function FacebookIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "#",
    icon: <FacebookIcon />,
    hoverBg: "hover:bg-[#55AD38]",
  },
  {
    label: "Discord",
    href: "#",
    icon: <DiscordIcon className="w-5 h-5" />,
    hoverBg: "hover:bg-[#5865F2]",
  },
  {
    label: "YouTube",
    href: "#",
    icon: <YouTubeIcon />,
    hoverBg: "hover:bg-red-600",
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-gray-500 pt-12 pb-6 border-t border-white/10">
      <div className="container mx-auto px-4">

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand — full width on mobile, 2 cols on md */}
          <div className="col-span-2">
            <h3 className="text-xl sm:text-2xl font-mono text-white mb-3">
              KT Thaiban
            </h3>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              เซิร์ฟเวอร์มายคราฟคุณภาพสังคมดี เปิดให้บริการมายาวนาน
              มุ่งเน้นความสนุกและความยุติธรรมสำหรับผู้เล่นทุกคน
            </p>

            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded bg-[#2a2a2a] flex items-center justify-center ${social.hoverBg} hover:text-white transition-colors text-gray-400`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm sm:text-base">
              เมนูลัด
            </h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="hover:text-[#55AD38] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Server status */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm sm:text-base">
              สถานะ
            </h4>
            <ul className="space-y-2.5 text-sm">
              {SERVER_STATUS.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 shrink-0" />
                  <span>
                    {item.label}:{" "}
                    <span className="text-green-400">{item.status}</span>
                  </span>
                </li>
              ))}
              <li className="text-xs text-gray-600 pt-1">IP: {SERVER_IP}</li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-6 text-center text-xs text-gray-600">
          <p>&copy; 2024 KT Thaiban. Not affiliated with Mojang AB.</p>
        </div>

      </div>
    </footer>
  );
}
