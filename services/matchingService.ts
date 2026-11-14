
import api from "./api";

export interface CandidateProfile {
  candidate_name?: string | null;
  email?: string | null;
  phone?: string | null;
  skills: string[];
}

export interface JobRequirements {
  title: string;
  required_skills: string[];
  preferred_skills: string[];
}

export interface MatchRequest {
  candidate: CandidateProfile;
  job: JobRequirements;
}

export interface MatchResult {
  job_title: string;

  matched_required_skills: string[];
  missing_required_skills: string[];

  matched_preferred_skills: string[];
  missing_preferred_skills: string[];

  required_coverage: number;
  preferred_coverage: number;

  overall_match_score: number;
}

export async function calculateCandidateMatch(
  request: MatchRequest
): Promise<MatchResult> {
  const response = await api.post<MatchResult>(
    "/matching/score",
    request
  );

  return response.data;
}
