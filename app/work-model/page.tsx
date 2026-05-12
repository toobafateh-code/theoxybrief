export default function WorkModelPage() {
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
          <source src="/work-model-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#10251E]/55" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#B9D2B1]">
            The OXY Ecosystem
          </p>

          <h1 className="mt-5 text-5xl font-bold leading-tight md:text-7xl">
            A unified sustainability intelligence platform.
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/85">
            The OXY Brief, OXY 60, OXY Explains, and The OXY Model work
            together to translate sustainability into measurable business
            performance.
          </p>
        </div>
      </section>

      {/* ECOSYSTEM CARDS */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <h2 className="text-4xl font-bold">The OXY Brief</h2>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                Executive sustainability insights connecting ESG to business
                performance.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <h2 className="text-4xl font-bold">OXY 60</h2>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
  60-second sustainability intelligence for leaders, youth, and decision-makers.
</p>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <h2 className="text-4xl font-bold">OXY Explains</h2>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                Visual breakdowns simplifying ESG, decarbonisation, circular
                economy, and sustainability strategy.
              </p>
            </div>
          </div>

          <div className="mt-14">
            <img
              src="/oxy-ecosystem.jpg"
              alt="The OXY Ecosystem"
              className="w-full rounded-[2rem] shadow-2xl"
            />
          </div>
        </div>
      </section>
    </main>
  );
}