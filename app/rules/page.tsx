import type { Metadata } from "next";
import Link from "next/link";
import { getAllRules } from "@/lib/rules";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RuleCard } from "@/components/rules/rule-card";
import { ChevronRight, ScrollText } from "lucide-react";

export const metadata: Metadata = {
  title: "กฏหมู่บ้าน | KT Thaibaan",
  description: "กฎระเบียบและข้อบังคับของเซิร์ฟเวอร์ KT Thaibaan อ่านและปฏิบัติตามเพื่อประสบการณ์ที่ดีของทุกคน",
};

export default function RulesPage() {
  const rules = getAllRules();

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-14">
        {/* Hero banner */}
        <section className="relative py-8 sm:py-12 bg-[#111] border-b border-white/5 overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(85,173,56,0.12),transparent_60%)] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-6" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-[#55AD38] transition-colors">
                หน้าแรก
              </Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-300">กฏหมู่บ้าน</span>
            </nav>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#55AD38]/10 border border-[#55AD38]/20 flex items-center justify-center shrink-0">
                <ScrollText className="w-6 h-6 sm:w-7 sm:h-7 text-[#55AD38]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-sans font-bold text-white">
                  กฏหมู่บ้าน
                </h1>
                <p className="text-gray-400 text-sm sm:text-base mt-0.5">
                  KT Thaibaan — อ่านและปฏิบัติตามเพื่อสังคมที่ดีของทุกคน
                </p>
              </div>
            </div>

            {/* Stats bar */}
            <div className="flex flex-wrap items-center gap-3 mt-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                <span className="w-2 h-2 rounded-full bg-[#55AD38]" />
                {rules.length} หมวดหมู่
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                อัปเดตล่าสุด: Season 5
              </span>
            </div>
          </div>
        </section>

        {/* Rules grid */}
        <section className="container mx-auto px-4 py-10 sm:py-14">
          {rules.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-lg">ยังไม่มีกฎในขณะนี้</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-500 mb-6">
                เลือกหมวดหมู่เพื่ออ่านรายละเอียด
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {rules.map((rule) => (
                  <RuleCard key={rule.slug} rule={rule} />
                ))}
              </div>
            </>
          )}

          {/* Notice banner */}
          <div className="mt-10 sm:mt-14 p-5 sm:p-6 rounded-2xl bg-[#FFAA00]/5 border border-[#FFAA00]/20">
            <p className="text-[#FFAA00] font-semibold mb-1 text-sm sm:text-base">
              ⚠️ หมายเหตุสำคัญ
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              การเข้าร่วมเซิร์ฟเวอร์ถือว่าคุณได้อ่านและยอมรับกฎทั้งหมดแล้ว
              ทีมงานมีสิทธิ์แก้ไขกฎได้ตลอดเวลา และจะแจ้งให้ทราบล่วงหน้าผ่าน Discord
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
