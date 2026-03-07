import { Crown, ShoppingCart, Tag, Zap } from "lucide-react";

interface Crate {
  name: string;
  rarity: string;
  price: number;
  salePrice: number;
  image: string;
  accent: string;
  tag: string;
}

const CRATES: Crate[] = [
  {
    name: "Legendary Crate",
    rarity: "ตำนาน",
    price: 24.99,
    salePrice: 17.49,
    image: "https://assets.originrealms.com/static/store/key-3.png",
    accent: "from-orange-500 to-amber-300",
    tag: "ลด 30%",
  },
  {
    name: "Rare Crate",
    rarity: "หายาก",
    price: 14.99,
    salePrice: 11.99,
    image: "https://assets.originrealms.com/static/store/key-2.png",
    accent: "from-blue-500 to-indigo-400",
    tag: "Hot",
  },
  {
    name: "Cosmetic Crate",
    rarity: "คอสเมติก",
    price: 9.99,
    salePrice: 7.99,
    image: "https://assets.originrealms.com/static/store/cosmo.png",
    accent: "from-pink-400 to-purple-400",
    tag: "ใหม่",
  },
  {
    name: "Gesture Crate",
    rarity: "อีโมต",
    price: 7.99,
    salePrice: 6.49,
    image: "https://assets.originrealms.com/static/store/jester.png",
    accent: "from-green-500 to-emerald-400",
    tag: "แนะนำ",
  },
];

function CrateCard({ crate }: { crate: Crate }) {
  return (
    <div className="group relative bg-gradient-to-b from-[#1b1b1b] to-[#101010] border border-white/5 rounded-2xl p-4 sm:p-5 overflow-hidden shadow-2xl card-hover">
      {/* Accent glow */}
      <div
        className={`absolute inset-x-0 -top-20 h-32 bg-gradient-to-b ${crate.accent} opacity-20 blur-2xl pointer-events-none`}
      />

      {/* Tag badge */}
      <div className="absolute right-3 top-3 sm:right-4 sm:top-4 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-white z-10">
        {crate.tag}
      </div>

      {/* Crate image */}
      <div
        className="relative w-full pb-[100%] rounded-xl bg-[#0f0f0f] border border-white/5 overflow-hidden shadow-inner"
        style={{
          backgroundImage: `url(${crate.image})`,
          backgroundSize: "70%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      {/* Info */}
      <div className="mt-4 sm:mt-5 space-y-2">
        <p className="text-xs uppercase tracking-[0.25em] text-gray-400">
          {crate.rarity}
        </p>
        <h3 className="text-lg sm:text-xl font-bold text-white">{crate.name}</h3>
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold text-[#FFAA00]">
            ${crate.salePrice.toFixed(2)}
          </span>
          <span className="text-gray-500 line-through text-sm">
            ${crate.price.toFixed(2)}
          </span>
        </div>
        <button className="w-full mt-3 py-2.5 rounded-lg bg-white/10 border border-white/10 text-white font-semibold hover:border-[#FFAA00] hover:text-[#FFAA00] transition-colors text-sm sm:text-base">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  );
}

export function StoreSection() {
  return (
    <section
      id="store"
      className="py-16 sm:py-20 bg-[#0c0c0c] relative overflow-hidden"
    >
      {/* Background radial glows */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,170,0,0.25),transparent_35%),radial-gradient(circle_at_80%_10%,rgba(85,173,56,0.2),transparent_30%),radial-gradient(circle_at_50%_80%,rgba(88,101,242,0.2),transparent_30%)] pointer-events-none" />

      <div className="container relative mx-auto px-4">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 mb-8 sm:mb-10">
          <div className="flex-1 space-y-3">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFAA00]/15 border border-[#FFAA00]/25 text-[#FFAA00] text-xs font-semibold uppercase tracking-[0.2em]">
              <Tag className="w-4 h-4" />
              Store Live
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white">
              เลือกกล่องที่ใช่สำหรับคุณ
            </h2>

            <p className="text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
              กล่องสุ่มทุกแบบจะให้ทั้งคอสเมติกและของใช้จริงในเกม
              เปิดลุ้นไอเทมระดับพรีเมียมและเก็บสะสมแต้มโบนัสเพื่อปลดล็อกของแถมพิเศษ
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Crown className="w-4 h-4 text-[#FFAA00] shrink-0" />
                <span>Rank & Cosmetics พร้อมส่งทันที</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
                <Zap className="w-4 h-4 text-[#55AD38] shrink-0" />
                <span>ระบบส่งของอัตโนมัติ</span>
              </div>
            </div>
          </div>

          {/* Open store CTA */}
          <a
            href="#"
            className="shrink-0 inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-[#FFAA00] to-[#ff7a18] text-black font-bold shadow-lg hover:-translate-y-0.5 transition-transform text-sm sm:text-base"
          >
            <ShoppingCart className="w-5 h-5" />
            เปิดร้านค้าเต็มรูปแบบ
          </a>
        </div>

        {/* Crate grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {CRATES.map((crate) => (
            <CrateCard key={crate.name} crate={crate} />
          ))}
        </div>

        {/* Support banner */}
        <div className="mt-8 sm:mt-10 max-w-4xl mx-auto text-center bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6">
          <p className="text-gray-200 text-base sm:text-lg font-semibold mb-2">
            สนับสนุนเซิร์ฟเวอร์ = รับของขวัญ
          </p>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            ทุกการซื้อจะช่วยให้ทีมพัฒนาต่อยอดคอนเทนต์ใหม่ ๆ
            และคุณจะได้รับโบนัสแต้ม KT Rewards เพื่อนำไปแลกของพิเศษในอนาคต
          </p>
        </div>
      </div>
    </section>
  );
}
