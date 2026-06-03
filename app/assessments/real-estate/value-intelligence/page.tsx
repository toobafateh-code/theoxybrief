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
const accessRestricted = true;
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [isAuthorized, setIsAuthorized] = useState(false);

const ADMIN_USERNAME = "tooba";
const ADMIN_PASSWORD = "OXY_2026_FOUNDER!";

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
const currentNOI = Number(form.currentNOI) || 0;
const occupancyRate = Number(form.occupancyRate) || 0;
const capRatePercent = Number(form.capRate) || 0;

// Benchmark assumptions

const energySavingsRate = 0.15;
const waterSavingsRate = 0.20;
const maintenanceSavingsRate = 0.10;

// Savings calculations

const energySavings =
  energyCost * energySavingsRate;

const waterSavings =
  waterCost * waterSavingsRate;

const maintenanceSavings =
  maintenanceCost *
  maintenanceSavingsRate;

const totalAnnualSavings =
  energySavings +
  waterSavings +
  maintenanceSavings;

// Scenario Analysis

const conservativeSavings =
  totalAnnualSavings * 0.8;

const acceleratedSavings =
  totalAnnualSavings * 1.3;

// Core Financial Metrics

const roi =
  esgInvestment > 0
    ? (totalAnnualSavings /
        esgInvestment) *
      100
    : 0;

const paybackYears =
  totalAnnualSavings > 0
    ? esgInvestment /
      totalAnnualSavings
    : 0;

const capRate =
  capRatePercent > 0
    ? capRatePercent / 100
    : 0;

const assetValueIncrease =
  capRate > 0
    ? totalAnnualSavings /
      capRate
    : 0;

const improvedNOI =
  currentNOI +
  totalAnnualSavings;

// OXY Value Score™

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
  paybackYears <= 5
) {
  oxyValueScore += 10;
} else if (
  paybackYears <= 7
) {
  oxyValueScore += 5;
}

if (occupancyRate >= 90) {
  oxyValueScore += 10;
} else if (
  occupancyRate >= 80
) {
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
    Math.round(
      oxyValueScore
    )
  )
);

// Confidence Index™

const allFields =
  Object.values(form);

const completedFields =
  allFields.filter(
    (value) =>
      value !== ""
  ).length;

const confidenceIndex =
  Math.round(
    (completedFields /
      allFields.length) *
      100
  );

// =====================================================
// Carbon Intelligence
// =====================================================

const co2Reduction =
  (energySavings / 1000) * 2.5;

const carbonImpactScore =
  Math.max(
    0,
    Math.min(
      100,
      Math.round(
        co2Reduction * 0.8
      )
    )
  );

let netZeroAlignment =
  "Emerging";

if (
  carbonImpactScore >= 80
) {
  netZeroAlignment =
    "High";
} else if (
  carbonImpactScore >= 50
) {
  netZeroAlignment =
    "Moderate";
}

const carbonInterpretation =
  `Estimated energy efficiency measures may reduce emissions by approximately ${co2Reduction.toFixed(
    1
  )} tCO₂e annually.`;

// =====================================================
// Risk Intelligence
// =====================================================

let riskExposureScore = 40;

if (
  occupancyRate < 85
) {
  riskExposureScore += 30;
} else if (
  occupancyRate < 90
) {
  riskExposureScore += 15;
}

if (roi < 10) {
  riskExposureScore += 20;
} else if (
  roi < 20
) {
  riskExposureScore += 10;
}

riskExposureScore =
  Math.max(
    0,
    Math.min(
      100,
      Math.round(
        riskExposureScore
      )
    )
  );

let riskCategory =
  "Managed";

if (
  riskExposureScore >= 70
) {
  riskCategory =
    "Elevated";
} else if (
  riskExposureScore >= 40
) {
  riskCategory =
    "Moderate";
}

const riskInterpretation =
  riskCategory ===
  "Elevated"
    ? "Your portfolio exhibits elevated exposure to regulatory, operational, and market risks."
    : riskCategory ===
      "Moderate"
    ? "Your portfolio exhibits moderate transition and operational risk."
    : "Your portfolio appears relatively well positioned.";

// =====================================================
// Sustainable Finance Intelligence
// =====================================================

let capitalReadinessScore =
  50;

if (
  oxyValueScore >= 80
) {
  capitalReadinessScore +=
    30;
} else if (
  oxyValueScore >= 60
) {
  capitalReadinessScore +=
    20;
} else {
  capitalReadinessScore +=
    10;
}

if (
  form.primaryObjective ===
  "Increase Asset Value"
) {
  capitalReadinessScore +=
    10;
}

capitalReadinessScore =
  Math.max(
    0,
    Math.min(
      100,
      Math.round(
        capitalReadinessScore
      )
    )
  );

let capitalReadinessCategory =
  "Emerging";

if (
  capitalReadinessScore >=
  80
) {
  capitalReadinessCategory =
    "Strong";
} else if (
  capitalReadinessScore >=
  60
) {
  capitalReadinessCategory =
    "Developing";
}

const capitalReadinessInterpretation =
  capitalReadinessCategory ===
  "Strong"
    ? "Your portfolio demonstrates strong potential to attract sustainability-linked financing and institutional ESG capital."
    : capitalReadinessCategory ===
      "Developing"
    ? "Your portfolio demonstrates moderate readiness for sustainable finance opportunities and may benefit from additional ESG performance tracking."
    : "Additional operational improvements may strengthen financing readiness and investor attractiveness.";

// =====================================================
// Financing Readiness Score™
// =====================================================

const financingReadinessScore = Math.min(
  100,
  Math.round(
    capitalReadinessScore * 0.4 +
    Math.min(roi, 25) * 2 +
    Math.max(0, 10 - paybackYears) * 3
  )
);

let financingReadinessCategory = "";

if (financingReadinessScore >= 80) {
  financingReadinessCategory = "Institutional Ready";
} else if (financingReadinessScore >= 60) {
  financingReadinessCategory = "Financing Ready";
} else if (financingReadinessScore >= 40) {
  financingReadinessCategory = "Developing";
} else {
  financingReadinessCategory = "Early Stage";
}

// =====================================================
// Financing Attractiveness
// =====================================================

const financingAttractivenessScore =
  roi * 2 +
  (100 -
    paybackYears * 10) +
  capitalReadinessScore /
    2;

const normalizedFinancingScore =
  Math.max(
    0,
    Math.min(
      100,
      Math.round(
        financingAttractivenessScore
      )
    )
  );

let financingCategory =
  "Limited";

if (
  normalizedFinancingScore >=
  80
) {
  financingCategory =
    "Highly Attractive";
} else if (
  normalizedFinancingScore >=
  60
) {
  financingCategory =
    "Attractive";
} else if (
  normalizedFinancingScore >=
  40
) {
  financingCategory =
    "Emerging";
}

// =====================================================
// Dynamic Financing Narrative
// =====================================================

let financingNarrative =
  "";

if (
  normalizedFinancingScore >=
  80
) {
  financingNarrative =
    `The projected ROI of ${roi.toFixed(
      1
    )}% and estimated payback period of ${paybackYears.toFixed(
      1
    )} years indicate a highly investable sustainability profile. The projected asset value increase of ${formatCurrency(
      assetValueIncrease
    )} significantly exceeds the proposed ESG investment and supports financing attractiveness.`;
} else if (
  normalizedFinancingScore >=
  60
) {
  financingNarrative =
    `The projected financial profile demonstrates moderate-to-strong financing potential. Additional performance tracking and ESG reporting may further strengthen financing readiness and lender confidence.`;
} else {
  financingNarrative =
    `The projected return profile suggests additional operational optimization may be beneficial before pursuing advanced sustainability-linked financing structures.`;
}

// =====================================================
// Financing Structures Engine
// =====================================================

const financingStructures: string[] = [];

if (roi >= 15) {
  financingStructures.push(
    "Sustainability-Linked Loan"
  );
}

if (co2Reduction >= 50) {
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
  assetValueIncrease >= 2000000 &&
  co2Reduction >= 100
) {
  financingStructures.push(
    "Green Bond Readiness"
  );
}

/* Fallback Recommendations */

if (financingStructures.length === 0) {
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

// =====================================================
// Investor Positioning Engine
// =====================================================

let investorPositioning =
  "";

if (
  assetValueIncrease >
  esgInvestment * 2
) {
  investorPositioning =
    `The projected value increase of ${formatCurrency(
      assetValueIncrease
    )} exceeds the proposed investment by more than two times, supporting positioning among investors seeking measurable ESG value creation, operational resilience, and long-term value preservation.`;
} else {
  investorPositioning =
    `The portfolio demonstrates early-stage ESG value creation potential. Continued operational improvement, emissions reporting, and KPI tracking may strengthen investor attractiveness over time.`;
}

// =====================================================
// Recommended Financing Actions
// =====================================================

const financingActions =
  [
    "Establish baseline performance metrics.",
    "Track realized savings quarterly.",
    "Develop annual ESG performance reporting.",
    "Prepare a sustainability financing package.",
  ];

// =====================================================
// Advanced Financial Calculations
// =====================================================

const discountRate =
  0.08;

const analysisYears =
  10;

let npv =
  -esgInvestment;

for (
  let year = 1;
  year <=
  analysisYears;
  year++
) {
  npv +=
    totalAnnualSavings /
    Math.pow(
      1 +
        discountRate,
      year
    );
}

const irr =
  analysisYears > 0
    ? roi /
      analysisYears
    : 0;

// =====================================================
// Sensitivity Analysis
// =====================================================

const lowCaseSavings =
  totalAnnualSavings *
  0.9;

const highCaseSavings =
  totalAnnualSavings *
  1.1;

const lowCaseAssetValue =
  capRate > 0
    ? lowCaseSavings /
      capRate
    : 0;

const highCaseAssetValue =
  capRate > 0
    ? highCaseSavings /
      capRate
    : 0;

// =====================================================
// Opportunity Prioritization Matrix
// =====================================================

const opportunityMatrix: OpportunityItem[] =
  [
    {
      initiative:
        "Energy Efficiency Retrofits",
      impact:
        "High",
      payback:
        energySavings >
        0
          ? (
              (esgInvestment *
                0.4) /
              energySavings
            ).toFixed(
              1
            ) +
            " Years"
          : "N/A",
      priority:
        "Immediate",
    },

    {
      initiative:
        "Water Optimization",
      impact:
        "Medium",
      payback:
        waterSavings >
        0
          ? (
              (esgInvestment *
                0.2) /
              waterSavings
            ).toFixed(
              1
            ) +
            " Years"
          : "N/A",
      priority:
        "High",
    },

    {
      initiative:
        "Maintenance Optimization",
      impact:
        "Medium",
      payback:
        maintenanceSavings >
        0
          ? (
              (esgInvestment *
                0.4) /
              maintenanceSavings
            ).toFixed(
              1
            ) +
            " Years"
          : "N/A",
      priority:
        "Strategic",
    },
  ];

// =====================================================
// RETURN RESULTS
// =====================================================

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

  // Financial Metrics
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

financingReadinessScore,
financingReadinessCategory,

normalizedFinancingScore,
financingCategory,
financingNarrative,
financingStructures,
investorPositioning,
financingActions,

  // Carbon Intelligence
  co2Reduction,
  carbonImpactScore,
  netZeroAlignment,
  carbonInterpretation,

  // Advanced Finance
  discountRate,
  analysisYears,
  npv,
  irr,

  // Sensitivity Analysis
  lowCaseSavings,
  highCaseSavings,
  lowCaseAssetValue,
  highCaseAssetValue,

  // Opportunity Matrix
  opportunityMatrix,
};

}, [form]);

async function handleSubmit(
e: React.FormEvent
) {
e.preventDefault();

setIsSubmitting(true);

try {
  await new Promise(
    (resolve) =>
      setTimeout(
        resolve,
        2000
      )
  );

  setSubmitted(true);

  window.scrollTo({
    top: 0,
    behavior:
      "smooth",
  });
} catch (
  error
) {
  console.error(
    "Value Intelligence assessment failed:",
    error
  );
} finally {
  setIsSubmitting(
    false
  );
}

}

// =====================================================
// REPORT VIEW
// =====================================================

if (accessRestricted && !isAuthorized) {
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
      Login required to access this proprietary platform.
    </p>

    <input
      type="text"
      placeholder="Username"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      className="mt-8 w-full rounded-xl border border-[#10251E]/15 p-4"
    />

    <div className="relative mt-4">
  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="w-full rounded-xl border border-[#10251E]/15 p-4 pr-12"
  />

  <button
    type="button"
    onClick={() => setShowPassword(!showPassword)}
    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#53645D]"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

    <button
      onClick={() => {
        if (
          username === ADMIN_USERNAME &&
          password === ADMIN_PASSWORD
        ) {
          setIsAuthorized(true);
        } else {
          alert("Invalid credentials");
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
return ( <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16"> <section className="mx-auto max-w-6xl"> <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">

        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          OXY Value Intelligence™ Report
        </p>

        <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
          Real Estate Financial Intelligence Report
        </h1>

        <p className="mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          Based on your actual operational and financial data,
          we identified opportunities to improve operating
          performance, strengthen resilience, and enhance
          asset value.
        </p>

        {/* KPI CARDS */}

        <div className="mt-12 grid gap-6 md:grid-cols-3">

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
            title="OXY Value Score™"
            value={`${results.oxyValueScore} / 100`}
          />

          <MetricCard
            title="Confidence Index™"
            value={`${results.confidenceIndex} / 100`}
          />

        </div>

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
          <h2 className="text-3xl font-bold">
            Scenario Analysis
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            The following scenarios illustrate how annual
            savings may vary under conservative, base case,
            and accelerated implementation assumptions.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <MetricCard
              title="Conservative Case"
              value={formatCurrency(
                results.conservativeSavings
              )}
              subtitle="80% of base estimate."
            />

            <MetricCard
              title="Base Case"
              value={formatCurrency(
                results.totalAnnualSavings
              )}
              subtitle="Expected outcome."
            />

            <MetricCard
              title="Accelerated Case"
              value={formatCurrency(
                results.acceleratedSavings
              )}
              subtitle="130% of base estimate."
            />

          </div>

          <div className="mt-8 space-y-6">

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                Conservative Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This downside scenario assumes only 80%
                of projected savings are achieved due to
                implementation delays, operational constraints,
                or lower-than-expected performance.
              </p>
            </div>

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                Base Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This represents the most likely outcome
                using benchmark assumptions derived from
                commonly observed building optimization
                programs.
              </p>
            </div>

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                Accelerated Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This upside scenario assumes strong execution,
                broader implementation, and additional
                operational benefits that exceed baseline
                expectations.
              </p>
            </div>

          </div>
        </div>

        {/* ===================================================== */}
        {/* Risk Intelligence Module */}
        {/* ===================================================== */}

        <div className="mt-12">
          <h2 className="text-3xl font-bold">
            Risk Intelligence Module
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            This assessment evaluates potential exposure to
            regulatory, operational, occupancy, financing,
            and market risks that may affect future performance.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">

            <MetricCard
              title="Risk Exposure Score™"
              value={`${results.riskExposureScore} / 100`}
              subtitle="Measures exposure to operational and transition risks."
            />

            <MetricCard
              title="Risk Category"
              value={results.riskCategory}
              subtitle="Overall interpretation of portfolio risk."
            />

          </div>

          <div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">
            <h3 className="text-2xl font-bold">
              Interpretation
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#53645D]">
              {results.riskInterpretation}
            </p>
          </div>

          <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">
            <h3 className="text-2xl font-bold">
              Strategic Implications
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#53645D]">
              Lower risk exposure may improve asset resilience,
              financing attractiveness, insurance positioning,
              occupancy retention, and long-term value preservation.
            </p>
          </div>
        </div>

        {/* ===================================================== */}
        {/* Sustainable Finance Intelligence */}
        {/* ===================================================== */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Sustainable Finance Intelligence™
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            This intelligence module evaluates financing
            attractiveness, investor positioning, and potential
            sustainable capital opportunities using your
            projected financial and operational performance.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <MetricCard
              title="Capital Readiness Score™"
              value={`${results.capitalReadinessScore} / 100`}
            />

            <MetricCard
              title="Financing Attractiveness"
              value={results.financingCategory}
            />

            <MetricCard
              title="Financing Score™"
              value={`${results.normalizedFinancingScore} / 100`}
            />

          </div>

          {/* Capital Strategy Intelligence™ */}

<div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">

  <h3 className="text-2xl font-bold">
    Capital Strategy Intelligence™
  </h3>

  <div className="mt-6 rounded-2xl bg-white p-6">
    <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
      Financing Readiness Score™
    </p>

    <p className="mt-3 text-5xl font-bold text-[#10251E]">
      {results.financingReadinessScore}/100
    </p>

    <p className="mt-3 text-lg font-semibold text-[#3D6B4F]">
      {results.financingReadinessCategory}
    </p>
  </div>

  <div className="mt-6 rounded-2xl bg-white p-6">
    <h4 className="text-xl font-bold">
      Financing Intelligence
    </h4>

    <p className="mt-3 text-lg leading-8 text-[#53645D]">
      {results.financingNarrative}
    </p>
  </div>

</div>

          {/* Financing Structures */}

          <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">

            <h3 className="text-2xl font-bold">
              Recommended Financing Structures
            </h3>

            <ul className="mt-4 space-y-3 text-lg text-[#53645D]">

              {results.financingStructures.map(
                (
                  structure,
                  index
                ) => (
                  <li
                    key={index}
                  >
                    • {structure}
                  </li>
                )
              )}

            </ul>

          </div>

          {/* Investor Positioning */}

          <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">

            <h3 className="text-2xl font-bold">
              Investor Positioning Analysis
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#53645D]">
              {results.investorPositioning}
            </p>

          </div>

          {/* Financing Actions */}

          <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">

            <h3 className="text-2xl font-bold">
              Recommended Actions
            </h3>

            <ul className="mt-4 space-y-3 text-lg text-[#53645D]">

              {results.financingActions.map(
                (
                  action,
                  index
                ) => (
                  <li
                    key={index}
                  >
                    • {action}
                  </li>
                )
              )}

            </ul>

          </div>

        </div>

        {/* ===================================================== */}
        {/* Carbon Intelligence Module */}
        {/* ===================================================== */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Carbon Intelligence Module
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            This module estimates the climate impact of
            projected efficiency initiatives and evaluates
            contribution toward net-zero alignment.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <MetricCard
              title="Estimated CO₂ Reduction"
              value={`${results.co2Reduction.toFixed(
                1
              )} tCO₂e`}
            />

            <MetricCard
              title="Carbon Impact Score™"
              value={`${results.carbonImpactScore} / 100`}
            />

            <MetricCard
              title="Net-Zero Alignment"
              value={results.netZeroAlignment}
            />

          </div>

          <div className="mt-8 rounded-3xl bg-[#ECFDF5] p-6">

            <h3 className="text-2xl font-bold">
              Carbon Interpretation
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#53645D]">
              {results.carbonInterpretation}
            </p>

          </div>

          <div className="mt-6 rounded-3xl bg-[#ECFDF5] p-6">

            <h3 className="text-2xl font-bold">
              Strategic Climate Positioning
            </h3>

            <p className="mt-3 text-lg leading-8 text-[#53645D]">
              Demonstrated emissions reductions may strengthen
              alignment with net-zero objectives, ESG reporting
              frameworks, sustainable finance criteria, and
              investor expectations around climate resilience.
            </p>

          </div>

        </div>

        {/* ===================================================== */}
        {/* Advanced Financial Calculations */}
        {/* ===================================================== */}

        <div className="mt-12 grid gap-6 md:grid-cols-2">

          <MetricCard
            title="Net Present Value (NPV)"
            value={formatCurrency(
              results.npv
            )}
            subtitle="10-year discounted cash flow using an 8% discount rate."
          />

          <MetricCard
            title="Internal Rate of Return (IRR)"
            value={`${results.irr.toFixed(
              1
            )}%`}
            subtitle="Approximate annualized return."
          />

        </div>

        {/* ===================================================== */}
        {/* Sensitivity Analysis */}
        {/* ===================================================== */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Sensitivity Analysis
          </h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            This analysis illustrates how projected asset value
            may vary if actual savings are 10% below or above
            baseline expectations.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-3">

            <MetricCard
              title="Low Case"
              value={formatCurrency(
                results.lowCaseAssetValue
              )}
              subtitle="10% below baseline."
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
              subtitle="10% above baseline."
            />

          </div>

          <div className="mt-8 space-y-6">

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                Low Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This scenario assumes realized savings are
                below expectations due to implementation delays,
                lower-than-expected performance, or operational
                constraints.
              </p>
            </div>

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                Base Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This represents the most likely outcome using
                benchmark assumptions and expected implementation
                performance.
              </p>
            </div>

            <div className="rounded-3xl bg-[#ECFDF5] p-6">
              <h3 className="text-2xl font-bold">
                High Case Interpretation
              </h3>

              <p className="mt-3 text-lg leading-8 text-[#53645D]">
                This scenario assumes strong execution and
                performance exceeding baseline expectations.
              </p>
            </div>

          </div>

        </div>

        {/* ===================================================== */}
        {/* Opportunity Prioritization Matrix */}
        {/* ===================================================== */}

        <div className="mt-12">

          <h2 className="text-3xl font-bold">
            Opportunity Prioritization Matrix
          </h2>

          <div className="mt-6 overflow-x-auto">

            <table className="w-full rounded-3xl overflow-hidden bg-[#ECFDF5]">

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
                  (
                    item,
                    index
                  ) => (
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

        {/* ===================================================== */}
        {/* Recommended Next Steps */}
        {/* ===================================================== */}

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

        </div>

        {/* ===================================================== */}
        {/* OXY Implementation Intelligence CTA */}
        {/* ===================================================== */}

        <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">

          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#9AC7B0]">
            OXY Implementation Intelligence™
          </p>

          <h2 className="mt-4 text-3xl font-bold md:text-4xl">
            Ready to Implement the Identified Opportunities?
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-white/80">
            Generate a detailed implementation roadmap including
            timelines, governance structures, financing pathways,
            KPI monitoring, and value realization planning.
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

// =====================================================
// FORM VIEW
// =====================================================

return ( <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16"> <section className="mx-auto max-w-5xl">

    <div className="text-center">

      <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
        OXY Value Intelligence™
      </p>

      <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
        Real Estate Financial Intelligence Assessment
      </h1>

    </div>

  <form
  onSubmit={handleSubmit}
  className="mt-16 rounded-[2rem] bg-white p-8 shadow-sm md:p-12"
>
  <div className="grid gap-8 md:grid-cols-2">

    <InputField
      label="Portfolio Area (sq ft)"
      value={form.portfolioArea}
      onChange={(value) =>
        updateField("portfolioArea", value)
      }
      placeholder="100000"
    />

    <InputField
      label="Number of Properties"
      value={form.numberOfProperties}
      onChange={(value) =>
        updateField("numberOfProperties", value)
      }
      placeholder="10"
    />

    <InputField
      label="Annual Energy Cost ($)"
      value={form.energyCost}
      onChange={(value) =>
        updateField("energyCost", value)
      }
      placeholder="500000"
    />

    <InputField
      label="Annual Water Cost ($)"
      value={form.waterCost}
      onChange={(value) =>
        updateField("waterCost", value)
      }
      placeholder="100000"
    />

    <InputField
      label="Annual Maintenance Cost ($)"
      value={form.maintenanceCost}
      onChange={(value) =>
        updateField("maintenanceCost", value)
      }
      placeholder="250000"
    />

    <InputField
      label="Current NOI ($)"
      value={form.currentNOI}
      onChange={(value) =>
        updateField("currentNOI", value)
      }
      placeholder="2000000"
    />

    <InputField
      label="Cap Rate (%)"
      value={form.capRate}
      onChange={(value) =>
        updateField("capRate", value)
      }
      placeholder="5"
    />

    <InputField
      label="Occupancy Rate (%)"
      value={form.occupancyRate}
      onChange={(value) =>
        updateField("occupancyRate", value)
      }
      placeholder="95"
    />

    <InputField
      label="ESG Investment ($)"
      value={form.esgInvestment}
      onChange={(value) =>
        updateField("esgInvestment", value)
      }
      placeholder="500000"
    />

    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        Primary Objective
      </label>

      <select
        value={form.primaryObjective}
        onChange={(e) =>
          updateField(
            "primaryObjective",
            e.target.value
          )
        }
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none"
      >
        <option value="">
          Select Objective
        </option>

        <option value="Increase Asset Value">
          Increase Asset Value
        </option>

        <option value="Reduce Operating Costs">
          Reduce Operating Costs
        </option>

        <option value="Improve ESG Performance">
          Improve ESG Performance
        </option>

        <option value="Attract Capital">
          Attract Capital
        </option>
      </select>
    </div>

  </div>

  <div className="mt-12 text-center">

    <button
      type="submit"
      disabled={isSubmitting}
      className="rounded-full bg-[#10251E] px-10 py-5 text-lg font-semibold text-white hover:bg-[#163528]"
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
return ( <div> <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
{label} </label>

  <input
    required
    type="number"
    value={value}
    onChange={(e) =>
      onChange(e.target.value)
    }
    placeholder={placeholder}
    className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none"
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
return ( <div className="rounded-[2rem] bg-[#ECFDF5] p-8"> <h3 className="text-2xl font-bold">
{title} </h3>

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
      <h2 className="text-3xl font-bold">
        {title}
      </h2>

      <p className="mt-4 text-lg leading-8 text-[#53645D]">
        {content}
      </p>
    </div>
  );
}
