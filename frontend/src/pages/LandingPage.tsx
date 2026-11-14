
import { useNavigate } from "react-router-dom";
import {
  BrainCircuit,
  FileSearch,
  Mic,
  BarChart3,
  Users,
  BriefcaseBusiness,
} from "lucide-react";

import Button from "../components/common/Button";

const features = [
  {
    icon: FileSearch,
    title: "Smart Resume Screening",
    description:
      "Extract relevant skills, experience, education and projects from resumes automatically.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligent Candidate Matching",
    description:
      "Match candidates against job requirements using skill coverage and semantic similarity.",
  },
  {
    icon: Mic,
    title: "AI-Powered Interviews",
    description:
      "Conduct structured voice interviews with adaptive questions and answer evaluation.",
  },
  {
    icon: BarChart3,
    title: "Evidence-Based Insights",
    description:
      "Generate structured candidate reports with competency scores and supporting evidence.",
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-[#171717]">
      {/* HERO AND NAVIGATION */}
      <div className="hero-shell">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          {/* LOGO */}
          <a
            href="/"
            className="text-2xl font-bold tracking-tight text-white"
          >
            Hire<span className="text-[#e5242a]">Sense</span>
          </a>

          {/* NAVIGATION LINKS */}
          <div className="hidden items-center gap-9 text-sm font-medium text-white/80 md:flex">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#portals" className="transition hover:text-white">
              Portals
            </a>
          </div>

          {/* NAVIGATION BUTTON */}
          <a
            href="#portals"
            className="border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#e5242a] hover:bg-[#e5242a]"
          >
            Get Started
          </a>
        </nav>

        {/* HERO SECTION */}
        <section className="hero-section w-full">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
            {/* HERO TEXT */}
            <div>
              <div className="mb-7 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/75">
                <span className="h-2 w-2 rounded-full bg-[#e5242a]" />
                THE FUTURE OF RECRUITMENT
              </div>

              <h1 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">
                Recruitment,
                <br />
                made <span className="text-[#f04449]">intelligent.</span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 md:text-lg">
                HireSense brings intelligent resume screening, candidate
                matching and AI-powered interviews together in one platform.
                Make better hiring decisions with clarity and confidence.
              </p>

              {/* HERO BUTTONS */}
              <div className="mt-9 flex flex-wrap gap-4">
                <Button
                  variant="primary"
                  icon
                  onClick={() =>
                    document
                      .getElementById("portals")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Get Started
                </Button>

                <Button
                  variant="outline"
                  className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Explore Features
                </Button>
              </div>

              {/* HERO STATISTICS */}
              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">
                <div>
                  <p className="text-2xl font-bold text-white">AI</p>
                  <p className="mt-1 text-xs text-white/60">
                    Assisted screening
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">360°</p>
                  <p className="mt-1 text-xs text-white/60">
                    Candidate assessment
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold text-white">1</p>
                  <p className="mt-1 text-xs text-white/60">
                    Unified platform
                  </p>
                </div>
              </div>
            </div>

            {/* DASHBOARD PREVIEW */}
            <div className="relative">
              <div className="border border-white/15 bg-[#17151d]/80 p-5 shadow-2xl backdrop-blur-md md:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      Recruitment Overview
                    </p>
                    <p className="mt-1 text-xs text-white/50">
                      Candidate assessment dashboard
                    </p>
                  </div>

                  <span className="bg-[#e5242a]/15 px-3 py-1 text-xs text-[#ff777b]">
                    Live Preview
                  </span>
                </div>

                {/* STAT CARDS */}
                <div className="grid grid-cols-2 gap-3 py-6">
                  <div className="border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs text-white/50">Candidates</p>
                    <p className="mt-2 text-3xl font-bold text-white">248</p>
                    <p className="mt-1 text-xs text-[#f04449]">
                      Applications received
                    </p>
                  </div>

                  <div className="border border-white/10 bg-white/[0.04] p-4">
                    <p className="text-xs text-white/50">Shortlisted</p>
                    <p className="mt-2 text-3xl font-bold text-white">36</p>
                    <p className="mt-1 text-xs text-green-400">
                      Ready for review
                    </p>
                  </div>
                </div>

                {/* CANDIDATE MATCHES */}
                <div className="border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-sm font-semibold text-white">
                      Candidate Match
                    </p>
                    <p className="text-xs text-white/40">Sample data</p>
                  </div>

                  {[
                    { name: "Candidate A", role: "ML Engineer", score: 94 },
                    {
                      name: "Candidate B",
                      role: "Backend Developer",
                      score: 87,
                    },
                    {
                      name: "Candidate C",
                      role: "Data Analyst",
                      score: 78,
                    },
                  ].map((candidate) => (
                    <div key={candidate.name} className="mb-5 last:mb-0">
                      <div className="mb-2 flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">
                            {candidate.name}
                          </p>
                          <p className="text-xs text-white/45">
                            {candidate.role}
                          </p>
                        </div>

                        <span className="text-sm font-semibold text-[#f04449]">
                          {candidate.score}%
                        </span>
                      </div>

                      <div className="h-1.5 overflow-hidden bg-white/10">
                        <div
                          className="h-full bg-[#e5242a]"
                          style={{ width: `${candidate.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* AI ASSESSMENT */}
                <div className="mt-4 flex items-center gap-3 border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex h-9 w-9 items-center justify-center bg-[#e5242a]/15 text-[#f04449]">
                    <BrainCircuit size={19} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-white">
                      AI Assessment Complete
                    </p>
                    <p className="text-xs text-white/45">
                      Evidence-backed candidate insights
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FEATURES SECTION */}
      <section id="features" className="bg-[#F7F6F4] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">
              WHAT WE OFFER
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Everything hiring needs.
              <br />
              Nothing it doesn't.
            </h2>

            <p className="mt-5 leading-8 text-[#707070]">
              From the first resume to the final assessment, HireSense
              simplifies every stage of the recruitment process.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="border border-[#e5e3df] bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[#e5242a]"
                >
                  <div className="mb-7 flex h-12 w-12 items-center justify-center bg-[#e5242a]/10 text-[#e5242a]">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-lg font-bold">{feature.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-[#707070]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="bg-white px-6 py-24 lg:px-10">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">
              WHY HIRESENSE
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              Better insights.
              <br />
              Better hiring decisions.
            </h2>

            <p className="mt-6 leading-8 text-[#707070]">
              Traditional recruitment often means manually reviewing hundreds
              of resumes and conducting inconsistent interviews. HireSense
              helps recruiters structure this process and evaluate candidates
              using relevant evidence.
            </p>

            <p className="mt-4 leading-8 text-[#707070]">
              Our platform supports human decision-making. Recruiters remain
              in control of the final hiring decision.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#F7F6F4] p-7">
              <FileSearch className="mb-5 text-[#e5242a]" size={27} />
              <h3 className="font-bold">Structured Screening</h3>
              <p className="mt-2 text-sm leading-6 text-[#707070]">
                Consistent resume evaluation against job requirements.
              </p>
            </div>

            <div className="mt-10 bg-[#F7F6F4] p-7">
              <Mic className="mb-5 text-[#e5242a]" size={27} />
              <h3 className="font-bold">Fair Assessment</h3>
              <p className="mt-2 text-sm leading-6 text-[#707070]">
                Focus on candidate answers and job-related competencies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PORTALS SECTION */}
      <section id="portals" className="bg-[#F7F6F4] px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">
              GET STARTED
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
              One platform. Two experiences.
            </h2>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-[#707070]">
              Whether you're hiring talent or looking for your next
              opportunity, HireSense has a dedicated experience for you.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="border border-[#e5e3df] bg-white p-9">
              <BriefcaseBusiness className="mb-7 text-[#e5242a]" size={30} />

              <h3 className="text-2xl font-bold">Recruiter Portal</h3>

              <p className="mt-4 min-h-20 text-sm leading-7 text-[#707070]">
                Create job openings, review applications, assess candidates
                and compare structured interview reports.
              </p>

              <Button
  variant="primary"
  className="mt-7"
  onClick={() => navigate("/recruiter/matching")}
>
  Open Recruiter Workspace
</Button>
            </div>

            <div className="border border-[#e5e3df] bg-white p-9">
              <Users className="mb-7 text-[#e5242a]" size={30} />

              <h3 className="text-2xl font-bold">Candidate Portal</h3>

              <p className="mt-4 min-h-20 text-sm leading-7 text-[#707070]">
                Discover opportunities, submit your resume and complete
                structured AI-assisted interviews.
              </p>

              <Button variant="secondary" className="mt-7" disabled>
                Candidate Login
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#171717] px-6 py-10 text-white lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center">
          <a href="/" className="text-2xl font-bold tracking-tight">
            Hire<span className="text-[#e5242a]">Sense</span>
          </a>

          <div className="flex flex-wrap gap-7 text-sm text-white/55">
            <a href="#features" className="transition hover:text-white">
              Features
            </a>
            <a href="#about" className="transition hover:text-white">
              About
            </a>
            <a href="#portals" className="transition hover:text-white">
              Portals
            </a>
          </div>
        </div>

        <div className="mx-auto max-w-7xl pt-7 text-xs text-white/40">
          © {new Date().getFullYear()} HireSense. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
