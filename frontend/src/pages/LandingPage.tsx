
import {
  ArrowRight,
  BrainCircuit,
  FileSearch,
  Mic,
  BarChart3,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

const features = [
  {
    icon: FileSearch,
    number: "01",
    title: "Resume Intelligence",
    description:
      "Extract skills, qualifications, experience and projects from candidate resumes.",
  },
  {
    icon: BrainCircuit,
    number: "02",
    title: "Candidate Matching",
    description:
      "Identify relevant candidates through skill analysis and semantic matching.",
  },
  {
    icon: Mic,
    number: "03",
    title: "AI Voice Interviews",
    description:
      "Conduct structured interviews with adaptive questions and speech recognition.",
  },
  {
    icon: BarChart3,
    number: "04",
    title: "Candidate Assessment",
    description:
      "Generate transparent competency reports supported by answer evidence.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#171717]">

      {/* SHARED DARK BACKGROUND: NAVIGATION + HERO */}
      <div className="hero-shell">

        {/* NAVIGATION */}
        <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-transparent px-6 py-5 lg:px-16">

          <a href="/" className="text-2xl font-bold tracking-tight text-white">
            Hire<span className="text-[#F04449]">Sense.</span>
          </a>

          <div className="hidden items-center gap-10 text-sm font-medium text-white/85 md:flex">
            <a href="#features" className="transition hover:text-[#F04449]">
              Features
            </a>
            <a href="#about" className="transition hover:text-[#F04449]">
              About
            </a>
            <a href="#portals" className="transition hover:text-[#F04449]">
              Portals
            </a>
          </div>

          <a
            href="#portals"
            className="flex items-center gap-2 bg-[#E5242A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#BD1C23]"
          >
            Get Started <ArrowRight size={16} />
          </a>

        </nav>

        {/* HERO */}
        <section className="hero-section w-full">

          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-16 lg:py-32">

            {/* HERO TEXT */}
            <div>

              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7777]">
                Intelligent Recruitment Platform
              </p>

              <h1 className="max-w-2xl text-5xl leading-[1.12] font-bold tracking-tight text-white md:text-7xl">
                Hire better.
                <br />
                Discover
                <span className="text-[#F04449]"> potential.</span>
              </h1>

              <p className="mt-8 max-w-xl text-lg leading-8 text-[#E5DADD]">
                A smarter approach to recruitment. Analyse resumes,
                discover relevant talent and evaluate candidates
                through structured AI-powered interviews.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">

                <a
                  href="#portals"
                  className="flex items-center gap-2 bg-[#E5242A] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#BD1C23]"
                >
                  Get Started <ArrowRight size={16} />
                </a>

                <a
                  href="#features"
                  className="border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                >
                  Explore Platform
                </a>

              </div>

              <div className="mt-12 flex flex-wrap gap-8 text-sm text-[#E5DADD]">

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#F04449]" />
                  Evidence-based assessment
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#F04449]" />
                  Human-led decisions
                </span>

              </div>

            </div>

            {/* PLATFORM PREVIEW */}
            <div className="border border-white/15 bg-[#171717]/60 p-7 shadow-2xl backdrop-blur-sm md:p-9">

              <div className="flex items-center justify-between border-b border-white/15 pb-6">

                <div>
                  <p className="text-xs uppercase tracking-widest text-[#D0BFC0]">
                    Platform Overview
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Recruitment Intelligence
                  </h2>
                </div>

                <BrainCircuit size={32} className="text-[#F04449]" />

              </div>

              <div className="grid grid-cols-2 gap-4 py-7">

                <div className="border border-white/15 bg-white/5 p-5">
                  <BriefcaseBusiness className="text-[#F04449]" />
                  <p className="mt-5 text-3xl font-bold text-white">--</p>
                  <p className="mt-1 text-sm text-[#D0BFC0]">Active Jobs</p>
                </div>

                <div className="border border-white/15 bg-white/5 p-5">
                  <Users className="text-[#F04449]" />
                  <p className="mt-5 text-3xl font-bold text-white">--</p>
                  <p className="mt-1 text-sm text-[#D0BFC0]">Applicants</p>
                </div>

              </div>

              <div className="border border-white/15 bg-[#211B1C] p-6">

                <h3 className="font-semibold text-white">
                  Assessment Workflow
                </h3>

                {[
                  "Resume Analysis",
                  "Candidate Matching",
                  "Structured Interviews",
                  "Competency Evaluation",
                ].map((item, index) => (

                  <div
                    key={item}
                    className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0"
                  >
                    <span className="flex h-8 w-8 items-center justify-center bg-[#E5242A]/20 text-sm font-bold text-[#FF7777]">
                      0{index + 1}
                    </span>

                    <span className="text-sm text-[#F0EAEA]">
                      {item}
                    </span>
                  </div>

                ))}

              </div>
            </div>

          </div>
        </section>
      </div>

      {/* FEATURES */}
      <main>

        <section
          id="features"
          className="bg-[#F7F6F4] px-6 py-24 lg:px-16"
        >
          <div className="mx-auto max-w-7xl">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">
              What We Offer
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-[#171717] md:text-5xl">
              Every stage of recruitment, intelligently connected.
            </h2>

            <div className="mt-14 grid border-l border-t border-[#E5E3DF] sm:grid-cols-2 lg:grid-cols-4">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <article
                    key={feature.number}
                    className="border-b border-r border-[#E5E3DF] bg-white p-7 transition-colors hover:bg-[#FFFAFA]"
                  >
                    <div className="flex items-center justify-between">
                      <Icon size={28} className="text-[#E5242A]" />
                      <span className="text-xs text-[#999999]">
                        {feature.number}
                      </span>
                    </div>

                    <h3 className="mt-8 text-lg font-bold text-[#171717]">
                      {feature.title}
                    </h3>

                    <p className="mt-4 text-sm leading-7 text-[#707070]">
                      {feature.description}
                    </p>
                  </article>
                );
              })}

            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="bg-white px-6 py-24 lg:px-16">
          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">
                Our Approach
              </p>

              <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#171717]">
                Recruitment decisions backed by evidence.
              </h2>
            </div>

            <p className="text-lg leading-8 text-[#707070]">
              HireSense combines resume intelligence, semantic matching
              and structured AI interviews to help recruiters understand
              candidate capabilities. Our platform supports human
              decision-making rather than replacing it.
            </p>

          </div>
        </section>

        {/* PORTALS */}
        <section id="portals" className="bg-[#F7F6F4] px-6 py-24 lg:px-16">

          <div className="mx-auto max-w-7xl">

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">
              Get Started
            </p>

            <h2 className="mt-5 text-4xl font-bold text-[#171717]">
              Built for both sides of recruitment.
            </h2>

            <div className="mt-12 grid gap-6 md:grid-cols-2">

              <div className="border border-[#E5E3DF] bg-white p-9">
                <BriefcaseBusiness size={32} className="text-[#E5242A]" />

                <h3 className="mt-6 text-2xl font-bold text-[#171717]">
                  Recruiter
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-[#707070]">
                  Create job openings, assess applicants and review
                  evidence-backed candidate reports.
                </p>

                <button
                  disabled
                  className="mt-8 flex items-center gap-2 bg-[#E5242A] px-6 py-3 text-sm font-semibold text-white opacity-70"
                >
                  Recruiter Portal <ArrowRight size={16} />
                </button>
              </div>

              <div className="border border-[#E5E3DF] bg-white p-9">
                <Users size={32} className="text-[#E5242A]" />

                <h3 className="mt-6 text-2xl font-bold text-[#171717]">
                  Candidate
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-[#707070]">
                  Build your profile, explore opportunities and
                  demonstrate your skills through structured interviews.
                </p>

                <button
                  disabled
                  className="mt-8 flex items-center gap-2 border border-[#D8D7D3] px-6 py-3 text-sm font-semibold text-[#171717]"
                >
                  Candidate Portal <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-[#171717] px-6 py-10 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">

          <p className="text-xl font-bold text-white">
            Hire<span className="text-[#E5242A]">Sense.</span>
          </p>

          <p className="text-sm text-[#B8B8B8]">
            Intelligent recruitment. Evidence-based decisions.
          </p>

          <p className="text-xs text-[#777777]">
            © 2026 HireSense
          </p>

        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
