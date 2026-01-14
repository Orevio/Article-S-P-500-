import React, { useEffect, useRef, useState } from "react";

const tocItems = [
  { id: "what-is", label: "What is the S&P 500?" },
  { id: "why-trade", label: "Why trade the S&P 500?" },
  { id: "popular", label: "What makes it so popular?" },
  { id: "your-way", label: "Trade your way" },
  { id: "first-trade", label: "How to open your first trade" },
  { id: "hours", label: "Trading hours" },
  { id: "pluses", label: "The Pluses with us" },
  { id: "takeaways", label: "Key takeaways" },
];

export default function MobileArticlePrototype() {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(tocItems[0].id);
  const sectionRefs = useRef({});

  const registerRef = (id) => (el) => {
    if (el) sectionRefs.current[id] = el;
  };

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = doc.scrollTop || document.body.scrollTop;
      const scrollHeight = doc.scrollHeight - doc.clientHeight;
      const p = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, p)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const targets = tocItems
      .map((t) => sectionRefs.current[t.id])
      .filter(Boolean);

    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        visible.sort(
          (a, b) =>
            Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top)
        );
        const best = visible[0];
        if (best?.target?.id) setActiveId(best.target.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.1, 0.25, 0.5],
      }
    );

    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[1000] h-2 bg-neutral-200/80 backdrop-blur">
        <div
          className="h-full bg-neutral-900 transition-[width] duration-75"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Page */}
      <main className="mx-auto w-full max-w-[420px] pb-24 pt-4">
        {/* HERO */}
        <section className="border-b border-neutral-200 px-4 py-4" id="top">
          <h1 className="text-[28px] font-bold leading-[1.15] tracking-[-0.02em]">
            How to trade the S&amp;P 500
          </h1>

          <div className="mt-2 flex flex-wrap gap-1 text-[13px] text-neutral-500">
            <span>Plus500 Experts Team</span>
            <span>•</span>
            <span>Updated: Jan 2026</span>
            <span>•</span>
            <span>5-min read</span>
          </div>

          <p className="mt-2 text-[16px] leading-[1.55] text-neutral-500">
            Find out everything you need to know about the S&amp;P 500 and gain a better
            understanding of how you can trade it with Plus500’s CFDs.
          </p>

          <button
            onClick={() => scrollTo("get-started")}
            className="mt-3 h-12 w-full rounded-[10px] bg-neutral-900 text-[16px] font-semibold text-white"
          >
            Try free demo
          </button>

          <button
            onClick={() => scrollTo("get-started")}
            className="mt-2 inline-flex items-center justify-center text-[16px] font-semibold"
          >
            Trade for real
          </button>
        </section>

        {/* TOC */}
        <details className="border-b border-neutral-200">
          <summary className="flex cursor-pointer items-center justify-between px-4 py-4 text-[16px] font-semibold">
            What you’ll learn
            <span className="ml-2 inline-block h-3 w-3 rotate-[-45deg] border-b-2 border-r-2 border-neutral-500 transition-transform group-open:rotate-45" />
          </summary>

          <ul className="px-4 pb-3">
            {tocItems.map((t, idx) => (
              <li
                key={t.id}
                className={`py-2 ${idx === 0 ? "" : "border-t border-neutral-200"}`}
              >
                <button
                  onClick={() => scrollTo(t.id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-lg py-1 text-left text-[15px] ${
                    activeId === t.id ? "font-extrabold" : "font-normal"
                  }`}
                >
                  <span>{t.label}</span>
                  <span
                    className={`h-2 w-2 rounded-full border ${
                      activeId === t.id
                        ? "border-neutral-900 bg-neutral-900"
                        : "border-neutral-200 bg-transparent"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </li>
            ))}
          </ul>
        </details>

        {/* WHAT IS */}
        <section
          id="what-is"
          ref={registerRef("what-is")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            What is the S&amp;P 500?
          </h2>
          <p className="mt-2 text-[16px] leading-[1.55]">
            The S&amp;P 500 is an Index that tracks the performance of 500 of the largest
            U.S. companies. It covers about 80% of the total market cap of U.S. equities
            and is often used to measure the performance of the entire American stock
            market.
          </p>
          <p className="mt-2 text-[16px] leading-[1.55] text-neutral-500">
            Companies like Alphabet (Google), Apple and NVIDIA are among those included in
            this popular Index.
          </p>
          <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-2 text-[13px]">
            ℹ️ Tracks 500 large US companies
          </span>
        </section>

        {/* WHY TRADE */}
        <section
          id="why-trade"
          ref={registerRef("why-trade")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            Why trade the S&amp;P 500?
          </h2>

          <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-100 p-4">
            <p className="font-semibold">🧺 Think of it like a basket of fruit.</p>
            <p className="mt-1 text-[16px] leading-[1.55] text-neutral-500">
              Instead of buying one apple (a single stock), you get a basket containing
              small pieces of 500 different fruits.
            </p>
            <ul className="mt-2 list-disc pl-5 text-[16px] leading-[1.55]">
              <li>If one fruit goes bad, the rest can stay fresh.</li>
              <li>If the whole farm has a great season, your basket goes up.</li>
              <li>You get exposure across sectors (Tech, Cars, Banking, and more).</li>
            </ul>
          </div>
        </section>

        {/* POPULAR */}
        <section
          id="popular"
          ref={registerRef("popular")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            What makes the S&amp;P 500 so popular?
          </h2>

          {[
            { icon: "🧩", title: "Diversity", desc: "Broad exposure across many companies and sectors." },
            { icon: "🛡", title: "Security", desc: "A committee reviews the Index and updates it over time." },
            { icon: "📈", title: "Historic performance", desc: "Long-term average returns are often cited around ~10% per year." },
          ].map((r) => (
            <div key={r.title} className="mt-3 flex gap-3">
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-neutral-100 text-[14px]">
                {r.icon}
              </div>
              <div>
                <div className="text-[16px] font-bold">{r.title}</div>
                <div className="mt-0.5 text-[14px] leading-[1.45] text-neutral-500">
                  {r.desc}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* YOUR WAY */}
        <section
          id="your-way"
          ref={registerRef("your-way")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4 pr-0"
        >
          <h2 className="pr-4 text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            Trade the S&amp;P 500 your way
          </h2>
          <p className="mt-2 pr-4 text-[16px] leading-[1.55] text-neutral-500">
            Choose the instrument that matches how you want exposure.
          </p>

          <div className="mt-2 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 [-webkit-overflow-scrolling:touch]">
            {[
              { title: "Index CFDs", desc: "Trade the daily price movements of the S&P 500." },
              { title: "Options CFDs", desc: "Speculate on reaching a certain price by a certain date (advanced)." },
              { title: "ETF CFDs (e.g. SPY)", desc: "Trade CFDs on popular funds that track the Index." },
            ].map((c) => (
              <div
                key={c.title}
                className="h-[120px] w-[240px] flex-none snap-start rounded-xl border border-neutral-200 bg-neutral-50 p-4"
              >
                <div className="font-extrabold">{c.title}</div>
                <div className="mt-1 text-[14px] leading-[1.45] text-neutral-500">
                  {c.desc}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FIRST TRADE */}
        <section
          id="first-trade"
          ref={registerRef("first-trade")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            How to open your first trade
          </h2>

          {[
            "Type S&P 500 into the search bar in the app.",
            "Analyse charts and tools to understand market sentiment.",
            "Select Buy or Sell based on your analysis.",
            "Set Stop Loss and Take Profit to manage risk.",
            "Choose trade size and confirm your trade.",
          ].map((s, i) => (
            <div key={s} className="mt-2 flex gap-3">
              <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full border border-neutral-200 bg-neutral-100 text-[13px] font-bold">
                {i + 1}
              </div>
              <div className="text-[16px] leading-[1.45]">{s}</div>
            </div>
          ))}

          <button
            onClick={() => scrollTo("get-started")}
            className="mt-4 h-12 w-full rounded-[10px] bg-neutral-900 text-[16px] font-semibold text-white"
          >
            Practise on demo
          </button>
        </section>

        {/* GET STARTED */}
        <section
          id="get-started"
          ref={registerRef("get-started")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <div className="rounded-2xl border border-neutral-200 bg-neutral-100 p-4">
            <div className="text-[18px] font-semibold">Begin your journey</div>

            <button className="mt-3 h-12 w-full rounded-[10px] border border-neutral-200 bg-white text-[16px] font-semibold">
              Open an account
            </button>
            <button className="mt-2 h-12 w-full rounded-[10px] bg-neutral-900 text-[16px] font-semibold text-white">
              Try free demo
            </button>
            <button className="mt-2 h-12 w-full rounded-[10px] border border-neutral-200 bg-white text-[16px] font-semibold">
              Trade for real
            </button>
          </div>
        </section>

        {/* HOURS */}
        <details
          id="hours"
          ref={registerRef("hours")}
          className="scroll-mt-8 border-b border-neutral-200"
        >
          <summary className="flex cursor-pointer items-center justify-between px-4 py-4 text-[16px] font-semibold">
            S&amp;P 500 trading hours
            <span className="ml-2 inline-block h-3 w-3 rotate-[-45deg] border-b-2 border-r-2 border-neutral-500 transition-transform group-open:rotate-45" />
          </summary>
          <div className="px-4 pb-4">
            <p className="text-[16px] leading-[1.55]">
              <span className="font-bold">Availability:</span> Typically from Sunday night through Friday night.
            </p>
            <p className="mt-2 text-[16px] leading-[1.55]">
              <span className="font-bold">Extended hours:</span> Continuous pricing can help manage positions during the work week.
            </p>
            <p className="mt-2 text-[16px] leading-[1.55] text-neutral-500">
              <span className="font-bold text-neutral-900">Holidays:</span> Hours can shift; always check the live schedule.
            </p>
          </div>
        </details>

        {/* PLUSES */}
        <section
          id="pluses"
          ref={registerRef("pluses")}
          className="scroll-mt-8 border-b border-neutral-200 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            The Pluses of trading with us
          </h2>

          {[
            "Fast and reliable order execution",
            "No commissions and tight spreads",
            "Advanced analytical tools",
            "Real-time quotes",
            "Fast and secure withdrawals",
          ].map((x) => (
            <div key={x} className="mt-2 flex gap-3">
              <div className="mt-0.5 flex h-[18px] w-[18px] flex-none items-center justify-center rounded-md border border-neutral-200 bg-neutral-100 text-[12px]">
                ✔
              </div>
              <div className="text-[16px] leading-[1.45]">{x}</div>
            </div>
          ))}

          <button
            onClick={() => scrollTo("get-started")}
            className="mt-4 h-12 w-full rounded-[10px] bg-neutral-900 text-[16px] font-semibold text-white"
          >
            Get started
          </button>
        </section>

        {/* TAKEAWAYS */}
        <section
          id="takeaways"
          ref={registerRef("takeaways")}
          className="scroll-mt-8 px-4 py-4"
        >
          <h2 className="text-[22px] font-semibold leading-[1.2] tracking-[-0.01em]">
            Key takeaways
          </h2>

          <div className="mt-2 rounded-xl border border-neutral-200 bg-neutral-50 p-4 shadow-sm">
            {[
              ["What it is:", "The S&P 500 tracks 500 of the largest U.S. companies."],
              ["Why trade it:", "Broad exposure across sectors can help spread risk."],
              ["Why it’s popular:", "Diversification, reviews, and long-term performance are key factors."],
              ["Ways to trade:", "Index CFDs, Options CFDs, or ETF CFDs (e.g., SPY)."],
              ["Availability:", "Usually Sunday through Friday; hours can vary on holidays."],
            ].map(([k, v], idx) => (
              <div key={k} className={`${idx === 0 ? "" : "border-t border-neutral-200"} py-2`}>
                <div className="text-[15px] leading-[1.5]">
                  <span className="font-extrabold">{k}</span> {v}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-[999] border-t border-neutral-200 bg-white shadow-[0_-6px_18px_rgba(17,17,17,0.08)]">
        <div className="mx-auto max-w-[420px] px-4 py-3">
          <button
            onClick={() => scrollTo("get-started")}
            className="h-12 w-full rounded-[10px] bg-neutral-900 text-[16px] font-semibold text-white"
          >
            Try free demo
          </button>
        </div>
      </div>
    </div>
  );
}
