"use client";

import { useMemo, useState } from "react";

type Currency = "AED" | "USD";

type Scenario = "Conservative" | "Base" | "Upside";

type FormData = {
  clientName: string;
  company: string;
  email: string;

  currency: Currency;

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

  scenario: Scenario;
  dataConfidence: string;
};

type OpportunityItem = {
  initiative: string;
  basis: string;
  annualImpact: number;
  investmentAllocation: number;
  payback: number | null;
  priority: string;
};

type CalculationBasis = {
  metric: string;
  input: string;
  formula: string;
  assumption: string;
  confidence: string;
};

const ADMIN_USERNAME = "tooba";
const ADMIN_PASSWORD = "OXY_2026_FOUNDER!";

const FORM_ENDPOINT =
  "https://formsubmit.co/ajax/tooba@theoxybrief.com";

const SCENARIOS: Record<
  Scenario,
  {
    energy: number;
    water: number;
    maintenance: number;
  }
> = {
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
    "https://www.dewa.gov.ae/en/about-us/media-publications/latest-news/2020/01/hh-sheikh-ahmed-bin-saeed-al-maktoum-issues",

  rics:
    "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/esg-and-sustainability-in-commercial-property-valuation",

  energyStar:
    "https://www.energystar.gov/buildings/benchmark/understand-metrics/what-eui",
};

export default function RealEstateValueIntelligencePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /*
   * PAID / PRIVATE CLIENT GATE
   * Kept intentionally as requested.
   */
  const accessRestricted = true;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [form, setForm] = useState<FormData>({
    clientName: "",
    company: "",
    email: "",

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
    dataConfidence: "",
  });

  function updateField<K extends keyof FormData>(
    field: K,
    value: FormData[K]
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function formatCurrency(value: number) {
    if (!Number.isFinite(value)) return "—";

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: form.currency,
      maximumFractionDigits: 0,
    }).format(value);
  }

  function formatNumber(value: number, decimals = 0) {
    if (!Number.isFinite(value)) return "—";

    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: decimals,
      minimumFractionDigits: decimals,
    }).format(value);
  }

  function getNumber(value: string) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  /*
   * Proper IRR calculation using Newton-Raphson.
   * Cash flow:
   * Year 0 = -initial investment
   * Years 1..N = annual savings
   */
  function calculateIRR(
    initialInvestment: number,
    annualCashFlow: number,
    years: number
  ) {
    if (
      initialInvestment <= 0 ||
      annualCashFlow <= 0 ||
      years <= 0
    ) {
      return null;
    }

    let rate = 0.1;

    for (let iteration = 0; iteration < 100; iteration++) {
      let npv = -initialInvestment;
      let derivative = 0;

      for (let year = 1; year <= years; year++) {
        npv +=
          annualCashFlow /
          Math.pow(1 + rate, year);

        derivative +=
          (-year * annualCashFlow) /
          Math.pow(1 + rate, year + 1);
      }

      if (Math.abs(derivative) < 0.0000001) {
        break;
      }

      const nextRate =
        rate - npv / derivative;

      if (
        !Number.isFinite(nextRate) ||
        nextRate <= -0.99 ||
        nextRate > 10
      ) {
        break;
      }

      if (Math.abs(nextRate - rate) < 0.000001) {
        rate = nextRate;
        break;
      }

      rate = nextRate;
    }

    return Number.isFinite(rate) ? rate * 100 : null;
  }

  const results = useMemo(() => {
    const portfolioArea = getNumber(
      form.portfolioArea
    );

    const numberOfProperties = getNumber(
      form.numberOfProperties
    );

    const energyCost = getNumber(
      form.annualEnergyCost
    );

    const energyConsumption = getNumber(
      form.annualEnergyConsumption
    );

    const waterCost = getNumber(
      form.annualWaterCost
    );

    const waterConsumption = getNumber(
      form.annualWaterConsumption
    );

    const maintenanceCost = getNumber(
      form.annualMaintenanceCost
    );

    const currentNOI = getNumber(
      form.currentNOI
    );

    const capRatePercent = getNumber(
      form.capRate
    );

    const occupancyRate = getNumber(
      form.occupancyRate
    );

    const esgInvestment = getNumber(
      form.esgInvestment
    );

    const investmentHorizon = Math.max(
      1,
      getNumber(form.investmentHorizon) || 10
    );

    const discountRatePercent = Math.max(
      0,
      getNumber(form.discountRate) || 8
    );

    const emissionFactor = getNumber(
      form.carbonEmissionFactor
    );

    /*
     * ---------------------------------------------------------
     * SAVINGS ASSUMPTION ENGINE
     * ---------------------------------------------------------
     *
     * Client-provided rates override OXY planning assumptions.
     *
     * If the client does not provide a rate, the selected
     * scenario is used.
     *
     * These are planning assumptions, NOT measured savings.
     */
    const scenarioRates =
      SCENARIOS[form.scenario];

    const energyRate =
      form.energySavingsRate !== ""
        ? getNumber(form.energySavingsRate) / 100
        : scenarioRates.energy;

    const waterRate =
      form.waterSavingsRate !== ""
        ? getNumber(form.waterSavingsRate) / 100
        : scenarioRates.water;

    const maintenanceRate =
      form.maintenanceSavingsRate !== ""
        ? getNumber(
            form.maintenanceSavingsRate
          ) / 100
        : scenarioRates.maintenance;

    /*
     * Prevent impossible assumptions.
     */
    const safeEnergyRate = Math.min(
      Math.max(energyRate, 0),
      1
    );

    const safeWaterRate = Math.min(
      Math.max(waterRate, 0),
      1
    );

    const safeMaintenanceRate = Math.min(
      Math.max(maintenanceRate, 0),
      1
    );

    /*
     * ---------------------------------------------------------
     * ANNUAL SAVINGS
     * ---------------------------------------------------------
     */

    const energySavings =
      energyCost > 0
        ? energyCost * safeEnergyRate
        : 0;

    const waterSavings =
      waterCost > 0
        ? waterCost * safeWaterRate
        : 0;

    const maintenanceSavings =
      maintenanceCost > 0
        ? maintenanceCost *
          safeMaintenanceRate
        : 0;

    const totalAnnualSavings =
      energySavings +
      waterSavings +
      maintenanceSavings;

    /*
     * ---------------------------------------------------------
     * INVESTMENT / PAYBACK / ROI
     * ---------------------------------------------------------
     */

    const roi =
      esgInvestment > 0
        ? (totalAnnualSavings /
            esgInvestment) *
          100
        : null;

    const paybackYears =
      totalAnnualSavings > 0 &&
      esgInvestment > 0
        ? esgInvestment /
          totalAnnualSavings
        : null;

    /*
     * ---------------------------------------------------------
     * NOI / VALUE
     * ---------------------------------------------------------
     *
     * We only calculate value impact if BOTH:
     * - incremental operating savings exist
     * - client supplied a cap rate
     *
     * This follows the logic that incremental stabilized NOI
     * can be capitalised using an applicable yield/cap rate.
     *
     * OXY does NOT invent a cap rate.
     */
    const capRate =
      capRatePercent > 0
        ? capRatePercent / 100
        : 0;

    const incrementalNOI =
      totalAnnualSavings;

    const improvedNOI =
      currentNOI > 0
        ? currentNOI +
          incrementalNOI
        : null;

    const assetValueIncrease =
      capRate > 0 &&
      incrementalNOI > 0
        ? incrementalNOI / capRate
        : null;

    /*
     * ---------------------------------------------------------
     * NPV
     * ---------------------------------------------------------
     */

    const discountRate =
      discountRatePercent / 100;

    let npv =
      esgInvestment > 0
        ? -esgInvestment
        : 0;

    if (totalAnnualSavings > 0) {
      for (
        let year = 1;
        year <= investmentHorizon;
        year++
      ) {
        npv +=
          totalAnnualSavings /
          Math.pow(
            1 + discountRate,
            year
          );
      }
    }

    /*
     * ---------------------------------------------------------
     * IRR
     * ---------------------------------------------------------
     */

    const irr = calculateIRR(
      esgInvestment,
      totalAnnualSavings,
      investmentHorizon
    );

    /*
     * ---------------------------------------------------------
     * CARBON INTELLIGENCE
     * ---------------------------------------------------------
     *
     * Carbon is calculated ONLY if:
     * - annual energy consumption is provided
     * - emission factor is provided
     *
     * Energy consumption is expected in MWh/year.
     *
     * Result = MWh savings × tCO2e/MWh
     */
    const energyMWhSaved =
      energyConsumption > 0
        ? energyConsumption *
          safeEnergyRate
        : 0;

    const co2Reduction =
      energyMWhSaved > 0 &&
      emissionFactor > 0
        ? energyMWhSaved *
          emissionFactor
        : null;

    /*
     * ---------------------------------------------------------
     * DATA COMPLETENESS
     * ---------------------------------------------------------
     */

    const requiredFields = [
      form.clientName,
      form.company,
      form.email,
      form.propertyType,
      form.portfolioArea,
      form.numberOfProperties,
      form.annualEnergyCost,
      form.annualWaterCost,
      form.annualMaintenanceCost,
      form.currentNOI,
      form.capRate,
      form.occupancyRate,
      form.esgInvestment,
      form.primaryObjective,
    ];

    const completedFields =
      requiredFields.filter(
        (value) =>
          value !== ""
      ).length;

    const dataCompleteness =
      Math.round(
        (completedFields /
          requiredFields.length) *
          100
      );

    let dataReadiness =
      "Limited";

    if (dataCompleteness >= 90) {
      dataReadiness = "Strong";
    } else if (
      dataCompleteness >= 70
    ) {
      dataReadiness = "Good";
    } else if (
      dataCompleteness >= 50
    ) {
      dataReadiness = "Developing";
    }

    /*
     * ---------------------------------------------------------
     * QUANTIFICATION READINESS
     * ---------------------------------------------------------
     */

    const hasOperatingCostData =
      energyCost > 0 ||
      waterCost > 0 ||
      maintenanceCost > 0;

    const hasValuationData =
      currentNOI > 0 &&
      capRate > 0;

    let quantificationReadiness =
      "Data Required";

    if (
      hasOperatingCostData &&
      hasValuationData
    ) {
      quantificationReadiness =
        "Quantifiable";
    } else if (
      hasOperatingCostData
    ) {
      quantificationReadiness =
        "Partially Quantifiable";
    }

    /*
     * ---------------------------------------------------------
     * OXY VALUE SCORE
     * ---------------------------------------------------------
     *
     * This is a proprietary decision-support score,
     * not an external ESG rating.
     *
     * It combines:
     * - financial opportunity
     * - data readiness
     * - valuation readiness
     * - operational opportunity
     */
    let oxyValueScore = 0;

    if (
      roi !== null &&
      roi >= 20
    ) {
      oxyValueScore += 30;
    } else if (
      roi !== null &&
      roi >= 10
    ) {
      oxyValueScore += 20;
    } else if (
      roi !== null &&
      roi > 0
    ) {
      oxyValueScore += 10;
    }

    if (
      paybackYears !== null &&
      paybackYears <= 3
    ) {
      oxyValueScore += 20;
    } else if (
      paybackYears !== null &&
      paybackYears <= 5
    ) {
      oxyValueScore += 15;
    } else if (
      paybackYears !== null &&
      paybackYears <= 7
    ) {
      oxyValueScore += 10;
    }

    if (dataCompleteness >= 90) {
      oxyValueScore += 20;
    } else if (
      dataCompleteness >= 70
    ) {
      oxyValueScore += 15;
    } else if (
      dataCompleteness >= 50
    ) {
      oxyValueScore += 10;
    }

    if (hasValuationData) {
      oxyValueScore += 20;
    }

    oxyValueScore = Math.min(
      100,
      Math.round(oxyValueScore)
    );

    /*
     * ---------------------------------------------------------
     * RISK INTELLIGENCE
     * ---------------------------------------------------------
     *
     * This is a diagnostic exposure indicator,
     * not a prediction.
     */
    let riskExposureScore = 25;

    if (
      occupancyRate > 0 &&
      occupancyRate < 85
    ) {
      riskExposureScore += 25;
    } else if (
      occupancyRate > 0 &&
      occupancyRate < 90
    ) {
      riskExposureScore += 15;
    }

    if (!hasValuationData) {
      riskExposureScore += 15;
    }

    if (
      dataCompleteness < 70
    ) {
      riskExposureScore += 15;
    }

    if (
      totalAnnualSavings <= 0
    ) {
      riskExposureScore += 10;
    }

    riskExposureScore = Math.min(
      100,
      Math.round(
        riskExposureScore
      )
    );

    let riskCategory =
      "Managed";

    if (
      riskExposureScore >= 70
    ) {
      riskCategory = "Elevated";
    } else if (
      riskExposureScore >= 45
    ) {
      riskCategory = "Moderate";
    }

    /*
     * ---------------------------------------------------------
     * SUSTAINABLE FINANCE INTELLIGENCE
     * ---------------------------------------------------------
     */

    let capitalReadinessScore =
      dataCompleteness * 0.4;

    if (hasValuationData) {
      capitalReadinessScore += 20;
    }

    if (
      roi !== null &&
      roi >= 15
    ) {
      capitalReadinessScore += 20;
    } else if (
      roi !== null &&
      roi >= 8
    ) {
      capitalReadinessScore += 10;
    }

    if (
      co2Reduction !== null &&
      co2Reduction > 0
    ) {
      capitalReadinessScore += 10;
    }

    capitalReadinessScore =
      Math.min(
        100,
        Math.round(
          capitalReadinessScore
        )
      );

    let capitalReadinessCategory =
      "Emerging";

    if (
      capitalReadinessScore >= 80
    ) {
      capitalReadinessCategory =
        "Strong";
    } else if (
      capitalReadinessScore >= 60
    ) {
      capitalReadinessCategory =
        "Developing";
    }

    /*
     * ---------------------------------------------------------
     * FINANCING READINESS
     * ---------------------------------------------------------
     */

    let financingReadinessScore =
      dataCompleteness * 0.35;

    if (hasValuationData) {
      financingReadinessScore += 20;
    }

    if (
      roi !== null &&
      roi >= 15
    ) {
      financingReadinessScore += 20;
    }

    if (
      paybackYears !== null &&
      paybackYears <= 5
    ) {
      financingReadinessScore += 15;
    }

    if (
      co2Reduction !== null
    ) {
      financingReadinessScore += 10;
    }

    financingReadinessScore =
      Math.min(
        100,
        Math.round(
          financingReadinessScore
        )
      );

    let financingReadinessCategory =
      "Early Stage";

    if (
      financingReadinessScore >= 80
    ) {
      financingReadinessCategory =
        "Institutional Ready";
    } else if (
      financingReadinessScore >= 60
    ) {
      financingReadinessCategory =
        "Financing Ready";
    } else if (
      financingReadinessScore >= 40
    ) {
      financingReadinessCategory =
        "Developing";
    }

    /*
     * ---------------------------------------------------------
     * FINANCING STRUCTURES
     * ---------------------------------------------------------
     *
     * These are potential structures to investigate,
     * NOT financing offers or eligibility determinations.
     */
    const financingStructures: string[] =
      [];

    if (
      totalAnnualSavings > 0
    ) {
      financingStructures.push(
        "Energy / sustainability retrofit financing"
      );
    }

    if (
      co2Reduction !== null &&
      co2Reduction > 0
    ) {
      financingStructures.push(
        "Green or sustainability-linked financing review"
      );
    }

    if (
      hasValuationData
    ) {
      financingStructures.push(
        "Asset-backed capital / refinancing review"
      );
    }

    if (
      financingStructures.length ===
      0
    ) {
      financingStructures.push(
        "Establish operating and ESG baseline before financing assessment"
      );
    }

    /*
     * ---------------------------------------------------------
     * OPPORTUNITY MATRIX
     * ---------------------------------------------------------
     */

    const opportunityMatrix: OpportunityItem[] =
      [];

    if (energySavings > 0) {
      opportunityMatrix.push({
        initiative:
          "Energy Performance",
        basis:
          `${formatCurrency(
            energyCost
          )} annual energy cost × ${(safeEnergyRate * 100).toFixed(
            1
          )}% planning opportunity`,
        annualImpact:
          energySavings,
        investmentAllocation:
          esgInvestment > 0
            ? esgInvestment * 0.4
            : 0,
        payback:
          esgInvestment > 0 &&
          energySavings > 0
            ? (esgInvestment * 0.4) /
              energySavings
            : null,
        priority:
          energySavings >=
          waterSavings
            ? "Priority"
            : "Secondary",
      });
    }

    if (waterSavings > 0) {
      opportunityMatrix.push({
        initiative:
          "Water Performance",
        basis:
          `${formatCurrency(
            waterCost
          )} annual water cost × ${(safeWaterRate * 100).toFixed(
            1
          )}% planning opportunity`,
        annualImpact:
          waterSavings,
        investmentAllocation:
          esgInvestment > 0
            ? esgInvestment * 0.2
            : 0,
        payback:
          esgInvestment > 0 &&
          waterSavings > 0
            ? (esgInvestment * 0.2) /
              waterSavings
            : null,
        priority:
          waterSavings >
          energySavings
            ? "Priority"
            : "Secondary",
      });
    }

    if (
      maintenanceSavings > 0
    ) {
      opportunityMatrix.push({
        initiative:
          "Maintenance & Asset Operations",
        basis:
          `${formatCurrency(
            maintenanceCost
          )} annual maintenance cost × ${(safeMaintenanceRate * 100).toFixed(
            1
          )}% planning opportunity`,
        annualImpact:
          maintenanceSavings,
        investmentAllocation:
          esgInvestment > 0
            ? esgInvestment * 0.4
            : 0,
        payback:
          esgInvestment > 0 &&
          maintenanceSavings > 0
            ? (esgInvestment * 0.4) /
              maintenanceSavings
            : null,
        priority: "Strategic",
      });
    }

    /*
     * ---------------------------------------------------------
     * SENSITIVITY
     * ---------------------------------------------------------
     *
     * These are scenario sensitivities around the chosen
     * planning case. They are NOT probabilities.
     */
    const lowCaseSavings =
      totalAnnualSavings * 0.8;

    const highCaseSavings =
      totalAnnualSavings * 1.2;

    const lowCaseValue =
      capRate > 0
        ? lowCaseSavings /
          capRate
        : null;

    const highCaseValue =
      capRate > 0
        ? highCaseSavings /
          capRate
        : null;

    /*
     * ---------------------------------------------------------
     * CONFIDENCE
     * ---------------------------------------------------------
     */

    let confidence =
      "Preliminary";

    if (
      dataCompleteness >= 90 &&
      hasValuationData &&
      form.dataConfidence ===
        "Audited / independently verified"
    ) {
      confidence = "High";
    } else if (
      dataCompleteness >= 70
    ) {
      confidence = "Medium";
    }

    /*
     * ---------------------------------------------------------
     * CALCULATION BASIS
     * ---------------------------------------------------------
     */

    const calculationBasis: CalculationBasis[] =
      [
        {
          metric:
            "Energy savings",
          input:
            "Annual energy cost",
          formula:
            "Annual energy cost × applicable savings assumption",
          assumption:
            form.energySavingsRate !== ""
              ? "Client-provided planning rate"
              : `${form.scenario} OXY planning scenario: ${(safeEnergyRate * 100).toFixed(
                  1
                )}%`,
          confidence:
            energyCost > 0
              ? "Medium / scenario-based"
              : "Data required",
        },
        {
          metric:
            "Water savings",
          input:
            "Annual water cost",
          formula:
            "Annual water cost × applicable savings assumption",
          assumption:
            form.waterSavingsRate !== ""
              ? "Client-provided planning rate"
              : `${form.scenario} OXY planning scenario: ${(safeWaterRate * 100).toFixed(
                  1
                )}%`,
          confidence:
            waterCost > 0
              ? "Medium / scenario-based"
              : "Data required",
        },
        {
          metric:
            "Maintenance savings",
          input:
            "Annual maintenance cost",
          formula:
            "Annual maintenance cost × applicable savings assumption",
          assumption:
            form.maintenanceSavingsRate !== ""
              ? "Client-provided planning rate"
              : `${form.scenario} OXY planning scenario: ${(safeMaintenanceRate * 100).toFixed(
                  1
                )}%`,
          confidence:
            maintenanceCost > 0
              ? "Medium / scenario-based"
              : "Data required",
        },
        {
          metric:
            "NOI impact",
          input:
            "Incremental operating savings",
          formula:
            "Incremental operating savings added to current NOI",
          assumption:
            "Assumes savings are recurring and flow through to NOI; actual treatment requires validation.",
          confidence:
            currentNOI > 0
              ? "Medium"
              : "Data required",
        },
        {
          metric:
            "Indicative value impact",
          input:
            "Incremental NOI + client cap rate",
          formula:
            "Incremental NOI ÷ cap rate",
          assumption:
            "Indicative capitalization calculation only; not a formal valuation.",
          confidence:
            hasValuationData
              ? "Medium"
              : "Data required",
        },
        {
          metric:
            "NPV",
          input:
            "Investment + annual savings + discount rate",
          formula:
            "Initial investment + discounted annual cash flows",
          assumption:
            `${investmentHorizon}-year horizon at ${discountRatePercent}% discount rate.`,
          confidence:
            esgInvestment > 0
              ? "Scenario-based"
              : "Data required",
        },
        {
          metric:
            "Carbon reduction",
          input:
            "Energy consumption + savings rate + emission factor",
          formula:
            "MWh saved × tCO₂e/MWh",
          assumption:
            emissionFactor > 0
              ? "Client-provided emission factor."
              : "Emission factor not provided.",
          confidence:
            co2Reduction !== null
              ? "Medium"
              : "Data required",
        },
      ];

    return {
      portfolioArea,
      numberOfProperties,

      energyCost,
      energyConsumption,
      energyRate:
        safeEnergyRate,

      waterCost,
      waterConsumption,
      waterRate:
        safeWaterRate,

      maintenanceCost,
      maintenanceRate:
        safeMaintenanceRate,

      energySavings,
      waterSavings,
      maintenanceSavings,
      totalAnnualSavings,

      roi,
      paybackYears,

      currentNOI,
      incrementalNOI,
      improvedNOI,

      capRate,
      assetValueIncrease,

      npv,
      irr,

      lowCaseSavings,
      highCaseSavings,
      lowCaseValue,
      highCaseValue,

      energyMWhSaved,
      co2Reduction,

      dataCompleteness,
      dataReadiness,
      quantificationReadiness,
      confidence,

      oxyValueScore,

      riskExposureScore,
      riskCategory,

      capitalReadinessScore,
      capitalReadinessCategory,

      financingReadinessScore,
      financingReadinessCategory,
      financingStructures,

      opportunityMatrix,
      calculationBasis,

      scenarioRates,
      discountRatePercent,
      investmentHorizon,
    };
  }, [form]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      const payload = {
        _subject:
          `OXY Value Intelligence™ — ${form.company}`,
        _captcha: "false",

        clientName:
          form.clientName,
        company:
          form.company,
        email:
          form.email,

        assessment:
          "OXY Value Intelligence™",

        currency:
          form.currency,

        propertyType:
          form.propertyType,
        portfolioArea:
          form.portfolioArea,
        numberOfProperties:
          form.numberOfProperties,

        annualEnergyCost:
          form.annualEnergyCost,
        annualEnergyConsumption:
          form.annualEnergyConsumption,
        energySavingsRate:
          form.energySavingsRate ||
          `${(
            results.energyRate * 100
          ).toFixed(1)}% OXY scenario`,

        annualWaterCost:
          form.annualWaterCost,
        annualWaterConsumption:
          form.annualWaterConsumption,
        waterSavingsRate:
          form.waterSavingsRate ||
          `${(
            results.waterRate * 100
          ).toFixed(1)}% OXY scenario`,

        annualMaintenanceCost:
          form.annualMaintenanceCost,
        maintenanceSavingsRate:
          form.maintenanceSavingsRate ||
          `${(
            results.maintenanceRate *
            100
          ).toFixed(1)}% OXY scenario`,

        currentNOI:
          form.currentNOI,
        capRate:
          form.capRate,
        occupancyRate:
          form.occupancyRate,

        esgInvestment:
          form.esgInvestment,
        investmentHorizon:
          form.investmentHorizon,
        discountRate:
          form.discountRate,

        carbonEmissionFactor:
          form.carbonEmissionFactor,

        certification:
          form.certification,

        primaryObjective:
          form.primaryObjective,

        scenario:
          form.scenario,

        dataConfidence:
          form.dataConfidence,

        /*
         * Calculated outputs
         */
        calculatedAnnualSavings:
          results.totalAnnualSavings,

        calculatedROI:
          results.roi,

        calculatedPayback:
          results.paybackYears,

        calculatedNOIImpact:
          results.incrementalNOI,

        calculatedAssetValueImpact:
          results.assetValueIncrease,

        calculatedNPV:
          results.npv,

        calculatedIRR:
          results.irr,

        calculatedCO2Reduction:
          results.co2Reduction,

        oxyValueScore:
          results.oxyValueScore,

        dataReadiness:
          results.dataReadiness,

        quantificationReadiness:
          results.quantificationReadiness,

        calculationBasisVersion:
          "OXY Value Intelligence Calculation Basis v2.0 — September 2026",
      };

      const response =
        await fetch(
          FORM_ENDPOINT,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
              Accept:
                "application/json",
            },
            body:
              JSON.stringify(payload),
          }
        );

      if (!response.ok) {
        throw new Error(
          "Submission failed."
        );
      }

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

      alert(
        "The report could not be submitted. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /*
   * ==========================================================
   * PRIVATE CLIENT ACCESS
   * ==========================================================
   */

  if (
    accessRestricted &&
    !isAuthorized
  ) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24">
        <section className="mx-auto max-w-xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-12">

            <p className="text-center text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              OXY VALUE INTELLIGENCE™
            </p>

            <h1 className="mt-6 text-center text-4xl font-bold text-[#10251E] md:text-5xl">
              Private Client Access
            </h1>

            <p className="mt-5 text-center leading-8 text-[#53645D]">
              OXY Value Intelligence™ is a
              proprietary financial intelligence
              assessment available through
              private client access.
            </p>

            <div className="mt-8 rounded-2xl bg-[#ECFDF5] p-5 text-sm leading-7 text-[#53645D]">
              Your preliminary assessment
              identifies opportunity areas.
              This layer translates validated
              property data into financial,
              operational, valuation and
              sustainable-finance intelligence.
            </div>

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              className="mt-8 w-full rounded-xl border border-[#10251E]/15 bg-white p-4 outline-none focus:border-[#3D6B4F]"
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
                  setPassword(
                    e.target.value
                  )
                }
                className="w-full rounded-xl border border-[#10251E]/15 bg-white p-4 pr-16 outline-none focus:border-[#3D6B4F]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-[#3D6B4F]"
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
              className="mt-6 w-full rounded-full bg-[#10251E] px-6 py-4 font-semibold text-white transition hover:bg-[#163528]"
            >
              Access Value Intelligence
            </button>

            <a
              href="/contact"
              className="mt-6 block text-center text-[#3D6B4F] underline"
            >
              Request Private Client Access
            </a>

            <p className="mt-8 text-center text-xs leading-6 text-[#53645D]">
              OXY Value Intelligence™ is
              intended as a decision-support
              assessment. It does not constitute
              a formal property valuation,
              audit, investment recommendation
              or financing approval.
            </p>
          </div>
        </section>
      </main>
    );
  }

  /*
   * ==========================================================
   * REPORT
   * ==========================================================
   */

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-16 text-[#10251E] md:px-16 md:py-24">
        <section className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-14">

            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              OXY VALUE INTELLIGENCE™
            </p>

            <h1 className="mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
              Real Estate Financial Intelligence Report
            </h1>

            <p className="mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
              A property-level financial,
              operational and sustainability
              intelligence assessment based
              on the data and assumptions
              supplied for this analysis.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <StatusBadge
                label={`Scenario: ${form.scenario}`}
              />

              <StatusBadge
                label={`Confidence: ${results.confidence}`}
              />

              <StatusBadge
                label={`Data Readiness: ${results.dataReadiness}`}
              />

              <StatusBadge
                label={`Quantification: ${results.quantificationReadiness}`}
              />
            </div>

            {/* ================================================= */}
            {/* CORE FINANCIAL KPIs */}
            {/* ================================================= */}

            <div className="mt-12 grid gap-6 md:grid-cols-3">

              <MetricCard
                title="Annual Operating Opportunity"
                value={
                  results.totalAnnualSavings >
                  0
                    ? formatCurrency(
                        results.totalAnnualSavings
                      )
                    : "Data Required"
                }
                subtitle="Scenario-based recurring operating opportunity."
              />

              <MetricCard
                title="ROI"
                value={
                  results.roi !== null
                    ? `${results.roi.toFixed(
                        1
                      )}%`
                    : "Data Required"
                }
                subtitle="Annual operating opportunity ÷ proposed investment."
              />

              <MetricCard
                title="Payback"
                value={
                  results.paybackYears !==
                  null
                    ? `${results.paybackYears.toFixed(
                        1
                      )} years`
                    : "Data Required"
                }
                subtitle="Simple payback based on the selected scenario."
              />

              <MetricCard
                title="Indicative Value Impact"
                value={
                  results.assetValueIncrease !==
                  null
                    ? formatCurrency(
                        results.assetValueIncrease
                      )
                    : "Cap Rate Required"
                }
                subtitle="Incremental NOI ÷ client-provided cap rate."
              />

              <MetricCard
                title="OXY Value Score™"
                value={`${results.oxyValueScore} / 100`}
                subtitle="OXY proprietary decision-support indicator."
              />

              <MetricCard
                title="Data Readiness"
                value={
                  results.dataReadiness
                }
                subtitle={`${results.dataCompleteness}% of core assessment inputs completed.`}
              />
            </div>

            {/* ================================================= */}
            {/* IMPORTANT METHODOLOGY */}
            {/* ================================================= */}

            <div className="mt-12 rounded-[2rem] border border-[#3D6B4F]/20 bg-[#F4FAF6] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                IMPORTANT
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                How the numbers should be interpreted
              </h2>

              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                The financial outputs are
                scenario-based unless supported
                by client-provided measured data,
                audited information or validated
                project assumptions.
              </p>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                OXY does not treat generic
                savings percentages as measured
                building performance. DEWA's
                published handbook provides
                measure-level potential savings
                but expressly notes that
                project-specific applicability
                and savings require assessment
                or an energy audit.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <a
                  href={SOURCES.dewaHandbook}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#3D6B4F] underline"
                >
                  DEWA Energy Conservation Handbook 2025
                </a>

                <a
                  href={SOURCES.rics}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-[#3D6B4F] underline"
                >
                  RICS ESG & Commercial Property Valuation
                </a>
              </div>
            </div>

            {/* ================================================= */}
            {/* EXECUTIVE SUMMARY */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="EXECUTIVE VIEW"
              title="What the analysis indicates"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <InsightCard
                title="Operating Value"
                text={
                  results.totalAnnualSavings >
                  0
                    ? `The selected scenario indicates approximately ${formatCurrency(
                        results.totalAnnualSavings
                      )} of annual operating opportunity across energy, water and maintenance.`
                    : "Operating cost data is required before a financial opportunity can be quantified."
                }
              />

              <InsightCard
                title="NOI & Valuation"
                text={
                  results.assetValueIncrease !==
                  null
                    ? `If the identified operating savings are validated as recurring NOI and the supplied ${form.capRate}% cap rate is applicable, the indicative capitalization impact is ${formatCurrency(
                        results.assetValueIncrease
                      )}.`
                    : "A current NOI and applicable cap rate are required before an indicative capitalization calculation can be produced."
                }
              />

              <InsightCard
                title="Capital Position"
                text={`Capital readiness is assessed at ${results.capitalReadinessScore}/100 based on data completeness, financial opportunity, valuation inputs and available carbon information.`}
              />

              <InsightCard
                title="Implementation Readiness"
                text={
                  results.dataCompleteness >=
                  70
                    ? "The portfolio has sufficient core information to move toward a structured implementation and validation programme."
                    : "Additional property, operating and financial data should be assembled before implementation economics are treated as decision-grade."
                }
              />
            </div>

            {/* ================================================= */}
            {/* VALUE BRIDGE */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="VALUE BRIDGE"
              title="From operating performance to asset value"
            />

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#10251E]/10">
              <div className="grid md:grid-cols-4">

                <BridgeCard
                  label="01"
                  title="Baseline"
                  value={formatCurrency(
                    energyCostSafe(
                      form.annualEnergyCost
                    ) +
                      energyCostSafe(
                        form.annualWaterCost
                      ) +
                      energyCostSafe(
                        form.annualMaintenanceCost
                      )
                  )}
                  subtitle="Annual identified operating costs"
                />

                <BridgeCard
                  label="02"
                  title="Opportunity"
                  value={formatCurrency(
                    results.totalAnnualSavings
                  )}
                  subtitle="Scenario-based annual savings"
                />

                <BridgeCard
                  label="03"
                  title="NOI"
                  value={
                    results.improvedNOI !==
                    null
                      ? formatCurrency(
                          results.improvedNOI
                        )
                      : "Requires NOI"
                  }
                  subtitle="Current NOI + recurring savings"
                />

                <BridgeCard
                  label="04"
                  title="Value"
                  value={
                    results.assetValueIncrease !==
                    null
                      ? formatCurrency(
                          results.assetValueIncrease
                        )
                      : "Requires Cap Rate"
                  }
                  subtitle="Indicative NOI capitalization"
                />
              </div>
            </div>

            {/* ================================================= */}
            {/* SCENARIO ANALYSIS */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="SCENARIO ANALYSIS"
              title="Operating opportunity scenarios"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <MetricCard
                title="Conservative"
                value={formatCurrency(
                  results.lowCaseSavings
                )}
                subtitle="80% of selected scenario."
              />

              <MetricCard
                title="Selected Scenario"
                value={formatCurrency(
                  results.totalAnnualSavings
                )}
                subtitle={`${form.scenario} planning case.`}
              />

              <MetricCard
                title="Upside"
                value={formatCurrency(
                  results.highCaseSavings
                )}
                subtitle="120% of selected scenario."
              />
            </div>

            <p className="mt-5 text-sm leading-7 text-[#53645D]">
              Sensitivity cases illustrate
              planning ranges. They are not
              probability forecasts and should
              not be presented as guaranteed
              outcomes.
            </p>

            {/* ================================================= */}
            {/* ENERGY / WATER / MAINTENANCE */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="OPERATING INTELLIGENCE"
              title="Where the opportunity comes from"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <OpportunityCard
                title="Energy Performance"
                baseline={formatCurrency(
                  results.energyCost
                )}
                savings={formatCurrency(
                  results.energySavings
                )}
                rate={`${(
                  results.energyRate *
                  100
                ).toFixed(1)}%`}
              />

              <OpportunityCard
                title="Water Performance"
                baseline={formatCurrency(
                  results.waterCost
                )}
                savings={formatCurrency(
                  results.waterSavings
                )}
                rate={`${(
                  results.waterRate *
                  100
                ).toFixed(1)}%`}
              />

              <OpportunityCard
                title="Maintenance & Operations"
                baseline={formatCurrency(
                  results.maintenanceCost
                )}
                savings={formatCurrency(
                  results.maintenanceSavings
                )}
                rate={`${(
                  results.maintenanceRate *
                  100
                ).toFixed(1)}%`}
              />
            </div>

            {/* ================================================= */}
            {/* CARBON */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="CARBON INTELLIGENCE"
              title="Energy-to-carbon translation"
            />

            {results.co2Reduction !==
            null ? (
              <div className="mt-6 grid gap-6 md:grid-cols-3">

                <MetricCard
                  title="Energy Saved"
                  value={`${formatNumber(
                    results.energyMWhSaved,
                    1
                  )} MWh`}
                  subtitle="Scenario-based energy reduction."
                />

                <MetricCard
                  title="Estimated CO₂e Reduction"
                  value={`${formatNumber(
                    results.co2Reduction,
                    1
                  )} tCO₂e`}
                  subtitle="Based on the supplied emission factor."
                />

                <MetricCard
                  title="Emission Factor"
                  value={`${formatNumber(
                    getNumber(
                      form.carbonEmissionFactor
                    ),
                    3
                  )} tCO₂e/MWh`}
                  subtitle="Client-provided factor."
                />
              </div>
            ) : (
              <div className="mt-6 rounded-3xl bg-[#F4FAF6] p-8">
                <h3 className="text-2xl font-bold">
                  Carbon quantification requires two additional inputs
                </h3>

                <p className="mt-4 text-lg leading-8 text-[#53645D]">
                  Provide annual energy consumption
                  in MWh and an applicable
                  emission factor to calculate
                  an energy-to-carbon result.
                </p>
              </div>
            )}

            {/* ================================================= */}
            {/* RISK */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="RISK INTELLIGENCE"
              title="Operational & transition exposure"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <MetricCard
                title="Risk Exposure Score™"
                value={`${results.riskExposureScore} / 100`}
                subtitle="Diagnostic indicator of identified exposure."
              />

              <MetricCard
                title="Risk Category"
                value={results.riskCategory}
                subtitle="Based on occupancy, data readiness, valuation inputs and financial opportunity."
              />
            </div>

            <div className="mt-6 rounded-3xl bg-[#F4FAF6] p-8">
              <p className="text-lg leading-8 text-[#53645D]">
                A higher exposure score does
                not predict a future event. It
                indicates areas where additional
                evidence, controls, resilience
                measures or financial analysis
                may be warranted.
              </p>
            </div>

            {/* ================================================= */}
            {/* SUSTAINABLE FINANCE */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="SUSTAINABLE FINANCE INTELLIGENCE™"
              title="Capital readiness"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <MetricCard
                title="Capital Readiness"
                value={`${results.capitalReadinessScore} / 100`}
                subtitle={results.capitalReadinessCategory}
              />

              <MetricCard
                title="Financing Readiness"
                value={`${results.financingReadinessScore} / 100`}
                subtitle={results.financingReadinessCategory}
              />

              <MetricCard
                title="Potential Structures"
                value={`${results.financingStructures.length}`}
                subtitle="Structures identified for further assessment."
              />
            </div>

            <div className="mt-6 rounded-3xl bg-[#F4FAF6] p-8">

              <h3 className="text-2xl font-bold">
                Potential financing pathways
              </h3>

              <ul className="mt-5 space-y-3 text-lg leading-8 text-[#53645D]">
                {results.financingStructures.map(
                  (structure, index) => (
                    <li key={index}>
                      • {structure}
                    </li>
                  )
                )}
              </ul>

              <p className="mt-6 text-sm leading-7 text-[#53645D]">
                These are analytical pathways
                for further investigation, not
                financing approvals, offers or
                eligibility determinations.
              </p>
            </div>

            {/* ================================================= */}
            {/* NPV / IRR */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="INVESTMENT ECONOMICS"
              title="Cash-flow analysis"
            />

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <MetricCard
                title="NPV"
                value={
                  esgInvestmentSafe(
                    form.esgInvestment
                  ) > 0
                    ? formatCurrency(
                        results.npv
                      )
                    : "Investment Required"
                }
                subtitle={`${results.investmentHorizon}-year analysis at ${results.discountRatePercent}% discount rate.`}
              />

              <MetricCard
                title="IRR"
                value={
                  results.irr !== null
                    ? `${results.irr.toFixed(
                        1
                      )}%`
                    : "Investment Required"
                }
                subtitle="Calculated from initial investment and recurring annual savings."
              />

              <MetricCard
                title="Investment"
                value={formatCurrency(
                  esgInvestmentSafe(
                    form.esgInvestment
                  )
                )}
                subtitle="Client-provided proposed ESG investment."
              />
            </div>

            {/* ================================================= */}
            {/* OPPORTUNITY MATRIX */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="OPPORTUNITY PRIORITISATION"
              title="Value opportunity matrix"
            />

            <div className="mt-6 overflow-x-auto rounded-3xl border border-[#10251E]/10">
              <table className="w-full min-w-[760px]">
                <thead className="bg-[#DDF5E7]">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Initiative
                    </th>
                    <th className="px-6 py-4 text-left">
                      Annual Opportunity
                    </th>
                    <th className="px-6 py-4 text-left">
                      Illustrative Allocation
                    </th>
                    <th className="px-6 py-4 text-left">
                      Payback
                    </th>
                    <th className="px-6 py-4 text-left">
                      Priority
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {results.opportunityMatrix.map(
                    (
                      item,
                      index
                    ) => (
                      <tr
                        key={index}
                        className="border-t border-[#10251E]/10"
                      >
                        <td className="px-6 py-5 font-semibold">
                          {item.initiative}
                        </td>

                        <td className="px-6 py-5">
                          {formatCurrency(
                            item.annualImpact
                          )}
                        </td>

                        <td className="px-6 py-5">
                          {item.investmentAllocation >
                          0
                            ? formatCurrency(
                                item.investmentAllocation
                              )
                            : "Not supplied"}
                        </td>

                        <td className="px-6 py-5">
                          {item.payback !==
                          null
                            ? `${item.payback.toFixed(
                                1
                              )} years`
                            : "N/A"}
                        </td>

                        <td className="px-6 py-5 font-semibold text-[#3D6B4F]">
                          {item.priority}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>

            {/* ================================================= */}
            {/* CALCULATION BASIS */}
            {/* ================================================= */}

            <SectionTitle
              eyebrow="OXY CALCULATION BASIS"
              title="How this report was calculated"
            />

            <p className="mt-4 max-w-4xl text-lg leading-8 text-[#53645D]">
              This calculation basis is intended
              to make the analytical chain visible:
              input → formula → assumption →
              output → confidence.
            </p>

            <div className="mt-6 space-y-5">
              {results.calculationBasis.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="rounded-3xl bg-[#F4FAF6] p-7"
                  >
                    <div className="grid gap-6 md:grid-cols-5">

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                          Metric
                        </p>

                        <p className="mt-2 font-bold">
                          {item.metric}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                          Input
                        </p>

                        <p className="mt-2 text-[#53645D]">
                          {item.input}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                          Formula
                        </p>

                        <p className="mt-2 text-[#53645D]">
                          {item.formula}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                          Assumption
                        </p>

                        <p className="mt-2 text-[#53645D]">
                          {item.assumption}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                          Confidence
                        </p>

                        <p className="mt-2 font-semibold text-[#3D6B4F]">
                          {item.confidence}
                        </p>
                      </div>

                    </div>
                  </div>
                )
              )}
            </div>

            {/* ================================================= */}
            {/* METHODOLOGY NOTES */}
            {/* ================================================= */}

            <div className="mt-12 rounded-[2rem] border border-[#10251E]/10 bg-white p-8">

              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                METHODOLOGY NOTE
              </p>

              <h2 className="mt-4 text-3xl font-bold">
                OXY Value Intelligence™ v2.0
              </h2>

              <div className="mt-6 space-y-4 text-lg leading-8 text-[#53645D]">

                <p>
                  Operating savings are calculated
                  from supplied annual cost data
                  and explicitly identified
                  planning assumptions.
                </p>

                <p>
                  Asset-value impact is presented
                  only where a cap rate has been
                  supplied. The calculation is an
                  indicative capitalization exercise,
                  not a formal valuation.
                </p>

                <p>
                  NPV uses the client's selected
                  investment horizon and discount
                  rate rather than a hidden OXY
                  discount-rate assumption.
                </p>

                <p>
                  Carbon calculations require
                  annual energy consumption and
                  an applicable emission factor.
                </p>

                <p>
                  The OXY Value Score™ is a
                  proprietary decision-support
                  indicator and is not an external
                  ESG certification, rating or
                  investment grade.
                </p>

              </div>

              <div className="mt-6 flex flex-wrap gap-5">

                <a
                  href={SOURCES.dewaHandbook}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#3D6B4F] underline"
                >
                  DEWA Energy Conservation Handbook
                </a>

                <a
                  href={SOURCES.dewaDSM}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#3D6B4F] underline"
                >
                  Dubai Demand Side Management
                </a>

                <a
                  href={SOURCES.rics}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#3D6B4F] underline"
                >
                  RICS ESG Valuation Standard
                </a>

                <a
                  href={SOURCES.energyStar}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-[#3D6B4F] underline"
                >
                  ENERGY STAR EUI Methodology
                </a>

              </div>
            </div>

            {/* ================================================= */}
            {/* NEXT STEP */}
            {/* ================================================= */}

            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">

              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#9AC7B0]">
                OXY IMPLEMENTATION INTELLIGENCE™
              </p>

              <h2 className="mx-auto mt-5 max-w-4xl text-3xl font-bold md:text-5xl">
                Translate identified value into an implementation roadmap.
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/80">
                The next OXY layer converts
                the identified financial and
                operational opportunities into
                initiatives, timelines, governance,
                KPIs, capital allocation and value
                realisation planning.
              </p>

              <a
                href="/assessments/real-estate/implementation-intelligence"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E]"
              >
                Build My OXY Implementation Intelligence™ Roadmap
              </a>
            </div>

          </div>
        </section>
      </main>
    );
  }

  /*
   * ==========================================================
   * FORM
   * ==========================================================
   */

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-16 text-[#10251E] md:px-16 md:py-24">

      <section className="mx-auto max-w-6xl">

        <div className="text-center">

          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY VALUE INTELLIGENCE™
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
            Real Estate Financial Intelligence Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#53645D]">
            Provide the operating, financial and
            sustainability inputs required to
            translate property performance into
            measurable value intelligence.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-14 rounded-[2rem] bg-white p-8 shadow-sm md:p-12"
        >

          {/* ================================================= */}
          {/* CLIENT */}
          {/* ================================================= */}

          <FormSection
            number="01"
            title="Client & Portfolio"
            description="Identify the portfolio and establish the analysis context."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label="Client Name"
              value={form.clientName}
              onChange={(value) =>
                updateField(
                  "clientName",
                  value
                )
              }
              placeholder="Client name"
              required
            />

            <InputField
              label="Company"
              value={form.company}
              onChange={(value) =>
                updateField(
                  "company",
                  value
                )
              }
              placeholder="Company / ownership group"
              required
            />

            <InputField
              label="Email"
              value={form.email}
              onChange={(value) =>
                updateField(
                  "email",
                  value
                )
              }
              placeholder="name@company.com"
              type="email"
              required
            />

            <SelectField
              label="Currency"
              value={form.currency}
              onChange={(value) =>
                updateField(
                  "currency",
                  value as Currency
                )
              }
              options={[
                "AED",
                "USD",
              ]}
              required
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
                "Commercial Office",
                "Retail",
                "Hospitality",
                "Residential / Multifamily",
                "Industrial / Warehouse",
                "Mixed Use",
                "Other",
              ]}
              required
            />

            <InputField
              label="Portfolio Area"
              value={form.portfolioArea}
              onChange={(value) =>
                updateField(
                  "portfolioArea",
                  value
                )
              }
              placeholder="e.g. 250000"
              required
            />

            <InputField
              label="Number of Properties"
              value={form.numberOfProperties}
              onChange={(value) =>
                updateField(
                  "numberOfProperties",
                  value
                )
              }
              placeholder="e.g. 12"
              required
            />

            <SelectField
              label="Data Confidence"
              value={form.dataConfidence}
              onChange={(value) =>
                updateField(
                  "dataConfidence",
                  value
                )
              }
              options={[
                "Audited / independently verified",
                "Internally validated",
                "Management estimate",
                "Preliminary estimate",
              ]}
              required
            />

          </div>

          {/* ================================================= */}
          {/* ENERGY */}
          {/* ================================================= */}

          <FormSection
            number="02"
            title="Energy Intelligence"
            description="Use actual annual energy cost and, where available, metered consumption."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label={`Annual Energy Cost (${form.currency})`}
              value={form.annualEnergyCost}
              onChange={(value) =>
                updateField(
                  "annualEnergyCost",
                  value
                )
              }
              placeholder="e.g. 1500000"
              required
            />

            <InputField
              label="Annual Energy Consumption (MWh)"
              value={form.annualEnergyConsumption}
              onChange={(value) =>
                updateField(
                  "annualEnergyConsumption",
                  value
                )
              }
              placeholder="Optional — e.g. 12500"
            />

            <InputField
              label="Energy Savings Assumption (%)"
              value={form.energySavingsRate}
              onChange={(value) =>
                updateField(
                  "energySavingsRate",
                  value
                )
              }
              placeholder={`Leave blank to use ${form.scenario.toLowerCase()} OXY scenario`}
              help="Use a validated/client-provided planning rate where available."
            />

          </div>

          {/* ================================================= */}
          {/* WATER */}
          {/* ================================================= */}

          <FormSection
            number="03"
            title="Water Intelligence"
            description="Use annual water cost and, where available, metered consumption."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label={`Annual Water Cost (${form.currency})`}
              value={form.annualWaterCost}
              onChange={(value) =>
                updateField(
                  "annualWaterCost",
                  value
                )
              }
              placeholder="e.g. 250000"
              required
            />

            <InputField
              label="Annual Water Consumption (m³)"
              value={form.annualWaterConsumption}
              onChange={(value) =>
                updateField(
                  "annualWaterConsumption",
                  value
                )
              }
              placeholder="Optional — e.g. 50000"
            />

            <InputField
              label="Water Savings Assumption (%)"
              value={form.waterSavingsRate}
              onChange={(value) =>
                updateField(
                  "waterSavingsRate",
                  value
                )
              }
              placeholder={`Leave blank to use ${form.scenario.toLowerCase()} OXY scenario`}
              help="Use a validated/client-provided planning rate where available."
            />

          </div>

          {/* ================================================= */}
          {/* MAINTENANCE */}
          {/* ================================================= */}

          <FormSection
            number="04"
            title="Maintenance & Operations"
            description="Capture recurring maintenance expenditure and the applicable planning assumption."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label={`Annual Maintenance Cost (${form.currency})`}
              value={form.annualMaintenanceCost}
              onChange={(value) =>
                updateField(
                  "annualMaintenanceCost",
                  value
                )
              }
              placeholder="e.g. 500000"
              required
            />

            <InputField
              label="Maintenance Savings Assumption (%)"
              value={form.maintenanceSavingsRate}
              onChange={(value) =>
                updateField(
                  "maintenanceSavingsRate",
                  value
                )
              }
              placeholder={`Leave blank to use ${form.scenario.toLowerCase()} OXY scenario`}
              help="Use a validated/client-provided planning rate where available."
            />

          </div>

          {/* ================================================= */}
          {/* VALUATION */}
          {/* ================================================= */}

          <FormSection
            number="05"
            title="NOI & Asset Value"
            description="These inputs determine whether the operating opportunity can be translated into an indicative capitalization impact."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label={`Current NOI (${form.currency})`}
              value={form.currentNOI}
              onChange={(value) =>
                updateField(
                  "currentNOI",
                  value
                )
              }
              placeholder="e.g. 5000000"
              required
            />

            <InputField
              label="Current Cap Rate (%)"
              value={form.capRate}
              onChange={(value) =>
                updateField(
                  "capRate",
                  value
                )
              }
              placeholder="e.g. 6.5"
              required
            />

            <InputField
              label="Occupancy Rate (%)"
              value={form.occupancyRate}
              onChange={(value) =>
                updateField(
                  "occupancyRate",
                  value
                )
              }
              placeholder="e.g. 94"
              required
            />

          </div>

          {/* ================================================= */}
          {/* INVESTMENT */}
          {/* ================================================= */}

          <FormSection
            number="06"
            title="Investment Economics"
            description="Define the proposed investment and the client's financial analysis parameters."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label={`Proposed ESG / Efficiency Investment (${form.currency})`}
              value={form.esgInvestment}
              onChange={(value) =>
                updateField(
                  "esgInvestment",
                  value
                )
              }
              placeholder="e.g. 1000000"
              required
            />

            <InputField
              label="Investment Horizon (Years)"
              value={form.investmentHorizon}
              onChange={(value) =>
                updateField(
                  "investmentHorizon",
                  value
                )
              }
              placeholder="10"
              required
            />

            <InputField
              label="Discount Rate (%)"
              value={form.discountRate}
              onChange={(value) =>
                updateField(
                  "discountRate",
                  value
                )
              }
              placeholder="8"
              required
              help="Use the client's approved discount rate where available."
            />

          </div>

          {/* ================================================= */}
          {/* CARBON */}
          {/* ================================================= */}

          <FormSection
            number="07"
            title="Carbon Intelligence"
            description="Optional inputs allow OXY to translate energy savings into an estimated carbon result."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <InputField
              label="Emission Factor (tCO₂e/MWh)"
              value={form.carbonEmissionFactor}
              onChange={(value) =>
                updateField(
                  "carbonEmissionFactor",
                  value
                )
              }
              placeholder="Optional — use applicable verified factor"
              help="Do not enter a value unless the factor is appropriate to the portfolio's electricity source and accounting basis."
            />

            <SelectField
              label="Existing Certification"
              value={form.certification}
              onChange={(value) =>
                updateField(
                  "certification",
                  value
                )
              }
              options={[
                "LEED",
                "BREEAM",
                "WELL",
                "EDGE",
                "Al Sa'fat / Dubai Green Building System",
                "Other certification",
                "In progress",
                "None",
                "Not sure",
              ]}
            />

          </div>

          {/* ================================================= */}
          {/* STRATEGY */}
          {/* ================================================= */}

          <FormSection
            number="08"
            title="Strategic Objective"
            description="Select the principal value-creation objective for the analysis."
          />

          <div className="grid gap-8 md:grid-cols-2">

            <SelectField
              label="Primary Objective"
              value={form.primaryObjective}
              onChange={(value) =>
                updateField(
                  "primaryObjective",
                  value
                )
              }
              options={[
                "Increase Asset Value",
                "Reduce Operating Costs",
                "Improve NOI",
                "Improve ESG Performance",
                "Attract Capital",
                "Improve Resilience",
                "Prepare for Future Requirements",
              ]}
              required
            />

            <SelectField
              label="OXY Planning Scenario"
              value={form.scenario}
              onChange={(value) =>
                updateField(
                  "scenario",
                  value as Scenario
                )
              }
              options={[
                "Conservative",
                "Base",
                "Upside",
              ]}
              required
            />

          </div>

          {/* ================================================= */}
          {/* SCENARIO EXPLANATION */}
          {/* ================================================= */}

          <div className="mt-12 rounded-3xl bg-[#F4FAF6] p-7">

            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
              OXY PLANNING SCENARIO
            </p>

            <h3 className="mt-3 text-2xl font-bold">
              {form.scenario} case assumptions
            </h3>

            <div className="mt-5 grid gap-4 md:grid-cols-3">

              <div className="rounded-2xl bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Energy
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {(
                    SCENARIOS[
                      form.scenario
                    ].energy * 100
                  ).toFixed(0)}
                  %
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Water
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {(
                    SCENARIOS[
                      form.scenario
                    ].water * 100
                  ).toFixed(0)}
                  %
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Maintenance
                </p>

                <p className="mt-2 text-3xl font-bold">
                  {(
                    SCENARIOS[
                      form.scenario
                    ].maintenance * 100
                  ).toFixed(0)}
                  %
                </p>
              </div>

            </div>

            <p className="mt-5 text-sm leading-7 text-[#53645D]">
              These percentages are internal OXY
              planning assumptions used only when
              a client-specific assumption has not
              been supplied. They are not DEWA
              benchmarks, measured savings or
              guarantees. Client-provided rates
              override these scenario values.
            </p>

          </div>

          {/* ================================================= */}
          {/* SUBMIT */}
          {/* ================================================= */}

          <div className="mt-14 border-t border-[#10251E]/10 pt-10 text-center">

            <p className="mx-auto max-w-2xl text-sm leading-7 text-[#53645D]">
              By generating the report, the supplied
              information will be used to produce
              the OXY Value Intelligence™ analysis
              and calculation record.
            </p>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 rounded-full bg-[#10251E] px-10 py-5 text-lg font-semibold text-white transition hover:bg-[#163528] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Generating Intelligence..."
                : "Generate OXY Value Intelligence™ Report"}
            </button>

          </div>

        </form>
      </section>
    </main>
  );
}

/*
 * ============================================================
 * HELPER COMPONENTS
 * ============================================================
 */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "number",
  required = false,
  help,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  help?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.18em] text-[#3D6B4F]">
        {label}
        {required && (
          <span className="ml-1 text-[#3D6B4F]">
            *
          </span>
        )}
      </label>

      <input
        required={required}
        type={type}
        step={
          type === "number"
            ? "any"
            : undefined
        }
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        placeholder={placeholder}
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCF9] px-5 py-4 outline-none transition focus:border-[#3D6B4F] focus:bg-white"
      />

      {help && (
        <p className="mt-2 text-xs leading-5 text-[#53645D]">
          {help}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (
    value: string
  ) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.18em] text-[#3D6B4F]">
        {label}
        {required && (
          <span className="ml-1">
            *
          </span>
        )}
      </label>

      <select
        required={required}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value
          )
        }
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F8FCF9] px-5 py-4 outline-none transition focus:border-[#3D6B4F] focus:bg-white"
      >
        <option value="">
          Select
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

function FormSection({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 mt-12 border-b border-[#10251E]/10 pb-5 first:mt-0">
      <div className="flex items-center gap-4">

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#DDF5E7] text-sm font-bold text-[#3D6B4F]">
          {number}
        </span>

        <div>
          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          <p className="mt-1 text-sm leading-6 text-[#53645D]">
            {description}
          </p>
        </div>

      </div>
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
    <div className="rounded-[2rem] bg-[#F4FAF6] p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {title}
      </p>

      <p className="mt-4 text-3xl font-bold text-[#10251E] md:text-4xl">
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

function InsightCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-3xl border border-[#10251E]/10 bg-white p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {title}
      </p>

      <p className="mt-4 text-lg leading-8 text-[#53645D]">
        {text}
      </p>
    </div>
  );
}

function OpportunityCard({
  title,
  baseline,
  savings,
  rate,
}: {
  title: string;
  baseline: string;
  savings: string;
  rate: string;
}) {
  return (
    <div className="rounded-3xl bg-[#F4FAF6] p-7">

      <h3 className="text-2xl font-bold">
        {title}
      </h3>

      <div className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
          Annual Baseline
        </p>

        <p className="mt-2 text-2xl font-bold">
          {baseline}
        </p>
      </div>

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
          Annual Opportunity
        </p>

        <p className="mt-2 text-2xl font-bold text-[#3D6B4F]">
          {savings}
        </p>
      </div>

      <div className="mt-5 border-t border-[#10251E]/10 pt-5">
        <p className="text-sm text-[#53645D]">
          Planning assumption:{" "}
          <strong>
            {rate}
          </strong>
        </p>
      </div>

    </div>
  );
}

function BridgeCard({
  label,
  title,
  value,
  subtitle,
}: {
  label: string;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="bg-[#F4FAF6] p-7">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {label}
      </p>

      <h3 className="mt-3 text-xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-2xl font-bold text-[#3D6B4F]">
        {value}
      </p>

      <p className="mt-3 text-sm leading-6 text-[#53645D]">
        {subtitle}
      </p>
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="mt-14">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
        {eyebrow}
      </p>

      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        {title}
      </h2>
    </div>
  );
}

function StatusBadge({
  label,
}: {
  label: string;
}) {
  return (
    <span className="rounded-full bg-[#DDF5E7] px-4 py-2 text-sm font-semibold text-[#3D6B4F]">
      {label}
    </span>
  );
}

/*
 * Small helpers kept outside the component so the JSX
 * remains readable.
 */

function energyCostSafe(
  value: string
) {
  const number = Number(value);
  return Number.isFinite(number)
    ? number
    : 0;
}

function esgInvestmentSafe(
  value: string
) {
  const number = Number(value);
  return Number.isFinite(number)
    ? number
    : 0;
}