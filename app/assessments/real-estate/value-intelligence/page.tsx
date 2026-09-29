"use client";

import { useEffect, useMemo, useState } from "react";

type PreliminaryContext = {
  fullName: string;
  company: string;
  email: string;
  propertyType: string;
  portfolioSize: string;
  largestCost: string;
  tracksUtilities: string;
  occupancyRate: string;
  greenCertification: string;
  tenantDemand: string;
  primaryObjective: string;
  budget: string;
  timeline: string;
};

type FormData = {
  currency: "AED" | "USD";

  portfolioArea: string;
  numberOfProperties: string;

  annualEnergyCost: string;
  annualEnergyConsumption: string;

  annualWaterCost: string;
  annualWaterConsumption: string;

  annualMaintenanceCost: string;

  currentNOI: string;
  capRate: string;
  exactOccupancyRate: string;

  esgInvestment: string;
  investmentHorizon: string;
  discountRate: string;

  carbonEmissionFactor: string;

  scenario: "Conservative" | "Base" | "Upside";
  dataConfidence: "Low" | "Moderate" | "High";
};

const CLIENT_CONTEXT_KEY =
  "oxyRealEstateAssessmentClient";

const FORM_SUBMIT_ENDPOINT =
  "https://formsubmit.co/ajax/tooba@theoxybrief.com";

const ADMIN_USERNAME = "tooba";
const ADMIN_PASSWORD = "OXY_2026_FOUNDER!";

const FOUNDER_ACCESS_KEY =
  "oxyFounderValueIntelligenceAccess";

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

export default function ValueIntelligencePage() {
  const [authorized, setAuthorized] =
    useState(false);

  const [isFounderAccess, setIsFounderAccess] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [client, setClient] =
    useState<PreliminaryContext | null>(null);

  const [form, setForm] = useState<FormData>({
    currency: "AED",

    portfolioArea: "",
    numberOfProperties: "",

    annualEnergyCost: "",
    annualEnergyConsumption: "",

    annualWaterCost: "",
    annualWaterConsumption: "",

    annualMaintenanceCost: "",

    currentNOI: "",
    capRate: "",
    exactOccupancyRate: "",

    esgInvestment: "",
    investmentHorizon: "10",
    discountRate: "8",

    carbonEmissionFactor: "",

    scenario: "Base",
    dataConfidence: "Moderate",
  });

  /*
   * ACCESS + PRELIMINARY DATA HANDOFF
   *
   * Founder:
   * - If founder access was already established
   *   on this browser, go directly into the
   *   Value Intelligence form.
   *
   * Client:
   * - Preliminary Assessment information is loaded
   *   from sessionStorage.
   */

  useEffect(() => {
    try {
      const founderAccess =
        localStorage.getItem(
          FOUNDER_ACCESS_KEY
        );

      if (founderAccess === "true") {
        setIsFounderAccess(true);
        setAuthorized(true);
      }

      const saved =
        sessionStorage.getItem(
          CLIENT_CONTEXT_KEY
        );

      if (saved) {
        const parsed = JSON.parse(saved);

        setClient({
          fullName: parsed.fullName || "",
          company: parsed.company || "",
          email: parsed.email || "",
          propertyType:
            parsed.propertyType || "",
          portfolioSize:
            parsed.portfolioSize || "",
          largestCost:
            parsed.largestCost || "",
          tracksUtilities:
            parsed.tracksUtilities || "",
          occupancyRate:
            parsed.occupancyRate || "",
          greenCertification:
            parsed.greenCertification || "",
          tenantDemand:
            parsed.tenantDemand || "",
          primaryObjective:
            parsed.primaryObjective || "",
          budget: parsed.budget || "",
          timeline: parsed.timeline || "",
        });
      }
    } catch (error) {
      console.error(
        "Unable to load Value Intelligence access context:",
        error
      );
    }
  }, []);

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function formatMoney(value: number) {
    return new Intl.NumberFormat(
      "en-AE",
      {
        style: "currency",
        currency: form.currency,
        maximumFractionDigits: 0,
      }
    ).format(value || 0);
  }

  /*
   * FINANCIAL CALCULATION ENGINE
   */

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

    const capRate =
      (Number(form.capRate) || 0) / 100;

    const occupancy =
      Number(form.exactOccupancyRate) || 0;

    const investmentHorizon =
      Math.max(
        1,
        Number(form.investmentHorizon) || 10
      );

    const discountRate =
      (Number(form.discountRate) || 0) / 100;

    const scenario =
      SCENARIOS[form.scenario];

    const energySavings =
      energyCost * scenario.energy;

    const waterSavings =
      waterCost * scenario.water;

    const maintenanceSavings =
      maintenanceCost *
      scenario.maintenance;

    const annualSavings =
      energySavings +
      waterSavings +
      maintenanceSavings;

    const roi =
      investment > 0
        ? (annualSavings / investment) *
          100
        : 0;

    const payback =
      annualSavings > 0
        ? investment / annualSavings
        : 0;

    const incrementalNOI =
      annualSavings;

    const improvedNOI =
      currentNOI + incrementalNOI;

    const assetValueIncrease =
      capRate > 0
        ? incrementalNOI / capRate
        : 0;

    /*
     * NPV
     */

    let npv = -investment;

    for (
      let year = 1;
      year <= investmentHorizon;
      year++
    ) {
      npv +=
        annualSavings /
        Math.pow(
          1 + discountRate,
          year
        );
    }

    /*
     * IRR
     */

    let irr = 0;

    if (
      investment > 0 &&
      annualSavings > 0
    ) {
      irr =
        Math.pow(
          annualSavings / investment,
          1 / investmentHorizon
        ) - 1;
    }

    /*
     * CARBON
     */

    const energyConsumption =
      Number(
        form.annualEnergyConsumption
      ) || 0;

    const emissionFactor =
      Number(
        form.carbonEmissionFactor
      ) || 0;

    const carbonReduction =
      energyConsumption > 0 &&
      emissionFactor > 0
        ? energyConsumption *
          scenario.energy *
          emissionFactor
        : 0;

    /*
     * DATA COMPLETENESS
     */

    const quantitativeFields = [
      form.portfolioArea,
      form.numberOfProperties,
      form.annualEnergyCost,
      form.annualEnergyConsumption,
      form.annualWaterCost,
      form.annualWaterConsumption,
      form.annualMaintenanceCost,
      form.currentNOI,
      form.capRate,
      form.exactOccupancyRate,
      form.esgInvestment,
      form.investmentHorizon,
      form.discountRate,
      form.carbonEmissionFactor,
    ];

    const completedFields =
      quantitativeFields.filter(
        (value) => value !== ""
      ).length;

    const dataCompleteness =
      Math.round(
        (completedFields /
          quantitativeFields.length) *
          100
      );

    /*
     * VALUE SCORE
     */

    let valueScore = 50;

    if (roi >= 30) {
      valueScore += 20;
    } else if (roi >= 20) {
      valueScore += 15;
    } else if (roi >= 10) {
      valueScore += 10;
    }

    if (
      payback > 0 &&
      payback <= 3
    ) {
      valueScore += 15;
    } else if (
      payback > 0 &&
      payback <= 5
    ) {
      valueScore += 10;
    } else if (
      payback > 0 &&
      payback <= 7
    ) {
      valueScore += 5;
    }

    if (occupancy >= 90) {
      valueScore += 10;
    } else if (occupancy >= 80) {
      valueScore += 5;
    }

    valueScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(valueScore)
      )
    );

    /*
     * RISK
     */

    let riskScore = 40;

    if (
      occupancy > 0 &&
      occupancy < 85
    ) {
      riskScore += 30;
    } else if (
      occupancy > 0 &&
      occupancy < 90
    ) {
      riskScore += 15;
    }

    if (
      investment > 0 &&
      roi < 10
    ) {
      riskScore += 20;
    } else if (
      investment > 0 &&
      roi < 20
    ) {
      riskScore += 10;
    }

    riskScore = Math.max(
      0,
      Math.min(
        100,
        Math.round(riskScore)
      )
    );

    const riskCategory =
      riskScore >= 70
        ? "Elevated"
        : riskScore >= 40
        ? "Moderate"
        : "Managed";

    /*
     * FINANCING
     */

    let capitalReadiness =
      50;

    if (valueScore >= 80) {
      capitalReadiness += 30;
    } else if (
      valueScore >= 60
    ) {
      capitalReadiness += 20;
    } else {
      capitalReadiness += 10;
    }

    capitalReadiness = Math.max(
      0,
      Math.min(
        100,
        Math.round(
          capitalReadiness
        )
      )
    );

    const financingReadiness =
      Math.max(
        0,
        Math.min(
          100,
          Math.round(
            capitalReadiness *
              0.4 +
              Math.min(roi, 25) *
                2 +
              Math.max(
                0,
                10 - payback
              ) *
                3
          )
        )
      );

    const financingCategory =
      financingReadiness >= 80
        ? "Institutional Ready"
        : financingReadiness >= 60
        ? "Financing Ready"
        : financingReadiness >= 40
        ? "Developing"
        : "Early Stage";

    const financingStructures: string[] =
      [];

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

    if (
      assetValueIncrease >=
      1000000
    ) {
      financingStructures.push(
        "Institutional ESG Capital"
      );
    }

    if (
      financingStructures.length ===
      0
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

    /*
     * SENSITIVITY
     */

    const conservativeSavings =
      annualSavings * 0.75;

    const upsideSavings =
      annualSavings * 1.15;

    const conservativeValue =
      capRate > 0
        ? conservativeSavings /
          capRate
        : 0;

    const upsideValue =
      capRate > 0
        ? upsideSavings /
          capRate
        : 0;

    return {
      energySavings,
      waterSavings,
      maintenanceSavings,
      annualSavings,
      roi,
      payback,
      incrementalNOI,
      improvedNOI,
      assetValueIncrease,
      npv,
      irr,
      carbonReduction,
      dataCompleteness,
      valueScore,
      riskScore,
      riskCategory,
      capitalReadiness,
      financingReadiness,
      financingCategory,
      financingStructures,
      conservativeSavings,
      upsideSavings,
      conservativeValue,
      upsideValue,
    };
  }, [form]);

  /*
   * SUBMIT
   */

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const payload =
        new FormData();

      payload.append(
        "_subject",
        `OXY Value Intelligence — ${
          client?.company ||
          "Real Estate Client"
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

      /*
       * PRELIMINARY ASSESSMENT
       * INFORMATION — CARRIED FORWARD
       */

      payload.append(
        "Client Name",
        client?.fullName || ""
      );

      payload.append(
        "Company",
        client?.company || ""
      );

      payload.append(
        "Email",
        client?.email || ""
      );

      payload.append(
        "Property Type",
        client?.propertyType || ""
      );

      payload.append(
        "Portfolio Size",
        client?.portfolioSize || ""
      );

      payload.append(
        "Largest Operating Cost",
        client?.largestCost || ""
      );

      payload.append(
        "Tracks Utilities",
        client?.tracksUtilities || ""
      );

      payload.append(
        "Preliminary Occupancy",
        client?.occupancyRate || ""
      );

      payload.append(
        "Green Certification",
        client?.greenCertification ||
          ""
      );

      payload.append(
        "Tenant Demand",
        client?.tenantDemand || ""
      );

      payload.append(
        "Primary Objective",
        client?.primaryObjective ||
          ""
      );

      payload.append(
        "Preliminary Budget",
        client?.budget || ""
      );

      payload.append(
        "Preliminary Timeline",
        client?.timeline || ""
      );

      /*
       * NEW VALUE INTELLIGENCE
       * INFORMATION
       */

      payload.append(
        "Currency",
        form.currency
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
        "Annual Water Cost",
        form.annualWaterCost
      );

      payload.append(
        "Annual Water Consumption",
        form.annualWaterConsumption
      );

      payload.append(
        "Annual Maintenance Cost",
        form.annualMaintenanceCost
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
        "Exact Occupancy Rate",
        form.exactOccupancyRate
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
        "Scenario",
        form.scenario
      );

      payload.append(
        "Data Confidence",
        form.dataConfidence
      );

      /*
       * CALCULATED OUTPUTS
       */

      payload.append(
        "Modeled Annual Savings",
        formatMoney(
          results.annualSavings
        )
      );

      payload.append(
        "ROI",
        `${results.roi.toFixed(
          1
        )}%`
      );

      payload.append(
        "Payback",
        `${results.payback.toFixed(
          1
        )} years`
      );

      payload.append(
        "Incremental NOI",
        formatMoney(
          results.incrementalNOI
        )
      );

      payload.append(
        "Improved NOI",
        formatMoney(
          results.improvedNOI
        )
      );

      payload.append(
        "Indicative Asset Value Increase",
        formatMoney(
          results.assetValueIncrease
        )
      );

      payload.append(
        "NPV",
        formatMoney(results.npv)
      );

      payload.append(
        "IRR",
        `${(
          results.irr * 100
        ).toFixed(1)}%`
      );

      payload.append(
        "Carbon Reduction",
        results.carbonReduction >
          0
          ? `${results.carbonReduction.toFixed(
              1
            )} tCO₂e/year`
          : "Not quantified"
      );

      payload.append(
        "OXY Value Score",
        `${results.valueScore}/100`
      );

      payload.append(
        "Data Completeness",
        `${results.dataCompleteness}%`
      );

      payload.append(
        "Risk Category",
        results.riskCategory
      );

      payload.append(
        "Financing Readiness",
        results.financingCategory
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

  /*
   * PRIVATE ACCESS GATE
   */

  if (!authorized) {
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
              Login required to access this
              proprietary financial
              intelligence platform.
            </p>

            {client?.company && (
              <div className="mt-8 rounded-2xl bg-[#ECFDF5] p-5 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Preliminary Assessment
                  Completed
                </p>

                <p className="mt-2 font-semibold text-[#10251E]">
                  {client.company}
                </p>
              </div>
            )}

            <input
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(
                  event.target.value
                )
              }
              placeholder="Username"
              className="mt-8 w-full rounded-xl border border-[#10251E]/15 p-4"
            />

            <div className="relative mt-4">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(event) =>
                  setPassword(
                    event.target.value
                  )
                }
                placeholder="Password"
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
                  /*
                   * Successful founder login is
                   * remembered on this browser.
                   *
                   * This allows the founder to
                   * return directly to Value
                   * Intelligence without repeating
                   * Preliminary Assessment.
                   */

                  localStorage.setItem(
                    FOUNDER_ACCESS_KEY,
                    "true"
                  );

                  setIsFounderAccess(
                    true
                  );

                  setAuthorized(true);
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

            <p className="mt-6 text-center text-xs leading-6 text-[#53645D]">
              Authorized OXY access only.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /*
   * REPORT
   */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
        <section className="mx-auto max-w-6xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              OXY VALUE INTELLIGENCE™
            </p>

            <h1 className="mt-5 text-4xl font-bold md:text-6xl">
              Financial Intelligence
              Report
            </h1>

            {client?.company && (
              <p className="mt-5 text-xl text-[#53645D]">
                Prepared for{" "}
                <strong>
                  {client.company}
                </strong>
              </p>
            )}

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <Metric
                label="Annual Savings"
                value={formatMoney(
                  results.annualSavings
                )}
              />

              <Metric
                label="ROI"
                value={`${results.roi.toFixed(
                  1
                )}%`}
              />

              <Metric
                label="Payback"
                value={`${results.payback.toFixed(
                  1
                )} years`}
              />

              <Metric
                label="Incremental NOI"
                value={formatMoney(
                  results.incrementalNOI
                )}
              />

              <Metric
                label="Asset Value Impact"
                value={formatMoney(
                  results.assetValueIncrease
                )}
              />

              <Metric
                label="NPV"
                value={formatMoney(
                  results.npv
                )}
              />
            </div>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Executive View
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
                Based on the quantitative
                information provided, the
                portfolio has a modeled
                annual operating savings
                opportunity of{" "}
                <strong>
                  {formatMoney(
                    results.annualSavings
                  )}
                </strong>
                . This creates a modeled
                incremental NOI contribution
                of{" "}
                <strong>
                  {formatMoney(
                    results.incrementalNOI
                  )}
                </strong>
                .
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Value Bridge
              </h2>

              <div className="mt-6 grid gap-4 md:grid-cols-4">
                <Bridge
                  title="Operating Efficiency"
                  value={formatMoney(
                    results.annualSavings
                  )}
                />

                <Bridge
                  title="Annual Savings"
                  value={formatMoney(
                    results.annualSavings
                  )}
                />

                <Bridge
                  title="NOI Improvement"
                  value={formatMoney(
                    results.incrementalNOI
                  )}
                />

                <Bridge
                  title="Indicative Value Impact"
                  value={formatMoney(
                    results.assetValueIncrease
                  )}
                />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Scenario Analysis
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <Metric
                  label="Conservative"
                  value={formatMoney(
                    results.conservativeSavings
                  )}
                />

                <Metric
                  label="Base"
                  value={formatMoney(
                    results.annualSavings
                  )}
                />

                <Metric
                  label="Upside"
                  value={formatMoney(
                    results.upsideSavings
                  )}
                />
              </div>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Carbon Intelligence
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
                {results.carbonReduction >
                0
                  ? `The modeled energy opportunity corresponds to approximately ${results.carbonReduction.toFixed(
                      1
                    )} tCO₂e of annual emissions reduction.`
                  : "Carbon reduction has not been quantified because both annual energy consumption and an emission factor were not provided."}
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Risk Intelligence
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
                Current modeled risk exposure is{" "}
                <strong>
                  {results.riskCategory}
                </strong>
                . This is an OXY
                decision-support indicator,
                not an external risk rating.
              </p>
            </section>

            <section className="mt-12">
              <h2 className="text-3xl font-bold">
                Sustainable Finance
              </h2>

              <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
                The modeled financing
                readiness category is{" "}
                <strong>
                  {
                    results.financingCategory
                  }
                </strong>
                .
              </p>

              <ul className="mt-5 space-y-2 text-[#53645D]">
                {results.financingStructures.map(
                  (structure) => (
                    <li key={structure}>
                      • {structure}
                    </li>
                  )
                )}
              </ul>
            </section>

            <section className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-2xl font-bold">
                Calculation Basis
              </h2>

              <ul className="mt-5 space-y-3 leading-8 text-[#53645D]">
                <li>
                  • Energy, water and
                  maintenance savings use the
                  selected OXY planning scenario.
                </li>

                <li>
                  • Scenario percentages are
                  internal OXY planning
                  assumptions and are not
                  guarantees.
                </li>

                <li>
                  • Asset value impact is
                  incremental NOI divided by the
                  provided capitalization rate.
                </li>

                <li>
                  • NPV uses the stated investment
                  horizon and discount rate.
                </li>

                <li>
                  • Carbon is quantified only when
                  energy consumption and an
                  emission factor are available.
                </li>

                <li>
                  • Final savings and valuation
                  outcomes require asset-level
                  validation.
                </li>
              </ul>
            </section>

            <section className="mt-12">
              <h2 className="text-2xl font-bold">
                Methodology Sources
              </h2>

              <div className="mt-5 space-y-3 text-[#53645D]">
                <a
                  href={
                    SOURCES.dewaHandbook
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  DEWA Energy Conservation
                  Handbook 2025
                </a>

                <a
                  href={SOURCES.dewaDSM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  DEWA Demand Side
                  Management Strategy 2050
                </a>

                <a
                  href={SOURCES.rics}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  RICS — ESG and
                  Sustainability in Commercial
                  Property Valuation
                </a>

                <a
                  href={
                    SOURCES.energyStar
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block underline"
                >
                  ENERGY STAR — Energy Use
                  Intensity
                </a>
              </div>
            </section>

            <section className="mt-12 rounded-[2rem] bg-[#10251E] p-10 text-center text-white">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
                Next Stage
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                OXY Implementation
                Intelligence™
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
                Translate the quantified
                financial opportunity into an
                implementation roadmap.
              </p>

              <a
                href="/assessments/real-estate/implementation-intelligence"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E]"
              >
                Continue to Implementation
                Intelligence
              </a>
            </section>
          </div>
        </section>
      </main>
    );
  }

  /*
   * VALUE INTELLIGENCE FORM
   */

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY VALUE INTELLIGENCE™
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Quantify the Financial
            Value
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            Your Preliminary Assessment
            identified the opportunity. This
            stage collects only the additional
            quantitative information required
            to calculate financial value.
          </p>
        </div>

        {client?.company && (
          <div className="mx-auto mt-10 max-w-5xl rounded-2xl bg-white px-6 py-5 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
              Preliminary Assessment
              Connected
            </p>

            <p className="mt-2 text-lg font-semibold">
              {client.company}
            </p>

            <p className="mt-1 text-sm text-[#53645D]">
              {client.fullName}
            </p>
          </div>
        )}

        {!client?.company &&
          !isFounderAccess && (
            <div className="mx-auto mt-10 max-w-5xl rounded-2xl border border-[#D7E9DF] bg-white px-6 py-5 text-center">
              <p className="text-sm text-[#53645D]">
                No Preliminary Assessment
                information was found in this
                browser session.
              </p>

              <a
                href="/assessments/real-estate"
                className="mt-3 inline-block font-semibold text-[#3D6B4F] underline"
              >
                Complete Preliminary
                Assessment
              </a>
            </div>
          )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-[2rem] bg-white p-8 shadow-sm md:p-12"
        >
          <Section
            number="01"
            title="Portfolio Quantification"
            description="New quantitative information only."
          >
            <SelectField
              label="Currency"
              value={form.currency}
              onChange={(value) =>
                updateField(
                  "currency",
                  value as
                    | "AED"
                    | "USD"
                )
              }
              options={[
                "AED",
                "USD",
              ]}
            />

            <NumberField
              label="Total Portfolio Area"
              value={
                form.portfolioArea
              }
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

            <div className="rounded-2xl bg-[#ECFDF5] p-5 text-sm leading-7 text-[#53645D]">
              Property type and portfolio
              size were already captured in
              the Preliminary Assessment and
              are being carried forward
              automatically.
            </div>
          </Section>

          <Section
            number="02"
            title="Energy Quantification"
            description="Actual annual energy data used for savings and carbon calculations."
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
          </Section>

          <Section
            number="03"
            title="Water Quantification"
            description="Actual annual water data used to quantify the water opportunity."
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
          </Section>

          <Section
            number="04"
            title="Maintenance Quantification"
            description="Annual maintenance expenditure used to model operational savings."
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
          </Section>

          <Section
            number="05"
            title="Financial Value"
            description="Connect operational opportunities to NOI and asset value."
          >
            <NumberField
              label="Current Annual NOI"
              value={
                form.currentNOI
              }
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
              value={
                form.capRate
              }
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
              label="Exact Current Occupancy Rate"
              value={
                form.exactOccupancyRate
              }
              onChange={(value) =>
                updateField(
                  "exactOccupancyRate",
                  value
                )
              }
              placeholder="e.g. 92"
              suffix="%"
            />

            <div className="rounded-2xl bg-[#ECFDF5] p-5 text-sm leading-7 text-[#53645D]">
              The Preliminary Assessment
              captured your occupancy
              category. This field only asks
              for the actual percentage
              required for financial modelling.
            </div>

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
          </Section>

          <Section
            number="06"
            title="Investment Modelling"
            description="Financial assumptions required for return analysis."
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
          </Section>

          <Section
            number="07"
            title="Analysis Controls"
            description="These controls determine how OXY models the financial opportunity."
          >
            <SelectField
              label="Planning Scenario"
              value={
                form.scenario
              }
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
          </Section>

          <div className="mt-10 rounded-[2rem] bg-[#10251E] p-8 text-white">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
              Live Value Preview
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-4">
              <PreviewMetric
                label="Annual Savings"
                value={formatMoney(
                  results.annualSavings
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
                value={`${results.payback.toFixed(
                  1
                )} yrs`}
              />

              <PreviewMetric
                label="Asset Value Impact"
                value={formatMoney(
                  results.assetValueIncrease
                )}
              />
            </div>
          </div>

          <div className="mt-8 rounded-2xl bg-[#ECFDF5] p-6 text-sm leading-7 text-[#53645D]">
            <strong className="text-[#10251E]">
              Important:
            </strong>{" "}
            OXY planning scenarios are internal
            analytical assumptions. They are not
            guaranteed savings and should be
            validated using asset-level
            operational data.
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-8 w-full rounded-full bg-[#10251E] px-8 py-5 text-lg font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
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

/*
 * SECTION
 */

function Section({
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
    <section className="border-b border-[#10251E]/10 py-12 first:pt-0">
      <div className="flex gap-5">
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

/*
 * NUMBER FIELD
 */

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
          onChange={(event) =>
            onChange(
              event.target.value
            )
          }
          placeholder={placeholder}
          className={`w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCFA] px-5 py-4 outline-none focus:border-[#3D6B4F] ${
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

/*
 * SELECT FIELD
 */

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
        onChange={(event) =>
          onChange(
            event.target.value
          )
        }
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCFA] px-5 py-4 outline-none focus:border-[#3D6B4F]"
      >
        <option value="">
          Select...
        </option>

        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          )
        )}
      </select>
    </div>
  );
}

/*
 * REPORT METRIC
 */

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#ECFDF5] p-6">
      <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
        {label}
      </p>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

/*
 * VALUE BRIDGE
 */

function Bridge({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#ECFDF5] p-5">
      <p className="text-sm font-semibold text-[#53645D]">
        {title}
      </p>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

/*
 * LIVE PREVIEW
 */

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