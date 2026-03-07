interface PromoBarProps {
  message?: string;
  code?: string;
  highlight?: string;
  href?: string;
}

export function PromoBar({
  message = "ลดสูงสุด 20% ทุกกล่องสุ่ม!",
  code = "KTFLASH20",
  highlight = "สิ้นสุดวันอาทิตย์นี้",
  href = "#store",
}: PromoBarProps) {
  return (
    <div className="w-full bg-gradient-to-r from-[#ff9a3c] via-[#ffb347] to-[#ff7a18] text-black shadow-lg">
      <div className="container mx-auto px-4 py-2 sm:py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm font-semibold">

        {/* Left: label + message + highlight */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1">
          <span className="px-2.5 py-0.5 rounded-full bg-black/10 text-xs uppercase tracking-wide whitespace-nowrap">
            Flash Sale
          </span>
          <span className="text-xs sm:text-sm drop-shadow-sm">{message}</span>
          <span className="flex items-center gap-1.5 text-black/70 text-xs">
            <span className="w-1 h-1 rounded-full bg-black/60" />
            {highlight}
          </span>
        </div>

        {/* Right: promo code CTA */}
        <a
          href={href}
          className="shrink-0 inline-flex items-center gap-1.5 bg-black/15 hover:bg-black/25 border border-black/10 text-black px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors whitespace-nowrap"
        >
          ใช้โค้ด <span className="font-bold">{code}</span>
        </a>

      </div>
    </div>
  );
}
