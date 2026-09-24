"use client";

import { useEffect, useMemo, useState } from "react";

type FormData = {
  currency: "AED" | "USD";
  propertyType: string;
  portfolioArea: string;
  numberOfProperties: string;

  annualEnergyCost: string;
  annualEnergyConsumption: string;
  energySavingsRate: string;

  annualWaterCost: string;
  annualWaterConsumption: string;
  waterSavingsRate: string;

  annualMaintenanceCost: string;
  maintenanceSavingsRate: string;

  currentNOI: string;
  capRate: string;
  occupancyRate: string;

  esgInvestment: string;
  investmentHorizon: string;
  discountRate: string;

  carbonEmissionFactor: string;
  certification: string;
  primaryObjective: string;

  scenario: "Conservative" | "Base" | "Upside";
  dataConfidence: "Low" | "Moderate" | "High";
};

type ClientContext = {
  fullName: string;
  company: string;
  email: string;
};

type OpportunityItem = {
  initiative: string;
  impact: string;
  payback: string;
  priority: string;
};

const FORM_SUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/tooba@theoxybrief.com";

const ADMIN_USERNAME = "tooba";
const ADMIN_PASSWORD = "OXY_2026_FOUNDER!";

const CLIENT_CONTEXT_KEY = "oxyRealEstateAssessmentClient";

const SOURCES = {
  dewaHandbook:
    "https://dewa.gov.ae/-/media/Files/Handbooks2025/Energy-Conservation-Handbook_2025_2_EN.ashx",
  dewaDSM:
    "https://www.dewa.gov.ae/en/about-us/media-publications/latest-news/2024/07/hh-sheikh-ahmed-bin-saeed-al-maktoum-issues",
  rics:
    "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/esg-and-sustainability-in-commercial-property-valuation",
  energyStar:
    "https://www.energystar.gov/buildings/benchmark/understand-metrics/what-eui",
};

const SCENARIOS = {
  Conservative: {
    energy: 0.05,
    water: 0.05,
    maintenance: 0.05,
  },
  Base: {
    energy: 0.1,
    water: 0.1,
    maintenance: 0.05,
  },
  Upside: {
    energy: 0.15,
    water: 0.15,
    maintenance: 0.1,
  },
};

export default function RealEstateValueIntelligencePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [client, setClient] = useState<ClientContext>({
    fullName: "",
    company: "",
    email: "",
  });

  const [form, setForm] = useState<FormData>({
    currency: "AED",
    propertyType: "",
    portfolioArea: "",
    numberOfProperties: "",

    annualEnergyCost: "",
    annualEnergyConsumption: "",
    energySavingsRate: "",

    annualWaterCost: "",
    annualWaterConsumption: "",
    waterSavingsRate: "",

    annualMaintenanceCost: "",
    maintenanceSavingsRate: "",

    currentNOI: "",
    capRate: "",
    occupancyRate: "",

    esgInvestment: "",
    investmentHorizon: "10",
    discountRate: "8",

    carbonEmissionFactor: "",
    certification: "",
    primaryObjective: "",

    scenario: "Base",
    dataConfidence: "Moderate",
  });

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(CLIENT_CONTEXT_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);

        setClient({
          fullName: parsed.fullName || "",
          company: parsed.company || "",
          email: parsed.email || "",
        });
      }
    } catch (error) {
      console.error("Unable to load preliminary assessment context:", error);
    }
  }, []);

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
    return new Intl.NumberFormat("en-AE", {
      style: "currency",
      currency: form.currency,
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);
  }

  function calculateIRR(
    investment: number,
    annualCashFlow: number,
    years: number
  ) {
    if (investment <= 0 || annualCashFlow <= 0 || years <= 0) {
      return 0;
    }

    let rate = 0.1;

    for (let i = 0; i < 100; i++) {
      let npv = -investment;
      let derivative = 0;

      for (let year = 1; year <= years; year++) {
        const denominator = Math.pow(1 + rate, year);

        npv += annualCashFlow / denominator;

        derivative -=
          (year * annualCashFlow) /
          Math.pow(1 + rate, year + 1);
      }

      if (Math.abs(derivative) < 0.000001) {
        break;
      }

      const nextRate = rate - npv / derivative;

      if (!Number.isFinite(nextRate)) {
        break;
      }

      if (Math.abs(nextRate - rate) < 0.000001) {
        rate = nextRate;
        break;
      }

      rate = nextRate;
    }

    return Number.isFinite(rate) ? rate * 100 : 0;
  }

  const results = useMemo(() => {
    const energyCost =
      Number(form.annualEnergyCost) || 0;

    const waterCost =
      Number(form.annualWaterCost) || 0;

    const maintenanceCost =
      Number(form.annualMaintenanceCost) || 0;

    const investment =
      Number(form.esgInvestment) || 0;

    const currentNOI =
      Number(form.currentNOI) || 0;

    const capRatePercent =
      Number(form.capRate) || 0;

    const occupancyRate =
      Number(form.occupancyRate) || 0;

    const horizon =
      Math.max(
        1,
        Number(form.investmentHorizon) || 10
      );

    const discountRate =
      Math.max(
        0,
        Number(form.discountRate) || 0
      ) / 100;

    const scenarioRates =
      SCENARIOS[form.scenario];

    const energyRate =
      form.energySavingsRate !== ""
        ? Math.max(
            0,
            Math.min(
              1,
              Number(form.energySavingsRate) / 100
            )
          )
        : scenarioRates.energy;

    const waterRate =
      form.waterSavingsRate !== ""
        ? Math.max(
            0,
            Math.min(
              1,
              Number(form.waterSavingsRate) / 100
            )
          )
        : scenarioRates.water;

    const maintenanceRate =
      form.maintenanceSavingsRate !== ""
        ? Math.max(
            0,
            Math.min(
              1,
              Number(form.maintenanceSavingsRate) / 100
            )
          )
        : scenarioRates.maintenance;

    const energySavings =
      energyCost * energyRate;

    const waterSavings =
      waterCost * waterRate;

    const maintenanceSavings =
      maintenanceCost * maintenanceRate;

    const totalAnnualSavings =
      energySavings +
      waterSavings +
      maintenanceSavings;

    const roi =
      investment > 0
        ? (totalAnnualSavings / investment) * 100
        : 0;

    const paybackYears =
      totalAnnualSavings > 0
        ? investment / totalAnnualSavings
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

    let npv =
      -investment;

    for (
      let year = 1;
      year <= horizon;
      year++
    ) {
      npv +=
        totalAnnualSavings /
        Math.pow(
          1 + discountRate,
          year
        );
    }

    const irr =
      calculateIRR(
        investment,
        totalAnnualSavings,
        horizon
      );

    const energyConsumption =
      Number(form.annualEnergyConsumption) || 0;

    const emissionFactor =
      Number(form.carbonEmissionFactor) || 0;

    const estimatedEnergyReduction =
      energyConsumption * energyRate;

    const carbonReduction =
      emissionFactor > 0
        ? estimatedEnergyReduction *
          emissionFactor
        : 0;

    const allQuantitativeFields = [
      form.portfolioArea,
      form.numberOfProperties,
      form.annualEnergyCost,
      form.annualWaterCost,
      form.annualMaintenanceCost,
      form.currentNOI,
      form.capRate,
      form.occupancyRate,
      form.esgInvestment,
    ];

    const completedQuantitativeFields =
      allQuantitativeFields.filter(
        (value) => value !== ""
      ).length;

    const dataCompleteness =
      Math.round(
        (completedQuantitativeFields /
          allQuantitativeFields.length) *
          100
      );

    const quantificationReady =
      investment > 0 &&
      energyCost > 0 &&
      waterCost > 0 &&
      maintenanceCost > 0;

    let oxyValueScore = 50;

    if (roi >= 30) {
      oxyValueScore += 20;
    } else if (roi >= 20) {
      oxyValueScore += 15;
    } else if (roi >= 10) {
      oxyValueScore += 10;
    }

    if (
      paybackYears > 0 &&
      paybackYears <= 3
    ) {
      oxyValueScore += 15;
    } else if (
      paybackYears > 0 &&
      paybackYears <= 5
    ) {
      oxyValueScore += 10;
    } else if (
      paybackYears > 0 &&
      paybackYears <= 7
    ) {
      oxyValueScore += 5;
    }

    if (occupancyRate >= 90) {
      oxyValueScore += 10;
    } else if (occupancyRate >= 80) {
      oxyValueScore += 5;
    }

    if (
      form.primaryObjective ===
      "Increase Asset Value"
    ) {
      oxyValueScore += 5;
    }

    oxyValueScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(oxyValueScore)
      )
    );

    let riskExposureScore = 40;

    if (occupancyRate > 0 && occupancyRate < 85) {
      riskExposureScore += 30;
    } else if (
      occupancyRate > 0 &&
      occupancyRate < 90
    ) {
      riskExposureScore += 15;
    }

    if (investment > 0 && roi < 10) {
      riskExposureScore += 20;
    } else if (
      investment > 0 &&
      roi < 20
    ) {
      riskExposureScore += 10;
    }

    riskExposureScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(riskExposureScore)
      )
    );

    const riskCategory =
      riskExposureScore >= 70
        ? "Elevated"
        : riskExposureScore >= 40
        ? "Moderate"
        : "Managed";

    let capitalReadinessScore = 50;

    if (oxyValueScore >= 80) {
      capitalReadinessScore += 30;
    } else if (oxyValueScore >= 60) {
      capitalReadinessScore += 20;
    } else {
      capitalReadinessScore += 10;
    }

    if (
      form.primaryObjective ===
      "Increase Asset Value"
    ) {
      capitalReadinessScore += 10;
    }

    capitalReadinessScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          capitalReadinessScore
        )
      )
    );

    const financingReadinessScore =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            capitalReadinessScore * 0.4 +
              Math.min(roi, 25) * 2 +
              Math.max(
                0,
                10 - paybackYears
              ) *
                3
          )
        )
      );

    const financingReadinessCategory =
      financingReadinessScore >= 80
        ? "Institutional Ready"
        : financingReadinessScore >= 60
        ? "Financing Ready"
        : financingReadinessScore >= 40
        ? "Developing"
        : "Early Stage";

    const financingStructures: string[] = [];

    if (roi >= 15) {
      financingStructures.push(
        "Sustainability-Linked Loan"
      );
    }

    if (carbonReduction >= 50) {
      financingStructures.push(
        "Green Retrofit Financing"
      );
    }

    if (assetValueIncrease >= 1000000) {
      financingStructures.push(
        "Institutional ESG Capital"
      );
    }

    if (
      financingStructures.length === 0
    ) {
      financingStructures.push(
        "Commercial Real Estate Loan Optimization"
      );

      financingStructures.push(
        "Energy Efficiency Incentive Programs"
      );

      financingStructures.push(
        "Utility Rebate Financing"
      );
    }

    const lowCaseSavings =
      totalAnnualSavings * 0.75;

    const highCaseSavings =
      totalAnnualSavings * 1.15;

    const lowCaseAssetValue =
      capRate > 0
        ? lowCaseSavings / capRate
        : 0;

    const highCaseAssetValue =
      capRate > 0
        ? highCaseSavings / capRate
        : 0;

    const opportunityMatrix: OpportunityItem[] = [
      {
        initiative:
          "Energy Efficiency",
        impact:
          energySavings > 0
            ? "High"
            : "Data Required",
        payback:
          energySavings > 0 && investment > 0
            ? `${(
                (investment * 0.4) /
                energySavings
              ).toFixed(1)} Years`
            : "N/A",
        priority:
          energySavings > 0
            ? "Immediate"
            : "Baseline",
      },
      {
        initiative:
          "Water Optimization",
        impact:
          waterSavings > 0
            ? "Medium"
            : "Data Required",
        payback:
          waterSavings > 0 && investment > 0
            ? `${(
                (investment * 0.2) /
                waterSavings
              ).toFixed(1)} Years`
            : "N/A",
        priority:
          waterSavings > 0
            ? "High"
            : "Baseline",
      },
      {
        initiative:
          "Maintenance Optimization",
        impact:
          maintenanceSavings > 0
            ? "Medium"
            : "Data Required",
        payback:
          maintenanceSavings > 0 &&
          investment > 0
            ? `${(
                (investment * 0.4) /
                maintenanceSavings
              ).toFixed(1)} Years`
            : "N/A",
        priority:
          maintenanceSavings > 0
            ? "Strategic"
            : "Baseline",
      },
    ];

    return {
      energyRate,
      waterRate,
      maintenanceRate,

      energySavings,
      waterSavings,
      maintenanceSavings,
      totalAnnualSavings,

      roi,
      paybackYears,
      assetValueIncrease,
      improvedNOI,

      npv,
      irr,

      estimatedEnergyReduction,
      carbonReduction,

      dataCompleteness,
      quantificationReady,

      oxyValueScore,

      riskExposureScore,
      riskCategory,

      capitalReadinessScore,
      financingReadinessScore,
      financingReadinessCategory,
      financingStructures,

      lowCaseSavings,
      highCaseSavings,
      lowCaseAssetValue,
      highCaseAssetValue,

      opportunityMatrix,

      horizon,
      discountRate,
    };
  }, [form]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = new FormData();

      payload.append(
        "_subject",
        `OXY Value Intelligence — ${
          client.company || "Real Estate Client"
        }`
      );

      payload.append(
        "_captcha",
        "false"
      );

      payload.append(
        "_template",
        "table"
      );

      payload.append(
        "Client Name",
        client.fullName
      );

      payload.append(
        "Company",
        client.company
      );

      payload.append(
        "Email",
        client.email
      );

      payload.append(
        "Currency",
        form.currency
      );

      payload.append(
        "Property Type",
        form.propertyType
      );

      payload.append(
        "Portfolio Area",
        form.portfolioArea
      );

      payload.append(
        "Number of Properties",
        form.numberOfProperties
      );

      payload.append(
        "Annual Energy Cost",
        form.annualEnergyCost
      );

      payload.append(
        "Annual Energy Consumption",
        form.annualEnergyConsumption
      );

      payload.append(
        "Energy Savings Rate",
        `${(
          results.energyRate * 100
        ).toFixed(1)}%`
      );

      payload.append(
        "Annual Water Cost",
        form.annualWaterCost
      );

      payload.append(
        "Annual Water Consumption",
        form.annualWaterConsumption
      );

      payload.append(
        "Water Savings Rate",
        `${(
          results.waterRate * 100
        ).toFixed(1)}%`
      );

      payload.append(
        "Annual Maintenance Cost",
        form.annualMaintenanceCost
      );

      payload.append(
        "Maintenance Savings Rate",
        `${(
          results.maintenanceRate * 100
        ).toFixed(1)}%`
      );

      payload.append(
        "Current NOI",
        form.currentNOI
      );

      payload.append(
        "Cap Rate",
        form.capRate
      );

      payload.append(
        "Occupancy Rate",
        form.occupancyRate
      );

      payload.append(
        "ESG Investment",
        form.esgInvestment
      );

      payload.append(
        "Investment Horizon",
        form.investmentHorizon
      );

      payload.append(
        "Discount Rate",
        form.discountRate
      );

      payload.append(
        "Carbon Emission Factor",
        form.carbonEmissionFactor
      );

      payload.append(
        "Certification",
        form.certification
      );

      payload.append(
        "Primary Objective",
        form.primaryObjective
      );

      payload.append(
        "Scenario",
        form.scenario
      );

      payload.append(
        "Data Confidence",
        form.dataConfidence
      );

      payload.append(
        "Estimated Annual Savings",
        formatCurrency(
          results.totalAnnualSavings
        )
      );

      payload.append(
        "ROI",
        `${results.roi.toFixed(1)}%`
      );

      payload.append(
        "Payback",
        `${results.paybackYears.toFixed(
          1
        )} years`
      );

      payload.append(
        "Asset Value Increase",
        formatCurrency(
          results.assetValueIncrease
        )
      );

      payload.append(
        "Improved NOI",
        formatCurrency(
          results.improvedNOI
        )
      );

      payload.append(
        "NPV",
        formatCurrency(
          results.npv
        )
      );

      payload.append(
        "IRR",
        `${results.irr.toFixed(1)}%`
      );

      payload.append(
        "Carbon Reduction",
        results.carbonReduction > 0
          ? `${results.carbonReduction.toFixed(
              1
            )} tCO₂e/year`
          : "Not quantified"
      );

      payload.append(
        "OXY Value Score",
        `${results.oxyValueScore}/100`
      );

      payload.append(
        "Data Completeness",
        `${results.dataCompleteness}%`
      );

      payload.append(
        "Quantification Readiness",
        results.quantificationReady
          ? "Ready"
          : "Additional Data Required"
      );

      payload.append(
        "Calculation Basis",
        "OXY Value Intelligence Calculation Basis v2.0 — September 2026"
      );

      await fetch(
        FORM_SUBMIT_ENDPOINT,
        {
          method: "POST",
          body: payload,
        }
      );

      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "Value Intelligence submission failed:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24">
        <section className="mx-auto max-w-xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm">
            <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              OXY VALUE INTELLIGENCE™
            </p>

            <h1 className="mt-6 text-center text-4xl font-bold text-[#10251E]">
              Private Client Access
            </h1>

            <p className="mt-4 text-center text-[#53645D]">
              Login required to access this proprietary
              financial intelligence platform.
            </p>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="mt-8 w-full rounded-xl border border-[#10251E]/15 p-4"
            />

            <div className="relative mt-4">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full rounded-xl border border-[#10251E]/15 p-4 pr-16"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#53645D]"
              >
                {showPassword
                  ? "Hide"
                  : "Show"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                if (
                  username ===
                    ADMIN_USERNAME &&
                  password ===
                    ADMIN_PASSWORD
                ) {
                  setIsAuthorized(true);
                } else {
                  alert(
                    "Invalid credentials"
                  );
                }
              }}
              className="mt-6 w-full rounded-full bg-[#10251E] px-6 py-4 font-semibold text-white"
            >
              Login
            </button>

            <a
              href="/contact"
              className="mt-6 block text-center text-[#3D6B4F] underline"
            >
              Request a Quote
            </a>
          </div>
        </section>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              OXY Value Intelligence™
            </p>

            <h1 className="mt-5 text-4xl font-bold md:text-6xl">
              Real Estate Financial Intelligence Report
            </h1>

            <p className="mt-5 text-xl text-[#53645D]">
              {client.company
                ? `Analysis prepared for ${client.company}.`
                : "Your financial intelligence analysis is complete."}
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Estimated Annual Savings"
                value={formatCurrency(
                  results.totalAnnualSavings
                )}
              />

              <MetricCard
                title="ROI"
                value={`${results.roi.toFixed(
                  1
                )}%`}
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
                title="NPV"
                value={formatCurrency(
                  results.npv
                )}
              />

              <MetricCard
                title="IRR"
                value={`${results.irr.toFixed(
                  1
                )}%`}
              />
            </div>

            <ReportSection
              title="Executive View"
              text={`Based on the information provided, the portfolio has a modeled annual operating savings opportunity of ${formatCurrency(
                results.totalAnnualSavings
              )}. This translates into an estimated NOI improvement of ${formatCurrency(
                results.totalAnnualSavings
              )}, subject to validation through detailed operational assessment and implementation.`}
            />

            <ReportSection
              title="Value Bridge"
              text={`The modeled value bridge moves from operating efficiency to annual savings, then to NOI improvement and, where a capitalization rate has been provided, an indicative asset-value impact. The valuation calculation is illustrative and should be validated against asset-specific valuation evidence.`}
            />

            <div className="mt-12">
              <h2 className="text-3xl font-bold">
                Scenario Analysis
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <MetricCard
                  title="Conservative"
                  value={formatCurrency(
                    results.lowCaseSavings
                  )}
                  subtitle="75% of modeled savings."
                />

                <MetricCard
                  title="Base"
                  value={formatCurrency(
                    results.totalAnnualSavings
                  )}
                  subtitle="Selected planning scenario."
                />

                <MetricCard
                  title="Upside"
                  value={formatCurrency(
                    results.highCaseSavings
                  )}
                  subtitle="115% of modeled savings."
                />
              </div>
            </div>

            <ReportSection
              title="Carbon Intelligence"
              text={
                results.carbonReduction > 0
                  ? `Based on the energy consumption and emission factor provided, the modeled energy-efficiency opportunity corresponds to approximately ${results.carbonReduction.toFixed(
                      1
                    )} tCO₂e of annual emissions reduction.`
                  : "Carbon reduction has not been quantified because an annual energy-consumption figure and emission factor were not both provided."
              }
            />

            <ReportSection
              title="Risk Intelligence"
              text={`Current modeled risk exposure is ${results.riskCategory}. This indicator is derived from the portfolio inputs provided and is intended as OXY decision-support analysis rather than an external risk rating.`}
            />

            <ReportSection
              title="Sustainable Finance"
              text={`The modeled financing-readiness category is ${results.financingReadinessCategory}. Potential structures identified from the submitted financial profile include ${results.financingStructures.join(
                ", "
              )}. Financing suitability requires lender-specific underwriting and asset-level due diligence.`}
            />

            <div className="mt-12">
              <h2 className="text-3xl font-bold">
                Opportunity Matrix
              </h2>

              <div className="mt-6 overflow-x-auto rounded-2xl border border-[#10251E]/10">
                <table className="w-full min-w-[650px] text-left">
                  <thead className="bg-[#ECFDF5]">
                    <tr>
                      <th className="p-4">
                        Initiative
                      </th>
                      <th className="p-4">
                        Impact
                      </th>
                      <th className="p-4">
                        Indicative Payback
                      </th>
                      <th className="p-4">
                        Priority
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {results.opportunityMatrix.map(
                      (item) => (
                        <tr
                          key={
                            item.initiative
                          }
                          className="border-t border-[#10251E]/10"
                        >
                          <td className="p-4 font-semibold">
                            {
                              item.initiative
                            }
                          </td>
                          <td className="p-4">
                            {item.impact}
                          </td>
                          <td className="p-4">
                            {item.payback}
                          </td>
                          <td className="p-4">
                            {item.priority}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                Calculation Basis
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                OXY Value Intelligence Calculation Basis v2.0
              </h2>

              <ul className="mt-6 space-y-3 leading-8 text-[#53645D]">
                <li>
                  • Scenario savings rates are
                  internal OXY planning assumptions,
                  not guarantees.
                </li>
                <li>
                  • Asset value impact is calculated
                  from incremental NOI divided by
                  the client-provided cap rate.
                </li>
                <li>
                  • NPV uses the client-provided
                  investment horizon and discount rate.
                </li>
                <li>
                  • IRR is calculated from the
                  modeled investment and annual
                  savings.
                </li>
                <li>
                  • Carbon calculations require
                  actual energy consumption and an
                  emission factor.
                </li>
                <li>
                  • Final savings and valuation
                  outcomes require asset-level
                  validation.
                </li>
              </ul>
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
                Recommended Next Step
              </p>

              <h2 className="mt-4 text-3xl font-bold md:text-4xl">
                OXY Implementation Intelligence™
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/80">
                Translate the quantified opportunity
                into an implementation roadmap,
                priorities, governance structure,
                and execution plan.
              </p>

              <a
                href="/assessments/real-estate/implementation-intelligence"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E]"
              >
                Continue to Implementation Intelligence
              </a>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold">
                Methodology Sources
              </h2>

              <div className="mt-5 space-y-3 text-[#53645D]">
                <a
                  href={SOURCES.dewaHandbook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  DEWA Energy Conservation Handbook 2025
                </a>

                <a
                  href={SOURCES.dewaDSM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  DEWA Demand Side Management Strategy 2050
                </a>

                <a
                  href={SOURCES.rics}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  RICS — ESG and Sustainability in Commercial Property Valuation
                </a>

                <a
                  href={SOURCES.energyStar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  ENERGY STAR — Energy Use Intensity
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY Value Intelligence™
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Quantify the Financial Value of Sustainability
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            Your Preliminary Assessment established the
            opportunity areas. This stage uses your actual
            portfolio and financial data to quantify
            savings, NOI impact, investment returns and
            indicative asset-value implications.
          </p>
        </div>

        {client.company && (
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white px-6 py-4 text-center shadow-sm">
            <span className="text-sm uppercase tracking-[0.2em] text-[#53645D]">
              Analysis for
            </span>

            <span className="ml-2 font-semibold">
              {client.company}
            </span>
          </div>
        )}

        {!client.company && (
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#D7E9DF] bg-white px-6 py-4 text-center text-sm text-[#53645D]">
            Client information will be attached automatically
            from the Preliminary Assessment.
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm md:p-12"
        >
          <FormSection
            number="01"
            title="Portfolio & Analysis Context"
            description="Establish the portfolio and financial context for the analysis."
          >
            <SelectField
              label="Currency"
              value={form.currency}
              onChange={(value) =>
                updateField(
                  "currency",
                  value as "AED" | "USD"
                )
              }
              options={["AED", "USD"]}
            />

            <SelectField
              label="Property Type"
              value={form.propertyType}
              onChange={(value) =>
                updateField(
                  "propertyType",
                  value
                )
              }
              options={[
                "Office",
                "Residential",
                "Retail",
                "Mixed Use",
                "Industrial",
                "Hospitality",
                "Other",
              ]}
            />

            <NumberField
              label="Total Portfolio Area"
              value={form.portfolioArea}
              onChange={(value) =>
                updateField(
                  "portfolioArea",
                  value
                )
              }
              placeholder="e.g. 250000"
              suffix="sq ft"
            />

            <NumberField
              label="Number of Properties"
              value={
                form.numberOfProperties
              }
              onChange={(value) =>
                updateField(
                  "numberOfProperties",
                  value
                )
              }
              placeholder="e.g. 12"
            />
          </FormSection>

          <FormSection
            number="02"
            title="Energy Intelligence"
            description="Enter actual annual energy costs and consumption where available."
          >
            <NumberField
              label="Annual Energy Cost"
              value={
                form.annualEnergyCost
              }
              onChange={(value) =>
                updateField(
                  "annualEnergyCost",
                  value
                )
              }
              placeholder="e.g. 2500000"
              prefix={form.currency}
            />

            <NumberField
              label="Annual Energy Consumption"
              value={
                form.annualEnergyConsumption
              }
              onChange={(value) =>
                updateField(
                  "annualEnergyConsumption",
                  value
                )
              }
              placeholder="e.g. 12500"
              suffix="MWh"
            />

            <NumberField
              label="Client-Specified Energy Savings Rate"
              value={
                form.energySavingsRate
              }
              onChange={(value) =>
                updateField(
                  "energySavingsRate",
                  value
                )
              }
              placeholder="Optional"
              suffix="%"
            />

            <div className="rounded-2xl bg-[#ECFDF5] p-5 text-sm leading-7 text-[#53645D]">
              If no client-specific rate is
              entered, the selected OXY planning
              scenario will be used. These are
              planning assumptions, not guaranteed
              savings.
            </div>
          </FormSection>

          <FormSection
            number="03"
            title="Water Intelligence"
            description="Quantify the water-cost opportunity using actual portfolio data."
          >
            <NumberField
              label="Annual Water Cost"
              value={
                form.annualWaterCost
              }
              onChange={(value) =>
                updateField(
                  "annualWaterCost",
                  value
                )
              }
              placeholder="e.g. 800000"
              prefix={form.currency}
            />

            <NumberField
              label="Annual Water Consumption"
              value={
                form.annualWaterConsumption
              }
              onChange={(value) =>
                updateField(
                  "annualWaterConsumption",
                  value
                )
              }
              placeholder="Optional"
              suffix="m³"
            />

            <NumberField
              label="Client-Specified Water Savings Rate"
              value={
                form.waterSavingsRate
              }
              onChange={(value) =>
                updateField(
                  "waterSavingsRate",
                  value
                )
              }
              placeholder="Optional"
              suffix="%"
            />
          </FormSection>

          <FormSection
            number="04"
            title="Maintenance Intelligence"
            description="Identify the potential operating-value contribution from maintenance optimization."
          >
            <NumberField
              label="Annual Maintenance Cost"
              value={
                form.annualMaintenanceCost
              }
              onChange={(value) =>
                updateField(
                  "annualMaintenanceCost",
                  value
                )
              }
              placeholder="e.g. 1200000"
              prefix={form.currency}
            />

            <NumberField
              label="Client-Specified Maintenance Savings Rate"
              value={
                form.maintenanceSavingsRate
              }
              onChange={(value) =>
                updateField(
                  "maintenanceSavingsRate",
                  value
                )
              }
              placeholder="Optional"
              suffix="%"
            />
          </FormSection>

          <FormSection
            number="05"
            title="Property Financials"
            description="These inputs connect operational savings to NOI and asset value."
          >
            <NumberField
              label="Current Annual NOI"
              value={form.currentNOI}
              onChange={(value) =>
                updateField(
                  "currentNOI",
                  value
                )
              }
              placeholder="e.g. 15000000"
              prefix={form.currency}
            />

            <NumberField
              label="Capitalization Rate"
              value={form.capRate}
              onChange={(value) =>
                updateField(
                  "capRate",
                  value
                )
              }
              placeholder="e.g. 7"
              suffix="%"
            />

            <NumberField
              label="Current Occupancy Rate"
              value={
                form.occupancyRate
              }
              onChange={(value) =>
                updateField(
                  "occupancyRate",
                  value
                )
              }
              placeholder="e.g. 92"
              suffix="%"
            />

            <NumberField
              label="Proposed ESG / Sustainability Investment"
              value={
                form.esgInvestment
              }
              onChange={(value) =>
                updateField(
                  "esgInvestment",
                  value
                )
              }
              placeholder="e.g. 3000000"
              prefix={form.currency}
            />
          </FormSection>

          <FormSection
            number="06"
            title="Investment & Valuation Assumptions"
            description="Set the financial horizon used for the modeled return analysis."
          >
            <NumberField
              label="Investment Horizon"
              value={
                form.investmentHorizon
              }
              onChange={(value) =>
                updateField(
                  "investmentHorizon",
                  value
                )
              }
              placeholder="10"
              suffix="years"
            />

            <NumberField
              label="Discount Rate"
              value={
                form.discountRate
              }
              onChange={(value) =>
                updateField(
                  "discountRate",
                  value
                )
              }
              placeholder="8"
              suffix="%"
            />

            <NumberField
              label="Carbon Emission Factor"
              value={
                form.carbonEmissionFactor
              }
              onChange={(value) =>
                updateField(
                  "carbonEmissionFactor",
                  value
                )
              }
              placeholder="Optional"
              suffix="tCO₂e/MWh"
            />

            <SelectField
              label="Existing Green Certification"
              value={
                form.certification
              }
              onChange={(value) =>
                updateField(
                  "certification",
                  value
                )
              }
              options={[
                "None",
                "LEED",
                "BREEAM",
                "WELL",
                "Estidama",
                "Other",
              ]}
            />
          </FormSection>

          <FormSection
            number="07"
            title="Strategic Direction"
            description="Define the commercial outcome this analysis should support."
          >
            <SelectField
              label="Primary Objective"
              value={
                form.primaryObjective
              }
              onChange={(value) =>
                updateField(
                  "primaryObjective",
                  value
                )
              }
              options={[
                "Reduce Operating Costs",
                "Increase Asset Value",
                "Improve NOI",
                "Reduce Carbon",
                "Improve Tenant Experience",
                "Improve Financing Readiness",
                "Portfolio ESG Strategy",
              ]}
            />

            <SelectField
              label="Planning Scenario"
              value={form.scenario}
              onChange={(value) =>
                updateField(
                  "scenario",
                  value as
                    | "Conservative"
                    | "Base"
                    | "Upside"
                )
              }
              options={[
                "Conservative",
                "Base",
                "Upside",
              ]}
            />

            <SelectField
              label="Data Confidence"
              value={
                form.dataConfidence
              }
              onChange={(value) =>
                updateField(
                  "dataConfidence",
                  value as
                    | "Low"
                    | "Moderate"
                    | "High"
                )
              }
              options={[
                "Low",
                "Moderate",
                "High",
              ]}
            />
          </FormSection>

          <div className="mt-12 rounded-[2rem] bg-[#10251E] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
              Live Analysis Preview
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-4">
              <PreviewMetric
                label="Annual Savings"
                value={formatCurrency(
                  results.totalAnnualSavings
                )}
              />

              <PreviewMetric
                label="ROI"
                value={`${results.roi.toFixed(
                  1
                )}%`}
              />

              <PreviewMetric
                label="Payback"
                value={`${results.paybackYears.toFixed(
                  1
                )} yrs`}
              />

              <PreviewMetric
                label="Asset Value"
                value={formatCurrency(
                  results.assetValueIncrease
                )}
              />
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#ECFDF5] p-6 text-sm leading-7 text-[#53645D]">
            <strong className="text-[#10251E]">
              Important:
            </strong>{" "}
            OXY Value Intelligence™ uses client-provided
            data and clearly identified OXY planning
            assumptions. Modeled savings, valuation
            impacts and financing indicators are not
            guarantees and should be validated through
            detailed asset-level assessment.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-10 w-full rounded-full bg-[#10251E] px-8 py-5 text-lg font-semibold text-white transition hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting
              ? "Generating Intelligence Report..."
              : "Generate OXY Value Intelligence™ Report"}
          </button>
        </form>
      </section>
    </main>
  );
}

function FormSection({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-b border-[#10251E]/10 py-12 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-5">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#DDF4E8] font-semibold text-[#3D6B4F]">
          {number}
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            {title}
          </h2>

          <p className="mt-2 text-[#53645D]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-7 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.18em] text-[#3D6B4F]">
        {label}
      </label>

      <div className="relative mt-3">
        {prefix && (
          <span className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[#53645D]">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min="0"
          step="any"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCFA] px-5 py-4 outline-none transition focus:border-[#3D6B4F] ${
            prefix ? "pl-14" : ""
          } ${
            suffix ? "pr-20" : ""
          }`}
        />

        {suffix && (
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-sm text-[#53645D]">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.18em] text-[#3D6B4F]">
        {label}
      </label>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCFA] px-5 py-4 outline-none focus:border-[#3D6B4F]"
      >
        <option value="">
          Select...
        </option>

        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
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
    <div className="rounded-2xl bg-[#ECFDF5] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
        {title}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

      {subtitle && (
        <p className="mt-2 text-sm text-[#53645D]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function PreviewMetric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-sm text-white/60">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}

function ReportSection({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <section className="mt-12">
      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
        {text}
      </p>
    </section>
  );
}