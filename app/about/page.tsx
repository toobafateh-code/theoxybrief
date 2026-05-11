export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-6xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          About
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          ESG should not stop at reports.
        </h1>

        <div className="mx-auto mt-10 max-w-4xl space-y-6 text-xl leading-9 text-[#53645D]">
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