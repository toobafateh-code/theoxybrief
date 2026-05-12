export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#ECFDF5] text-[#10251E]">
      {/* HERO */}
      <section className="relative min-h-[75vh] overflow-hidden px-6 py-24 text-white md:px-16">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/contact-bg.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[#10251E]/60" />

        <div className="relative z-10 mx-auto flex min-h-[55vh] max-w-7xl flex-col justify-center text-center">
          <p className="text-lg font-bold uppercase tracking-[0.35em] text-[#B9D2B1]">
            Contact Us
          </p>

          <h1 className="mx-auto mt-5 max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
            Let’s build something meaningful together.
          </h1>

          <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-white/85">
            Advisory, partnerships, speaking engagements, and strategic
            collaborations.
          </p>
        </div>
      </section>

      {/* CONTACT DETAILS + FORM */}
      <section className="px-6 py-24 md:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-[2rem] bg-white p-10 shadow-sm">
              <h2 className="text-3xl font-bold">Contact Details</h2>

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
                  <a href="tel:+97142505829" className="hover:text-[#3D6B4F]">
                    +971 4 250 5829
                  </a>
                </p>

                <p>
                  <span className="font-bold text-[#10251E]">LinkedIn:</span>{" "}
                  <a
                    href="https://www.linkedin.com/company/the-oxy-brief/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    The OXY Brief
                  </a>
                </p>
              </div>
            </div>

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
    </main>
  );
}