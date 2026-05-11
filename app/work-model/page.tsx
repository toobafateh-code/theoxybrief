export default function WorkModelPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          The OXY Ecosystem
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          A unified sustainability intelligence platform.
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          The OXY Brief, OXY 60, OXY Explains, and The OXY Model work together
          to translate sustainability into measurable business performance.
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
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
              60-second sustainability intelligence for leaders, youth, and
              modern audiences.
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
      </section>
    </main>
  );
}