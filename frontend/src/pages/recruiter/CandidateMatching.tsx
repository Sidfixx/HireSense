
import { useState, type FormEvent, type ChangeEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  Loader2,
  Target,
  UserRound,
  XCircle,
  Upload,
} from "lucide-react";

import {
  calculateCandidateMatch,
  type MatchResult,
} from "../../services/matchingService";

import {
  uploadResume,
  type ExtractedResumeProfile,
} from "../../services/resumeService";

const inputClass =
  "w-full rounded-md border border-[#e5e3df] bg-white px-4 py-3 text-sm text-[#242424] outline-none transition focus:border-[#e5242a] focus:ring-2 focus:ring-[#e5242a]/10";

const labelClass =
  "mb-2 block text-sm font-semibold text-[#292929]";

function parseSkills(value: string): string[] {
  return Array.from(
    new Set(
      value
        .split(/[,;\n]/)
        .map((skill) => skill.trim())
        .filter(Boolean)
    )
  );
}

type SkillGroupProps = {
  title: string;
  skills: string[];
  type: "success" | "danger";
};

function SkillGroup({ title, skills, type }: SkillGroupProps) {
  const isSuccess = type === "success";

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        {isSuccess ? (
          <CheckCircle2 size={17} className="text-green-600" />
        ) : (
          <XCircle size={17} className="text-red-500" />
        )}

        <h4 className="text-sm font-semibold text-[#292929]">
          {title}
        </h4>

        <span className="ml-auto text-xs text-[#777]">
          {skills.length}
        </span>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium ${
                isSuccess
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-xs text-[#888]">
          No skills in this category.
        </p>
      )}
    </div>
  );
}

function CandidateMatching() {
  // Candidate information
  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidatePhone, setCandidatePhone] = useState("");
  const [candidateSkills, setCandidateSkills] = useState("");

  // Job requirements
  const [jobTitle, setJobTitle] = useState("");
  const [requiredSkills, setRequiredSkills] = useState("");
  const [preferredSkills, setPreferredSkills] = useState("");

  // Resume upload state
  const [resumeProfile, setResumeProfile] =
    useState<ExtractedResumeProfile | null>(null);

  const [resumeFileName, setResumeFileName] = useState("");
  const [uploadingResume, setUploadingResume] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Matching state
  const [result, setResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle PDF/DOCX resume upload
  async function handleResumeUpload(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    setUploadError("");
    setError("");
    setResult(null);

    const extension = file.name
      .split(".")
      .pop()
      ?.toLowerCase();

    if (!["pdf", "docx"].includes(extension || "")) {
      setUploadError(
        "Only PDF and DOCX files are supported."
      );
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(
        "File size must not exceed 5 MB."
      );
      event.target.value = "";
      return;
    }

    setUploadingResume(true);

    try {
      const response = await uploadResume(file);

      const profile = response.candidate_profile;

      setResumeProfile(profile);
      setResumeFileName(response.filename);

      // Populate candidate information from the extracted profile.
      setCandidateName(profile.candidate_name || "");
      setCandidateEmail(profile.email || "");
      setCandidatePhone(profile.phone || "");
      setCandidateSkills(profile.skills.join(", "));

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        setUploadError(
          typeof detail === "string"
            ? detail
            : "Resume upload failed. Check whether the backend is running."
        );
      } else {
        setUploadError(
          "Something went wrong while processing the resume."
        );
      }
    } finally {
      setUploadingResume(false);
      event.target.value = "";
    }
  }

  // Submit candidate and job details for matching.
  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setResult(null);

    const skills = parseSkills(candidateSkills);
    const required = parseSkills(requiredSkills);
    const preferred = parseSkills(preferredSkills);

    if (skills.length === 0) {
      setError(
        "Please upload a resume or enter candidate skills."
      );
      return;
    }

    if (required.length === 0) {
      setError(
        "Please enter at least one required job skill."
      );
      return;
    }

    setLoading(true);

    try {
      const match = await calculateCandidateMatch({
        candidate: {
          candidate_name: candidateName.trim() || null,
          email: candidateEmail.trim() || null,
          phone: candidatePhone.trim() || null,
          skills,
        },
        job: {
          title: jobTitle.trim(),
          required_skills: required,
          preferred_skills: preferred,
        },
      });

      setResult(match);

    } catch (err) {
      if (axios.isAxiosError(err)) {
        const detail = err.response?.data?.detail;

        setError(
          typeof detail === "string"
            ? detail
            : "Unable to calculate the match. Check that the backend is running."
        );
      } else {
        setError(
          "Something went wrong while calculating the match."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f6f4] text-[#242424]">

      {/* Navigation */}
      <header className="border-b border-[#e8e5e0] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#555] transition hover:text-[#e5242a]"
          >
            <ArrowLeft size={17} />
            Back to HireSense
          </Link>

          <div className="text-lg font-bold tracking-tight">
            Hire<span className="text-[#e5242a]">Sense</span>
          </div>

          <span className="text-xs font-medium text-[#777]">
            Recruiter workspace
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* Page heading */}
        <div className="mb-8">

          <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#e5242a]">
            <Target size={15} />
            Candidate assessment
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[#202020] md:text-4xl">
            Candidate matching
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#737373]">
            Upload candidate resumes, extract their profiles,
            and compare their skills against job requirements.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2">

            {/* Candidate information */}
            <section className="rounded-md border border-[#e5e3df] bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fcebec] text-[#e5242a]">
                  <UserRound size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#222]">
                    Candidate information
                  </h2>

                  <p className="text-xs text-[#888]">
                    Upload a resume to extract candidate details
                  </p>
                </div>

              </div>

              {/* Resume upload */}
              <div className="mb-7 rounded-md border border-dashed border-[#d6d1ca] bg-[#faf9f7] p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#fcebec] text-[#e5242a]">
                    <Upload size={20} />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold">
                      Upload candidate resume
                    </h3>

                    <p className="mt-1 text-xs text-[#888]">
                      PDF or DOCX · Maximum size 5 MB
                    </p>
                  </div>

                </div>

                <label
                  htmlFor="resumeUpload"
                  className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-md border border-[#e5242a] bg-white px-4 py-3 text-sm font-semibold text-[#e5242a] transition hover:bg-[#fff5f5]"
                >
                  {uploadingResume ? (
                    <>
                      <Loader2
                        size={17}
                        className="animate-spin"
                      />
                      Processing resume...
                    </>
                  ) : (
                    <>
                      <Upload size={17} />
                      Choose Resume
                    </>
                  )}
                </label>

                <input
                  id="resumeUpload"
                  type="file"
                  accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  className="hidden"
                  onChange={handleResumeUpload}
                  disabled={uploadingResume}
                />

                {resumeFileName && (
                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-green-700">
                    <CheckCircle2 size={16} />
                    {resumeFileName} uploaded successfully
                  </div>
                )}

                {uploadError && (
                  <p
                    role="alert"
                    className="mt-3 text-xs text-red-600"
                  >
                    {uploadError}
                  </p>
                )}

              </div>

              {/* Candidate form fields */}
              <div className="space-y-5">

                <div>
                  <label
                    className={labelClass}
                    htmlFor="candidateName"
                  >
                    Candidate name
                  </label>

                  <input
                    id="candidateName"
                    className={inputClass}
                    placeholder="e.g. Aarav Sharma"
                    value={candidateName}
                    onChange={(e) =>
                      setCandidateName(e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="candidateEmail"
                  >
                    Email address
                  </label>

                  <input
                    id="candidateEmail"
                    type="email"
                    className={inputClass}
                    placeholder="candidate@example.com"
                    value={candidateEmail}
                    onChange={(e) =>
                      setCandidateEmail(e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="candidatePhone"
                  >
                    Phone number
                  </label>

                  <input
                    id="candidatePhone"
                    className={inputClass}
                    placeholder="+91 98765 43210"
                    value={candidatePhone}
                    onChange={(e) =>
                      setCandidatePhone(e.target.value)
                    }
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="candidateSkills"
                  >
                    Candidate skills
                  </label>

                  <textarea
                    id="candidateSkills"
                    className={`${inputClass} min-h-32 resize-y`}
                    placeholder="Python, React, FastAPI, SQL..."
                    value={candidateSkills}
                    onChange={(e) =>
                      setCandidateSkills(e.target.value)
                    }
                    required
                  />

                  <p className="mt-2 text-xs text-[#888]">
                    Automatically populated from the resume.
                    You can review and edit the extracted skills.
                  </p>
                </div>

              </div>

            </section>

            {/* Job requirements */}
            <section className="rounded-md border border-[#e5e3df] bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-[#fcebec] text-[#e5242a]">
                  <BriefcaseBusiness size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#222]">
                    Job requirements
                  </h2>

                  <p className="text-xs text-[#888]">
                    Define the skills required for this role
                  </p>
                </div>

              </div>

              <div className="space-y-5">

                <div>
                  <label
                    className={labelClass}
                    htmlFor="jobTitle"
                  >
                    Job title
                  </label>

                  <input
                    id="jobTitle"
                    className={inputClass}
                    placeholder="e.g. Python Backend Developer"
                    value={jobTitle}
                    onChange={(e) =>
                      setJobTitle(e.target.value)
                    }
                    required
                    minLength={2}
                  />
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="requiredSkills"
                  >
                    Required skills
                  </label>

                  <textarea
                    id="requiredSkills"
                    className={`${inputClass} min-h-32 resize-y`}
                    placeholder="Python, FastAPI, PostgreSQL..."
                    value={requiredSkills}
                    onChange={(e) =>
                      setRequiredSkills(e.target.value)
                    }
                    required
                  />

                  <p className="mt-2 text-xs text-[#888]">
                    These carry 80% of the score when
                    preferred skills are provided.
                  </p>
                </div>

                <div>
                  <label
                    className={labelClass}
                    htmlFor="preferredSkills"
                  >
                    Preferred skills
                    <span className="ml-2 font-normal text-[#999]">
                      Optional
                    </span>
                  </label>

                  <textarea
                    id="preferredSkills"
                    className={`${inputClass} min-h-24 resize-y`}
                    placeholder="Docker, AWS, Redis..."
                    value={preferredSkills}
                    onChange={(e) =>
                      setPreferredSkills(e.target.value)
                    }
                  />

                  <p className="mt-2 text-xs text-[#888]">
                    These carry 20% of the score when
                    both categories are provided.
                  </p>
                </div>

              </div>

            </section>

          </div>

          {/* Extracted resume profile preview */}
          {resumeProfile && (
            <section className="mt-6 rounded-md border border-[#e5e3df] bg-white p-6 shadow-sm">

              <div className="mb-6 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-50 text-green-700">
                  <FileText size={20} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#222]">
                    Extracted resume profile
                  </h2>

                  <p className="text-xs text-[#888]">
                    Review the information extracted from the uploaded document.
                  </p>
                </div>

              </div>

              {/* Summary */}
              <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">

                {[
                  {
                    label: "Skills",
                    count: resumeProfile.skills.length,
                  },
                  {
                    label: "Education",
                    count: resumeProfile.education.length,
                  },
                  {
                    label: "Experience",
                    count: resumeProfile.experience.length,
                  },
                  {
                    label: "Projects",
                    count: resumeProfile.projects.length,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-md bg-[#f7f6f4] p-4"
                  >
                    <p className="text-xs text-[#888]">
                      {item.label}
                    </p>

                    <p className="mt-1 text-xl font-bold text-[#222]">
                      {item.count}
                    </p>
                  </div>
                ))}

              </div>

              {/* Extracted skills */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                  Extracted skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {resumeProfile.skills.length > 0 ? (
                    resumeProfile.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-md border border-[#e5e3df] bg-[#faf9f7] px-3 py-1.5 text-xs text-[#555]"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-xs text-[#888]">
                      No skills were identified.
                    </p>
                  )}
                </div>
              </div>

              {/* Education */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                  Education
                </h3>

                {resumeProfile.education.length > 0 ? (
                  <div className="space-y-3">
                    {resumeProfile.education.map((item, index) => (
                      <div
                        key={`education-${index}`}
                        className="rounded-md border border-[#eee] p-4"
                      >
                        <p className="text-sm font-semibold">
                          {item.degree || "Degree not identified"}
                        </p>

                        <p className="mt-1 text-xs text-[#777]">
                          {item.institution || "Institution not identified"}
                        </p>

                        {item.graduation_year && (
                          <p className="mt-1 text-xs text-[#888]">
                            Graduation year: {item.graduation_year}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888]">
                    No education entries were identified.
                  </p>
                )}
              </div>

              {/* Experience */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                  Work experience
                </h3>

                {resumeProfile.experience.length > 0 ? (
                  <div className="space-y-3">
                    {resumeProfile.experience.map((item, index) => (
                      <div
                        key={`experience-${index}`}
                        className="rounded-md border border-[#eee] p-4"
                      >
                        <p className="text-sm font-semibold">
                          {item.job_title || "Job title not identified"}
                        </p>

                        <p className="mt-1 text-xs text-[#777]">
                          {item.company || "Company not identified"}
                        </p>

                        {item.duration && (
                          <p className="mt-1 text-xs text-[#888]">
                            {item.duration}
                          </p>
                        )}

                        {item.description && (
                          <p className="mt-2 text-xs leading-6 text-[#666]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888]">
                    No work experience entries were identified.
                  </p>
                )}
              </div>

              {/* Projects */}
              <div className="mb-6">
                <h3 className="mb-3 text-sm font-semibold">
                  Projects
                </h3>

                {resumeProfile.projects.length > 0 ? (
                  <div className="space-y-3">
                    {resumeProfile.projects.map((item, index) => (
                      <div
                        key={`project-${index}`}
                        className="rounded-md border border-[#eee] p-4"
                      >
                        <p className="text-sm font-semibold">
                          {item.name || "Project name not identified"}
                        </p>

                        {item.technologies.length > 0 && (
                          <p className="mt-2 text-xs text-[#e5242a]">
                            {item.technologies.join(", ")}
                          </p>
                        )}

                        {item.description && (
                          <p className="mt-2 text-xs leading-6 text-[#666]">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888]">
                    No projects were identified.
                  </p>
                )}
              </div>

              {/* Certifications */}
              <div>
                <h3 className="mb-3 text-sm font-semibold">
                  Certifications
                </h3>

                {resumeProfile.certifications.length > 0 ? (
                  <div className="space-y-2">
                    {resumeProfile.certifications.map((item, index) => (
                      <div
                        key={`certification-${index}`}
                        className="rounded-md border border-[#eee] p-4"
                      >
                        <p className="text-sm font-semibold">
                          {item.name}
                        </p>

                        {item.issuing_organization && (
                          <p className="mt-1 text-xs text-[#777]">
                            {item.issuing_organization}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#888]">
                    No certifications were identified.
                  </p>
                )}
              </div>

              <div className="mt-6 rounded-md border border-amber-200 bg-amber-50 p-4 text-xs leading-6 text-amber-800">
                Resume information is extracted automatically and may contain
                errors. Review the candidate information before using it
                for assessment. Extracted skills are candidate claims, not
                proof of proficiency.
              </div>

            </section>
          )}

          {/* Error messages */}
          {error && (
            <div
              role="alert"
              className="mt-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Submit button */}
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center">

            <button
              type="submit"
              disabled={loading || uploadingResume}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-[#e5242a] bg-[#e5242a] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#bd1c23] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Calculating match...
                </>
              ) : (
                <>
                  <Target size={17} />
                  Calculate candidate match
                </>
              )}
            </button>

            <span className="text-xs text-[#888]">
              Matching measures skill coverage, not an automated hiring decision.
            </span>

          </div>

        </form>

        {/* Matching report */}
        {result && (
          <section
            aria-live="polite"
            className="mt-10 rounded-md border border-[#e5e3df] bg-white p-6 shadow-sm md:p-8"
          >

            <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">

              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#e5242a]">
                  <FileText size={15} />
                  Matching report
                </div>

                <h2 className="text-2xl font-bold text-[#222]">
                  {result.job_title}
                </h2>

                <p className="mt-1 text-sm text-[#888]">
                  Candidate skill coverage analysis
                </p>
              </div>

              <div className="rounded-md bg-[#f7f6f4] px-5 py-3 sm:text-right">

                <p className="text-xs font-medium text-[#777]">
                  Overall match score
                </p>

                <p className="text-3xl font-bold tabular-nums text-[#e5242a]">
                  {result.overall_match_score.toFixed(2)}%
                </p>

              </div>

            </div>

            {/* Score progress */}
            <div className="mb-8">

              <div className="mb-2 flex justify-between text-xs text-[#777]">
                <span>Skill coverage</span>
                <span>
                  {result.overall_match_score.toFixed(2)}%
                </span>
              </div>

              <div
                className="h-3 overflow-hidden rounded-full bg-[#eee]"
                role="progressbar"
                aria-valuenow={result.overall_match_score}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Overall skill match score"
              >
                <div
                  className="h-full rounded-full bg-[#e5242a] transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(0, result.overall_match_score)
                    )}%`,
                  }}
                />
              </div>

            </div>

            {/* Coverage metrics */}
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="rounded-md border border-[#e9e6e1] p-5">
                <p className="text-sm text-[#777]">
                  Required skill coverage
                </p>

                <p className="mt-2 text-2xl font-bold text-[#222]">
                  {result.required_coverage.toFixed(2)}%
                </p>
              </div>

              <div className="rounded-md border border-[#e9e6e1] p-5">
                <p className="text-sm text-[#777]">
                  Preferred skill coverage
                </p>

                <p className="mt-2 text-2xl font-bold text-[#222]">
                  {result.preferred_coverage.toFixed(2)}%
                </p>
              </div>

            </div>

            {/* Skill breakdown */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

              <div className="space-y-7">

                <SkillGroup
                  title="Matched required skills"
                  skills={result.matched_required_skills}
                  type="success"
                />

                <SkillGroup
                  title="Missing required skills"
                  skills={result.missing_required_skills}
                  type="danger"
                />

              </div>

              <div className="space-y-7">

                <SkillGroup
                  title="Matched preferred skills"
                  skills={result.matched_preferred_skills}
                  type="success"
                />

                <SkillGroup
                  title="Missing preferred skills"
                  skills={result.missing_preferred_skills}
                  type="danger"
                />

              </div>

            </div>

            <div className="mt-8 rounded-md border border-[#e9e6e1] bg-[#faf9f7] p-4 text-xs leading-6 text-[#777]">
              <strong className="text-[#444]">
                How to interpret this report:
              </strong>{" "}
              The score represents exact skill coverage using the
              current matching rules. It does not assess experience
              depth, project quality, or overall candidate suitability.
              Extracted resume claims are not independently verified.
              A recruiter must review the candidate and make the
              final decision.
            </div>

          </section>
        )}

      </div>
    </main>
  );
}

export default CandidateMatching;
