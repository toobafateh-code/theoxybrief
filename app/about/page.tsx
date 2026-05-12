export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] text-[#10251E]">
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

      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-5xl space-y-6 text-xl leading-9 text-[#53645D]">
          <p>
            The OXY Brief is built on one core belief: sustainability becomes
            powerful when it connects to business performance.
          </p>

          <p>
            We translate sustainability into financial, operational, and
            strategic relevance — helping audiences understand how ESG affects
            cost, risk, capital, margins, procurement, infrastructure, and
            long-term resilience.
          </p>
        </div>
      </section>
    </main>
  );
}