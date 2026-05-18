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
    const energySavings = energyCost * 0.15; // 15%
    const waterSavings = waterCost * 0.20; // 20%
    const maintenanceSavings = maintenanceCost * 0.10; // 10%

    const totalAnnualSavings =
      energySavings + waterSavings + maintenanceSavings;

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

    // OXY Value Score™ (0–100)
    const roiScore = Math.min(40, roi * 0.8);
    const valueUpliftRatio =
      currentNOI > 0
        ? (assetValueIncrease / currentNOI) * 100
        : 0;
    const valueUpliftScore = Math.min(35, valueUpliftRatio * 2);
    const occupancyScore = Math.min(15, occupancyRate * 0.15);

    let objectiveScore = 5;
    if (form.primaryObjective === "Increase Asset Value") objectiveScore = 10;
    if (form.primaryObjective === "Reduce Operating Costs") objectiveScore = 8;
    if (form.primaryObjective === "Improve Occupancy") objectiveScore = 7;

    const valueScore = Math.min(
      100,
      roiScore +
        valueUpliftScore +
        occupancyScore +
        objectiveScore
    );

    // Confidence Index™ (0–100)
    let confidenceIndex = 100;

    if (!form.portfolioArea) confidenceIndex -= 5;
    if (!form.numberOfProperties) confidenceIndex -= 5;
    if (!form.energyCost) confidenceIndex -= 10;
    if (!form.waterCost) confidenceIndex -= 10;
    if (!form.maintenanceCost) confidenceIndex -= 10;
    if (!form.currentNOI) confidenceIndex -= 15;
    if (!form.capRate) confidenceIndex -= 15;
    if (!form.occupancyRate) confidenceIndex -= 10;
    if (!form.esgInvestment) confidenceIndex -= 10;
    if (!form.primaryObjective) confidenceIndex -= 10;

    confidenceIndex = Math.max(
      0,
      Math.min(100, confidenceIndex)
    );

    return {
      energySavings,
      waterSavings,
      maintenanceSavings,
      totalAnnualSavings,
      roi,
      paybackYears,
      assetValueIncrease,
      improvedNOI,
      valueScore,
      confidenceIndex,
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
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  // =========================
  // REPORT VIEW
  // =========================
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
            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                title="Estimated Annual Savings"
                value={formatCurrency(
                  results.totalAnnualSavings
                )}
              />
              <MetricCard
                title="ROI"
                value={`${results.roi.toFixed(1)}%`}
              />
              <MetricCard
                title="Payback Period"
                value={`${results.paybackYears.toFixed(
                  1
                )} Years`}
              />
              <MetricCard
                title="Asset Value Increase"
                value={formatCurrency(
                  results.assetValueIncrease
                )}
              />
              <MetricCard
                title="OXY Value Score™"
                value={`${results.valueScore.toFixed(
                  0
                )} / 100`}
              />
              <MetricCard
                title="Confidence Index™"
                value={`${results.confidenceIndex.toFixed(
                  0
                )} / 100`}
              />
            </div>

            <Section
              title="Proprietary Scores"
              content={`Your OXY Value Score™ is ${results.valueScore.toFixed(
                0
              )}/100, indicating the potential to convert sustainability initiatives into measurable financial performance. Your Confidence Index™ is ${results.confidenceIndex.toFixed(
                0
              )}/100, reflecting the completeness and reliability of the data used in this analysis.`}
            />

            <Section
              title="Executive Summary"
              content={`Your portfolio may unlock approximately ${formatCurrency(
                results.totalAnnualSavings
              )} in annual savings. This could improve Net Operating Income (NOI) to ${formatCurrency(
                results.improvedNOI
              )} and increase asset value by approximately ${formatCurrency(
                results.assetValueIncrease
              )}.`}
            />

            <Section
              title="Observe"
              content="Your operating cost profile reveals material opportunities in energy, water, and maintenance optimization."
            />

            <Section
              title="Translate"
              content="Lower operating expenses directly increase NOI. Higher NOI supports stronger valuations when capitalized using market cap rates."
            />

            <Section
              title="Yield"
              content={`Projected ROI is ${results.roi.toFixed(
                1
              )}% with an estimated payback period of ${results.paybackYears.toFixed(
                1
              )} years.`}
            />

            <Section
              title="How We Calculated These Results"
              content="This analysis applies benchmark assumptions of 15% energy savings, 20% water savings, and 10% maintenance savings. Asset value increase is estimated by dividing annual savings by the cap rate provided."
            />

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

            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-3xl font-bold">
                Recommended Next Steps
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  • Conduct a detailed energy and water audit.
                </li>
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

            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#9AC7B0]">
                Strategic Advisory
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                Ready to Turn Sustainability into Financial
                Performance?
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
                Book a strategy session with The OXY Brief to
                develop a tailored ESG value creation roadmap.
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

  // =========================
  // FORM VIEW
  // =========================
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
            Provide your actual operational and financial data
            to receive a precise analysis of annual savings,
            ROI, payback period, NOI improvement, and asset
            value uplift.
          </p>
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
          <h2 className="text-3xl font-bold">
            Advanced Financial Inputs
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            Enter your actual operating and financial data to
            generate a precise OXY Value Intelligence™ Report.
          </p>

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
              placeholder="e.g. 92"
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
                <option value="">
                  Select an objective
                </option>
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
                  Generating Your Precise OXY Value
                  Intelligence™ Report...
                </span>
              ) : (
                "Generate Precise OXY Value Intelligence™ Report"
              )}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

// =========================
// HELPER COMPONENTS
// =========================

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
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mt-4 text-4xl font-bold text-[#3D6B4F]">
        {value}
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