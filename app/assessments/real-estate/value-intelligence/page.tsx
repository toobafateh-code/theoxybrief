"use client";

import { useMemo, useState } from "react";

type FormData = {
  portfolioArea: string;
  numberOfProperties: string;
  energyCost: string;
  waterCost: string;
  maintenanceCost: string;
  currentNOI: string;
  capRate: string;
  occupancyRate: string;
  esgInvestment: string;
  primaryObjective: string;
};

export default function RealEstateValueIntelligencePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<FormData>({
    portfolioArea: "",
    numberOfProperties: "",
    energyCost: "",
    waterCost: "",
    maintenanceCost: "",
    currentNOI: "",
    capRate: "",
    occupancyRate: "",
    esgInvestment: "",
    primaryObjective: "",
  });

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  }

  const results = useMemo(() => {
    const energyCost = Number(form.energyCost) || 0;
    const waterCost = Number(form.waterCost) || 0;
    const maintenanceCost = Number(form.maintenanceCost) || 0;
    const esgInvestment = Number(form.esgInvestment) || 0;
    const capRatePercent = Number(form.capRate) || 0;
    const currentNOI = Number(form.currentNOI) || 0;
    const occupancyRate = Number(form.occupancyRate) || 0;

    // Benchmark assumptions
    const energySavingsRate = 0.15; // 15%
    const waterSavingsRate = 0.2; // 20%
    const maintenanceSavingsRate = 0.1; // 10%

    // Savings calculations
    const energySavings = energyCost * energySavingsRate;
    const waterSavings = waterCost * waterSavingsRate;
    const maintenanceSavings = maintenanceCost * maintenanceSavingsRate;

    const totalAnnualSavings =
      energySavings + waterSavings + maintenanceSavings;

    // Scenario analysis
    const conservativeSavings = totalAnnualSavings * 0.8;
    const acceleratedSavings = totalAnnualSavings * 1.3;

    // Financial calculations
    const roi =
      esgInvestment > 0
        ? (totalAnnualSavings / esgInvestment) * 100
        : 0;

    const paybackYears =
      totalAnnualSavings > 0
        ? esgInvestment / totalAnnualSavings
        : 0;

    const capRate = capRatePercent > 0 ? capRatePercent / 100 : 0;

    const assetValueIncrease =
      capRate > 0 ? totalAnnualSavings / capRate : 0;

    const improvedNOI = currentNOI + totalAnnualSavings;

    // OXY Value Score™
    let oxyValueScore = 50;

    if (roi >= 30) oxyValueScore += 20;
    else if (roi >= 20) oxyValueScore += 15;
    else if (roi >= 10) oxyValueScore += 10;

    if (paybackYears > 0 && paybackYears <= 3) oxyValueScore += 15;
    else if (paybackYears <= 5) oxyValueScore += 10;
    else if (paybackYears <= 7) oxyValueScore += 5;

    if (occupancyRate >= 90) oxyValueScore += 10;
    else if (occupancyRate >= 80) oxyValueScore += 5;

    if (form.primaryObjective === "Increase Asset Value") {
      oxyValueScore += 5;
    }

    oxyValueScore = Math.max(
      0,
      Math.min(100, Math.round(oxyValueScore))
    );

    // Confidence Index™
    const allFields = Object.values(form);
    const completedFields = allFields.filter(
      (value) => value !== ""
    ).length;

    const confidenceIndex = Math.round(
      (completedFields / allFields.length) * 100
    );

    return {
      // Assumptions
      energySavingsRate,
      waterSavingsRate,
      maintenanceSavingsRate,

      // Detailed savings
      energySavings,
      waterSavings,
      maintenanceSavings,

      // Core outputs
      totalAnnualSavings,
      roi,
      paybackYears,
      assetValueIncrease,
      improvedNOI,

      // Proprietary scores
      oxyValueScore,
      confidenceIndex,

      // Scenario analysis
      conservativeSavings,
      acceleratedSavings,

      // Risk Intelligence Module
riskExposureScore: Math.min(
  100,
  Math.round(
    40 +
      (Number(form.occupancyRate) < 90 ? 15 : 5) +
      (results?.roi && results.roi < 15 ? 15 : 5)
  )
),

riskCategory:
  Number(form.occupancyRate) < 85
    ? "Elevated"
    : Number(form.occupancyRate) < 90
    ? "Moderate"
    : "Managed",

riskInterpretation:
  Number(form.occupancyRate) < 85
    ? "Your portfolio exhibits elevated exposure to operational and market risks, including potential occupancy pressure and regulatory requirements."
    : Number(form.occupancyRate) < 90
    ? "Your portfolio exhibits moderate transition and operational risk. Early sustainability investments may reduce future compliance and occupancy pressures."
    : "Your portfolio appears relatively well positioned, though continued sustainability improvements can further strengthen resilience.",

// Sustainable Finance Module
capitalReadinessScore: Math.min(
  100,
  Math.round(
    50 +
      (form.primaryObjective === "Increase Asset Value" ? 15 : 5) +
      (results?.oxyValueScore && results.oxyValueScore > 80 ? 20 : 10)
  )
),

capitalReadinessCategory:
  (results?.oxyValueScore || 0) >= 80
    ? "Strong"
    : (results?.oxyValueScore || 0) >= 60
    ? "Developing"
    : "Emerging",

capitalReadinessInterpretation:
  (results?.oxyValueScore || 0) >= 80
    ? "Your portfolio demonstrates strong potential to attract sustainability-linked financing and responsible investment capital."
    : (results?.oxyValueScore || 0) >= 60
    ? "Your portfolio shows developing readiness for sustainable finance opportunities."
    : "Additional ESG planning and performance improvements may strengthen financing attractiveness.",

// Carbon Intelligence Module
co2Reduction: (energySavings / 1000) * 2.5,

carbonImpactScore: Math.min(
  100,
  Math.round(((energySavings / 1000) * 2.5) * 0.8)
),

netZeroAlignment:
  (energySavings / 1000) * 2.5 > 100
    ? "High"
    : (energySavings / 1000) * 2.5 > 50
    ? "Moderate"
    : "Emerging",

carbonInterpretation:
  `Estimated energy efficiency measures may reduce emissions by approximately ${(
    (energySavings / 1000) *
    2.5
  ).toFixed(
    1
  )} tCO₂e annually, supporting climate targets and net-zero ambitions.`,
    };
  }, [form]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Value Intelligence assessment failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // =====================================================
  // REPORT VIEW
  // =====================================================
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              OXY Value Intelligence™ Report
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Real Estate Financial Intelligence Report
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
              Based on your actual operational and financial data, we
              identified precise opportunities to improve operating
              performance and enhance property value.
            </p>

            {/* Key Metrics */}
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Estimated Annual Savings"
                value={formatCurrency(results.totalAnnualSavings)}
              />
              <MetricCard
                title="ROI"
                value={`${results.roi.toFixed(1)}%`}
              />
              <MetricCard
                title="Payback Period"
                value={`${results.paybackYears.toFixed(1)} Years`}
              />
              <MetricCard
                title="Asset Value Increase"
                value={formatCurrency(results.assetValueIncrease)}
              />
              <MetricCard
                title="OXY Value Score™"
                value={`${results.oxyValueScore} / 100`}
              />
              <MetricCard
                title="Confidence Index™"
                value={`${results.confidenceIndex} / 100`}
              />
            </div>

            {/* Proprietary Scores */}
            <Section
              title="Proprietary Scores"
              content={`Your OXY Value Score™ is ${results.oxyValueScore}/100, indicating the potential to convert sustainability initiatives into measurable financial performance. Your Confidence Index™ is ${results.confidenceIndex}/100, reflecting the completeness and reliability of the data used in this analysis.`}
            />

            {/* Executive Summary */}
            <Section
              title="Executive Summary"
              content={`Your portfolio may unlock approximately ${formatCurrency(
                results.totalAnnualSavings
              )} in annual savings, improve NOI to ${formatCurrency(
                results.improvedNOI
              )}, and increase asset value by approximately ${formatCurrency(
                results.assetValueIncrease
              )}.`}
            />

            {/* Observe */}
            <Section
              title="Observe"
              content="Your operating cost structure indicates meaningful opportunities in energy, water, and maintenance optimization."
            />

            {/* Translate */}
            <Section
              title="Translate"
              content="Operational efficiencies reduce recurring expenses, directly increasing Net Operating Income (NOI) and enhancing property valuation through cap rate capitalization."
            />

            {/* Yield */}
            <Section
              title="Yield"
              content={`Projected ROI is ${results.roi.toFixed(
                1
              )}% with an estimated payback period of ${results.paybackYears.toFixed(
                1
              )} years.`}
            />

            {/* Benchmark Evidence */}
            <Section
              title="Benchmark Evidence"
              content={`Estimated annual savings are composed of ${formatCurrency(
                results.energySavings
              )} from energy efficiency, ${formatCurrency(
                results.waterSavings
              )} from water optimization, and ${formatCurrency(
                results.maintenanceSavings
              )} from maintenance efficiencies.`}
            />

            {/* Scenario Analysis */}
<div className="mt-12">
  <h2 className="text-3xl font-bold">Scenario Analysis</h2>

  <p className="mt-4 text-lg leading-8 text-[#53645D]">
    The following scenarios illustrate how annual savings may vary under
    conservative, base case, and accelerated implementation assumptions.
  </p>

  <div className="mt-6 grid gap-6 md:grid-cols-3">
    <MetricCard
      title="Conservative Case"
      value={formatCurrency(results.conservativeSavings)}
      subtitle="80% of the base case estimate."
    />

    <MetricCard
      title="Base Case"
      value={formatCurrency(results.totalAnnualSavings)}
      subtitle="Expected outcome using benchmark assumptions."
    />

    <MetricCard
      title="Accelerated Case"
      value={formatCurrency(results.acceleratedSavings)}
      subtitle="130% of the base case estimate."
    />
  </div>

  {/* Scenario Interpretations */}
  <div className="mt-8 space-y-6">
    <div className="rounded-3xl bg-[#ECFDF5] p-6">
      <h3 className="text-2xl font-bold">Conservative Case Interpretation</h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This downside scenario assumes only 80% of projected savings are
        achieved. It reflects situations where initiatives are partially
        implemented, operational constraints reduce effectiveness, or actual
        performance is lower than expected.
      </p>
    </div>

    <div className="rounded-3xl bg-[#ECFDF5] p-6">
      <h3 className="text-2xl font-bold">Base Case Interpretation</h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This represents the most likely outcome using benchmark assumptions
        derived from commonly observed building optimization programs. It
        assumes recommended initiatives are implemented effectively and
        perform as expected.
      </p>
    </div>

    <div className="rounded-3xl bg-[#ECFDF5] p-6">
      <h3 className="text-2xl font-bold">Accelerated Case Interpretation</h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This upside scenario assumes results exceed baseline expectations,
        reflecting strong execution, broader implementation, and additional
        operational and market benefits such as improved tenant demand and
        enhanced asset performance.
      </p>
    </div>
  </div>
</div>

{/* Risk Intelligence Module */}
<div className="mt-12">
  <h2 className="text-3xl font-bold">Risk Intelligence Module</h2>

  <p className="mt-4 text-lg leading-8 text-[#53645D]">
    This assessment evaluates potential exposure to regulatory,
    operational, and market risks that may affect future operating
    performance, occupancy, and asset value.
  </p>

  <div className="mt-6 grid gap-6 md:grid-cols-2">
    <MetricCard
      title="Risk Exposure Score™"
      value={`${results.riskExposureScore} / 100`}
      subtitle="Measures potential exposure to transition, operational, and market risks."
    />

    <MetricCard
      title="Risk Category"
      value={results.riskCategory}
      subtitle="Overall interpretation of your current risk profile."
    />
  </div>

  <div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Interpretation</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      {results.riskInterpretation}
    </p>
  </div>
</div>

{/* Sustainable Finance Module */}
<div className="mt-12">
  <h2 className="text-3xl font-bold">Sustainable Finance Module</h2>

  <p className="mt-4 text-lg leading-8 text-[#53645D]">
    This module evaluates your portfolio’s readiness to attract green
    financing, sustainability-linked loans, and responsible investment
    capital.
  </p>

  <div className="mt-6 grid gap-6 md:grid-cols-2">
    <MetricCard
      title="Capital Readiness Score™"
      value={`${results.capitalReadinessScore} / 100`}
      subtitle="Measures alignment with sustainable finance expectations."
    />

    <MetricCard
      title="Financing Readiness"
      value={results.capitalReadinessCategory}
      subtitle="Assessment of potential financing attractiveness."
    />
  </div>

  <div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Interpretation</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      {results.capitalReadinessInterpretation}
    </p>
  </div>
</div>

{/* Carbon Intelligence Module */}
<div className="mt-12">
  <h2 className="text-3xl font-bold">Carbon Intelligence Module</h2>

  <p className="mt-4 text-lg leading-8 text-[#53645D]">
    This module estimates the potential reduction in greenhouse gas
    emissions associated with projected energy efficiency improvements.
  </p>

  <div className="mt-6 grid gap-6 md:grid-cols-3">
    <MetricCard
      title="Estimated CO₂ Reduction"
      value={`${results.co2Reduction.toFixed(1)} tCO₂e`}
      subtitle="Estimated annual greenhouse gas reduction."
    />

    <MetricCard
      title="Carbon Impact Score™"
      value={`${results.carbonImpactScore} / 100`}
      subtitle="Measures the climate impact potential of the identified initiatives."
    />

    <MetricCard
      title="Net Zero Alignment"
      value={results.netZeroAlignment}
      subtitle="Assessment of climate transition contribution."
    />
  </div>

  <div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Interpretation</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      {results.carbonInterpretation}
    </p>
  </div>
</div>

            {/* Recommended Next Steps */}
            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-3xl font-bold">
                Recommended Next Steps
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>• Conduct a detailed energy and water audit.</li>
                <li>
                  • Prioritize highest-return efficiency projects.
                </li>
                <li>
                  • Develop an ESG capital investment roadmap.
                </li>
                <li>
                  • Evaluate certification and tenant value
                  strategies.
                </li>
                <li>
                  • Track realized savings and valuation impact.
                </li>
              </ul>

              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                We are here to support you at every step.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#9AC7B0]">
                Strategic Advisory
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Ready to Turn Sustainability into Financial
                Performance?
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
                Book a strategy session with The OXY Brief to develop
                a tailored ESG value creation roadmap for your
                portfolio.
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

  // =====================================================
  // FORM VIEW
  // =====================================================
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY Value Intelligence™
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Real Estate Financial Intelligence Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            Provide your actual operational and financial data to
            receive a precise analysis of annual savings, ROI,
            payback period, NOI improvement, asset value uplift, and
            proprietary intelligence scores.
          </p>
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
          <h2 className="text-3xl font-bold">
            Advanced Financial Inputs
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-10 grid gap-8 md:grid-cols-2"
          >
            <InputField
              label="Total Portfolio Area (sq ft)"
              value={form.portfolioArea}
              onChange={(value) =>
                updateField("portfolioArea", value)
              }
              placeholder="e.g. 500000"
            />

            <InputField
              label="Number of Properties"
              value={form.numberOfProperties}
              onChange={(value) =>
                updateField("numberOfProperties", value)
              }
              placeholder="e.g. 12"
            />

            <InputField
              label="Annual Energy Cost (USD)"
              value={form.energyCost}
              onChange={(value) =>
                updateField("energyCost", value)
              }
              placeholder="e.g. 250000"
            />

            <InputField
              label="Annual Water Cost (USD)"
              value={form.waterCost}
              onChange={(value) =>
                updateField("waterCost", value)
              }
              placeholder="e.g. 50000"
            />

            <InputField
              label="Annual Maintenance Cost (USD)"
              value={form.maintenanceCost}
              onChange={(value) =>
                updateField("maintenanceCost", value)
              }
              placeholder="e.g. 300000"
            />

            <InputField
              label="Current NOI (USD)"
              value={form.currentNOI}
              onChange={(value) =>
                updateField("currentNOI", value)
              }
              placeholder="e.g. 5000000"
            />

            <InputField
              label="Cap Rate (%)"
              value={form.capRate}
              onChange={(value) =>
                updateField("capRate", value)
              }
              placeholder="e.g. 6"
            />

            <InputField
              label="Occupancy Rate (%)"
              value={form.occupancyRate}
              onChange={(value) =>
                updateField("occupancyRate", value)
              }
              placeholder="e.g. 91"
            />

            <InputField
              label="Planned ESG Investment (USD)"
              value={form.esgInvestment}
              onChange={(value) =>
                updateField("esgInvestment", value)
              }
              placeholder="e.g. 400000"
            />

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Primary Objective
              </label>
              <select
                required
                value={form.primaryObjective}
                onChange={(e) =>
                  updateField(
                    "primaryObjective",
                    e.target.value
                  )
                }
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none focus:border-[#3D6B4F]"
              >
                <option value="">Select an objective</option>
                <option>Reduce Operating Costs</option>
                <option>Increase Asset Value</option>
                <option>Improve Occupancy</option>
                <option>Meet ESG Requirements</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="md:col-span-2 mt-4 w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-3">
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Generating Your OXY Value Intelligence™ Report...
                </span>
              ) : (
                "Generate OXY Value Intelligence™ Report"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {label}
      </label>
      <input
        required
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none focus:border-[#3D6B4F]"
      />
    </div>
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