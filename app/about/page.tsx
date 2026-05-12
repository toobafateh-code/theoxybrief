export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] text-[#10251E]">
      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden px-6 py-24 text-white md:px-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/about-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#10251E]/70" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#B9D2B1]">
            About
          </p>

          <h1 className="mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            ESG should not stop at reports.
          </h1>

          <p className="mt-8 max-w-3xl text-xl leading-9 text-white/80">
            The OXY Brief translates sustainability into financial, operational,
            and strategic relevance.
          </p>
        </div>
      </section>

      {/* OUR BELIEF */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2">
          <div>
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Our Belief
            </p>

            <h2 className="mt-5 max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
              Sustainability becomes powerful when it connects to performance.
            </h2>
          </div>

          <div className="space-y-6 text-xl leading-9 text-[#53645D]">
            <p>
              The OXY Brief was created to close the gap between sustainability
              language and business decision-making. Too often, ESG is treated
              as a reporting exercise rather than a strategic tool.
            </p>

            <p>
              We believe sustainability should help organizations understand
              cost, capital, risk, growth, resilience, and long-term value — not
              simply produce more disclosures.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE TRANSLATE */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            What We Translate
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
            From ESG complexity to business clarity.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-8 text-left shadow-sm">
              <h3 className="text-3xl font-bold">Cost</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                We connect sustainability to operational efficiency, waste
                reduction, energy savings, and margin protection.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 text-left shadow-sm">
              <h3 className="text-3xl font-bold">Capital</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                We translate ESG into investor narratives, financing readiness,
                risk disclosures, and capital market relevance.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 text-left shadow-sm">
              <h3 className="text-3xl font-bold">Risk</h3>
              <p className="mt-5 leading-8 text-[#53645D]">
                We help audiences understand climate, regulatory, reputational,
                and supply chain risks through a business lens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-white p-10 shadow-sm md:p-16">
          <div className="text-center">
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Who We Help
            </p>

            <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
              Built for leaders, businesses, and young changemakers.
            </h2>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-bold">Organizations</h3>
              <p className="mt-4 leading-8 text-[#53645D]">
                Businesses seeking to connect sustainability strategy with
                operations, finance, risk, and measurable outcomes.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Leaders</h3>
              <p className="mt-4 leading-8 text-[#53645D]">
                Decision-makers who need ESG translated into practical business
                insight, not technical jargon.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">Youth</h3>
              <p className="mt-4 leading-8 text-[#53645D]">
                Emerging professionals and young changemakers learning how
                sustainability connects to real-world impact and careers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT EXISTS */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            Why The OXY Brief Exists
          </p>

          <h2 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Because sustainability needs translation before it can create value.
          </h2>

          <p className="mt-8 text-xl leading-9 text-[#53645D]">
            The OXY Brief exists to make sustainability more useful, measurable,
            and decision-ready. Through The OXY Model — Observe, Translate,
            Yield — we turn complex ESG themes into clear insights that support
            better choices, stronger organizations, and more resilient futures.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <a
              href="/services"
              className="rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
            >
              Explore Services
            </a>

            <a
              href="/contact"
              className="rounded-full border border-[#10251E]/20 bg-white px-8 py-4 font-semibold hover:bg-[#EFEADF]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}