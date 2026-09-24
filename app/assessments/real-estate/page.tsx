"use client";

import { useMemo, useState } from "react";

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
  number: number;
  label: string;
  description?: string;
  options: string[];
};

const questions: Question[] = [
  {
    key: "propertyType",
    number: 1,
    label: "What type of property are you assessing?",
    description:
      "Select the primary asset type you want to evaluate through the OXY Brief.",
    options: [
      "Office",
      "Residential",
      "Retail",
      "Mixed Use",
      "Industrial",
      "Hospitality",
    ],
  },
  {
    key: "portfolioSize",
    number: 2,
    label: "How would you describe the scale of your portfolio?",
    description:
      "This helps us establish an initial benchmark for the potential opportunity.",
    options: ["Small", "Medium", "Large"],
  },
  {
    key: "largestCost",
    number: 3,
    label: "What is currently your largest operating cost?",
    description:
      "Identifying the dominant cost area helps us identify where value may be concentrated.",
    options: ["Energy", "Water", "Maintenance", "Vacancy", "Waste"],
  },
  {
    key: "tracksUtilities",
    number: 4,
    label: "How closely do you track energy and water consumption?",
    description:
      "Data availability is an important part of understanding your current sustainability intelligence maturity.",
    options: ["Yes", "Partially", "No"],
  },
  {
    key: "occupancyRate",
    number: 5,
    label: "What is your current occupancy rate?",
    description:
      "Occupancy can influence both operating performance and the value proposition of sustainability improvements.",
    options: ["Below 70%", "70%–85%", "Above 85%"],
  },
  {
    key: "greenCertification",
    number: 6,
    label: "Does the asset or portfolio hold a green certification?",
    description:
      "Tell us about the certification position of the asset today.",
    options: ["LEED", "BREEAM", "Estidama", "None"],
  },
  {
    key: "tenantDemand",
    number: 7,
    label: "How frequently are tenants requesting sustainability features?",
    description:
      "Tenant demand can be an important indicator of commercial sustainability value.",
    options: ["Frequently", "Occasionally", "Rarely"],
  },
  {
    key: "primaryObjective",
    number: 8,
    label: "What is your primary objective?",
    description:
      "Choose the outcome that is most important to your organization right now.",
    options: [
      "Reduce Operating Costs",
      "Increase Asset Value",
      "Attract Premium Tenants",
      "Meet ESG Requirements",
    ],
  },
  {
    key: "budget",
    number: 9,
    label: "What is your estimated sustainability investment budget?",
    description:
      "An indicative budget helps us understand the scale of opportunities that may be actionable.",
    options: [
      "Under $10,000",
      "$10,000–$50,000",
      "$50,000–$250,000",
      "$250,000+",
    ],
  },
  {
    key: "timeline",
    number: 10,
    label: "How soon are you looking to begin?",
    description:
      "This helps us understand your implementation readiness.",
    options: [
      "Immediately",
      "Within 3 Months",
      "Within 6 Months",
      "Exploring Options",
    ],
  },
];

export default function RealEstateAssessmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

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

  function updateField(key: keyof AssessmentForm, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  const results = useMemo(() => {
    const savings =
      form.portfolioSize === "Large"
        ? "$500,000 – $2,000,000"
        : form.portfolioSize === "Medium"
          ? "$100,000 – $500,000"
          : "$25,000 – $100,000";

    const noiIncrease =
      form.portfolioSize === "Large"
        ? "$750,000 – $3,000,000"
        : form.portfolioSize === "Medium"
          ? "$150,000 – $750,000"
          : "$40,000 – $150,000";

    const assetValueIncrease =
      form.portfolioSize === "Large"
        ? "$12M – $50M"
        : form.portfolioSize === "Medium"
          ? "$2.5M – $12M"
          : "$500K – $2.5M";

    const recommendations = [
      "Energy efficiency and decarbonisation ROI analysis",
      "Water efficiency and leakage optimization",
      "Green certification strategy",
      "Tenant sustainability value proposition",
      "Asset valuation enhancement roadmap",
    ];

    return {
      savings,
      noiIncrease,
      assetValueIncrease,
      recommendations,
    };
  }, [form.portfolioSize]);

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault();

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append(
        "_subject",
        "New Real Estate ESG Assessment Submission"
      );
      formData.append("_captcha", "false");
      formData.append("_template", "table");

      // Contact details
      formData.append("Full Name", form.fullName);
      formData.append("Company", form.company);
      formData.append("Email", form.email);

      // Assessment answers
      formData.append("Property Type", form.propertyType);
      formData.append("Portfolio Size", form.portfolioSize);
      formData.append("Largest Operating Cost", form.largestCost);
      formData.append("Tracks Utilities", form.tracksUtilities);
      formData.append("Occupancy Rate", form.occupancyRate);
      formData.append("Green Certification", form.greenCertification);
      formData.append("Tenant Demand", form.tenantDemand);
      formData.append("Primary Objective", form.primaryObjective);
      formData.append("Budget", form.budget);
      formData.append("Timeline", form.timeline);

      // Generated outputs
      formData.append("Estimated Annual Savings", results.savings);
      formData.append("Potential NOI Improvement", results.noiIncrease);
      formData.append(
        "Potential Asset Value Increase",
        results.assetValueIncrease
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
        throw new Error("Failed to send assessment email");
      }

      const data = await response.json();
      console.log("FormSubmit response:", data);
    } catch (error) {
      console.error("Assessment email failed:", error);
    }

    setIsSubmitting(false);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function beginAssessment() {
    setShowIntro(false);
    setCurrentStep(0);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function currentQuestionAnswered() {
    const question = questions[currentStep];

    if (!question) return true;

    return Boolean(form[question.key]);
  }

  function handleNext() {
    if (!currentQuestionAnswered()) return;

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      setCurrentStep(questions.length);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  /*
   * INTRO SCREEN
   */
  if (showIntro && !submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-16 text-[#10251E] md:px-16 md:py-24">
        <section className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="px-8 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20">
                <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                  OXY REAL ESTATE INTELLIGENCE
                </p>

                <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                  Real Estate
                  <br />
                  <span className="text-[#3D6B4F]">
                    Value Assessment
                  </span>
                </h1>

                <p className="mt-7 max-w-2xl text-xl leading-9 text-[#53645D]">
                  Discover where sustainability may be creating untapped
                  operating, tenant and asset value across your portfolio.
                </p>

                <div className="mt-10 flex flex-wrap gap-3">
                  <div className="rounded-full border border-[#10251E]/10 bg-[#ECFDF5] px-5 py-3 text-sm font-semibold">
                    10 questions
                  </div>

                  <div className="rounded-full border border-[#10251E]/10 bg-[#ECFDF5] px-5 py-3 text-sm font-semibold">
                    ~3 minutes
                  </div>

                  <div className="rounded-full border border-[#10251E]/10 bg-[#ECFDF5] px-5 py-3 text-sm font-semibold">
                    No technical data required
                  </div>
                </div>

                <button
                  type="button"
                  onClick={beginAssessment}
                  className="mt-12 inline-flex items-center gap-4 rounded-full bg-[#10251E] px-8 py-5 text-base font-semibold text-white transition hover:bg-[#1D3A30]"
                >
                  Begin Assessment
                  <span className="text-xl">→</span>
                </button>

                <p className="mt-5 text-sm text-[#53645D]">
                  Your preliminary assessment is benchmark-based and designed
                  to identify areas for deeper analysis.
                </p>
              </div>

              <div className="relative flex min-h-[420px] items-center bg-[#10251E] px-8 py-12 text-white md:px-14 lg:min-h-full lg:px-16">
                <div className="absolute right-10 top-10 h-32 w-32 rounded-full border border-white/10" />
                <div className="absolute bottom-10 right-20 h-48 w-48 rounded-full border border-white/5" />

                <div className="relative">
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
                    THE OXY MODEL
                  </p>

                  <div className="mt-10 space-y-8">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B9D2B1]">
                        01 / Observe
                      </p>
                      <p className="mt-2 text-lg text-white/80">
                        Understand your current asset and operating profile.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B9D2B1]">
                        02 / Translate
                      </p>
                      <p className="mt-2 text-lg text-white/80">
                        Identify where sustainability may influence business
                        performance.
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B9D2B1]">
                        03 / Yield
                      </p>
                      <p className="mt-2 text-lg text-white/80">
                        Surface potential value creation opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * SUBMITTED REPORT
   */
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
        <section className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
            <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Your Personalized OXY Brief
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Real Estate ESG Value Report
            </h1>

            <p className="mt-6 text-lg leading-8 text-[#53645D]">
              Thank you, {form.fullName}. Based on your responses, we
              identified several opportunities to improve operating
              performance and enhance property value as per THE OXY MODEL.
            </p>

            {/* Executive Summary */}
            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-2xl font-bold">Executive Summary</h2>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                Based on your responses, your real estate portfolio may have
                significant opportunities to reduce operating costs, improve
                net operating income (NOI), and increase property value through
                targeted sustainability initiatives.
              </p>

              <div className="mt-5 rounded-2xl border border-[#3D6B4F]/10 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[#3D6B4F]">
                  Important
                </p>

                <p className="mt-2 text-sm leading-7 text-[#53645D]">
                  The figures below are preliminary benchmark-based
                  indications, not property-specific forecasts. A detailed
                  OXY Value Intelligence™ analysis uses actual operating and
                  financial data.
                </p>
              </div>
            </div>

            {/* Observe */}
            <div className="mt-10 rounded-[2rem] bg-[#ECFDF5] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Observe
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                What your responses indicate
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  • You manage a {form.propertyType.toLowerCase()} portfolio.
                </li>

                <li>
                  • Your portfolio size is classified as{" "}
                  {form.portfolioSize.toLowerCase()}.
                </li>

                <li>
                  • Your largest operating cost is{" "}
                  {form.largestCost.toLowerCase()}.
                </li>

                <li>
                  • Utility tracking is{" "}
                  {form.tracksUtilities.toLowerCase()}.
                </li>

                <li>
                  • Your primary objective is{" "}
                  {form.primaryObjective.toLowerCase()}.
                </li>
              </ul>
            </div>

            {/* Translate */}
            <div className="mt-10 rounded-[2rem] bg-[#ECFDF5] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Translate
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                How these observations affect business performance
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  • Reducing {form.largestCost.toLowerCase()} expenses can
                  directly improve operating margins.
                </li>

                <li>
                  • Improved sustainability performance can enhance tenant
                  appeal and reduce vacancy risk.
                </li>

                <li>
                  • Lower operating costs increase net operating income (NOI).
                </li>

                <li>
                  • Higher NOI can translate into stronger asset valuations.
                </li>

                <li>
                  • Better ESG performance can improve resilience and investor
                  confidence.
                </li>
              </ul>
            </div>

            {/* Yield */}
            <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Yield
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Preliminary benchmark indications
              </h2>

              <p className="mt-4 text-base leading-7 text-[#53645D]">
                These ranges are indicative benchmarks based on the portfolio
                scale selected in this preliminary assessment. They are not
                forecasts for your specific assets.
              </p>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">Annual Savings</h3>

                  <p className="mt-3 text-2xl font-bold text-[#3D6B4F]">
                    {results.savings}
                  </p>
                </div>

                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">NOI Improvement</h3>

                  <p className="mt-3 text-2xl font-bold text-[#3D6B4F]">
                    {results.noiIncrease}
                  </p>
                </div>

                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">Asset Value Indication</h3>

                  <p className="mt-3 text-2xl font-bold text-[#3D6B4F]">
                    {results.assetValueIncrease}
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>• Stronger tenant retention</li>
                <li>• Reduced vacancy risk</li>
                <li>• Improved market positioning</li>
                <li>• Enhanced long-term asset resilience</li>
              </ul>
            </div>

            {/* Methodology */}
            <div className="mt-10 rounded-[2rem] bg-[#ECFDF5] p-8">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Methodology
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                How we estimated these results
              </h2>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                These preliminary indications are based on your responses and
                industry benchmarks for energy and water efficiency, green
                building performance, occupancy trends, and real estate
                valuation methodologies.
              </p>

              <ol className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  1. We identified likely operating cost reduction
                  opportunities based on your largest cost category and utility
                  tracking maturity.
                </li>

                <li>
                  2. We translated potential savings into net operating income
                  (NOI) improvement scenarios.
                </li>

                <li>
                  3. We estimated valuation impact using representative
                  capitalization rate assumptions.
                </li>

                <li>
                  4. We incorporated qualitative considerations such as tenant
                  demand and reduced vacancy risk.
                </li>
              </ol>
            </div>

            {/* Recommended Next Steps */}
            <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Recommended Next Steps
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Priority actions for the next 90 days
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  • Conduct a baseline energy and water performance review
                </li>

                <li>
                  • Quantify NOI and valuation improvement opportunities
                </li>

                <li>
                  • Identify quick wins with attractive payback periods
                </li>

                <li>
                  • Evaluate green certification and tenant value opportunities
                </li>

                <li>
                  • Develop a prioritized ESG value creation roadmap
                </li>
              </ul>

              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                The OXY Brief is here to support you at each step, from
                identifying opportunities to translating sustainability
                initiatives into measurable financial outcomes.
              </p>
            </div>

            {/* Recommended Priority Areas */}
            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-2xl font-bold">
                Recommended Priority Areas
              </h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                {results.recommendations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            {/* Value Intelligence CTA */}
            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-10 text-center">
              <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                OXY Value Intelligence™
              </p>

              <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                Move From Preliminary Insight to Property-Specific Financial
                Intelligence
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#53645D]">
                Your preliminary OXY Brief identified potential opportunities.
                The next stage uses your actual operating and financial data to
                model savings, ROI, payback period, NOI impact and potential
                asset value implications.
              </p>

              <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-semibold">✓ Property-Specific Savings</p>

                  <p className="mt-2 text-[#53645D]">
                    Based on your real energy, water and maintenance costs.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-semibold">✓ ROI & Payback Period</p>

                  <p className="mt-2 text-[#53645D]">
                    Quantify financial returns on sustainability investments.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-semibold">✓ NOI Improvement</p>

                  <p className="mt-2 text-[#53645D]">
                    Measure the potential impact on property profitability.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <p className="font-semibold">✓ Asset Value Analysis</p>

                  <p className="mt-2 text-[#53645D]">
                    Model potential valuation implications using financial
                    inputs and cap-rate methodology.
                  </p>
                </div>
              </div>

              <a
                href="/assessments/real-estate/value-intelligence"
                className="mt-8 inline-block rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white transition hover:bg-[#1D3A30]"
              >
                Start OXY Value Intelligence™ Assessment
              </a>
            </div>

            {/* Strategy Session CTA */}
            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-lg uppercase tracking-[0.35em] text-[#B9D2B1]">
                Recommended Next Step
              </p>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Schedule a 30-Minute Property Value Strategy Session
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
                Review your preliminary results and explore how The OXY Brief
                can support you in identifying, quantifying and implementing
                sustainability-driven value opportunities.
              </p>

              <a
                href="/contact"
                className="mt-8 inline-block rounded-full bg-white px-8 py-4 font-semibold text-[#10251E]"
              >
                Book Your Strategy Session
              </a>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /*
   * ANALYSIS / CONTACT STEP
   */
  if (currentStep === questions.length) {
    const canSubmit =
      form.fullName.trim() !== "" &&
      form.company.trim() !== "" &&
      form.email.trim() !== "";

    return (
      <main className="min-h-screen bg-[#ECFDF5] px-6 py-12 text-[#10251E] md:px-16 md:py-20">
        <section className="mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm font-semibold text-[#53645D]">
              <span>Assessment complete</span>
              <span>10 / 10</span>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#10251E]/10">
              <div className="h-full w-full rounded-full bg-[#3D6B4F]" />
            </div>
          </div>

          <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Final Step
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight md:text-6xl">
              Where should we send your OXY Brief?
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#53645D]">
              Enter your details to generate your preliminary Real Estate ESG
              Value Report.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!canSubmit) return;

                handleSubmit(e);
              }}
              className="mt-10 space-y-6"
            >
              <div>
                <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Full Name
                </label>

                <input
                  required
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(e) =>
                    updateField("fullName", e.target.value)
                  }
                  placeholder="Your full name"
                  className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none transition focus:border-[#3D6B4F] focus:ring-2 focus:ring-[#3D6B4F]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Company Name
                </label>

                <input
                  required
                  type="text"
                  autoComplete="organization"
                  value={form.company}
                  onChange={(e) =>
                    updateField("company", e.target.value)
                  }
                  placeholder="Your company"
                  className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none transition focus:border-[#3D6B4F] focus:ring-2 focus:ring-[#3D6B4F]/10"
                />
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                  Business Email
                </label>

                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) =>
                    updateField("email", e.target.value)
                  }
                  placeholder="you@company.com"
                  className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none transition focus:border-[#3D6B4F] focus:ring-2 focus:ring-[#3D6B4F]/10"
                />
              </div>

              <div className="rounded-2xl border border-[#10251E]/10 bg-[#ECFDF5] p-5">
                <p className="text-sm leading-6 text-[#53645D]">
                  Your assessment responses are used to prepare your
                  preliminary OXY Brief and identify areas for deeper analysis.
                </p>
              </div>

              <div className="flex flex-col-reverse gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="rounded-full border border-[#10251E]/15 px-7 py-4 font-semibold text-[#10251E] transition hover:bg-[#ECFDF5]"
                >
                  ← Back
                </button>

                <button
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                  className="rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white transition hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-3">
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Preparing Your OXY Brief...
                    </span>
                  ) : (
                    "Generate My Personalized OXY Brief →"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  /*
   * QUESTION SCREEN
   */
  const question = questions[currentStep];
  const selectedValue = form[question.key];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-10 text-[#10251E] md:px-16 md:py-16">
      <section className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              OXY REAL ESTATE VALUE ASSESSMENT
            </p>

            <p className="text-sm font-semibold text-[#53645D]">
              {String(currentStep + 1).padStart(2, "0")} / 10
            </p>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#10251E]/10">
            <div
              className="h-full rounded-full bg-[#3D6B4F] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="rounded-[2.5rem] bg-white p-8 shadow-sm md:p-14">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              Question {String(question.number).padStart(2, "0")}
            </p>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {question.label}
            </h1>

            {question.description && (
              <p className="mt-5 text-lg leading-8 text-[#53645D]">
                {question.description}
              </p>
            )}
          </div>

          {/* Answer cards */}
          <div className="mt-10 grid gap-3">
            {question.options.map((option) => {
              const isSelected = selectedValue === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    updateField(question.key, option);

                    /*
                     * Automatically advance after selecting an answer,
                     * except on the final question.
                     */
                    if (currentStep < questions.length - 1) {
                      window.setTimeout(() => {
                        setCurrentStep((prev) => prev + 1);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 180);
                    } else {
                      window.setTimeout(() => {
                        setCurrentStep(questions.length);

                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 180);
                    }
                  }}
                  className={`group flex w-full items-center justify-between rounded-2xl border px-6 py-5 text-left transition ${
                    isSelected
                      ? "border-[#3D6B4F] bg-[#ECFDF5] shadow-sm"
                      : "border-[#10251E]/10 bg-white hover:border-[#3D6B4F]/40 hover:bg-[#ECFDF5]/50"
                  }`}
                >
                  <span className="flex items-center gap-4">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full border transition ${
                        isSelected
                          ? "border-[#3D6B4F] bg-[#3D6B4F]"
                          : "border-[#10251E]/20 group-hover:border-[#3D6B4F]"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-white" />
                      )}
                    </span>

                    <span
                      className={`text-base font-semibold md:text-lg ${
                        isSelected
                          ? "text-[#10251E]"
                          : "text-[#53645D]"
                      }`}
                    >
                      {option}
                    </span>
                  </span>

                  <span
                    className={`text-xl transition ${
                      isSelected
                        ? "translate-x-0 text-[#3D6B4F]"
                        : "-translate-x-1 text-[#10251E]/20 group-hover:translate-x-0 group-hover:text-[#3D6B4F]"
                    }`}
                  >
                    →
                  </span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between border-t border-[#10251E]/10 pt-7">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="rounded-full px-5 py-3 font-semibold text-[#53645D] transition hover:bg-[#ECFDF5] disabled:invisible"
            >
              ← Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedValue}
              className="rounded-full bg-[#10251E] px-7 py-3 font-semibold text-white transition hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {currentStep === questions.length - 1
                ? "Continue →"
                : "Continue →"}
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-sm text-[#53645D]">
          Your answers help establish an initial OXY value profile.
        </p>
      </section>
    </main>
  );
}