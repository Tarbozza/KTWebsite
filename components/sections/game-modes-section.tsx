"use client";

import Image from "next/image";
import { Check } from "lucide-react";

const SERVER_IP = "kt-thaiban.online";

const GAME_FEATURES = [
  "ระบบสกิลและการอัปเลเวล",
  "บอสโลกเกิดทุก 4 ชั่วโมง",
  "พื้นที่โพรเทคบ้านฟรี",
  "รองรับเวอร์ชั่น 1.16 - 1.20+",
];

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    alert("คัดลอก IP แล้ว: " + text);
  } catch {
    alert("กรุณาคัดลอก IP ด้วยตนเอง: " + text);
  }
}

function FeatureList() {
  return (
    <ul className="space-y-3">
      {GAME_FEATURES.map((feature) => (
        <li key={feature} className="flex items-center gap-3 text-gray-300">
          <Check className="w-5 h-5 text-mc-green shrink-0" aria-hidden="true" />
          <span className="text-sm sm:text-base">{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export function GameModesSection() {
  return (
    <section className="py-16 sm:py-20 bg-[#151515] border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">

          {/* Image */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-[#2a2a2a] rotate-0 sm:rotate-2 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/images/minecraft-hero.jpg"
                alt="Minecraft Gameplay"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-linear-to-t from-black to-transparent p-4 sm:p-6">
                <span className="text-mc-gold font-mono text-lg sm:text-xl">
                  SEASON 5
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  อัปเดตใหม่ล่าสุด!
                </h3>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-1/2 space-y-5 sm:space-y-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-mono font-bold text-white leading-snug">
              โหมดเอาชีวิตรอด{" "}
              <span className="text-mc-green">MMO RPG</span>
            </h2>

            <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed">
              ไม่ใช่แค่การขุดดินและสร้างบ้าน แต่คุณจะได้ผจญภัยไปในดันเจี้ยน
              ล่าบอส คราฟต์อาวุธระดับตำนาน และสร้างกิลด์เพื่อครองเซิร์ฟเวอร์
            </p>

            <FeatureList />

            <button
              onClick={() => copyToClipboard(SERVER_IP)}
              className="mt-2 px-6 py-3 border-2 border-mc-green text-mc-green hover:bg-mc-green hover:text-white transition-all rounded font-bold uppercase tracking-wider text-sm sm:text-base"
            >
              เข้าร่วมเลย
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
