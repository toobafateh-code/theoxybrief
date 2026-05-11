export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-7xl text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          Services
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
          Sustainability advisory designed for financial outcomes.
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          We help organizations connect sustainability strategy to margin
          expansion, revenue growth, access to capital, and enterprise value
          protection.
        </p>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {[
            {
              number: "01",
              title: "Cost Efficiency",
              subtitle: "Margin Expansion",
              services: [
                "Energy efficiency & decarbonization ROI modeling",
                "Supply chain optimization: waste, logistics, packaging",
                "Resource efficiency: water and materials",
                "Carbon pricing exposure modeling",
                "ESG-driven operational audits",
              ],
              outputs: [
                "Cost savings models",
                "Payback periods",
                "EBITDA uplift projections",
              ],
            },
            {
              number: "02",
              title: "Revenue Upside",
              subtitle: "Top-Line Growth",
              services: [
                "Sustainable product strategy",
                "ESG-led market entry strategy",
                "Customer willingness-to-pay analysis",
                "Green premium pricing strategy",
                "ESG branding & positioning advisory",
              ],
              outputs: [
                "Revenue growth scenarios",
                "Pricing strategy decks",
                "Customer segmentation insights",
              ],
            },
            {
              number: "03",
              title: "Access to Capital",
              subtitle: "Financing Advantage",
              services: [
                "ESG rating improvement strategy",
                "Sustainable finance readiness: green bonds, SL loans",
                "Investor ESG narrative building",
                "ESG due diligence prep for M&A or fundraising",
                "Climate risk disclosures: TCFD/ISSB aligned",
              ],
              outputs: [
                "Cost of capital reduction scenarios",
                "Investor-ready ESG story",
                "Rating uplift roadmap",
              ],
            },
            {
              number: "04",
              title: "Risk & Valuation",
              subtitle: "Enterprise Value Protection",
              services: [
                "Climate risk scenario analysis",
                "Supply chain risk mapping",
                "Regulatory risk tracking",
                "ESG controversy & reputation risk modeling",
                "Double materiality assessments",
              ],
              outputs: [
                "Risk-adjusted valuation models",
                "Scenario analysis dashboards",
                "Board-level risk insights",
              ],
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] bg-white p-10 text-left shadow-sm"
            >
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                {item.number}
              </p>

              <h2 className="mt-4 text-4xl font-bold">{item.title}</h2>
              <p className="mt-2 text-xl text-[#53645D]">{item.subtitle}</p>

              <h3 className="mt-8 text-lg font-bold">Services</h3>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                {item.services.map((service) => (
                  <li key={service}>• {service}</li>
                ))}
              </ul>

              <h3 className="mt-8 text-lg font-bold">Outputs</h3>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                {item.outputs.map((output) => (
                  <li key={output}>• {output}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}