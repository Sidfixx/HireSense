[1mdiff --git a/frontend/src/pages/LandingPage.tsx b/frontend/src/pages/LandingPage.tsx[m
[1mindex cf37218..2d0b515 100644[m
[1m--- a/frontend/src/pages/LandingPage.tsx[m
[1m+++ b/frontend/src/pages/LandingPage.tsx[m
[36m@@ -1,6 +1,5 @@[m
 [m
 import {[m
[31m-  ArrowRight,[m
   BrainCircuit,[m
   FileSearch,[m
   Mic,[m
[36m@@ -9,356 +8,419 @@[m [mimport {[m
   BriefcaseBusiness,[m
 } from "lucide-react";[m
 [m
[32m+[m[32mimport Button from "../components/common/Button";[m
[32m+[m
 const features = [[m
   {[m
     icon: FileSearch,[m
[31m-    number: "01",[m
[31m-    title: "Resume Intelligence",[m
[32m+[m[32m    title: "Smart Resume Screening",[m
     description:[m
[31m-      "Extract skills, qualifications, experience and projects from candidate resumes.",[m
[32m+[m[32m      "Extract relevant skills, experience, education and projects from resumes automatically.",[m
   },[m
   {[m
     icon: BrainCircuit,[m
[31m-    number: "02",[m
[31m-    title: "Candidate Matching",[m
[32m+[m[32m    title: "Intelligent Candidate Matching",[m
     description:[m
[31m-      "Identify relevant candidates through skill analysis and semantic matching.",[m
[32m+[m[32m      "Match candidates against job requirements using skill coverage and semantic similarity.",[m
   },[m
   {[m
     icon: Mic,[m
[31m-    number: "03",[m
[31m-    title: "AI Voice Interviews",[m
[32m+[m[32m    title: "AI-Powered Interviews",[m
     description:[m
[31m-      "Conduct structured interviews with adaptive questions and speech recognition.",[m
[32m+[m[32m      "Conduct structured voice interviews with adaptive questions and answer evaluation.",[m
   },[m
   {[m
     icon: BarChart3,[m
[31m-    number: "04",[m
[31m-    title: "Candidate Assessment",[m
[32m+[m[32m    title: "Evidence-Based Insights",[m
     description:[m
[31m-      "Generate transparent competency reports supported by answer evidence.",[m
[32m+[m[32m      "Generate structured candidate reports with competency scores and supporting evidence.",[m
   },[m
 ];[m
 [m
[31m-function LandingPage() {[m
[32m+[m[32mexport default function LandingPage() {[m
   return ([m
     <div className="min-h-screen bg-white text-[#171717]">[m
[31m-[m
[31m-      {/* SHARED DARK BACKGROUND: NAVIGATION + HERO */}[m
[32m+[m[32m      {/* HERO AND NAVIGATION */}[m
       <div className="hero-shell">[m
[31m-[m
[31m-        {/* NAVIGATION */}[m
[31m-        <nav className="relative z-10 flex items-center justify-between border-b border-white/10 bg-transparent px-6 py-5 lg:px-16">[m
[31m-[m
[31m-          <a href="/" className="text-2xl font-bold tracking-tight text-white">[m
[31m-            Hire<span className="text-[#F04449]">Sense.</span>[m
[32m+[m[32m        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">[m
[32m+[m[32m          {/* LOGO */}[m
[32m+[m[32m          <a[m
[32m+[m[32m            href="/"[m
[32m+[m[32m            className="text-2xl font-bold tracking-tight text-white"[m
[32m+[m[32m          >[m
[32m+[m[32m            Hire<span className="text-[#e5242a]">Sense</span>[m
           </a>[m
 [m
[31m-          <div className="hidden items-center gap-10 text-sm font-medium text-white/85 md:flex">[m
[31m-            <a href="#features" className="transition hover:text-[#F04449]">[m
[32m+[m[32m          {/* NAVIGATION LINKS */}[m
[32m+[m[32m          <div className="hidden items-center gap-9 text-sm font-medium text-white/80 md:flex">[m
[32m+[m[32m            <a href="#features" className="transition hover:text-white">[m
               Features[m
             </a>[m
[31m-            <a href="#about" className="transition hover:text-[#F04449]">[m
[32m+[m[32m            <a href="#about" className="transition hover:text-white">[m
               About[m
             </a>[m
[31m-            <a href="#portals" className="transition hover:text-[#F04449]">[m
[32m+[m[32m            <a href="#portals" className="transition hover:text-white">[m
               Portals[m
             </a>[m
           </div>[m
 [m
[32m+[m[32m          {/* NAVIGATION BUTTON */}[m
           <a[m
             href="#portals"[m
[31m-            className="flex items-center gap-2 bg-[#E5242A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#BD1C23]"[m
[32m+[m[32m            className="border border-white/40 bg-transparent px-5 py-2.5 text-sm font-semibold text-white transition hover:border-[#e5242a] hover:bg-[#e5242a]"[m
           >[m
[31m-            Get Started <ArrowRight size={16} />[m
[32m+[m[32m            Get Started[m
           </a>[m
[31m-[m
         </nav>[m
 [m
[31m-        {/* HERO */}[m
[32m+[m[32m        {/* HERO SECTION */}[m
         <section className="hero-section w-full">[m
[31m-[m
[31m-          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2 lg:px-16 lg:py-32">[m
[31m-[m
[32m+[m[32m          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">[m
             {/* HERO TEXT */}[m
             <div>[m
[32m+[m[32m              <div className="mb-7 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-white/75">[m
[32m+[m[32m                <span className="h-2 w-2 rounded-full bg-[#e5242a]" />[m
[32m+[m[32m                THE FUTURE OF RECRUITMENT[m
[32m+[m[32m              </div>[m
 [m
[31m-              <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-[#FF7777]">[m
[31m-                Intelligent Recruitment Platform[m
[31m-              </p>[m
[31m-[m
[31m-              <h1 className="max-w-2xl text-5xl leading-[1.12] font-bold tracking-tight text-white md:text-7xl">[m
[31m-                Hire better.[m
[32m+[m[32m              <h1 className="max-w-2xl text-5xl font-bold leading-[1.12] tracking-tight md:text-6xl lg:text-7xl">[m
[32m+[m[32m                Recruitment,[m
                 <br />[m
[31m-                Discover[m
[31m-                <span className="text-[#F04449]"> potential.</span>[m
[32m+[m[32m                made <span className="text-[#f04449]">intelligent.</span>[m
               </h1>[m
 [m
[31m-              <p className="mt-8 max-w-xl text-lg leading-8 text-[#E5DADD]">[m
[31m-                A smarter approach to recruitment. Analyse resumes,[m
[31m-                discover relevant talent and evaluate candidates[m
[31m-                through structured AI-powered interviews.[m
[32m+[m[32m              <p className="mt-7 max-w-xl text-base leading-8 text-white/75 md:text-lg">[m
[32m+[m[32m                HireSense brings intelligent resume screening, candidate[m
[32m+[m[32m                matching and AI-powered interviews together in one platform.[m
[32m+[m[32m                Make better hiring decisions with clarity and confidence.[m
               </p>[m
 [m
[31m-              <div className="mt-10 flex flex-wrap gap-4">[m
[31m-[m
[31m-                <a[m
[31m-                  href="#portals"[m
[31m-                  className="flex items-center gap-2 bg-[#E5242A] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#BD1C23]"[m
[32m+[m[32m              {/* HERO BUTTONS */}[m
[32m+[m[32m              <div className="mt-9 flex flex-wrap gap-4">[m
[32m+[m[32m                <Button[m
[32m+[m[32m                  variant="primary"[m
[32m+[m[32m                  icon[m
[32m+[m[32m                  onClick={() =>[m
[32m+[m[32m                    document[m
[32m+[m[32m                      .getElementById("portals")[m
[32m+[m[32m                      ?.scrollIntoView({ behavior: "smooth" })[m
[32m+[m[32m                  }[m
                 >[m
[31m-                  Get Started <ArrowRight size={16} />[m
[31m-                </a>[m
[31m-[m
[31m-                <a[m
[31m-                  href="#features"[m
[31m-                  className="border border-white/40 px-7 py-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"[m
[32m+[m[32m                  Get Started[m
[32m+[m[32m                </Button>[m
[32m+[m
[32m+[m[32m                <Button[m
[32m+[m[32m                  variant="outline"[m
[32m+[m[32m                  className="border-white/40 bg-transparent text-white hover:border-white hover:bg-white/10 hover:text-white"[m
[32m+[m[32m                  onClick={() =>[m
[32m+[m[32m                    document[m
[32m+[m[32m                      .getElementById("features")[m
[32m+[m[32m                      ?.scrollIntoView({ behavior: "smooth" })[m
[32m+[m[32m                  }[m
                 >[m
[31m-                  Explore Platform[m
[31m-                </a>[m
[31m-[m
[32m+[m[32m                  Explore Features[m
[32m+[m[32m                </Button>[m
               </div>[m
 [m
[31m-              <div className="mt-12 flex flex-wrap gap-8 text-sm text-[#E5DADD]">[m
[31m-[m
[31m-                <span className="flex items-center gap-2">[m
[31m-                  <span className="h-2 w-2 bg-[#F04449]" />[m
[31m-                  Evidence-based assessment[m
[31m-                </span>[m
[31m-[m
[31m-                <span className="flex items-center gap-2">[m
[31m-                  <span className="h-2 w-2 bg-[#F04449]" />[m
[31m-                  Human-led decisions[m
[31m-                </span>[m
[31m-[m
[31m-              </div>[m
[31m-[m
[31m-            </div>[m
[31m-[m
[31m-            {/* PLATFORM PREVIEW */}[m
[31m-            <div className="border border-white/15 bg-[#171717]/60 p-7 shadow-2xl backdrop-blur-sm md:p-9">[m
[31m-[m
[31m-              <div className="flex items-center justify-between border-b border-white/15 pb-6">[m
[31m-[m
[32m+[m[32m              {/* HERO STATISTICS */}[m
[32m+[m[32m              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">[m
                 <div>[m
[31m-                  <p className="text-xs uppercase tracking-widest text-[#D0BFC0]">[m
[31m-                    Platform Overview[m
[32m+[m[32m                  <p className="text-2xl font-bold text-white">AI</p>[m
[32m+[m[32m                  <p className="mt-1 text-xs text-white/60">[m
[32m+[m[32m                    Assisted screening[m
                   </p>[m
[31m-[m
[31m-                  <h2 className="mt-2 text-xl font-bold text-white">[m
[31m-                    Recruitment Intelligence[m
[31m-                  </h2>[m
                 </div>[m
 [m
[31m-                <BrainCircuit size={32} className="text-[#F04449]" />[m
[32m+[m[32m                <div>[m
[32m+[m[32m                  <p className="text-2xl font-bold text-white">360°</p>[m
[32m+[m[32m                  <p className="mt-1 text-xs text-white/60">[m
[32m+[m[32m                    Candidate assessment[m
[32m+[m[32m                  </p>[m
[32m+[m[32m                </div>[m
 [m
[32m+[m[32m                <div>[m
[32m+[m[32m                  <p className="text-2xl font-bold text-white">1</p>[m
[32m+[m[32m                  <p className="mt-1 text-xs text-white/60">[m
[32m+[m[32m                    Unified platform[m
[32m+[m[32m                  </p>[m
[32m+[m[32m                </div>[m
               </div>[m
[32m+[m[32m            </div>[m
 [m
[31m-              <div className="grid grid-cols-2 gap-4 py-7">[m
[32m+[m[32m            {/* DASHBOARD PREVIEW */}[m
[32m+[m[32m            <div className="relative">[m
[32m+[m[32m              <div className="border border-white/15 bg-[#17151d]/80 p-5 shadow-2xl backdrop-blur-md md:p-7">[m
[32m+[m[32m                <div className="flex items-center justify-between border-b border-white/10 pb-5">[m
[32m+[m[32m                  <div>[m
[32m+[m[32m                    <p className="text-sm font-semibold text-white">[m
[32m+[m[32m                      Recruitment Overview[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                    <p className="mt-1 text-xs text-white/50">[m
[32m+[m[32m                      Candidate assessment dashboard[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                  </div>[m
 [m
[31m-                <div className="border border-white/15 bg-white/5 p-5">[m
[31m-                  <BriefcaseBusiness className="text-[#F04449]" />[m
[31m-                  <p className="mt-5 text-3xl font-bold text-white">--</p>[m
[31m-                  <p className="mt-1 text-sm text-[#D0BFC0]">Active Jobs</p>[m
[32m+[m[32m                  <span className="bg-[#e5242a]/15 px-3 py-1 text-xs text-[#ff777b]">[m
[32m+[m[32m                    Live Preview[m
[32m+[m[32m                  </span>[m
                 </div>[m
 [m
[31m-                <div className="border border-white/15 bg-white/5 p-5">[m
[31m-                  <Users className="text-[#F04449]" />[m
[31m-                  <p className="mt-5 text-3xl font-bold text-white">--</p>[m
[31m-                  <p className="mt-1 text-sm text-[#D0BFC0]">Applicants</p>[m
[31m-                </div>[m
[32m+[m[32m                {/* STAT CARDS */}[m
[32m+[m[32m                <div className="grid grid-cols-2 gap-3 py-6">[m
[32m+[m[32m                  <div className="border border-white/10 bg-white/[0.04] p-4">[m
[32m+[m[32m                    <p className="text-xs text-white/50">Candidates</p>[m
[32m+[m[32m                    <p className="mt-2 text-3xl font-bold text-white">248</p>[m
[32m+[m[32m                    <p className="mt-1 text-xs text-[#f04449]">[m
[32m+[m[32m                      Applications received[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                  </div>[m
 [m
[31m-              </div>[m
[32m+[m[32m                  <div className="border border-white/10 bg-white/[0.04] p-4">[m
[32m+[m[32m                    <p className="text-xs text-white/50">Shortlisted</p>[m
[32m+[m[32m                    <p className="mt-2 text-3xl font-bold text-white">36</p>[m
[32m+[m[32m                    <p className="mt-1 text-xs text-green-400">[m
[32m+[m[32m                      Ready for review[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                  </div>[m
[32m+[m[32m                </div>[m
 [m
[31m-              <div className="border border-white/15 bg-[#211B1C] p-6">[m
[31m-[m
[31m-                <h3 className="font-semibold text-white">[m
[31m-                  Assessment Workflow[m
[31m-                </h3>[m
[31m-[m
[31m-                {[[m
[31m-                  "Resume Analysis",[m
[31m-                  "Candidate Matching",[m
[31m-                  "Structured Interviews",[m
[31m-                  "Competency Evaluation",[m
[31m-                ].map((item, index) => ([m
[31m-[m
[31m-                  <div[m
[31m-                    key={item}[m
[31m-                    className="flex items-center gap-4 border-b border-white/10 py-4 last:border-0"[m
[31m-                  >[m
[31m-                    <span className="flex h-8 w-8 items-center justify-center bg-[#E5242A]/20 text-sm font-bold text-[#FF7777]">[m
[31m-                      0{index + 1}[m
[31m-                    </span>[m
[31m-[m
[31m-                    <span className="text-sm text-[#F0EAEA]">[m
[31m-                      {item}[m
[31m-                    </span>[m
[32m+[m[32m                {/* CANDIDATE MATCHES */}[m
[32m+[m[32m                <div className="border border-white/10 bg-white/[0.04] p-5">[m
[32m+[m[32m                  <div className="mb-5 flex items-center justify-between">[m
[32m+[m[32m                    <p className="text-sm font-semibold text-white">[m
[32m+[m[32m                      Candidate Match[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                    <p className="text-xs text-white/40">Sample data</p>[m
                   </div>[m
 [m
[31m-                ))}[m
[32m+[m[32m                  {[[m
[32m+[m[32m                    { name: "Candidate A", role: "ML Engineer", score: 94 },[m
[32m+[m[32m                    {[m
[32m+[m[32m                      name: "Candidate B",[m
[32m+[m[32m                      role: "Backend Developer",[m
[32m+[m[32m                      score: 87,[m
[32m+[m[32m                    },[m
[32m+[m[32m                    {[m
[32m+[m[32m                      name: "Candidate C",[m
[32m+[m[32m                      role: "Data Analyst",[m
[32m+[m[32m                      score: 78,[m
[32m+[m[32m                    },[m
[32m+[m[32m                  ].map((candidate) => ([m
[32m+[m[32m                    <div key={candidate.name} className="mb-5 last:mb-0">[m
[32m+[m[32m                      <div className="mb-2 flex items-center justify-between">[m
[32m+[m[32m                        <div>[m
[32m+[m[32m                          <p className="text-sm font-medium text-white">[m
[32m+[m[32m                            {candidate.name}[m
[32m+[m[32m                          </p>[m
[32m+[m[32m                          <p className="text-xs text-white/45">[m
[32m+[m[32m                            {candidate.role}[m
[32m+[m[32m                          </p>[m
[32m+[m[32m                        </div>[m
[32m+[m
[32m+[m[32m                        <span className="text-sm font-semibold text-[#f04449]">[m
[32m+[m[32m                          {candidate.score}%[m
[32m+[m[32m                        </span>[m
[32m+[m[32m                      </div>[m
[32m+[m
[32m+[m[32m                      <div className="h-1.5 overflow-hidden bg-white/10">[m
[32m+[m[32m                        <div[m
[32m+[m[32m                          className="h-full bg-[#e5242a]"[m
[32m+[m[32m                          style={{ width: `${candidate.score}%` }}[m
[32m+[m[32m                        />[m
[32m+[m[32m                      </div>[m
[32m+[m[32m                    </div>[m
[32m+[m[32m                  ))}[m
[32m+[m[32m                </div>[m
 [m
[32m+[m[32m                {/* AI ASSESSMENT */}[m
[32m+[m[32m                <div className="mt-4 flex items-center gap-3 border border-white/10 bg-white/[0.04] p-4">[m
[32m+[m[32m                  <div className="flex h-9 w-9 items-center justify-center bg-[#e5242a]/15 text-[#f04449]">[m
[32m+[m[32m                    <BrainCircuit size={19} />[m
[32m+[m[32m                  </div>[m
[32m+[m
[32m+[m[32m                  <div>[m
[32m+[m[32m                    <p className="text-xs font-semibold text-white">[m
[32m+[m[32m                      AI Assessment Complete[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                    <p className="text-xs text-white/45">[m
[32m+[m[32m                      Evidence-backed candidate insights[m
[32m+[m[32m                    </p>[m
[32m+[m[32m                  </div>[m
[32m+[m[32m                </div>[m
               </div>[m
             </div>[m
[31m-[m
           </div>[m
         </section>[m
       </div>[m
 [m
[31m-      {/* FEATURES */}[m
[31m-      <main>[m
[31m-[m
[31m-        <section[m
[31m-          id="features"[m
[31m-          className="bg-[#F7F6F4] px-6 py-24 lg:px-16"[m
[31m-        >[m
[31m-          <div className="mx-auto max-w-7xl">[m
[31m-[m
[31m-            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">[m
[31m-              What We Offer[m
[32m+[m[32m      {/* FEATURES SECTION */}[m
[32m+[m[32m      <section id="features" className="bg-[#F7F6F4] px-6 py-24 lg:px-10">[m
[32m+[m[32m        <div className="mx-auto max-w-7xl">[m
[32m+[m[32m          <div className="max-w-2xl">[m
[32m+[m[32m            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">[m
[32m+[m[32m              WHAT WE OFFER[m
             </p>[m
 [m
[31m-            <h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight text-[#171717] md:text-5xl">[m
[31m-              Every stage of recruitment, intelligently connected.[m
[32m+[m[32m            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">[m
[32m+[m[32m              Everything hiring needs.[m
[32m+[m[32m              <br />[m
[32m+[m[32m              Nothing it doesn't.[m
             </h2>[m
 [m
[31m-            <div className="mt-14 grid border-l border-t border-[#E5E3DF] sm:grid-cols-2 lg:grid-cols-4">[m
[31m-[m
[31m-              {features.map((feature) => {[m
[31m-                const Icon = feature.icon;[m
[31m-[m
[31m-                return ([m
[31m-                  <article[m
[31m-                    key={feature.number}[m
[31m-                    className="border-b border-r border-[#E5E3DF] bg-white p-7 transition-colors hover:bg-[#FFFAFA]"[m
[31m-                  >[m
[31m-                    <div className="flex items-center justify-between">[m
[31m-                      <Icon size={28} className="text-[#E5242A]" />[m
[31m-                      <span className="text-xs text-[#999999]">[m
[31m-                        {feature.number}[m
[31m-                      </span>[m
[31m-                    </div>[m
[32m+[m[32m            <p className="mt-5 leading-8 text-[#707070]">[m
[32m+[m[32m              From the first resume to the final assessment, HireSense[m
[32m+[m[32m              simplifies every stage of the recruitment process.[m
[32m+[m[32m            </p>[m
[32m+[m[32m          </div>[m
 [m
[31m-                    <h3 className="mt-8 text-lg font-bold text-[#171717]">[m
[31m-                      {feature.title}[m
[31m-                    </h3>[m
[32m+[m[32m          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">[m
[32m+[m[32m            {features.map((feature) => {[m
[32m+[m[32m              const Icon = feature.icon;[m
 [m
[31m-                    <p className="mt-4 text-sm leading-7 text-[#707070]">[m
[31m-                      {feature.description}[m
[31m-                    </p>[m
[31m-                  </article>[m
[31m-                );[m
[31m-              })}[m
[31m-[m
[31m-            </div>[m
[31m-          </div>[m
[31m-        </section>[m
[32m+[m[32m              return ([m
[32m+[m[32m                <div[m
[32m+[m[32m                  key={feature.title}[m
[32m+[m[32m                  className="border border-[#e5e3df] bg-white p-7 transition duration-200 hover:-translate-y-1 hover:border-[#e5242a]"[m
[32m+[m[32m                >[m
[32m+[m[32m                  <div className="mb-7 flex h-12 w-12 items-center justify-center bg-[#e5242a]/10 text-[#e5242a]">[m
[32m+[m[32m                    <Icon size={23} />[m
[32m+[m[32m                  </div>[m
 [m
[31m-        {/* ABOUT */}[m
[31m-        <section id="about" className="bg-white px-6 py-24 lg:px-16">[m
[31m-          <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2">[m
[32m+[m[32m                  <h3 className="text-lg font-bold">{feature.title}</h3>[m
 [m
[31m-            <div>[m
[31m-              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">[m
[31m-                Our Approach[m
[31m-              </p>[m
[32m+[m[32m                  <p className="mt-3 text-sm leading-7 text-[#707070]">[m
[32m+[m[32m                    {feature.description}[m
[32m+[m[32m                  </p>[m
[32m+[m[32m                </div>[m
[32m+[m[32m              );[m
[32m+[m[32m            })}[m
[32m+[m[32m          </div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </section>[m
[32m+[m
[32m+[m[32m      {/* ABOUT SECTION */}[m
[32m+[m[32m      <section id="about" className="bg-white px-6 py-24 lg:px-10">[m
[32m+[m[32m        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">[m
[32m+[m[32m          <div>[m
[32m+[m[32m            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">[m
[32m+[m[32m              WHY HIRESENSE[m
[32m+[m[32m            </p>[m
 [m
[31m-              <h2 className="mt-5 text-4xl font-bold tracking-tight text-[#171717]">[m
[31m-                Recruitment decisions backed by evidence.[m
[31m-              </h2>[m
[31m-            </div>[m
[32m+[m[32m            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">[m
[32m+[m[32m              Better insights.[m
[32m+[m[32m              <br />[m
[32m+[m[32m              Better hiring decisions.[m
[32m+[m[32m            </h2>[m
 [m
[31m-            <p className="text-lg leading-8 text-[#707070]">[m
[31m-              HireSense combines resume intelligence, semantic matching[m
[31m-              and structured AI interviews to help recruiters understand[m
[31m-              candidate capabilities. Our platform supports human[m
[31m-              decision-making rather than replacing it.[m
[32m+[m[32m            <p className="mt-6 leading-8 text-[#707070]">[m
[32m+[m[32m              Traditional recruitment often means manually reviewing hundreds[m
[32m+[m[32m              of resumes and conducting inconsistent interviews. HireSense[m
[32m+[m[32m              helps recruiters structure this process and evaluate candidates[m
[32m+[m[32m              using relevant evidence.[m
             </p>[m
 [m
[32m+[m[32m            <p className="mt-4 leading-8 text-[#707070]">[m
[32m+[m[32m              Our platform supports human decision-making. Recruiters remain[m
[32m+[m[32m              in control of the final hiring decision.[m
[32m+[m[32m            </p>[m
           </div>[m
[31m-        </section>[m
 [m
[31m-        {/* PORTALS */}[m
[31m-        <section id="portals" className="bg-[#F7F6F4] px-6 py-24 lg:px-16">[m
[31m-[m
[31m-          <div className="mx-auto max-w-7xl">[m
[32m+[m[32m          <div className="grid grid-cols-2 gap-4">[m
[32m+[m[32m            <div className="bg-[#F7F6F4] p-7">[m
[32m+[m[32m              <FileSearch className="mb-5 text-[#e5242a]" size={27} />[m
[32m+[m[32m              <h3 className="font-bold">Structured Screening</h3>[m
[32m+[m[32m              <p className="mt-2 text-sm leading-6 text-[#707070]">[m
[32m+[m[32m                Consistent resume evaluation against job requirements.[m
[32m+[m[32m              </p>[m
[32m+[m[32m            </div>[m
 [m
[31m-            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#E5242A]">[m
[31m-              Get Started[m
[32m+[m[32m            <div className="mt-10 bg-[#F7F6F4] p-7">[m
[32m+[m[32m              <Mic className="mb-5 text-[#e5242a]" size={27} />[m
[32m+[m[32m              <h3 className="font-bold">Fair Assessment</h3>[m
[32m+[m[32m              <p className="mt-2 text-sm leading-6 text-[#707070]">[m
[32m+[m[32m                Focus on candidate answers and job-related competencies.[m
[32m+[m[32m              </p>[m
[32m+[m[32m            </div>[m
[32m+[m[32m          </div>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </section>[m
[32m+[m
[32m+[m[32m      {/* PORTALS SECTION */}[m
[32m+[m[32m      <section id="portals" className="bg-[#F7F6F4] px-6 py-24 lg:px-10">[m
[32m+[m[32m        <div className="mx-auto max-w-7xl">[m
[32m+[m[32m          <div className="text-center">[m
[32m+[m[32m            <p className="text-xs font-bold tracking-[0.2em] text-[#e5242a]">[m
[32m+[m[32m              GET STARTED[m
             </p>[m
 [m
[31m-            <h2 className="mt-5 text-4xl font-bold text-[#171717]">[m
[31m-              Built for both sides of recruitment.[m
[32m+[m[32m            <h2 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">[m
[32m+[m[32m              One platform. Two experiences.[m
             </h2>[m
 [m
[31m-            <div className="mt-12 grid gap-6 md:grid-cols-2">[m
[31m-[m
[31m-              <div className="border border-[#E5E3DF] bg-white p-9">[m
[31m-                <BriefcaseBusiness size={32} className="text-[#E5242A]" />[m
[32m+[m[32m            <p className="mx-auto mt-5 max-w-xl leading-8 text-[#707070]">[m
[32m+[m[32m              Whether you're hiring talent or looking for your next[m
[32m+[m[32m              opportunity, HireSense has a dedicated experience for you.[m
[32m+[m[32m            </p>[m
[32m+[m[32m          </div>[m
 [m
[31m-                <h3 className="mt-6 text-2xl font-bold text-[#171717]">[m
[31m-                  Recruiter[m
[31m-                </h3>[m
[32m+[m[32m          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">[m
[32m+[m[32m            <div className="border border-[#e5e3df] bg-white p-9">[m
[32m+[m[32m              <BriefcaseBusiness className="mb-7 text-[#e5242a]" size={30} />[m
 [m
[31m-                <p className="mt-4 max-w-md text-sm leading-7 text-[#707070]">[m
[31m-                  Create job openings, assess applicants and review[m
[31m-                  evidence-backed candidate reports.[m
[31m-                </p>[m
[32m+[m[32m              <h3 className="text-2xl font-bold">Recruiter Portal</h3>[m
 [m
[31m-                <button[m
[31m-                  disabled[m
[31m-                  className="mt-8 flex items-center gap-2 bg-[#E5242A] px-6 py-3 text-sm font-semibold text-white opacity-70"[m
[31m-                >[m
[31m-                  Recruiter Portal <ArrowRight size={16} />[m
[31m-                </button>[m
[31m-              </div>[m
[32m+[m[32m              <p className="mt-4 min-h-20 text-sm leading-7 text-[#707070]">[m
[32m+[m[32m                Create job openings, review applications, assess candidates[m
[32m+[m[32m                and compare structured interview reports.[m
[32m+[m[32m              </p>[m
 [m
[31m-              <div className="border border-[#E5E3DF] bg-white p-9">[m
[31m-                <Users size={32} className="text-[#E5242A]" />[m
[32m+[m[32m              <Button variant="primary" className="mt-7" disabled>[m
[32m+[m[32m                Recruiter Login[m
[32m+[m[32m              </Button>[m
[32m+[m[32m            </div>[m
 [m
[31m-                <h3 className="mt-6 text-2xl font-bold text-[#171717]">[m
[31m-                  Candidate[m
[31m-                </h3>[m
[32m+[m[32m            <div className="border border-[#e5e3df] bg-white p-9">[m
[32m+[m[32m              <Users className="mb-7 text-[#e5242a]" size={30} />[m
 [m
[31m-                <p className="mt-4 max-w-md text-sm leading-7 text-[#707070]">[m
[31m-                  Build your profile, explore opportunities and[m
[31m-                  demonstrate your skills through structured interviews.[m
[31m-                </p>[m
[32m+[m[32m              <h3 className="text-2xl font-bold">Candidate Portal</h3>[m
 [m
[31m-                <button[m
[31m-                  disabled[m
[31m-                  className="mt-8 flex items-center gap-2 border border-[#D8D7D3] px-6 py-3 text-sm font-semibold text-[#171717]"[m
[31m-                >[m
[31m-                  Candidate Portal <ArrowRight size={16} />[m
[31m-                </button>[m
[31m-              </div>[m
[32m+[m[32m              <p className="mt-4 min-h-20 text-sm leading-7 text-[#707070]">[m
[32m+[m[32m                Discover opportunities, submit your resume and complete[m
[32m+[m[32m                structured AI-assisted interviews.[m
[32m+[m[32m              </p>[m
 [m
[32m+[m[32m              <Button variant="secondary" className="mt-7" disabled>[m
[32m+[m[32m                Candidate Login[m
[32m+[m[32m              </Button>[m
             </div>[m
           </div>[m
[31m-        </section>[m
[31m-[m
[31m-      </main>[m
[32m+[m[32m        </div>[m
[32m+[m[32m      </section>[m
 [m
       {/* FOOTER */}[m
[31m-      <footer className="bg-[#171717] px-6 py-10 lg:px-16">[m
[31m-        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5">[m
[31m-[m
[31m-          <p className="text-xl font-bold text-white">[m
[31m-            Hire<span className="text-[#E5242A]">Sense.</span>[m
[31m-          </p>[m
[31m-[m
[31m-          <p className="text-sm text-[#B8B8B8]">[m
[31m-            Intelligent recruitment. Evidence-based decisions.[m
[31m-          </p>[m
[32m+[m[32m      <footer className="bg-[#171717] px-6 py-10 text-white lg:px-10">[m
[32m+[m[32m        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-center">[m
[32m+[m[32m          <a href="/" className="text-2xl font-bold tracking-tight">[m
[32m+[m[32m            Hire<span className="text-[#e5242a]">Sense</span>[m
[32m+[m[32m          </a>[m
 [m
[31m-          <p className="text-xs text-[#777777]">[m
[31m-            © 2026 HireSense[m
[31m-          </p>[m
[32m+[m[32m          <div className="flex flex-wrap gap-7 text-sm text-white/55">[m
[32m+[m[32m            <a href="#features" className="transition hover:text-white">[m
[32m+[m[32m              Features[m
[32m+[m[32m            </a>[m
[32m+[m[32m            <a href="#about" className="transition hover:text-white">[m
[32m+[m[32m              About[m
[32m+[m[32m            </a>[m
[32m+[m[32m            <a href="#portals" className="transition hover:text-white">[m
[32m+[m[32m              Portals[m
[32m+[m[32m            </a>[m
[32m+[m[32m          </div>[m
[32m+[m[32m        </div>[m
 [m
[32m+[m[32m        <div className="mx-auto max-w-7xl pt-7 text-xs text-white/40">[m
[32m+[m[32m          © {new Date().getFullYear()} HireSense. All rights reserved.[m
         </div>[m
       </footer>[m
[31m-[m
     </div>[m
   );[m
 }[m
[31m-[m
[31m-export default LandingPage;[m
