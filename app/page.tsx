import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] text-[#10251E]">
      {/* HEADER */}
      <header className="px-6 pt-6 md:px-16 md:pt-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8">
          <a href="/">
            <Image
              src="/oxy-logo.png"
              alt="The OXY Brief"
              width={180}
              height={70}
              className="h-auto w-32 md:w-40"
              priority
            />
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-8 text-lg font-bold text-[#10251E] md:gap-12 md:text-xl">
            <a href="#about" className="hover:text-[#3D6B4F]">
              About
            </a>
            <a href="#work-model" className="hover:text-[#3D6B4F]">
              Our Work Model
            </a>
            <a href="#services" className="hover:text-[#3D6B4F]">
              Services
            </a>
<a href="#knowledge-hub" className="hover:text-[#3D6B4F]">
  Knowledge Hub
</a>
            <a href="#insights" className="hover:text-[#3D6B4F]">
              Insights
            </a>
            <a href="#contact" className="hover:text-[#3D6B4F]">
              Contact
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="px-6 pt-8 pb-20 md:px-16 md:pt-10 md:pb-28">
        <div className="mx-auto grid max-w-7xl items-center gap-16 md:grid-cols-2">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
              Observe → Translate → Yield
            </p>

            <h1 className="text-6xl font-black leading-none tracking-tight md:text-8xl">
              THE OXY BRIEF
            </h1>

            <p className="mt-8 max-w-3xl text-2xl leading-relaxed text-[#43524B]">
              Translating sustainability into financial performance.
            </p>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-[#53645D]">
              A sustainability intelligence platform helping businesses, youth,
              and leaders understand ESG beyond reports — through cost, risk,
              capital, margins, and measurable value.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#oxy-model"
                className="rounded-full bg-[#10251E] px-8 py-4 text-center font-semibold text-white hover:bg-[#1D3A30]"
              >
                Explore The OXY Model
              </a>

              <a
                href="#contact"
                className="rounded-full border border-[#10251E]/20 bg-white px-8 py-4 text-center font-semibold hover:bg-[#EFEADF]"
              >
                Collaborate
              </a>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <img
              src="/tooba.png"
              alt="Tooba Fateh"
              className="w-full max-w-xl rounded-[2rem] object-cover shadow-2xl"
            />

            <p className="mt-4 text-lg text-[#355c4d]">
              Tooba Fateh — Founder, The OXY Brief
            </p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-20 md:px-16">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
              About
            </p>

            <h2 className="mt-4 text-4xl font-bold leading-tight md:text-5xl">
              ESG should not stop at reports.
            </h2>
          </div>

          <div className="text-lg leading-8 text-[#53645D]">
            <p>
              The OXY Brief is built on one core belief: sustainability becomes
              powerful when it connects to business performance.
            </p>

            <p className="mt-5">
              We translate sustainability into financial, operational, and
              strategic relevance — helping audiences understand how ESG affects
              cost, risk, capital, margins, procurement, infrastructure, and
              long-term resilience.
            </p>
          </div>
        </div>
      </section>

      {/* OXY MODEL */}
      <section id="oxy-model" className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            The OXY Model
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Observe. Translate. Yield.
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            A clear framework for converting sustainability from abstract
            reporting into practical business performance.
          </p>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E4EDDF] text-3xl font-bold text-[#2F6B3F]">
                O
              </div>
              <h3 className="text-4xl font-bold">Observe</h3>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                Identify inefficiencies, emissions, operational waste, resource
                pressure, and sustainability gaps that others overlook.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E4EDDF] text-3xl font-bold text-[#2F6B3F]">
                X
              </div>
              <h3 className="text-4xl font-bold">Translate</h3>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                Convert ESG into business language: cost, margin, capital,
                risk, valuation, procurement, and operational efficiency.
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E4EDDF] text-3xl font-bold text-[#2F6B3F]">
                Y
              </div>
              <h3 className="text-4xl font-bold">Yield</h3>
              <p className="mt-6 text-lg leading-8 text-[#53645D]">
                Generate measurable outcomes: lower costs, stronger resilience,
                better decisions, and sustainability that performs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OXY INSIGHT */}
      <section className="px-6 py-20 md:px-16">
        <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#10251E] p-10 text-white md:p-16">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
            OXY Insight
          </p>

          <h2 className="mt-5 max-w-5xl text-4xl font-bold leading-tight md:text-6xl">
            ESG that does not impact the P&amp;L eventually becomes noise.
          </h2>

          <p className="mt-8 max-w-3xl text-lg leading-8 text-white/75">
            The future of ESG is not more reporting. It is sustainability
            embedded into operations, strategy, finance, and decision-making.
          </p>
        </div>
      </section>

{/* PODCAST */}
<section className="px-6 py-20 md:px-16">
  <div className="mx-auto max-w-7xl items-center gap-12 md:grid md:grid-cols-2">
    <div>
      <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
        Podcast
      </p>

      <h2 className="mt-5 text-5xl font-black leading-tight md:text-7xl">
        Real conversations on sustainability, finance & impact.
      </h2>

      <p className="mt-6 text-xl leading-9 text-[#53645D]">
        Hosted by Tooba Fateh, The OXY Brief Podcast features conversations with
        leaders, experts, and innovators shaping the future of sustainability.
      </p>

      <p className="mt-6 text-xl leading-9 text-[#53645D]">
        Topics include ESG, sustainable finance, decarbonisation, climate
        strategy, circular economy, and business performance.
      </p>
    </div>

    <div className="mt-10 md:mt-0">
      <img
        src="/oxy-podcast.jpg"
        alt="The OXY Brief Podcast"
        className="mx-auto w-full max-w-md rounded-[2rem] shadow-2xl"
      />
    </div>
  </div>
</section>

{/* OXY ECOSYSTEM */}
<section id="work-model" className="px-6 py-24 md:px-16">
  <div className="mx-auto max-w-7xl text-center">
    <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
      The OXY Ecosystem
    </p>

    <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
      A unified sustainability intelligence platform.
    </h2>

    <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
      The OXY Brief, OXY 60, OXY Explains, and the OXY Model work together to
      translate sustainability into measurable business performance.
    </p>

    <div className="mt-16 grid gap-6 md:grid-cols-3">
      <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
        <h3 className="text-4xl font-bold">The OXY Brief</h3>
        <p className="mt-6 text-lg leading-8 text-[#53645D]">
          Executive sustainability insights connecting ESG to business performance.
        </p>
      </div>

      <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
        <h3 className="text-4xl font-bold">OXY 60</h3>
        <p className="mt-6 text-lg leading-8 text-[#53645D]">
          60-second sustainability intelligence for leaders, youth, and modern audiences.
        </p>
      </div>

      <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm">
        <h3 className="text-4xl font-bold">OXY Explains</h3>
        <p className="mt-6 text-lg leading-8 text-[#53645D]">
          Visual breakdowns simplifying ESG, decarbonisation, circular economy,
          and sustainability strategy.
        </p>
      </div>
    </div>

    <div className="mt-14">
      <img
        src="/oxy-ecosystem.jpg"
        alt="The OXY Ecosystem"
        className="w-full rounded-[2rem] shadow-2xl"
      />
    </div>
  </div>
</section>
      
      {/* ADVISORY SERVICES */}
      <section id="services" className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            Services
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Sustainability advisory designed for financial outcomes.
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            We help organizations connect sustainability strategy to margin
            expansion, revenue growth, access to capital, and enterprise value
            protection.
          </p>

          <div className="mt-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-10 text-left shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                01
              </p>

              <h3 className="mt-4 text-4xl font-bold">Cost Efficiency</h3>
              <p className="mt-2 text-xl text-[#53645D]">Margin Expansion</p>

              <h4 className="mt-8 text-lg font-bold">Services</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Energy efficiency &amp; decarbonization ROI modeling</li>
                <li>• Supply chain optimization: waste, logistics, packaging</li>
                <li>• Resource efficiency: water and materials</li>
                <li>• Carbon pricing exposure modeling</li>
                <li>• ESG-driven operational audits</li>
              </ul>

              <h4 className="mt-8 text-lg font-bold">Outputs</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Cost savings models</li>
                <li>• Payback periods</li>
                <li>• EBITDA uplift projections</li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-left shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                02
              </p>

              <h3 className="mt-4 text-4xl font-bold">Revenue Upside</h3>
              <p className="mt-2 text-xl text-[#53645D]">Top-Line Growth</p>

              <h4 className="mt-8 text-lg font-bold">Services</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Sustainable product strategy</li>
                <li>• ESG-led market entry strategy</li>
                <li>• Customer willingness-to-pay analysis</li>
                <li>• Green premium pricing strategy</li>
                <li>• ESG branding &amp; positioning advisory</li>
              </ul>

              <h4 className="mt-8 text-lg font-bold">Outputs</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Revenue growth scenarios</li>
                <li>• Pricing strategy decks</li>
                <li>• Customer segmentation insights</li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-left shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                03
              </p>

              <h3 className="mt-4 text-4xl font-bold">Access to Capital</h3>
              <p className="mt-2 text-xl text-[#53645D]">
                Financing Advantage
              </p>

              <h4 className="mt-8 text-lg font-bold">Services</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• ESG rating improvement strategy</li>
                <li>• Sustainable finance readiness: green bonds, SL loans</li>
                <li>• Investor ESG narrative building</li>
                <li>• ESG due diligence prep for M&amp;A or fundraising</li>
                <li>• Climate risk disclosures: TCFD/ISSB aligned</li>
              </ul>

              <h4 className="mt-8 text-lg font-bold">Outputs</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Cost of capital reduction scenarios</li>
                <li>• Investor-ready ESG story</li>
                <li>• Rating uplift roadmap</li>
              </ul>
            </div>

            <div className="rounded-[2rem] bg-white p-10 text-left shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
                04
              </p>

              <h3 className="mt-4 text-4xl font-bold">Risk &amp; Valuation</h3>
              <p className="mt-2 text-xl text-[#53645D]">
                Enterprise Value Protection
              </p>

              <h4 className="mt-8 text-lg font-bold">Services</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Climate risk scenario analysis</li>
                <li>• Supply chain risk mapping</li>
                <li>• Regulatory risk tracking</li>
                <li>• ESG controversy &amp; reputation risk modeling</li>
                <li>• Double materiality assessments</li>
              </ul>

              <h4 className="mt-8 text-lg font-bold">Outputs</h4>
              <ul className="mt-4 space-y-2 text-lg leading-8 text-[#53645D]">
                <li>• Risk-adjusted valuation models</li>
                <li>• Scenario analysis dashboards</li>
                <li>• Board-level risk insights</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

{/* Knowledge Hub */}
<section id="knowledge-hub" className="px-6 py-24 md:px-16">
  <div className="mx-auto max-w-7xl text-center">
    <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
      Knowledge Hub
    </p>

    <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
      Explore The OXY Brief intelligence hub.
    </h2>

    <div className="mt-16 grid gap-8 md:grid-cols-3">
      {[
        {
          label: "Articles",
          title: "The OXY Brief",
          button: "Read on LinkedIn",
          items: [
            "Beyond ESG: Energy, Risk, and Capital",
            "Brewing Sustainability: When The Straw Was Once Coffee",
            "A Day in the Life of a Sustainability Professional",
            "Driving Impact Through ESG & Sustainability",
          ],
        },
        {
          label: "Videos",
          title: "OXY 60",
          button: "Watch on LinkedIn",
          items: [
            "ESG should influence cost, margin, and capital",
            "Converting ESG reports into financial statements",
            "Sustainability intelligence in one minute",
          ],
        },
        {
          label: "Carousels",
          title: "OXY Explains",
          button: "View on LinkedIn",
          items: [
            "ESG is not about disclosures. It is about decisions.",
            "Decarbonisation explained through business value",
            "Circular economy simplified",
          ],
        },
      ].map((card) => (
        <div
          key={card.title}
          className="flex min-h-[430px] flex-col rounded-[2rem] bg-white p-8 text-left shadow-sm"
        >
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
            {card.label}
          </p>

          <h3 className="mt-4 text-3xl font-bold">{card.title}</h3>

          <ul className="mt-6 space-y-3 leading-7 text-[#53645D]">
            {card.items.map((item) => (
              <li key={item}>
                <a
                  href="https://www.linkedin.com/company/the-oxy-brief/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#3D6B4F] hover:underline"
                >
                  • {item}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="https://www.linkedin.com/company/the-oxy-brief/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-block rounded-full bg-[#10251E] px-6 py-3 text-center font-semibold text-white hover:bg-[#1D3A30]"
          >
            {card.button}
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* INSIGHTS */}
      <section id="insights" className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-7xl text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
            Insights
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
            Latest OXY Thinking
          </h2>

          <p className="mx-auto mt-6 max-w-4xl text-xl leading-9 text-[#53645D]">
            Practical sustainability intelligence for decisions that affect
            cost, capital, risk, and growth.
          </p>

          <div className="mt-16 grid gap-6 text-left md:grid-cols-3">
            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Aviation
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Fuel efficiency is not just environmental. It is financial.
              </h3>

              <p className="mt-5 leading-7 text-[#53645D]">
                Applying the OXY Model to aviation decarbonisation and margin
                protection.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                ESG Strategy
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                ESG is not working. Here is why.
              </h3>

              <p className="mt-5 leading-7 text-[#53645D]">
                Reports do not drive decisions. Financial translation does.
              </p>
            </article>

            <article className="rounded-[2rem] bg-white p-8 shadow-sm">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#3D6B4F]">
                Procurement
              </p>

              <h3 className="mt-4 text-2xl font-bold">
                Waste is not just environmental loss.
              </h3>

              <p className="mt-5 leading-7 text-[#53645D]">
                It is financial leakage hidden inside operations.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      {/* FOUNDER */}
<section className="px-6 py-20 md:px-16">
  <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] bg-white p-10 shadow-sm md:grid-cols-2 md:p-16">
    {/* LEFT SIDE */}
    <div>
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#3D6B4F]">
        Founder
      </p>

      <h2 className="mt-4 text-4xl font-bold md:text-5xl">
        Tooba Fateh
      </h2>

      <p className="mt-6 text-lg leading-8 text-[#53645D]">
        ESG and Sustainability Advisor, Cambridge University certified Circular
        Economy specialist, and founder of The OXY Brief.
      </p>

      <p className="mt-5 text-lg leading-8 text-[#53645D]">
        Tooba is building The OXY Brief to help businesses and young leaders
        understand sustainability through performance, finance, systems
        thinking, and real-world impact.
      </p>

      {/* POSITIONING BOX */}
      <div className="mt-8 rounded-[2rem] bg-[#10251E] p-8 text-white">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-[#B9D2B1]">
          Positioning
        </p>

        <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
          Sustainability is the why. Performance is the how.
        </h3>
      </div>
    </div>

    {/* RIGHT SIDE IMAGE */}
    <div className="flex justify-center">
      <img
        src="/founder.jpg"
        alt="Tooba Fateh"
        className="w-full max-w-md rounded-[2rem] object-cover shadow-2xl"
      />
    </div>
  </div>
</section>

 {/* CONTACT */}
<section id="contact" className="px-6 py-24 md:px-16">
  <div className="mx-auto max-w-6xl">
    <div className="text-center">
      <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#3D6B4F]">
        Contact Us
      </p>

      <h2 className="mx-auto mt-5 max-w-5xl text-5xl font-black leading-tight md:text-7xl">
        Bring sustainability stories to life.
      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-[#53645D]">
        For advisory inquiries, collaborations, OXY 60 On Location, speaking,
        ESG storytelling, youth sustainability initiatives, and strategic
        partnerships.
      </p>
    </div>

    <div className="mt-14 grid gap-8 md:grid-cols-2">
      {/* CONTACT DETAILS */}
      <div className="rounded-[2rem] bg-white p-10 shadow-sm">
        <h3 className="text-3xl font-bold">Contact Details</h3>

        <div className="mt-8 space-y-5 text-lg leading-8 text-[#53645D]">
          <p>
            <span className="font-bold text-[#10251E]">Email:</span>{" "}
            <a
              href="mailto:info@theoxybrief.com"
              className="hover:text-[#3D6B4F]"
            >
              info@theoxybrief.com
            </a>
          </p>

          <p>
            <span className="font-bold text-[#10251E]">Phone:</span>{" "}
            <a
              href="tel:+97142505829"
              className="hover:text-[#3D6B4F]"
            >
              +971 4 250 5829
            </a>
          </p>

          <p>
            <span className="font-bold text-[#10251E]">LinkedIn:</span>{" "}
            <a
              href="https://www.linkedin.com/company/the-oxy-brief/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline hover:text-[#3D6B4F]"
            >
              The OXY Brief
            </a>
          </p>
        </div>
      </div>

      {/* CONTACT FORM */}
      <form
        action="https://formsubmit.co/tooba@theoxybrief.com"
        method="POST"
        className="rounded-[2rem] bg-white p-10 shadow-sm"
      >
        <input
          type="hidden"
          name="_subject"
          value="New inquiry from The OXY Brief website"
        />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />

        <label className="block text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
          Name
        </label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none focus:border-[#3D6B4F]"
        />

        <label className="mt-6 block text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none focus:border-[#3D6B4F]"
        />

        <label className="mt-6 block text-sm font-bold uppercase tracking-[0.25em] text-[#3D6B4F]">
          Message
        </label>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Tell us how we can help"
          className="mt-3 w-full rounded-2xl border border-[#10251E]/15 bg-[#ECFDF5] px-5 py-4 outline-none focus:border-[#3D6B4F]"
        />

        <button
          type="submit"
          className="mt-8 w-full rounded-full bg-[#10251E] px-8 py-4 font-semibold text-white hover:bg-[#1D3A30]"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>

      {/* FOOTER */}
      <footer className="border-t border-[#10251E]/10 px-6 py-8 md:px-16">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm text-[#53645D] md:flex-row">
          <p>© The OXY Brief. All rights reserved.</p>
          <p>Observe → Translate → Yield</p>
        </div>
      </footer>
    </main>
  );
}