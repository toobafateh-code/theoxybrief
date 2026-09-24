"use client";

import { useMemo, useState } from "react";

/* =========================================================
   OXY REAL ESTATE ASSESSMENT
   Calculation Basis v1.0
   September 2026

   IMPORTANT METHODOLOGY PRINCIPLE

   Preliminary Assessment:
   - identifies opportunity
   - interprets client responses
   - establishes evidence / data readiness
   - does NOT invent financial savings

   OXY Value Intelligence™:
   - uses actual operating / financial data
   - performs financial calculations
   - quantifies NOI / ROI / valuation implications

   OXY Implementation Intelligence™:
   - converts quantified opportunities into an
     implementation roadmap
========================================================= */

type AssessmentForm = {
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

type Question = {
  key: keyof AssessmentForm;
  label: string;
  description: string;
  options: string[];
};

type Opportunity = {
  title: string;
  status: "Priority" | "Opportunity" | "Data Gap" | "Foundation";
  observation: string;
  translation: string;
  evidence: string;
  source: string;
  sourceUrl: string;
  confidence: "High" | "Medium" | "Preliminary";
  validation: string;
};

type CalculationBasis = {
  dimension: string;
  input: string;
  rule: string;
  evidence: string;
  source: string;
  sourceUrl: string;
  output: string;
  confidence: "High" | "Medium" | "Preliminary";
  validation: string;
};

const questions: Question[] = [
  {
    key: "propertyType",
    label: "What type of real estate do you operate?",
    description:
      "Select the asset type that best represents your portfolio.",
    options: [
      "Commercial Office",
      "Retail",
      "Hospitality",
      "Residential / Multifamily",
      "Industrial / Warehouse",
      "Mixed Use",
      "Other",
    ],
  },
  {
    key: "portfolioSize",
    label: "How large is your portfolio?",
    description:
      "A portfolio-size band helps OXY understand the scale of the opportunity without requiring detailed financial information.",
    options: [
      "Small — 1–5 properties",
      "Medium — 6–20 properties",
      "Large — 21+ properties",
    ],
  },
  {
    key: "largestCost",
    label: "Which operating cost area concerns you most?",
    description:
      "Choose the area where you believe the greatest opportunity or exposure exists.",
    options: [
      "Energy / Electricity",
      "Water",
      "Maintenance",
      "Staff / Operations",
      "Property Management",
      "Not Sure",
    ],
  },
  {
    key: "tracksUtilities",
    label: "How well do you track energy and water performance?",
    description:
      "This helps determine whether the portfolio is ready for quantified performance analysis.",
    options: [
      "Fully — property-level data is available",
      "Partially — some data is available",
      "Limited — mostly invoices / manual records",
      "Not currently tracked",
    ],
  },
  {
    key: "occupancyRate",
    label: "What is your approximate portfolio occupancy?",
    description:
      "Use the closest range. An exact figure is not required at this stage.",
    options: [
      "Below 70%",
      "70%–84%",
      "85%–94%",
      "95%+",
      "Not Sure",
    ],
  },
  {
    key: "greenCertification",
    label: "What is your current green-building certification position?",
    description:
      "This helps establish the portfolio's current sustainability maturity.",
    options: [
      "Certified — one or more properties",
      "Certification in progress",
      "Considering certification",
      "No certification",
      "Not Sure",
    ],
  },
  {
    key: "tenantDemand",
    label: "How much tenant / occupier demand exists for sustainability?",
    description:
      "Think about tenant requests, green leases, reporting requirements and sustainability expectations.",
    options: [
      "High",
      "Moderate",
      "Low",
      "Not currently measured",
      "Not Sure",
    ],
  },
  {
    key: "primaryObjective",
    label: "What is the primary business objective?",
    description:
      "This determines which OXY value pathway should receive the greatest attention.",
    options: [
      "Reduce Operating Costs",
      "Improve NOI",
      "Increase Asset Value",
      "Improve ESG Performance",
      "Meet Tenant / Investor Expectations",
      "Prepare for Future Regulation",
      "Understand Where to Start",
    ],
  },
  {
    key: "budget",
    label: "How would you describe your current sustainability investment position?",
    description:
      "This is used for implementation readiness only. It is not used to estimate savings.",
    options: [
      "Budget Already Allocated",
      "Budget Under Consideration",
      "Limited Budget",
      "No Budget Yet",
      "Not Sure",
    ],
  },
  {
    key: "timeline",
    label: "When would you realistically want to begin?",
    description:
      "This helps determine implementation urgency.",
    options: [
      "Immediately",
      "Within 3 Months",
      "Within 6 Months",
      "Within 12 Months",
      "Exploring Options",
    ],
  },
];

/* =========================================================
   SOURCE LIBRARY

   These are methodological sources, not claims that a
   particular client will achieve a particular percentage.
========================================================= */

const SOURCES = {
  dewaEnergy: {
    name: "DEWA — Energy Conservation Handbook 2025",
    url: "https://dewa.gov.ae/-/media/Files/Handbooks2025/Energy-Conservation-Handbook_2025_2_EN.ashx",
  },
  dewaDSM: {
    name: "DEWA — Demand Side Management Strategy 2050",
    url: "https://www.dewa.gov.ae/en/about-us/media-publications/latest-news/2024/07/hh-sheikh-ahmed-bin-saeed-al-maktoum-issues",
  },
  energyStarEUI: {
    name: "ENERGY STAR — Understanding Energy Use Intensity",
    url: "https://www.energystar.gov/buildings/benchmark/understand-metrics/what-eui",
  },
  energyStarPortfolio: {
    name: "ENERGY STAR Portfolio Manager",
    url: "https://portfoliomanager.energystar.gov/pm/help",
  },
  rics: {
    name: "RICS — ESG and Sustainability in Commercial Property Valuation, 4th Edition",
    url: "https://www.rics.org/profession-standards/rics-standards-and-guidance/sector-standards/valuation-standards/esg-and-sustainability-in-commercial-property-valuation",
  },
  gresb: {
    name: "GRESB — Real Estate Reference Guide",
    url: "https://documents.gresb.com/generated_files/real_estate/2025/real_estate/reference_guide/complete.html",
  },
};

/* =========================================================
   SMALL UI COMPONENTS
========================================================= */

function ProgressBar({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="mb-10">
      <div className="mb-3 flex items-center justify-between text-sm font-semibold text-[#53645D]">
        <span>
          Question {current} of {total}
        </span>

        <span>{percentage}%</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[#DDE8E1]">
        <div
          className="h-full rounded-full bg-[#3D6B4F] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function OptionCard({
  option,
  selected,
  onClick,
}: {
  option: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border px-6 py-5 text-left transition-all duration-200 ${
        selected
          ? "border-[#3D6B4F] bg-[#E7F3EA] shadow-md"
          : "border-[#10251E]/10 bg-white hover:-translate-y-0.5 hover:border-[#3D6B4F]/50 hover:shadow-sm"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border ${
            selected
              ? "border-[#3D6B4F] bg-[#3D6B4F]"
              : "border-[#10251E]/25 bg-white"
          }`}
        >
          {selected && (
            <div className="h-2 w-2 rounded-full bg-white" />
          )}
        </div>

        <span
          className={`text-base font-semibold ${
            selected ? "text-[#10251E]" : "text-[#53645D]"
          }`}
        >
          {option}
        </span>
      </div>
    </button>
  );
}

function MetricCard({
  title,
  value,
  description,
}: {
  title: string;
  value: string;
  description?: string;
}) {
  return (
    <div className="rounded-3xl border border-[#10251E]/10 bg-white p-7 shadow-sm">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {title}
      </p>

      <p className="mt-4 text-2xl font-bold leading-tight text-[#10251E]">
        {value}
      </p>

      {description && (
        <p className="mt-3 text-sm leading-6 text-[#53645D]">
          {description}
        </p>
      )}
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: Opportunity["status"];
}) {
  const styles = {
    Priority: "bg-[#E7F3EA] text-[#28543A]",
    Opportunity: "bg-[#F1F5E9] text-[#596B37]",
    "Data Gap": "bg-[#F6F0E5] text-[#795E35]",
    Foundation: "bg-[#EEF2F1] text-[#53645D]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function RealEstateAssessmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [form, setForm] = useState<AssessmentForm>({
    fullName: "",
    company: "",
    email: "",
    propertyType: "",
    portfolioSize: "",
    largestCost: "",
    tracksUtilities: "",
    occupancyRate: "",
    greenCertification: "",
    tenantDemand: "",
    primaryObjective: "",
    budget: "",
    timeline: "",
  });

  function updateField(
    key: keyof AssessmentForm,
    value: string
  ) {
    setForm((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  /* =======================================================
     OXY CALCULATION ENGINE

     NO FINANCIAL FORECASTING IS PERFORMED HERE.

     Every conclusion is tied to:
     - an observed input
     - a documented rule
     - an evidence source
     - a confidence level
     - a validation requirement
  ======================================================= */

  const results = useMemo(() => {
    const utilityDataIsStrong =
      form.tracksUtilities ===
      "Fully — property-level data is available";

    const utilityDataIsPartial =
      form.tracksUtilities ===
        "Partially — some data is available" ||
      form.tracksUtilities ===
        "Limited — mostly invoices / manual records";

    const utilityDataIsWeak =
      form.tracksUtilities === "Not currently tracked";

    const energyPriority =
      form.largestCost === "Energy / Electricity";

    const waterPriority = form.largestCost === "Water";

    const maintenancePriority = form.largestCost === "Maintenance";

    const certificationMature =
      form.greenCertification ===
      "Certified — one or more properties";

    const certificationInProgress =
      form.greenCertification === "Certification in progress";

    const certificationGap =
      form.greenCertification ===
        "No certification" ||
      form.greenCertification === "Considering certification";

    const tenantDemandHigh =
      form.tenantDemand === "High";

    const tenantDemandModerate =
      form.tenantDemand === "Moderate";

    const valuationObjective =
      form.primaryObjective ===
        "Increase Asset Value" ||
      form.primaryObjective === "Improve NOI";

    const implementationReady =
      form.timeline === "Immediately" ||
      form.timeline === "Within 3 Months";

    /* -------------------------------------------------------
       DATA READINESS

       This is NOT a financial confidence score.
       It describes whether the assessment indicates that
       sufficient operational information exists to proceed
       toward quantitative analysis.
    ------------------------------------------------------- */

    let dataReadiness = 0;

    if (utilityDataIsStrong) {
      dataReadiness += 50;
    } else if (utilityDataIsPartial) {
      dataReadiness += 30;
    } else if (utilityDataIsWeak) {
      dataReadiness += 10;
    }

    if (
      form.occupancyRate !== "Not Sure" &&
      form.occupancyRate !== ""
    ) {
      dataReadiness += 20;
    }

    if (
      form.greenCertification !== "Not Sure" &&
      form.greenCertification !== ""
    ) {
      dataReadiness += 15;
    }

    if (
      form.largestCost !== "Not Sure" &&
      form.largestCost !== ""
    ) {
      dataReadiness += 15;
    }

    let dataReadinessLabel = "Limited";

    if (dataReadiness >= 75) {
      dataReadinessLabel = "Strong";
    } else if (dataReadiness >= 50) {
      dataReadinessLabel = "Moderate";
    }

    /* -------------------------------------------------------
       FINANCIAL QUANTIFICATION READINESS

       This deliberately does NOT estimate the financial result.
       It tells the client whether they have enough information
       to move into OXY Value Intelligence.
    ------------------------------------------------------- */

    let quantificationReadiness:
      | "Ready for Quantification"
      | "Partially Ready"
      | "Data Required";

    if (utilityDataIsStrong && valuationObjective) {
      quantificationReadiness = "Ready for Quantification";
    } else if (utilityDataIsPartial) {
      quantificationReadiness = "Partially Ready";
    } else {
      quantificationReadiness = "Data Required";
    }

    /* -------------------------------------------------------
       OPPORTUNITY AREAS
    ------------------------------------------------------- */

    const opportunities: Opportunity[] = [];

    if (energyPriority || utilityDataIsPartial || utilityDataIsWeak) {
      opportunities.push({
        title: "Energy Performance",
        status: energyPriority ? "Priority" : "Opportunity",

        observation: energyPriority
          ? "Energy / electricity was identified as the largest operating-cost concern."
          : "The assessment indicates that energy-performance data is not yet fully available.",

        translation:
          "Energy should be benchmarked against appropriate building-performance metrics before project-level savings are quantified.",

        evidence:
          "Building energy benchmarking methodologies use energy consumption relative to building area to understand performance. DEWA also provides Dubai-specific energy-efficiency measures, while noting that project-specific savings require assessment or audit.",

        source: `${SOURCES.dewaEnergy.name} + ${SOURCES.energyStarEUI.name}`,

        sourceUrl: `${SOURCES.dewaEnergy.url} | ${SOURCES.energyStarEUI.url}`,

        confidence: energyPriority
          ? "Medium"
          : "Preliminary",

        validation:
          "12 months of energy bills, property floor area, operating hours, building type and preferably meter/end-use data.",
      });
    }

    if (
      waterPriority ||
      utilityDataIsPartial ||
      utilityDataIsWeak
    ) {
      opportunities.push({
        title: "Water Performance",
        status: waterPriority ? "Priority" : "Opportunity",

        observation: waterPriority
          ? "Water was identified as the largest operating-cost concern."
          : "Water-performance data is not yet sufficiently established for financial quantification.",

        translation:
          "Water consumption should be baselined at property level and assessed for leakage, fixture and operational efficiency opportunities.",

        evidence:
          "Dubai's efficiency programme includes water-efficiency measures. DEWA's handbook provides measure-level potential but states that project-specific applicability and savings require assessment or audit.",

        source: SOURCES.dewaEnergy.name,

        sourceUrl: SOURCES.dewaEnergy.url,

        confidence: waterPriority
          ? "Medium"
          : "Preliminary",

        validation:
          "12 months of water bills, property floor area, occupancy, meter data and information on major water-consuming systems.",
      });
    }

    if (maintenancePriority) {
      opportunities.push({
        title: "Maintenance & Asset Operations",
        status: "Priority",

        observation:
          "Maintenance was identified as the largest operating-cost concern.",

        translation:
          "Maintenance expenditure should be analysed alongside asset condition, equipment age, failure history and preventive-maintenance performance.",

        evidence:
          "Operational expenditure and asset efficiency are relevant inputs to real-estate performance and ESG analysis; quantitative savings require asset-specific operational data.",

        source: SOURCES.rics.name,

        sourceUrl: SOURCES.rics.url,

        confidence: "Medium",

        validation:
          "12–24 months of maintenance expenditure, work orders, major equipment register, preventive-maintenance schedule and failure history.",
      });
    }

    if (utilityDataIsStrong) {
      opportunities.push({
        title: "Performance Data Foundation",
        status: "Foundation",

        observation:
          "Property-level utility data is reported as available.",

        translation:
          "The portfolio appears to have a stronger foundation for moving from qualitative opportunity identification into quantified performance analysis.",

        evidence:
          "Benchmarking systems rely on structured building and utility information to compare performance and establish baselines.",

        source: SOURCES.energyStarPortfolio.name,

        sourceUrl: SOURCES.energyStarPortfolio.url,

        confidence: "High",

        validation:
          "Validate data completeness, meter coverage, billing periods, floor-area records and consistency across properties.",
      });
    }

    if (utilityDataIsWeak) {
      opportunities.push({
        title: "Data Infrastructure",
        status: "Data Gap",

        observation:
          "Energy and water performance are not currently tracked.",

        translation:
          "Financial quantification should not be presented until a reliable baseline has been established.",

        evidence:
          "Performance benchmarking depends on actual consumption and building data; project-specific savings cannot responsibly be inferred from portfolio size alone.",

        source: `${SOURCES.energyStarEUI.name} + ${SOURCES.dewaEnergy.name}`,

        sourceUrl: `${SOURCES.energyStarEUI.url} | ${SOURCES.dewaEnergy.url}`,

        confidence: "High",

        validation:
          "Establish 12 months of utility data and property-level consumption records before financial modelling.",
      });
    }

    if (certificationGap) {
      opportunities.push({
        title: "Green Building / Certification Strategy",
        status: "Opportunity",

        observation:
          "The portfolio does not currently have an established certification position.",

        translation:
          "A certification and building-performance review may help establish a structured sustainability pathway and identify asset-level improvement requirements.",

        evidence:
          "Real-estate ESG frameworks commonly consider certifications alongside energy, GHG, water and other asset-performance indicators.",

        source: SOURCES.gresb.name,

        sourceUrl: SOURCES.gresb.url,

        confidence: "Preliminary",

        validation:
          "Confirm asset-level certification status, building documentation, existing performance data and applicable certification pathway.",
      });
    }

    if (certificationInProgress) {
      opportunities.push({
        title: "Certification Readiness",
        status: "Opportunity",

        observation:
          "Certification activity is already underway.",

        translation:
          "The next step should be to connect certification activity with measurable operational and financial outcomes rather than treating certification as a standalone deliverable.",

        evidence:
          "GRESB's real-estate framework considers certifications alongside broader asset performance and management indicators.",

        source: SOURCES.gresb.name,

        sourceUrl: SOURCES.gresb.url,

        confidence: "Medium",

        validation:
          "Review certification scope, asset documentation, performance evidence and remaining certification requirements.",
      });
    }

    if (tenantDemandHigh || tenantDemandModerate) {
      opportunities.push({
        title: "Tenant / Occupier Value",
        status: tenantDemandHigh ? "Priority" : "Opportunity",

        observation:
          tenantDemandHigh
            ? "High tenant sustainability demand was reported."
            : "Moderate tenant sustainability demand was reported.",

        translation:
          "Tenant requirements may create a commercial case for linking sustainability performance with leasing, engagement and asset-positioning strategy.",

        evidence:
          "GRESB's real-estate indicators include tenant engagement and other occupier-related sustainability considerations.",

        source: SOURCES.gresb.name,

        sourceUrl: SOURCES.gresb.url,

        confidence: "Medium",

        validation:
          "Review tenant requirements, green lease provisions, tenant satisfaction data, renewal patterns and leasing strategy.",
      });
    }

    if (valuationObjective) {
      opportunities.push({
        title: "NOI / Valuation Pathway",
        status: "Priority",

        observation:
          `The stated objective is ${
            form.primaryObjective === "Increase Asset Value"
              ? "asset value improvement"
              : "NOI improvement"
          }.`,
        
        translation:
          "The financial pathway should ultimately connect measurable operating or income changes to a defensible valuation analysis.",

        evidence:
          "RICS's current global standard provides a framework for considering significant ESG and sustainability factors in commercial-property valuation and distinguishes valuation from strategic ESG advice.",

        source: SOURCES.rics.name,

        sourceUrl: SOURCES.rics.url,

        confidence: "Medium",

        validation:
          "Current NOI, stabilized NOI assumptions, property income/cost data, applicable market evidence and an appropriate valuation methodology.",
      });
    }

    if (opportunities.length === 0) {
      opportunities.push({
        title: "Baseline ESG Opportunity Review",
        status: "Foundation",

        observation:
          "The current responses do not identify one dominant operating-cost or ESG issue.",

        translation:
          "A structured baseline review should be completed before prioritising individual initiatives.",

        evidence:
          "Real-estate ESG frameworks assess multiple dimensions of asset performance rather than relying on a single indicator.",

        source: SOURCES.gresb.name,

        sourceUrl: SOURCES.gresb.url,

        confidence: "Preliminary",

        validation:
          "Provide asset-level energy, water, operating-cost, occupancy and certification information.",
      });
    }

    /* -------------------------------------------------------
       PRIORITY ORDER
    ------------------------------------------------------- */

    const priorityOrder = {
      Priority: 1,
      "Data Gap": 2,
      Opportunity: 3,
      Foundation: 4,
    };

    opportunities.sort(
      (a, b) =>
        priorityOrder[a.status] -
        priorityOrder[b.status]
    );

    /* -------------------------------------------------------
       CALCULATION BASIS

       This is the audit trail shown to the client.
    ------------------------------------------------------- */

    const calculationBasis: CalculationBasis[] = [
      {
        dimension: "Energy",
        input:
          form.largestCost === "Energy / Electricity"
            ? "Energy / Electricity identified as largest operating cost."
            : `Energy-cost priority was not selected; utility-data response was "${form.tracksUtilities}".`,

        rule:
          "Use the assessment to identify whether energy deserves further investigation. Do not convert the qualitative answer into a savings percentage.",

        evidence:
          "Energy benchmarking uses actual energy consumption relative to building characteristics; DEWA provides Dubai-specific efficiency measures and states that project-specific savings require assessment or audit.",

        source: `${SOURCES.energyStarEUI.name}; ${SOURCES.dewaEnergy.name}`,

        sourceUrl: `${SOURCES.energyStarEUI.url} | ${SOURCES.dewaEnergy.url}`,

        output:
          energyPriority
            ? "Energy Performance = Priority"
            : utilityDataIsWeak
            ? "Energy Data = Data Gap"
            : "Energy Performance = Opportunity",

        confidence: energyPriority
          ? "Medium"
          : "Preliminary",

        validation:
          "12 months utility data + gross floor area + property type + operating hours + meter/end-use information where available.",
      },

      {
        dimension: "Water",
        input:
          form.largestCost === "Water"
            ? "Water identified as largest operating cost."
            : `Utility tracking response = "${form.tracksUtilities}".`,

        rule:
          "Identify water as a priority where the client reports material water-cost exposure or insufficient utility tracking. Do not assume a water-saving percentage.",

        evidence:
          "DEWA's efficiency handbook identifies water-efficiency measures but notes that project-specific savings depend on internal assessment or energy/water audit.",

        source: SOURCES.dewaEnergy.name,

        sourceUrl: SOURCES.dewaEnergy.url,

        output:
          waterPriority
            ? "Water Performance = Priority"
            : "Water Performance = Requires Further Assessment",

        confidence: waterPriority
          ? "Medium"
          : "Preliminary",

        validation:
          "12 months water bills + property area + occupancy + meter information + major water-consuming systems.",
      },

      {
        dimension: "Data Readiness",
        input: `Utility tracking = "${form.tracksUtilities}".`,

        rule:
          "Property-level utility information increases readiness for quantitative analysis; incomplete or absent data limits financial quantification.",

        evidence:
          "Benchmarking methodologies rely on structured utility and building information.",

        source: `${SOURCES.energyStarEUI.name}; ${SOURCES.energyStarPortfolio.name}`,

        sourceUrl: `${SOURCES.energyStarEUI.url} | ${SOURCES.energyStarPortfolio.url}`,

        output: `Data Readiness = ${dataReadinessLabel}`,

        confidence: "High",

        validation:
          "Verify completeness, accuracy, meter coverage and consistency of the underlying records.",
      },

      {
        dimension: "Tenant Value",
        input: `Tenant sustainability demand = "${form.tenantDemand}".`,

        rule:
          "Higher reported tenant demand creates a reason to investigate tenant engagement, leasing requirements and sustainability positioning.",

        evidence:
          "Tenant engagement is included among real-estate ESG performance indicators.",

        source: SOURCES.gresb.name,

        sourceUrl: SOURCES.gresb.url,

        output:
          tenantDemandHigh
            ? "Tenant Value = Priority"
            : tenantDemandModerate
            ? "Tenant Value = Opportunity"
            : "Tenant Value = Not Yet Evidenced",

        confidence:
          tenantDemandHigh || tenantDemandModerate
            ? "Medium"
            : "Preliminary",

        validation:
          "Tenant requirements, green leases, tenant satisfaction, renewal data and leasing strategy.",
      },

      {
        dimension: "Valuation",
        input: `Primary objective = "${form.primaryObjective}".`,

        rule:
          "Valuation should only be quantified after the relevant income, cost and market inputs are available.",

        evidence:
          "RICS's 2026 global standard provides a framework for considering significant ESG and sustainability factors in commercial-property valuation and distinguishes valuation from strategic ESG advice.",

        source: SOURCES.rics.name,

        sourceUrl: SOURCES.rics.url,

        output: valuationObjective
          ? "Valuation Pathway = Activated"
          : "Valuation Pathway = Deferred",

        confidence: valuationObjective
          ? "Medium"
          : "Preliminary",

        validation:
          "NOI, property income/costs, applicable market evidence and appropriate valuation methodology.",
      },
    ];

    return {
      dataReadiness,
      dataReadinessLabel,
      quantificationReadiness,
      opportunities,
      calculationBasis,
      implementationReady,
    };
  }, [form]);

  /* =======================================================
     SUBMIT
  ======================================================= */

  async function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append(
        "_subject",
        "New OXY Real Estate Preliminary Assessment"
      );

      formData.append("_captcha", "false");
      formData.append("_template", "table");

      /* Contact */
      formData.append(
        "Full Name",
        form.fullName
      );

      formData.append(
        "Company",
        form.company
      );

      formData.append(
        "Email",
        form.email
      );

      /* Assessment */
      formData.append(
        "Property Type",
        form.propertyType
      );

      formData.append(
        "Portfolio Size",
        form.portfolioSize
      );

      formData.append(
        "Largest Operating Cost",
        form.largestCost
      );

      formData.append(
        "Tracks Utilities",
        form.tracksUtilities
      );

      formData.append(
        "Occupancy Rate",
        form.occupancyRate
      );

      formData.append(
        "Green Certification",
        form.greenCertification
      );

      formData.append(
        "Tenant Demand",
        form.tenantDemand
      );

      formData.append(
        "Primary Objective",
        form.primaryObjective
      );

      formData.append(
        "Budget",
        form.budget
      );

      formData.append(
        "Timeline",
        form.timeline
      );

      /* OXY Outputs */

      formData.append(
        "Data Readiness",
        results.dataReadinessLabel
      );

      formData.append(
        "Financial Quantification Readiness",
        results.quantificationReadiness
      );

      formData.append(
        "Priority Opportunity Areas",
        results.opportunities
          .filter(
            (item) => item.status === "Priority"
          )
          .map((item) => item.title)
          .join(", ") || "None identified"
      );

      formData.append(
        "Calculation Basis Version",
        "OXY Preliminary Calculation Basis v1.0 — September 2026"
      );

      formData.append(
        "Methodology",
        "Preliminary diagnostic only. No project-specific financial savings are forecast at this stage."
      );

      const response = await fetch(
        "https://formsubmit.co/ajax/tooba@theoxybrief.com",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        console.error(
          "Assessment submission failed:",
          response.status
        );
      }
    } catch (error) {
      console.error(
        "Assessment email failed:",
        error
      );
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  /* =======================================================
     INTRO SCREEN
  ======================================================= */

  if (showIntro && !submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-20 text-[#10251E] md:px-16 md:py-28">
        <section className="mx-auto max-w-6xl">
          <div className="grid items-center gap-16 md:grid-cols-2">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                OXY Real Estate Intelligence
              </p>

              <h1 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
                Real Estate Value Assessment
              </h1>

              <p className="mt-7 max-w-2xl text-xl leading-9 text-[#53645D]">
                Identify where sustainability, operating
                performance and asset value may intersect
                across your portfolio.
              </p>

              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#53645D]">
                A short diagnostic designed for real-estate
                owners, developers and portfolio leaders.
              </p>

              <button
                type="button"
                onClick={() => {
                  setShowIntro(false);
                  setCurrentQuestion(0);
                }}
                className="mt-10 rounded-full bg-[#10251E] px-9 py-4 font-semibold text-white transition hover:bg-[#1D3A30]"
              >
                Begin Assessment
              </button>

              <p className="mt-5 text-sm text-[#53645D]">
                10 questions · approximately 3 minutes ·
                no technical data required
              </p>
            </div>

            <div className="rounded-[2rem] bg-[#10251E] p-8 text-white shadow-xl md:p-12">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
                The OXY Model
              </p>

              <div className="mt-8 space-y-8">
                <div>
                  <p className="text-2xl font-bold">
                    Observe
                  </p>

                  <p className="mt-2 leading-7 text-white/70">
                    Understand your portfolio, operating
                    profile and current ESG position.
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    Translate
                  </p>

                  <p className="mt-2 leading-7 text-white/70">
                    Connect your answers to documented
                    performance and valuation principles.
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    Yield
                  </p>

                  <p className="mt-2 leading-7 text-white/70">
                    Identify the data and analysis required
                    to quantify financial value.
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-7">
                <p className="text-sm leading-6 text-white/60">
                  Preliminary results are diagnostic.
                  Project-specific financial outcomes are
                  quantified only after appropriate operating
                  and financial data is available.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     REPORT VIEW
  ======================================================= */

  if (submitted) {
    const priorityAreas =
      results.opportunities.filter(
        (item) => item.status === "Priority"
      );

    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-20 text-[#10251E] md:px-16 md:py-24">
        <section className="mx-auto max-w-6xl">
          {/* HEADER */}

          <div className="rounded-[2rem] bg-white p-8 shadow-sm md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Your OXY Preliminary Assessment
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Real Estate Value Opportunity Report
            </h1>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-[#53645D]">
              Thank you, {form.fullName}. The assessment
              below translates your responses into
              evidence-backed opportunity areas and
              identifies what is required to quantify
              financial value.
            </p>

            <div className="mt-4 inline-flex rounded-full bg-[#E7F3EA] px-4 py-2 text-sm font-semibold text-[#28543A]">
              Calculation Basis v1.0 · September 2026
            </div>

            {/* TOP METRICS */}

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <MetricCard
                title="Data Readiness"
                value={results.dataReadinessLabel}
                description="Readiness for moving from diagnostic assessment toward quantitative analysis."
              />

              <MetricCard
                title="Financial Quantification"
                value={
                  results.quantificationReadiness
                }
                description="Indicates whether further operating and financial data is required."
              />

              <MetricCard
                title="Priority Areas"
                value={`${priorityAreas.length}`}
                description="Areas identified as requiring focused investigation."
              />
            </div>

            {/* IMPORTANT METHODOLOGY NOTE */}

            <div className="mt-10 rounded-3xl border border-[#3D6B4F]/20 bg-[#F3F8F3] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Important
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Why there is no artificial savings number
              </h2>

              <p className="mt-4 max-w-4xl text-base leading-7 text-[#53645D]">
                This Preliminary Assessment intentionally
                does not convert portfolio size or
                qualitative responses into a dollar savings
                forecast. Project-specific savings depend
                on actual consumption, asset characteristics,
                operating conditions, tariffs, costs and
                the measures that are technically applicable.
              </p>

              <p className="mt-4 max-w-4xl text-base leading-7 text-[#53645D]">
                The next OXY layer — Value Intelligence™ —
                is where those inputs become financial
                calculations.
              </p>
            </div>

            {/* OBSERVE */}

            <section className="mt-16">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                Observe
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                What your responses tell us
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Property Type
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.propertyType}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Portfolio Scale
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.portfolioSize}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Largest Cost Concern
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.largestCost}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Utility Data
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.tracksUtilities}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Occupancy
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.occupancyRate}
                  </p>
                </div>

                <div className="rounded-2xl bg-[#F7FAF8] p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Primary Objective
                  </p>

                  <p className="mt-2 text-lg font-semibold">
                    {form.primaryObjective}
                  </p>
                </div>
              </div>
            </section>

            {/* TRANSLATE */}

            <section className="mt-16">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                Translate
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                Where OXY sees opportunity
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-[#53645D]">
                Each opportunity below is connected to
                an explicit observation, interpretation,
                evidence source and validation requirement.
              </p>

              <div className="mt-10 space-y-6">
                {results.opportunities.map(
                  (opportunity) => (
                    <div
                      key={opportunity.title}
                      className="rounded-3xl border border-[#10251E]/10 bg-white p-7 shadow-sm md:p-9"
                    >
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-2xl font-bold">
                          {opportunity.title}
                        </h3>

                        <StatusBadge
                          status={opportunity.status}
                        />
                      </div>

                      <div className="mt-7 grid gap-7 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            Observation
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {opportunity.observation}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            OXY Translation
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {opportunity.translation}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 rounded-2xl bg-[#F7FAF8] p-6">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                          <div className="md:max-w-3xl">
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                              Evidence Basis
                            </p>

                            <p className="mt-2 leading-7 text-[#53645D]">
                              {opportunity.evidence}
                            </p>
                          </div>

                          <div className="md:text-right">
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                              Confidence
                            </p>

                            <p className="mt-2 font-bold">
                              {opportunity.confidence}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 border-t border-[#10251E]/10 pt-5">
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            Source
                          </p>

                          <a
                            href={opportunity.sourceUrl.split(
                              " | "
                            )[0]}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 inline-block text-sm font-semibold text-[#3D6B4F] underline underline-offset-4"
                          >
                            {opportunity.source}
                          </a>
                        </div>

                        <div className="mt-6 border-t border-[#10251E]/10 pt-5">
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            Required to Validate
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {opportunity.validation}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* YIELD */}

            <section className="mt-16">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                Yield
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                What can be quantified next
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-[#53645D]">
                Your Preliminary Assessment establishes
                where value may exist. OXY Value Intelligence™
                converts the identified opportunities into
                financial analysis using actual portfolio data.
              </p>

              <div className="mt-10 grid gap-6 md:grid-cols-2">
                <MetricCard
                  title="Current Stage"
                  value="Opportunity Diagnosis"
                  description="The portfolio has been assessed for opportunity signals and information readiness."
                />

                <MetricCard
                  title="Next Stage"
                  value="Financial Quantification"
                  description="Actual costs, NOI, cap rate, asset and performance data are used to calculate financial outcomes."
                />
              </div>

              <div className="mt-8 rounded-3xl bg-[#10251E] p-8 text-white md:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B9D2B1]">
                  OXY Value Intelligence™
                </p>

                <h3 className="mt-4 text-3xl font-bold">
                  From opportunity to financial evidence
                </h3>

                <p className="mt-4 max-w-3xl text-lg leading-8 text-white/75">
                  The next assessment captures portfolio
                  area, energy cost, water cost, maintenance
                  cost, current NOI, occupancy, cap rate and
                  ESG investment information.
                </p>

                <a
                  href="/assessments/real-estate/value-intelligence"
                  className="mt-7 inline-block rounded-full bg-white px-7 py-4 font-semibold text-[#10251E] transition hover:bg-[#ECFDF5]"
                >
                  Start OXY Value Intelligence™
                </a>
              </div>
            </section>

            {/* CALCULATION BASIS */}

            <section className="mt-16">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                Calculation Basis
              </p>

              <h2 className="mt-3 text-3xl font-bold md:text-4xl">
                How every conclusion was reached
              </h2>

              <p className="mt-5 max-w-4xl text-lg leading-8 text-[#53645D]">
                OXY does not hide the logic behind the
                assessment. The table below shows the input,
                rule, evidence, output and validation requirement
                for each major dimension.
              </p>

              <div className="mt-10 space-y-6">
                {results.calculationBasis.map(
                  (item) => (
                    <div
                      key={item.dimension}
                      className="rounded-3xl border border-[#10251E]/10 bg-[#F7FAF8] p-7 md:p-9"
                    >
                      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <h3 className="text-xl font-bold">
                          {item.dimension}
                        </h3>

                        <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-[#3D6B4F]">
                          {item.confidence} Confidence
                        </span>
                      </div>

                      <div className="mt-7 grid gap-7 md:grid-cols-2">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            Client Input
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {item.input}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            OXY Rule
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {item.rule}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            Evidence
                          </p>

                          <p className="mt-2 leading-7 text-[#53645D]">
                            {item.evidence}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                            OXY Output
                          </p>

                          <p className="mt-2 font-bold leading-7 text-[#10251E]">
                            {item.output}
                          </p>
                        </div>
                      </div>

                      <div className="mt-7 border-t border-[#10251E]/10 pt-6">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                          Validation Required
                        </p>

                        <p className="mt-2 leading-7 text-[#53645D]">
                          {item.validation}
                        </p>
                      </div>

                      <div className="mt-6 border-t border-[#10251E]/10 pt-5">
                        <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                          Methodological Source
                        </p>

                        <a
                          href={item.sourceUrl.split(
                            " | "
                          )[0]}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-2 inline-block text-sm font-semibold text-[#3D6B4F] underline underline-offset-4"
                        >
                          {item.source}
                        </a>
                      </div>
                    </div>
                  )
                )}
              </div>
            </section>

            {/* METHODOLOGY DISCLAIMER */}

            <section className="mt-16 rounded-3xl border border-[#10251E]/10 bg-[#F7FAF8] p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Methodology Note
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Preliminary does not mean predictive
              </h3>

              <p className="mt-4 leading-8 text-[#53645D]">
                The OXY Preliminary Assessment identifies
                potential areas for investigation based on
                the information provided by the client and
                documented methodological sources.
              </p>

              <p className="mt-4 leading-8 text-[#53645D]">
                It does not constitute an energy audit,
                engineering study, investment recommendation,
                formal property valuation or guaranteed
                financial forecast.
              </p>

              <p className="mt-4 leading-8 text-[#53645D]">
                Financial outcomes are reserved for the
                OXY Value Intelligence™ stage once the
                appropriate operating and financial inputs
                are available.
              </p>
            </section>

            {/* CTA */}

            <div className="mt-16 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white md:px-12">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
                Recommended Next Step
              </p>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Quantify the Opportunity
              </h2>

              <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/75">
                Move from preliminary opportunity
                identification to financial intelligence using
                your actual portfolio and operating data.
              </p>

              <a
                href="/assessments/real-estate/value-intelligence"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E] transition hover:bg-[#ECFDF5]"
              >
                Start OXY Value Intelligence™
              </a>

              <div className="mt-5">
                <a
                  href="/contact"
                  className="text-sm font-semibold text-[#B9D2B1] underline underline-offset-4"
                >
                  Or book an OXY strategy session
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* =======================================================
     CONTACT / FINAL STEP
  ======================================================= */

  const question = questions[currentQuestion];

  const isFinalQuestion =
    currentQuestion === questions.length - 1;

  function goBack() {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  }

  function handleAnswer(value: string) {
    updateField(question.key, value);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(
          (previous) => previous + 1
        );
      }
    }, 220);
  }

  /* =======================================================
     QUESTION VIEW
  ======================================================= */

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-16 text-[#10251E] md:px-16 md:py-24">
      <section className="mx-auto max-w-4xl">
        <div className="mb-10 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY Real Estate Intelligence
          </p>

          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            Real Estate Value Assessment
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#53645D]">
            A preliminary diagnostic to identify
            sustainability, operating and value
            opportunities.
          </p>
        </div>

        <ProgressBar
          current={currentQuestion + 1}
          total={questions.length}
        />

        <div className="rounded-[2rem] bg-white p-7 shadow-sm md:p-12">
          <div className="mb-10">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
              Question {currentQuestion + 1}
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
              {question.label}
            </h2>

            <p className="mt-4 text-lg leading-8 text-[#53645D]">
              {question.description}
            </p>
          </div>

          <div className="space-y-3">
            {question.options.map((option) => (
              <OptionCard
                key={option}
                option={option}
                selected={
                  form[question.key] === option
                }
                onClick={() =>
                  handleAnswer(option)
                }
              />
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between border-t border-[#10251E]/10 pt-7">
            <button
              type="button"
              onClick={goBack}
              disabled={currentQuestion === 0}
              className={`rounded-full px-6 py-3 text-sm font-semibold ${
                currentQuestion === 0
                  ? "cursor-not-allowed text-[#B6C0BB]"
                  : "text-[#53645D] hover:bg-[#F3F7F4]"
              }`}
            >
              ← Back
            </button>

            <p className="text-sm text-[#53645D]">
              Your answers are used to generate your
              preliminary OXY analysis.
            </p>
          </div>
        </div>

        {/* CONTACT CAPTURE */}

        {isFinalQuestion &&
          form.primaryObjective && (
            <div className="mt-8 rounded-[2rem] bg-white p-7 shadow-sm md:p-10">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
                  Final Step
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Where should we send your OXY assessment?
                </h2>

                <p className="mt-3 leading-7 text-[#53645D]">
                  Enter your details to generate the
                  personalized Preliminary Value Opportunity
                  Report.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                      Full Name
                    </label>

                    <input
                      required
                      type="text"
                      value={form.fullName}
                      onChange={(event) =>
                        updateField(
                          "fullName",
                          event.target.value
                        )
                      }
                      className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F7FAF8] px-5 py-4 outline-none transition focus:border-[#3D6B4F]"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                      Company
                    </label>

                    <input
                      required
                      type="text"
                      value={form.company}
                      onChange={(event) =>
                        updateField(
                          "company",
                          event.target.value
                        )
                      }
                      className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F7FAF8] px-5 py-4 outline-none transition focus:border-[#3D6B4F]"
                      placeholder="Company name"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold uppercase tracking-[0.15em] text-[#3D6B4F]">
                    Work Email
                  </label>

                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      updateField(
                        "email",
                        event.target.value
                      )
                    }
                    className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#F7FAF8] px-5 py-4 outline-none transition focus:border-[#3D6B4F]"
                    placeholder="name@company.com"
                  />
                </div>

                <div className="rounded-2xl bg-[#F3F8F3] p-5">
                  <p className="text-sm font-semibold text-[#10251E]">
                    Your assessment is ready.
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#53645D]">
                    OXY will identify opportunity areas,
                    explain the calculation basis and show
                    what information is required to quantify
                    financial value.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white transition hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting
                    ? "Generating Your OXY Assessment..."
                    : "Generate My OXY Assessment →"}
                </button>
              </form>
            </div>
          )}
      </section>
    </main>
  );
}