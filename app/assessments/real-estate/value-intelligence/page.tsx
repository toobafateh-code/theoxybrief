export default function RealEstateValueIntelligencePage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] px-6 py-24 text-[#10251E] md:px-16">
      <section className="mx-auto max-w-5xl">
        {/* Hero Section */}
        <div className="text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            OXY Value Intelligence™
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Real Estate Financial Intelligence Assessment
          </h1>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            Provide your actual operational and financial data to receive
            a precise analysis of annual savings, ROI, payback period,
            NOI improvement, and asset value uplift.
          </p>
        </div>

        {/* Advanced Input Form */}
        <div className="mt-14 rounded-[2rem] bg-white p-10 shadow-sm md:p-14">
          <h2 className="text-3xl font-bold">Advanced Financial Inputs</h2>

          <p className="mt-4 text-lg leading-8 text-[#53645D]">
            Enter your actual operating and financial data to generate a
            precise OXY Value Intelligence™ Report.
          </p>

          <form className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Portfolio Data */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Total Portfolio Area (sq ft)
              </label>
              <input
                type="number"
                placeholder="e.g. 500000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Number of Properties
              </label>
              <input
                type="number"
                placeholder="e.g. 12"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            {/* Operating Costs */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Annual Energy Cost (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 250000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Annual Water Cost (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 50000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Annual Maintenance Cost (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 300000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            {/* Financial Metrics */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Current NOI (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Cap Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 6"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Occupancy Rate (%)
              </label>
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 92"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Planned ESG Investment (USD)
              </label>
              <input
                type="number"
                placeholder="e.g. 400000"
                className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4"
              />
            </div>

            {/* Objective */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Primary Objective
              </label>
              <select className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4">
                <option>Reduce Operating Costs</option>
                <option>Increase Asset Value</option>
                <option>Improve Occupancy</option>
                <option>Meet ESG Requirements</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="md:col-span-2 mt-4 w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
            >
              Generate Precise OXY Value Intelligence™ Report
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}