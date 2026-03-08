import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllRules, getAllRuleSlugs, getRuleBySlug } from "@/lib/rules";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RuleSidebar } from "@/components/rules/rule-sidebar";
import { MarkdownRenderer } from "@/components/shared/markdown-renderer";
import { ChevronRight, ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllRuleSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);
  if (!rule) return {};

  return {
    title: `${rule.title} | กฏหมู่บ้าน KT Thaibaan`,
    description: rule.description,
  };
}

export default async function RuleDetailPage({ params }: Props) {
  const { slug } = await params;
  const rule = getRuleBySlug(slug);

  if (!rule) notFound();

  const allRules = getAllRules();

  // Prev / Next navigation
  const currentIndex = allRules.findIndex((r) => r.slug === slug);
  const prevRule = currentIndex > 0 ? allRules[currentIndex - 1] : null;
  const nextRule = currentIndex < allRules.length - 1 ? allRules[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#1C1C1C] flex flex-col">
      <Navbar />

      <main className="flex-1 pt-14">
        {/* Page header */}
        <section className="relative py-8 sm:py-12 bg-[#111] border-b border-white/5 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(85,173,56,0.10),transparent_60%)] pointer-events-none" />

          <div className="container mx-auto px-4 relative z-10">
            {/* Breadcrumb */}
            <nav
              className="flex items-center gap-1.5 text-xs text-gray-500 mb-5 flex-wrap"
              aria-label="Breadcrumb"
            >
              <Link href="/" className="hover:text-[#55AD38] transition-colors">
                หน้าแรก
              </Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <Link href="/rules" className="hover:text-[#55AD38] transition-colors">
                กฏหมู่บ้าน
              </Link>
              <ChevronRight className="w-3 h-3 shrink-0" />
              <span className="text-gray-300 truncate max-w-[160px] sm:max-w-none">
                {rule.title}
              </span>
            </nav>

            {/* Title row */}
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[#1b1b1b] border border-white/10 flex items-center justify-center text-2xl sm:text-3xl">
                {rule.icon}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-sans font-bold text-white leading-tight">
                  {rule.title}
                </h1>
                <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">
                  {rule.description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Content area */}
        <div className="container mx-auto px-4 py-8 sm:py-12">
          <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

            {/* ── Sidebar (desktop: sticky left column) ── */}
            <aside className="lg:w-56 xl:w-64 shrink-0">
              {/* Mobile: horizontal pill list */}
              <div className="lg:hidden mb-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
                  หมวดหมู่กฎ
                </p>
                <div className="flex flex-wrap gap-2">
                  {allRules.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/rules/${r.slug}`}
                      className={`
                        inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                        ${r.slug === slug
                          ? "bg-[#55AD38]/15 text-[#55AD38] border-[#55AD38]/30"
                          : "text-gray-400 border-white/10 hover:border-white/20 hover:text-white"
                        }
                      `}
                    >
                      <span>{r.icon}</span>
                      {r.title}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Desktop: sticky sidebar */}
              <div className="hidden lg:block sticky top-24">
                <div className="bg-[#161616] border border-white/5 rounded-xl p-4">
                  <RuleSidebar rules={allRules} />
                </div>

                {/* Back button */}
                <Link
                  href="/rules"
                  className="mt-4 flex items-center gap-2 text-sm text-gray-500 hover:text-[#55AD38] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  ดูทั้งหมด
                </Link>
              </div>
            </aside>

            {/* ── Main content ── */}
            <article className="flex-1 min-w-0">
              {/* Markdown body */}
              <div className="bg-[#161616] border border-white/5 rounded-2xl p-5 sm:p-8">
                <MarkdownRenderer content={rule.content} />
              </div>

              {/* Prev / Next navigation */}
              <nav
                className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
                aria-label="Rule navigation"
              >
                {prevRule ? (
                  <Link
                    href={`/rules/${prevRule.slug}`}
                    className="group flex items-center gap-3 p-4 rounded-xl bg-[#161616] border border-white/5 hover:border-[#55AD38]/40 transition-all"
                  >
                    <ArrowLeft className="w-4 h-4 text-gray-500 group-hover:text-[#55AD38] shrink-0 transition-colors" />
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">ก่อนหน้า</p>
                      <p className="text-sm font-medium text-gray-300 group-hover:text-white truncate transition-colors">
                        {prevRule.icon} {prevRule.title}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div />
                )}

                {nextRule ? (
                  <Link
                    href={`/rules/${nextRule.slug}`}
                    className="group flex items-center justify-end gap-3 p-4 rounded-xl bg-[#161616] border border-white/5 hover:border-[#55AD38]/40 transition-all sm:col-start-2 text-right"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 mb-0.5">ถัดไป</p>
                      <p className="text-sm font-medium text-gray-300 group-hover:text-white truncate transition-colors">
                        {nextRule.icon} {nextRule.title}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-500 group-hover:text-[#55AD38] shrink-0 transition-colors" />
                  </Link>
                ) : (
                  <div />
                )}
              </nav>

              {/* Back to list (mobile) */}
              <div className="mt-6 lg:hidden">
                <Link
                  href="/rules"
                  className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#55AD38] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  กลับไปหน้ากฏหมู่บ้าน
                </Link>
              </div>
            </article>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
