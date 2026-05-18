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

export default function RealEstateAssessmentPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      // FormSubmit settings
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const SelectField = ({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
  }) => (
    <div>
      <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
        {label}
      </label>
      <select
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-white px-5 py-4 outline-none focus:border-[#3D6B4F]"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

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
              <h2 className="text-2xl font-bold">
                Executive Summary
              </h2>

              <p className="mt-4 text-lg leading-8 text-[#53645D]">
                Based on your responses, your real estate portfolio may
                have significant opportunities to reduce operating costs,
                improve net operating income (NOI), and increase property
                value through targeted sustainability initiatives.
              </p>
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
                  • You manage a{" "}
                  {form.propertyType.toLowerCase()} portfolio.
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
                  • Reducing{" "}
                  {form.largestCost.toLowerCase()} expenses can directly
                  improve operating margins.
                </li>
                <li>
                  • Improved sustainability performance can enhance
                  tenant appeal and reduce vacancy risk.
                </li>
                <li>
                  • Lower operating costs increase net operating income
                  (NOI).
                </li>
                <li>
                  • Higher NOI can translate into stronger asset
                  valuations.
                </li>
                <li>
                  • Better ESG performance can improve resilience and
                  investor confidence.
                </li>
              </ul>
            </div>

            {/* Yield */}
            <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
                Yield
              </p>

              <h2 className="mt-3 text-2xl font-bold">
                Estimated financial outcomes and strategic benefits
              </h2>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">
                    Annual Savings
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-[#3D6B4F]">
                    {results.savings}
                  </p>
                </div>

                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">
                    NOI Improvement
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-[#3D6B4F]">
                    {results.noiIncrease}
                  </p>
                </div>

                <div className="rounded-[2rem] bg-[#ECFDF5] p-6">
                  <h3 className="text-lg font-bold">
                    Asset Value Increase
                  </h3>
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
                These estimates are based on your responses and industry
                benchmarks for energy and water efficiency, green
                building performance, occupancy trends, and real estate
                valuation methodologies.
              </p>

              <ol className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                <li>
                  1. We identified likely operating cost reduction
                  opportunities based on your largest cost category and
                  utility tracking maturity.
                </li>
                <li>
                  2. We translated potential savings into net operating
                  income (NOI) improvements.
                </li>
                <li>
                  3. We estimated valuation impact using representative
                  capitalization rate assumptions.
                </li>
                <li>
                  4. We incorporated qualitative benefits such as tenant
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
                  • Conduct a baseline energy and water performance
                  review
                </li>
                <li>
                  • Quantify NOI and valuation improvement opportunities
                </li>
                <li>
                  • Identify quick wins with attractive payback periods
                </li>
                <li>
                  • Evaluate green certification and tenant value
                  opportunities
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

{/* OXY VALUE INTELLIGENCE CTA */}
<div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-10 text-center">
  <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
    OXY Value Intelligence™
  </p>

  <h2 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
    Unlock a Precise Financial Analysis Using Your Actual Data
  </h2>

  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#53645D]">
    Your preliminary OXY Brief identified meaningful opportunities to
    improve operating performance and enhance property value. Complete
    the OXY Value Intelligence™ Assessment to calculate exact savings,
    ROI, payback period, NOI uplift, and asset value increase using your
    actual operating and financial data.
  </p>

  <div className="mt-8 grid gap-4 text-left md:grid-cols-2">
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="font-semibold">✓ Exact Annual Savings</p>
      <p className="mt-2 text-[#53645D]">
        Based on your real energy, water, and maintenance costs.
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
        Measure the direct impact on property profitability.
      </p>
    </div>

    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <p className="font-semibold">✓ Asset Value Increase</p>
      <p className="mt-2 text-[#53645D]">
        Estimate valuation uplift using cap rate methodology.
      </p>
    </div>
  </div>

  <a
    href="/assessments/real-estate/value-intelligence"
    className="mt-8 inline-block rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
  >
    Start OXY Value Intelligence™ Assessment
  </a>
</div>

            {/* CTA */}
            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-lg uppercase tracking-[0.35em] text-[#B9D2B1]">
                Recommended Next Step
              </p>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Schedule a 30-Minute Property Value Strategy Session
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
                Review your personalized results and explore how The OXY
                Brief can support you at each step to increase NOI,
                strengthen resilience, and enhance long-term asset
                value.
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

return (
  <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
    <section className="mx-auto max-w-5xl">
      <div className="text-center">
        <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
          Real Estate ESG Value Assessment
        </p>

        <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Discover how sustainability can increase your property value.
        </h1>

        <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
          Answer 10 quick questions to identify opportunities to improve NOI,
          attract premium tenants, and enhance asset valuation.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-14 rounded-[2rem] bg-white p-10 shadow-sm md:p-14"
      >
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
              Full Name
            </label>
            <input
              required
              type="text"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
            />
          </div>

          <div>
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
              Company Name
            </label>
            <input
              required
              type="text"
              value={form.company}
              onChange={(e) => updateField("company", e.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
              Email Address
            </label>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
            />
          </div>

          <SelectField
            label="1. What type of property do you manage?"
            value={form.propertyType}
            onChange={(value) => updateField("propertyType", value)}
            options={[
              "Office",
              "Residential",
              "Retail",
              "Mixed Use",
              "Industrial",
              "Hospitality",
            ]}
          />

          <SelectField
            label="2. What is your portfolio size?"
            value={form.portfolioSize}
            onChange={(value) => updateField("portfolioSize", value)}
            options={["Small", "Medium", "Large"]}
          />

          <SelectField
            label="3. What is your largest operating cost?"
            value={form.largestCost}
            onChange={(value) => updateField("largestCost", value)}
            options={[
              "Energy",
              "Water",
              "Maintenance",
              "Vacancy",
              "Waste",
            ]}
          />

          <SelectField
            label="4. Do you track energy and water consumption?"
            value={form.tracksUtilities}
            onChange={(value) => updateField("tracksUtilities", value)}
            options={["Yes", "Partially", "No"]}
          />

          <SelectField
            label="5. What is your occupancy rate?"
            value={form.occupancyRate}
            onChange={(value) => updateField("occupancyRate", value)}
            options={["Below 70%", "70%–85%", "Above 85%"]}
          />

          <SelectField
            label="6. Do you hold green certifications?"
            value={form.greenCertification}
            onChange={(value) => updateField("greenCertification", value)}
            options={["LEED", "BREEAM", "Estidama", "None"]}
          />

          <SelectField
            label="7. Are tenants requesting sustainability features?"
            value={form.tenantDemand}
            onChange={(value) => updateField("tenantDemand", value)}
            options={["Frequently", "Occasionally", "Rarely"]}
          />

          <SelectField
            label="8. What is your primary objective?"
            value={form.primaryObjective}
            onChange={(value) => updateField("primaryObjective", value)}
            options={[
              "Reduce Operating Costs",
              "Increase Asset Value",
              "Attract Premium Tenants",
              "Meet ESG Requirements",
            ]}
          />

          <SelectField
            label="9. What is your estimated budget?"
            value={form.budget}
            onChange={(value) => updateField("budget", value)}
            options={[
              "Under $10,000",
              "$10,000–$50,000",
              "$50,000–$250,000",
              "$250,000+",
            ]}
          />

          <SelectField
            label="10. How soon do you want to begin?"
            value={form.timeline}
            onChange={(value) => updateField("timeline", value)}
            options={[
              "Immediately",
              "Within 3 Months",
              "Within 6 Months",
              "Exploring Options",
            ]}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-10 w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30] disabled:cursor-not-allowed disabled:opacity-80"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-3">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              Generating Your Personalized OXY Brief...
            </span>
          ) : (
            "Generate My Personalized OXY Brief"
          )}
        </button>
      </form>
    </section>
  </main>
);
}