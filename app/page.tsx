import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] text-[#10251E]">
      {/* HEADER */}
      <header className="px-6 pt-6 md:px-16 md:pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          <a href="/">
            <Image
              src="/oxy-logo.png"
              alt="The OXY Brief"
              width={180}
              height={70}
              className="h-auto w-32 md:w-40"
              priority
            />
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold text-[#10251E] md:gap-12 md:text-xl">
            <a href="/about" className="hover:text-[#3D6B4F] transition-colors">
              About
            </a>

            <a
              href="/work-model"
              className="hover:text-[#3D6B4F] transition-colors"
            >
              Our Work Model
            </a>

            <a
              href="/services"
              className="hover:text-[#3D6B4F] transition-colors"
            >
              Services
            </a>

            <a
              href="/knowledge-hub"
              className="hover:text-[#3D6B4F] transition-colors"
            >
              Knowledge Hub
            </a>

            <a
              href="/insights"
              className="hover:text-[#3D6B4F] transition-colors"
            >
              Insights
            </a>

            <a
              href="/contact"
              className="hover:text-[#3D6B4F] transition-colors"
            >
              Contact Us
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pb-20 pt-8 md:px-16 md:pb-28 md:pt-10">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Observe → Translate → Yield
            </p>

            <h1 className="text-5xl font-bold leading-none tracking-tight md:text-7xl">
              THE OXY BRIEF
            </h1>

            <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-[#43524B]">
              Translating sustainability into financial performance.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-[#53645D]">
              A sustainability intelligence platform helping businesses, youth,
              and leaders understand ESG beyond reports — through cost, risk,
              capital, margins, and measurable value.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="/work-model"
                className="rounded-full bg-[#10251E] px-8 py-4 text-center font-semibold text-white hover:bg-[#1D3A30]"
              >
                Explore The OXY Model
              </a>

              <a
                href="/contact"
                className="rounded-full border border-[#10251E]/20 bg-white px-8 py-4 text-center font-semibold hover:bg-[#EFEADF]"
              >
                Collaborate
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/tooba.png"
              alt="Tooba Fateh"
              className="w-full max-w-xl rounded-[2rem] object-cover shadow-2xl"
            />

            <p className="mt-4 text-lg text-[#355c4d]">
              Tooba Fateh — Founder, The OXY Brief
            </p>
          </div>
        </div>
      </section>

      {/* OXY INSIGHT */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#10251E] p-10 text-white md:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
            OXY Insight
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
            ESG that does not impact the P&amp;L eventually becomes noise.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
            The future of ESG is not more reporting. It is sustainability
            embedded into operations, strategy, finance, and decision-making.
          </p>
        </div>
      </section>

      {/* PODCAST */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto items-center gap-12 md:grid md:max-w-7xl md:grid-cols-2">
          <div>
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Podcast
            </p>

            <h2 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
              Real conversations on sustainability, finance &amp; impact.
            </h2>

            <p className="mt-6 text-xl leading-9 text-[#53645D]">
              Hosted by Tooba Fateh, The OXY Brief Podcast features
              conversations with leaders, experts, and innovators shaping the
              future of sustainability.
            </p>

            <p className="mt-6 text-xl leading-9 text-[#53645D]">
              Topics include ESG, sustainable finance, decarbonisation, climate
              strategy, circular economy, and business performance.
            </p>
          </div>

          <div className="mt-10 md:mt-0">
            <img
              src="/oxy-podcast.jpg"
              alt="The OXY Brief Podcast"
              className="mx-auto w-full max-w-md rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* QUICK LINKS */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            Explore
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Navigate the full OXY ecosystem.
          </h2>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                title: "About",
                description:
                  "Understand the mission and philosophy behind The OXY Brief.",
                href: "/about",
              },
              {
                title: "Services",
                description:
                  "Explore advisory offerings that connect sustainability to financial outcomes.",
                href: "/services",
              },
              {
                title: "Knowledge Hub",
                description:
                  "Access articles, videos, and explainers from The OXY Brief.",
                href: "/knowledge-hub",
              },
              {
                title: "Our Work Model",
                description:
                  "See how The OXY Model translates sustainability into performance.",
                href: "/work-model",
              },
              {
                title: "Insights",
                description:
                  "Read practical sustainability intelligence and strategic perspectives.",
                href: "/insights",
              },
              {
                title: "Contact Us",
                description:
                  "Get in touch for advisory work, collaborations, and speaking engagements.",
                href: "/contact",
              },
            ].map((item) => (
              <a
                key={item.title}
                href={item.href}
                className="rounded-[2rem] bg-white p-8 text-left shadow-sm transition-transform hover:-translate-y-1"
              >
                <h3 className="text-3xl font-bold">{item.title}</h3>
                <p className="mt-4 leading-8 text-[#53645D]">
                  {item.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#10251E]/10 px-6 py-8 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#53645D] md:flex-row">
          <p>© The OXY Brief. All rights reserved.</p>
          <p>Observe → Translate → Yield</p>
        </div>
      </footer>
    </main>
  );
}
