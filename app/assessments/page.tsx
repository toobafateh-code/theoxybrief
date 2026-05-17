import Link from "next/link";

export default function AssessmentsPage() {
  const assessments = [
    {
      title: "Real Estate ESG Value Assessment",
      description:
        "Discover how sustainability can increase NOI and property value.",
      href: "/assessments/real-estate",
    },
    {
      title: "Construction Sustainability ROI Assessment",
      description:
        "Identify opportunities to reduce costs and strengthen bid competitiveness.",
      href: "#",
    },
    {
      title: "Tourism & Hospitality Sustainability Assessment",
      description:
        "Unlock cost savings and stronger guest appeal through sustainability.",
      href: "#",
    },
    {
      title: "Agriculture Climate Profitability Assessment",
      description:
        "Improve yields, reduce resource costs, and build climate resilience.",
      href: "#",
    },
  ];

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          ESG Value Assessments
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Quantify the financial benefits of ESG.
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          Choose your industry and receive a personalized assessment identifying
          opportunities to reduce costs, grow revenue, improve access to
          capital, and protect enterprise value.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {assessments.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="rounded-[2rem] bg-white p-10 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h2 className="text-3xl font-bold">{item.title}</h2>
              <p className="mt-4 leading-8 text-[#53645D]">
                {item.description}
              </p>
              <p className="mt-6 font-semibold text-[#3D6B4F]">
                Start Assessment →
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}