import Image from "next/image";
export default function Home() {
  return (
    <main className="min-h-screen bg-[#F7F4ED] text-[#10251E]">
      <header className="px-6 py-6 md:px-16">
  <div className="mx-auto max-w-7xl flex items-center justify-between">
    <Image
      src="/oxy-logo.png"
      alt="The OXY Brief Logo"
      width={220}
      height={80}
      className="h-auto w-40 md:w-56"
      priority
    />

    <a
      href="#contact"
      className="rounded-full border border-[#10251E]/20 bg-white px-6 py-3 text-sm font-semibold hover:bg-[#EFEADF]"
    >
      Collaborate
    </a>
  </div>
</header>
      {/* HERO */}
      <section className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Observe → Translate → Yield
            </p>

            <h1 className="max-w-6xl text-6xl font-black leading-none tracking-tight md:text-8xl">
              THE OXY BRIEF
            </h1>

            <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-[#43524B]">
              Translating sustainability into financial performance.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-[#53645D]">
              A sustainability intelligence platform helping businesses, youth, and leaders
              understand ESG beyond reports — through cost, risk, capital, margins, and measurable value.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#oxy-model"
                className="rounded-full bg-[#10251E] px-8 py-4 text-center font-semibold text-white hover:bg-[#1D3A30]"
              >
                Explore The OXY Model
              </a>

              <a
                href="#contact"
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

      {/* ABOUT */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              About
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              ESG should not stop at reports.
            </h2>
          </div>

          <div className="text-lg leading-8 text-[#53645D]">
            <p>
              The OXY Brief is built on one core belief: sustainability becomes powerful
              when it connects to business performance.
            </p>

            <p className="mt-5">
              We translate sustainability into financial, operational, and strategic relevance —
              helping audiences understand how ESG affects cost, risk, capital, margins,
              procurement, infrastructure, and long-term resilience.
            </p>
          </div>
        </div>
      </section>

      {/* OXY MODEL */}
      <section id="oxy-model" className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
            The OXY Model
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            Observe. Translate. Yield.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EDDF] text-2xl font-bold text-[#2F6B3F]">
                O
              </div>
              <h3 className="text-3xl font-bold">Observe</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                Identify inefficiencies, emissions, operational waste, resource pressure,
                and sustainability gaps that others overlook.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EDDF] text-2xl font-bold text-[#2F6B3F]">
                X
              </div>
              <h3 className="text-3xl font-bold">Translate</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                Convert ESG into business language: cost, margin, capital, risk,
                valuation, procurement, and operational efficiency.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-sm">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#E4EDDF] text-2xl font-bold text-[#2F6B3F]">
                Y
              </div>
              <h3 className="text-3xl font-bold">Yield</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                Generate measurable outcomes: lower costs, stronger resilience,
                better decisions, and sustainability that performs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OXY INSIGHT */}
      <section className="px-6 py-16 md:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#10251E] p-10 text-white md:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
            OXY Insight
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
            ESG that does not impact the P&L eventually becomes noise.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
            The future of ESG is not more reporting. It is sustainability embedded
            into operations, strategy, finance, and decision-making.
          </p>
        </div>
      </section>

      {/* OFFERINGS */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
            What We Do
          </p>

          <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-5xl">
            A platform for ESG that performs.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] border border-[#10251E]/10 bg-white p-8">
              <h3 className="text-2xl font-bold">The OXY Brief</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                Executive sustainability insights connecting ESG to business performance.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#10251E]/10 bg-white p-8">
              <h3 className="text-2xl font-bold">OXY 60</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                60-second sustainability intelligence for leaders, youth, and modern audiences.
              </p>
            </div>

            <div className="rounded-[2rem] border border-[#10251E]/10 bg-white p-8">
              <h3 className="text-2xl font-bold">OXY Explains</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                Visual breakdowns simplifying ESG, decarbonisation, circular economy,
                and sustainability strategy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
            Insights
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Latest OXY Thinking
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Aviation
              </p>
              <h3 className="mt-4 text-2xl font-bold">
                Fuel efficiency is not just environmental. It is financial.
              </h3>
              <p className="mt-5 leading-7 text-[#53645D]">
                Applying the OXY Model to aviation decarbonisation and margin protection.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                ESG Strategy
              </p>
              <h3 className="mt-4 text-2xl font-bold">
                ESG is not working. Here is why.
              </h3>
              <p className="mt-5 leading-7 text-[#53645D]">
                Reports do not drive decisions. Financial translation does.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Procurement
              </p>
              <h3 className="mt-4 text-2xl font-bold">
                Waste is not just environmental loss.
              </h3>
              <p className="mt-5 leading-7 text-[#53645D]">
                It is financial leakage hidden inside operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-white p-10 shadow-sm md:grid-cols-2 md:p-16">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              Founder
            </p>

            <h2 className="mt-4 text-4xl font-bold md:text-5xl">
              Tooba Fateh
            </h2>

            <p className="mt-6 text-lg leading-8 text-[#53645D]">
              ESG and Sustainability Advisor, Cambridge University certified Circular Economy
              specialist, and founder of The OXY Brief.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#53645D]">
              Tooba is building The OXY Brief to help businesses and young leaders understand
              sustainability through performance, finance, systems thinking, and real-world impact.
            </p>
          </div>

          <div className="rounded-[2rem] bg-[#10251E] p-10 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
              Positioning
            </p>
            <h3 className="mt-4 text-4xl font-bold leading-tight">
              Sustainability is the why. Performance is the how.
            </h3>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
            Collaborate
          </p>

          <h2 className="mt-4 text-4xl font-bold md:text-6xl">
            Bring sustainability stories to life.
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#53645D]">
            For collaborations, OXY 60 On Location, youth sustainability initiatives,
            speaking, ESG storytelling, and strategic partnerships.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@theoxybrief.com"
              className="rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
            >
              Email The OXY Brief
            </a>

            <a
              href="https://www.linkedin.com"
              className="rounded-full border border-[#10251E]/20 bg-white px-8 py-4 font-semibold hover:bg-[#EFEADF]"
            >
              LinkedIn
            </a>
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