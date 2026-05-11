export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          Insights
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          Latest OXY Thinking
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          Practical sustainability intelligence for decisions that affect cost,
          capital, risk, and growth.
        </p>

        <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
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
      </section>
    </main>
  );
}