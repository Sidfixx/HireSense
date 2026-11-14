
import api from "./api";

export interface Education {
  degree: string | null;
  institution: string | null;
  graduation_year: number | null;
}

export interface WorkExperience {
  job_title: string | null;
  company: string | null;
  duration: string | null;
  description: string | null;
}

export interface Project {
  name: string | null;
  description: string | null;
  technologies: string[];
}

export interface Certification {
  name: string;
  issuing_organization: string | null;
}

export type SkillEvidenceType =
  | "skills_section"
  | "project"
  | "experience"
  | "other";

export interface SkillEvidence {
  skill: string;
  evidence_type: SkillEvidenceType;
  evidence_text: string;
}

export interface ExtractedResumeProfile {
  candidate_name: string | null;
  email: string | null;
  phone: string | null;
  skills: string[];

  skill_evidence: SkillEvidence[];

  education: Education[];
  experience: WorkExperience[];
  projects: Project[];
  certifications: Certification[];
}

export interface ResumeUploadResponse {
  filename: string;
  file_type: "pdf" | "docx";
  character_count: number;
  extracted_text: string;
  candidate_profile: ExtractedResumeProfile;
}

export async function uploadResume(
  file: File
): Promise<ResumeUploadResponse> {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<ResumeUploadResponse>(
    "/resumes/upload",
    formData,
    {
      timeout: 60000,
    }
  );

  return response.data;
}
