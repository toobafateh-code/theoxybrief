"use client";

import { useMemo, useState } from "react";

type FormData = {
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

  const [form, setForm] = useState<FormData>({
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

  function updateField(key: keyof FormData, value: string) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    const formData = new FormData();

    // FormSubmit settings
    formData.append("_subject", "New Real Estate ESG Assessment Submission");
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

    // Calculated outputs
    formData.append("Estimated Annual Savings", results.savings);
    formData.append("Potential NOI Improvement", results.noiIncrease);
    formData.append(
      "Potential Asset Value Increase",
      results.assetValueIncrease
    );

    // Send email
    await fetch("https://formsubmit.co/ajax/tooba@theoxybrief.com", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    console.error("Assessment email failed:", error);
  }

  // Always show results
  setSubmitted(true);
  window.scrollTo({ top: 0, behavior: "smooth" });
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
              Thank you, {form.fullName}. Based on your responses, we identified
              several opportunities to improve operating performance and enhance
              property value.
            </p>

<div className="mt-10 rounded-[2rem] bg-[#ECFDF5] p-8">
  <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
    Observe
  </p>

  <h2 className="mt-3 text-2xl font-bold">
    What your responses indicate
  </h2>

  <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
    <li>• You manage a {form.propertyType.toLowerCase()} portfolio.</li>
    <li>• Your portfolio size is classified as {form.portfolioSize.toLowerCase()}.</li>
    <li>• Your largest operating cost is {form.largestCost.toLowerCase()}.</li>
    <li>• Utility tracking is {form.tracksUtilities.toLowerCase()}.</li>
    <li>
      • Your primary objective is{" "}
      {form.primaryObjective.toLowerCase()}.
    </li>
  </ul>
</div>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
  <h2 className="text-2xl font-bold">Executive Summary</h2>

  <p className="mt-4 text-lg leading-8 text-[#53645D]">
    Based on your responses, your real estate portfolio may have significant
    opportunities to reduce operating costs, improve net operating income
    (NOI), and increase property value through targeted sustainability
    initiatives.
  </p>
</div>
              <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
                <h3 className="text-lg font-bold">Estimated Annual Savings</h3>
                <p className="mt-4 text-3xl font-bold text-[#3D6B4F]">
                  {results.savings}
                </p>
              </div>

              <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
                <h3 className="text-lg font-bold">Potential NOI Improvement</h3>
                <p className="mt-4 text-3xl font-bold text-[#3D6B4F]">
                  {results.noiIncrease}
                </p>
              </div>

              <div className="rounded-[2rem] bg-[#ECFDF5] p-8">
                <h3 className="text-lg font-bold">
                  Potential Asset Value Increase
                </h3>
                <p className="mt-4 text-3xl font-bold text-[#3D6B4F]">
                  {results.assetValueIncrease}
                </p>
              </div>
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#ECFDF5] p-8">
              <h2 className="text-2xl font-bold">Recommended Priority Areas</h2>

              <ul className="mt-6 space-y-3 text-lg leading-8 text-[#53645D]">
                {results.recommendations.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-12 rounded-[2rem] bg-[#10251E] px-8 py-12 text-center text-white">
              <p className="text-lg uppercase tracking-[0.35em] text-[#B9D2B1]">
                Recommended Next Step
              </p>

              <h2 className="mt-5 text-3xl font-bold md:text-4xl">
                Schedule a 30-Minute Property Value Strategy Session
              </h2>

              <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-white/80">
                Review your personalized results and identify high-impact
                opportunities to increase NOI and asset value.
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
              options={["Energy", "Water", "Maintenance", "Vacancy", "Waste"]}
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
            className="mt-10 w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
          >
            Generate My Personalized OXY Brief
          </button>
        </form>
      </section>
    </main>
  );
}