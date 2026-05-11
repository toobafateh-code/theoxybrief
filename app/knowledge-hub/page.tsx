export default function KnowledgeHubPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          Knowledge Hub
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          Explore The OXY Brief intelligence hub.
        </h1>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
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
      </section>
    </main>
  );
}