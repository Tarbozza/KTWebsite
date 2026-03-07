import { Shield, Coins, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  borderHover: string;
  iconBgHover: string;
  iconColor: string;
}

const FEATURES: Feature[] = [
  {
    icon: Shield,
    title: "ระบบป้องกันโปร",
    description:
      "เล่นได้อย่างสบายใจด้วยระบบ Anti-Cheat ที่ทันสมัยที่สุด ทีมงานดูแลตลอด 24 ชั่วโมง ไม่มีผู้เล่นโกงแน่นอน",
    borderHover: "hover:border-[#55AD38]/50",
    iconBgHover: "group-hover:bg-[#55AD38]/20",
    iconColor: "text-[#55AD38]",
  },
  {
    icon: Coins,
    title: "เศรษฐกิจสมดุล",
    description:
      "ระบบตลาดผู้เล่นที่เสถียร หาเงินไม่ง่ายและไม่ยากเกินไป ของมีราคา และมีเควสให้ทำมากมายเพื่อแลกไอเทม",
    borderHover: "hover:border-[#FFAA00]/50",
    iconBgHover: "group-hover:bg-[#FFAA00]/20",
    iconColor: "text-[#FFAA00]",
  },
  {
    icon: Users,
    title: "สังคมคุณภาพ",
    description:
      "ชุมชนผู้เล่นที่เป็นมิตร มีกิจกรรม Guild War และกิจกรรมประจำสัปดาห์ แจกของรางวัลเพียบ",
    borderHover: "hover:border-[#3DE4FF]/50",
    iconBgHover: "group-hover:bg-[#3DE4FF]/20",
    iconColor: "text-[#3DE4FF]",
  },
];

function FeatureCard({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <div
      className={`
        group bg-[#2a2a2a] p-6 sm:p-8 rounded-xl
        border border-white/5 ${feature.borderHover}
        transition-all duration-300 card-hover
      `}
    >
      <div
        className={`
          w-14 h-14 sm:w-16 sm:h-16 bg-[#1C1C1C] rounded-lg
          flex items-center justify-center mb-5 sm:mb-6
          ${feature.iconBgHover} transition-colors
        `}
      >
        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${feature.iconColor}`} />
      </div>

      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 text-white">
        {feature.title}
      </h3>
      <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
        {feature.description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-20 bg-[#1C1C1C] relative">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono font-bold mb-4 text-[#3DE4FF]">
            ทำไมต้องเล่นที่นี่?
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-[#55AD38] mx-auto rounded-full" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
