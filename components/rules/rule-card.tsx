import Link from "next/link";
import type { RuleMeta } from "@/lib/rules";
import { ChevronRight } from "lucide-react";

interface RuleCardProps {
  rule: RuleMeta;
}

export function RuleCard({ rule }: RuleCardProps) {
  return (
    <Link
      href={`/rules/${rule.slug}`}
      className="group flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-[#1b1b1b] border border-white/5 hover:border-[#55AD38]/50 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Icon */}
      <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#111] border border-white/5 flex items-center justify-center text-2xl sm:text-3xl group-hover:border-[#55AD38]/30 transition-colors">
        {rule.icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFAA00] transition-colors mb-1 truncate">
          {rule.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-2">
          {rule.description}
        </p>
      </div>

      {/* Arrow */}
      <ChevronRight className="shrink-0 w-5 h-5 text-gray-600 group-hover:text-[#55AD38] group-hover:translate-x-1 transition-all mt-1" />
    </Link>
  );
}
