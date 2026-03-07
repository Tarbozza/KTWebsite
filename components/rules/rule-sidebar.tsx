"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { RuleMeta } from "@/lib/rules";

interface RuleSidebarProps {
  rules: RuleMeta[];
}

export function RuleSidebar({ rules }: RuleSidebarProps) {
  const pathname = usePathname();

  return (
    <nav className="w-full">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3 px-1">
        หมวดหมู่กฎ
      </p>
      <ul className="space-y-1">
        {rules.map((rule) => {
          const href = `/rules/${rule.slug}`;
          const isActive = pathname === href;

          return (
            <li key={rule.slug}>
              <Link
                href={href}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-[#55AD38]/15 text-[#55AD38] border border-[#55AD38]/25"
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                  }
                `}
              >
                <span className="text-base leading-none">{rule.icon}</span>
                <span className="truncate">{rule.title}</span>
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#55AD38] shrink-0" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
