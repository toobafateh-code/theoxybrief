"use client";

const initiatives = [
  {
    name: "Energy Efficiency Retrofits",
    priority: "Immediate",
    investment: "$160,000",
    annualSavings: "$37,500",
    roi: "23.4%",
    payback: "4.3 Years",
    timeline: "0–6 Months",
    owner: "Facilities + Sustainability",
    kpis: "Energy Intensity, Utility Cost Reduction",
  },
  {
    name: "Water Optimization",
    priority: "High",
    investment: "$80,000",
    annualSavings: "$8,000",
    roi: "10.0%",
    payback: "10.0 Years",
    timeline: "3–9 Months",
    owner: "Operations",
    kpis: "Water Intensity, Leakage Reduction",
  },
  {
    name: "Maintenance Optimization",
    priority: "Strategic",
    investment: "$160,000",
    annualSavings: "$30,000",
    roi: "18.8%",
    payback: "5.3 Years",
    timeline: "6–12 Months",
    owner: "Engineering + Asset Management",
    kpis: "Maintenance Cost per Sq Ft",
  },
];

export default function ImplementationIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY Implementation Intelligence™
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
            Real Estate ESG Implementation Roadmap
          </h1>

          <p className="mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            This roadmap translates identified opportunities into a
            structured execution plan, including capital allocation,
            timelines, responsibilities, KPIs, and expected value
            realization.
          </p>

                    {/* Executive Implementation Summary */}
          <Section
            title="Executive Implementation Summary"
            content="We identified three high-priority initiatives that can improve operating performance, enhance asset value, strengthen financing readiness, and reduce sustainability-related risks. The recommended implementation program is structured over a 12-month period to maximize returns while maintaining operational continuity."
          />

          {/* Initiative Prioritization Matrix */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              Initiative Prioritization Matrix
            </h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full rounded-3xl bg-[#ECFDF5] overflow-hidden">
                <thead className="bg-[#DDF5E7]">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">
                      Initiative
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Priority
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Investment
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Annual Savings
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      ROI
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Payback
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {initiatives.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-[#10251E]/10"
                    >
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4 font-semibold text-[#3D6B4F]">
                        {item.priority}
                      </td>
                      <td className="px-6 py-4">
                        {item.investment}
                      </td>
                      <td className="px-6 py-4">
                        {item.annualSavings}
                      </td>
                      <td className="px-6 py-4">{item.roi}</td>
                      <td className="px-6 py-4">
                        {item.payback}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Capital Allocation Plan */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              Capital Allocation Plan
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Energy Efficiency"
                value="$160,000"
                subtitle="40% of total ESG investment."
              />
              <MetricCard
                title="Water Optimization"
                value="$80,000"
                subtitle="20% of total ESG investment."
              />
              <MetricCard
                title="Maintenance Optimization"
                value="$160,000"
                subtitle="40% of total ESG investment."
              />
            </div>
          </div>

          {/* 12-Month Timeline */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              12-Month Implementation Timeline
            </h2>

            <div className="mt-6 space-y-6">
              <TimelineCard
                quarter="Q1"
                description="Conduct audits, establish baselines, and prioritize initiatives."
              />
              <TimelineCard
                quarter="Q2"
                description="Procure vendors and begin implementation of high-priority measures."
              />
              <TimelineCard
                quarter="Q3"
                description="Commission systems and begin KPI tracking."
              />
              <TimelineCard
                quarter="Q4"
                description="Verify savings and prepare board-level reporting."
              />
            </div>
          </div>

                    {/* Governance & Responsibility Matrix */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              Governance & Responsibility Matrix
            </h2>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full rounded-3xl bg-[#ECFDF5] overflow-hidden">
                <thead className="bg-[#DDF5E7]">
                  <tr>
                    <th className="px-6 py-4 text-left font-bold">
                      Initiative
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Responsible Team
                    </th>
                    <th className="px-6 py-4 text-left font-bold">
                      Timeline
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {initiatives.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-[#10251E]/10"
                    >
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.owner}</td>
                      <td className="px-6 py-4">{item.timeline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KPI Monitoring Dashboard */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              KPI Monitoring Dashboard
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Energy Intensity"
                value="-15%"
                subtitle="Target reduction in energy use."
              />
              <MetricCard
                title="Water Intensity"
                value="-20%"
                subtitle="Target reduction in water use."
              />
              <MetricCard
                title="Maintenance Cost"
                value="-10%"
                subtitle="Target reduction in maintenance cost."
              />
              <MetricCard
                title="NOI Improvement"
                value="+$75,500"
                subtitle="Projected annual improvement."
              />
              <MetricCard
                title="CO₂ Reduction"
                value="93.8 tCO₂e"
                subtitle="Estimated annual emissions reduction."
              />
              <MetricCard
                title="Asset Value Uplift"
                value="+$1.26M"
                subtitle="Indicative value increase."
              />
            </div>
          </div>

          {/* Sustainable Finance Strategy */}
          <Section
            title="Sustainable Finance Strategy"
            content="Based on the identified opportunities, the portfolio may be positioned to pursue green loans, sustainability-linked financing, and enhanced engagement with ESG-focused investors."
          />

          {/* Risk Mitigation Roadmap */}
          <Section
            title="Risk Mitigation Roadmap"
            content="Implementation of the recommended initiatives may reduce regulatory exposure, improve operational resilience, strengthen insurability, and protect occupancy and long-term asset value."
          />

          {/* Value Realization Schedule */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold">
              Value Realization Schedule
            </h2>

            <div className="mt-6 grid gap-6 md:grid-cols-4">
              <MetricCard
                title="Q1"
                value="Planning"
                subtitle="Audits and prioritization."
              />
              <MetricCard
                title="Q2"
                value="Execution"
                subtitle="Implementation begins."
              />
              <MetricCard
                title="Q3"
                value="Optimization"
                subtitle="Commissioning and KPI tracking."
              />
              <MetricCard
                title="Q4"
                value="Realization"
                subtitle="Savings verification and reporting."
              />
            </div>
          </div>

                    {/* Strategic Advisory CTA */}
          <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#9AC7B0]">
              Strategic Advisory
            </p>

            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Ready to Execute Your ESG Value Creation Roadmap?
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
              Partner with The OXY Brief to implement the identified
              opportunities, secure financing, and realize measurable
              financial and sustainability outcomes.
            </p>

            <a
              href="/contact"
              className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E] hover:bg-[#ECFDF5]"
            >
              Book Your Strategy Session
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  title,
  value,
  subtitle,
}: {
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-4xl font-bold text-[#3D6B4F]">
        {value}
      </p>
      {subtitle && (
        <p className="mt-3 text-sm leading-6 text-[#53645D]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function TimelineCard({
  quarter,
  description,
}: {
  quarter: string;
  description: string;
}) {
  return (
    <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
      <h3 className="text-2xl font-bold text-[#3D6B4F]">
        {quarter}
      </h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        {description}
      </p>
    </div>
  );
}

function Section({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-[#53645D]">
        {content}
      </p>
    </div>
  );
}