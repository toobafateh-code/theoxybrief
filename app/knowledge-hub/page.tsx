export default function KnowledgeHubPage() {
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
          <source src="/knowledge-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#10251E]/60" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#B9D2B1]">
            Knowledge Hub
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Explore The OXY Brief intelligence hub.
          </h1>

          <p className="mx-auto mt-8 max-w-4xl text-xl leading-9 text-white/85">
            Articles, videos, and visual explainers translating sustainability
            into practical business insight.
          </p>
        </div>
      </section>

      {/* CONTENT CARDS */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                label: "Articles",
                title: "The OXY Brief",
                button: "Read on LinkedIn",
                items: [
                  "Beyond ESG: Energy, Risk, and Capital",
                  "Brewing Sustainability: When The Straw Was Once Coffee",
                  "A Day in the Life of a Sustainability Professional",
                  "Driving Impact Through ESG & Sustainability",
                ],
              },
              {
                label: "Videos",
                title: "OXY 60",
                button: "Watch on LinkedIn",
                items: [
                  "ESG should influence cost, margin, and capital",
                  "Converting ESG reports into financial statements",
                  "Sustainability intelligence in one minute",
                ],
              },
              {
                label: "Carousels",
                title: "OXY Explains",
                button: "View on LinkedIn",
                items: [
                  "ESG is not about disclosures. It is about decisions.",
                  "Decarbonisation explained through business value",
                  "Circular economy simplified",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                className="flex min-h-[430px] flex-col rounded-[2rem] bg-white p-8 text-left shadow-sm"
              >
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
                  {card.label}
                </p>

                <h2 className="mt-4 text-3xl font-bold">{card.title}</h2>

                <ul className="mt-6 space-y-3 leading-7 text-[#53645D]">
                  {card.items.map((item) => (
                    <li key={item}>
                      <a
                        href="https://www.linkedin.com/company/the-oxy-brief/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#3D6B4F] hover:underline"
                      >
                        • {item}
                      </a>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://www.linkedin.com/company/the-oxy-brief/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-block rounded-full bg-[#10251E] px-6 py-3 text-center font-semibold text-white hover:bg-[#1D3A30]"
                >
                  {card.button}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}