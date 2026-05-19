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

type OpportunityItem = {
  initiative: string;
  impact: string;
  payback: string;
  priority: string;
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
    const energySavingsRate = 0.15;
    const waterSavingsRate = 0.20;
    const maintenanceSavingsRate = 0.10;

    // Savings calculations
    const energySavings = energyCost * energySavingsRate;
    const waterSavings = waterCost * waterSavingsRate;
    const maintenanceSavings =
      maintenanceCost * maintenanceSavingsRate;

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

    const capRate =
      capRatePercent > 0
        ? capRatePercent / 100
        : 0;

    const assetValueIncrease =
      capRate > 0
        ? totalAnnualSavings / capRate
        : 0;

    const improvedNOI =
      currentNOI + totalAnnualSavings;

          // OXY Value Score™
    let oxyValueScore = 50;

    if (roi >= 30) oxyValueScore += 20;
    else if (roi >= 20) oxyValueScore += 15;
    else if (roi >= 10) oxyValueScore += 10;

    if (paybackYears > 0 && paybackYears <= 3) {
      oxyValueScore += 15;
    } else if (paybackYears <= 5) {
      oxyValueScore += 10;
    } else if (paybackYears <= 7) {
      oxyValueScore += 5;
    }

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

    // Risk Intelligence Module
    let riskExposureScore = 40;

    if (occupancyRate < 85) {
      riskExposureScore += 30;
    } else if (occupancyRate < 90) {
      riskExposureScore += 15;
    }

    if (roi < 10) {
      riskExposureScore += 20;
    } else if (roi < 20) {
      riskExposureScore += 10;
    }

    riskExposureScore = Math.max(
      0,
      Math.min(100, Math.round(riskExposureScore))
    );

    let riskCategory = "Managed";
    if (riskExposureScore >= 70) {
      riskCategory = "Elevated";
    } else if (riskExposureScore >= 40) {
      riskCategory = "Moderate";
    }

    const riskInterpretation =
      riskCategory === "Elevated"
        ? "Your portfolio exhibits elevated exposure to regulatory, operational, and market risks."
        : riskCategory === "Moderate"
        ? "Your portfolio exhibits moderate transition and operational risk."
        : "Your portfolio appears relatively well positioned.";

    // Sustainable Finance Module
    let capitalReadinessScore = 50;

    if (oxyValueScore >= 80) {
      capitalReadinessScore += 30;
    } else if (oxyValueScore >= 60) {
      capitalReadinessScore += 20;
    } else {
      capitalReadinessScore += 10;
    }

    if (form.primaryObjective === "Increase Asset Value") {
      capitalReadinessScore += 10;
    }

    capitalReadinessScore = Math.max(
      0,
      Math.min(100, Math.round(capitalReadinessScore))
    );

    let capitalReadinessCategory = "Emerging";
    if (capitalReadinessScore >= 80) {
      capitalReadinessCategory = "Strong";
    } else if (capitalReadinessScore >= 60) {
      capitalReadinessCategory = "Developing";
    }

    const capitalReadinessInterpretation =
      capitalReadinessCategory === "Strong"
        ? "Your portfolio demonstrates strong potential to attract sustainability-linked financing."
        : capitalReadinessCategory === "Developing"
        ? "Your portfolio shows developing readiness for sustainable finance."
        : "Additional ESG planning may strengthen financing attractiveness.";

            // Carbon Intelligence Module
    const co2Reduction =
      (energySavings / 1000) * 2.5;

    const carbonImpactScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(co2Reduction * 0.8)
      )
    );

    let netZeroAlignment = "Emerging";
    if (carbonImpactScore >= 80) {
      netZeroAlignment = "High";
    } else if (carbonImpactScore >= 50) {
      netZeroAlignment = "Moderate";
    }

    const carbonInterpretation =
      `Estimated energy efficiency measures may reduce emissions by approximately ${co2Reduction.toFixed(
        1
      )} tCO₂e annually.`;

    // Advanced Financial Calculations
    const discountRate = 0.08;
    const analysisYears = 10;

    let npv = -esgInvestment;

    for (let year = 1; year <= analysisYears; year++) {
      npv +=
        totalAnnualSavings /
        Math.pow(1 + discountRate, year);
    }

    const irr =
      analysisYears > 0
        ? roi / analysisYears
        : 0;

    // Sensitivity Analysis
    const lowCaseSavings =
      totalAnnualSavings * 0.9;
    const highCaseSavings =
      totalAnnualSavings * 1.1;

    const lowCaseAssetValue =
      capRate > 0
        ? lowCaseSavings / capRate
        : 0;

    const highCaseAssetValue =
      capRate > 0
        ? highCaseSavings / capRate
        : 0;

    // Opportunity Prioritization Matrix
    const opportunityMatrix: OpportunityItem[] = [
      {
        initiative:
          "Energy Efficiency Retrofits",
        impact: "High",
        payback:
          energySavings > 0
            ? (
                (esgInvestment * 0.4) /
                energySavings
              ).toFixed(1) + " Years"
            : "N/A",
        priority: "Immediate",
      },
      {
        initiative: "Water Optimization",
        impact: "Medium",
        payback:
          waterSavings > 0
            ? (
                (esgInvestment * 0.2) /
                waterSavings
              ).toFixed(1) + " Years"
            : "N/A",
        priority: "High",
      },
      {
        initiative:
          "Maintenance Optimization",
        impact: "Medium",
        payback:
          maintenanceSavings > 0
            ? (
                (esgInvestment * 0.4) /
                maintenanceSavings
              ).toFixed(1) + " Years"
            : "N/A",
        priority: "Strategic",
      },
    ];

        return {
      // Assumptions
      energySavingsRate,
      waterSavingsRate,
      maintenanceSavingsRate,

      // Savings
      energySavings,
      waterSavings,
      maintenanceSavings,
      totalAnnualSavings,

      // Scenario Analysis
      conservativeSavings,
      acceleratedSavings,

      // Core Financial Metrics
      roi,
      paybackYears,
      assetValueIncrease,
      improvedNOI,

      // Proprietary Scores
      oxyValueScore,
      confidenceIndex,

      // Risk Intelligence
      riskExposureScore,
      riskCategory,
      riskInterpretation,

      // Sustainable Finance
      capitalReadinessScore,
      capitalReadinessCategory,
      capitalReadinessInterpretation,

      // Carbon Intelligence
      co2Reduction,
      carbonImpactScore,
      netZeroAlignment,
      carbonInterpretation,

      // Advanced Financial Calculations
      discountRate,
      analysisYears,
      npv,
      irr,

      // Sensitivity Analysis
      lowCaseSavings,
      highCaseSavings,
      lowCaseAssetValue,
      highCaseAssetValue,

      // Opportunity Prioritization Matrix
      opportunityMatrix,
    };
  }, [form]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Value Intelligence assessment failed:",
        error
      );
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
              Based on your actual operational and financial data,
              we identified precise opportunities to improve
              operating performance and enhance property value.
            </p>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
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
                value={`${results.oxyValueScore} / 100`}
              />
              <MetricCard
                title="Confidence Index™"
                value={`${results.confidenceIndex} / 100`}
              />
            </div>

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
      <h3 className="text-2xl font-bold">
        Conservative Case Interpretation
      </h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This downside scenario assumes only 80% of projected savings are
        achieved. It reflects situations where initiatives are partially
        implemented, operational constraints reduce effectiveness, or
        actual performance is lower than expected.
      </p>
    </div>

    <div className="rounded-3xl bg-[#ECFDF5] p-6">
      <h3 className="text-2xl font-bold">
        Base Case Interpretation
      </h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This represents the most likely outcome using benchmark
        assumptions derived from commonly observed building optimization
        programs. It assumes recommended initiatives are implemented
        effectively and perform as expected.
      </p>
    </div>

    <div className="rounded-3xl bg-[#ECFDF5] p-6">
      <h3 className="text-2xl font-bold">
        Accelerated Case Interpretation
      </h3>
      <p className="mt-3 text-lg leading-8 text-[#53645D]">
        This upside scenario assumes results exceed baseline
        expectations, reflecting strong execution, broader
        implementation, and additional operational and market benefits
        such as improved tenant demand and enhanced asset performance.
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

  <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Strategic Implications</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      Reducing sustainability-related risks can help protect occupancy,
      reduce future compliance costs, improve insurability, and preserve
      long-term asset value.
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

  <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Financing Opportunities</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      Potential opportunities may include green loans,
      sustainability-linked financing, preferential lending terms, and
      improved positioning with ESG-focused investors.
    </p>
  </div>

  <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Investor Positioning</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      Strong sustainability performance can enhance credibility with
      institutional investors and increase access to responsible capital.
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

  <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">
    <h3 className="text-2xl font-bold">Net-Zero Alignment Commentary</h3>
    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      These projected emissions reductions support climate transition
      objectives and may strengthen alignment with net-zero commitments
      and disclosure frameworks.
    </p>
  </div>
</div>

            {/* Advanced Financial Calculations */}
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <MetricCard
                title="Net Present Value (NPV)"
                value={formatCurrency(results.npv)}
                subtitle="10-year discounted cash flow at an 8% discount rate."
              />
              <MetricCard
                title="Internal Rate of Return (IRR)"
                value={`${results.irr.toFixed(1)}%`}
                subtitle="Approximate annualized return."
              />
            </div>

            {/* Sensitivity Analysis */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold">
                Sensitivity Analysis
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <MetricCard
                  title="Low Case"
                  value={formatCurrency(
                    results.lowCaseAssetValue
                  )}
                  subtitle="10% below base savings."
                />
                <MetricCard
                  title="Base Case"
                  value={formatCurrency(
                    results.assetValueIncrease
                  )}
                  subtitle="Expected outcome."
                />
                <MetricCard
                  title="High Case"
                  value={formatCurrency(
                    results.highCaseAssetValue
                  )}
                  subtitle="10% above base savings."
                />
              </div>
            </div>

            {/* Opportunity Prioritization Matrix */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold">
                Opportunity Prioritization Matrix
              </h2>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full rounded-3xl bg-[#ECFDF5] overflow-hidden">
                  <thead className="bg-[#DDF5E7]">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold">
                        Initiative
                      </th>
                      <th className="px-6 py-4 text-left font-bold">
                        Impact
                      </th>
                      <th className="px-6 py-4 text-left font-bold">
                        Payback
                      </th>
                      <th className="px-6 py-4 text-left font-bold">
                        Priority
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.opportunityMatrix.map(
                      (item, index) => (
                        <tr
                          key={index}
                          className="border-t border-[#10251E]/10"
                        >
                          <td className="px-6 py-4">
                            {item.initiative}
                          </td>
                          <td className="px-6 py-4">
                            {item.impact}
                          </td>
                          <td className="px-6 py-4">
                            {item.payback}
                          </td>
                          <td className="px-6 py-4 font-semibold text-[#3D6B4F]">
                            {item.priority}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recommended Next Steps */}
            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-3xl font-bold">
                Recommended Next Steps
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>• Conduct a detailed building performance audit.</li>
                <li>• Prioritize high-ROI initiatives.</li>
                <li>• Develop an ESG capital investment roadmap.</li>
                <li>• Assess sustainable finance opportunities.</li>
                <li>• Implement monitoring and verification.</li>
              </ul>

              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                We are here to support you at every step of the process.
              </p>
            </div>

            {/* CTA */}
            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <h2 className="text-3xl font-bold md:text-4xl">
                Ready to Turn Sustainability into Financial Performance?
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
                Book a strategy session with The OXY Brief to develop a tailored
                ESG value creation roadmap for your portfolio.
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

  // FORM VIEW
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
        </div>

        <div className="mt-14 rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
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
              placeholder="500000"
            />
            <InputField
              label="Number of Properties"
              value={form.numberOfProperties}
              onChange={(value) =>
                updateField("numberOfProperties", value)
              }
              placeholder="12"
            />
            <InputField
              label="Annual Energy Cost (USD)"
              value={form.energyCost}
              onChange={(value) =>
                updateField("energyCost", value)
              }
              placeholder="250000"
            />
            <InputField
              label="Annual Water Cost (USD)"
              value={form.waterCost}
              onChange={(value) =>
                updateField("waterCost", value)
              }
              placeholder="50000"
            />
            <InputField
              label="Annual Maintenance Cost (USD)"
              value={form.maintenanceCost}
              onChange={(value) =>
                updateField("maintenanceCost", value)
              }
              placeholder="300000"
            />
            <InputField
              label="Current NOI (USD)"
              value={form.currentNOI}
              onChange={(value) =>
                updateField("currentNOI", value)
              }
              placeholder="5000000"
            />
            <InputField
              label="Cap Rate (%)"
              value={form.capRate}
              onChange={(value) =>
                updateField("capRate", value)
              }
              placeholder="6"
            />
            <InputField
              label="Occupancy Rate (%)"
              value={form.occupancyRate}
              onChange={(value) =>
                updateField("occupancyRate", value)
              }
              placeholder="92"
            />
            <InputField
              label="Planned ESG Investment (USD)"
              value={form.esgInvestment}
              onChange={(value) =>
                updateField("esgInvestment", value)
              }
              placeholder="400000"
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