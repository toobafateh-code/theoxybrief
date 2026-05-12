export default function InsightsPage() {
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
          <source src="/insights-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#10251E]/65" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#B9D2B1]">
            Insights
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Latest OXY Thinking
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/85">
            Practical sustainability intelligence for decisions that affect
            cost, capital, risk, and growth.
          </p>
        </div>
      </section>

      {/* INSIGHT CARDS */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 text-left md:grid-cols-3">
            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Aviation
              </p>

              <h2 className="mt-4 text-2xl font-bold">
                Fuel efficiency is not just environmental. It is financial.
              </h2>

              <p className="mt-5 leading-7 text-[#53645D]">
                Applying The OXY Model to aviation decarbonisation and margin
                protection.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                ESG Strategy
              </p>

              <h2 className="mt-4 text-2xl font-bold">
                ESG is not working. Here is why.
              </h2>

              <p className="mt-5 leading-7 text-[#53645D]">
                Reports do not drive decisions. Financial translation does.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Procurement
              </p>

              <h2 className="mt-4 text-2xl font-bold">
                Waste is not just environmental loss.
              </h2>

              <p className="mt-5 leading-7 text-[#53645D]">
                It is financial leakage hidden inside operations.
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}