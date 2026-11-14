from pydantic import BaseModel, Field

from app.schemas.resume import ResumeData


class JobRequirements(BaseModel):
    title: str = Field(min_length=2, max_length=120)

    required_skills: list[str] = Field(
        default_factory=list
    )

    preferred_skills: list[str] = Field(
        default_factory=list
    )


class MatchRequest(BaseModel):
    candidate: ResumeData
    job: JobRequirements


class MatchResult(BaseModel):
    job_title: str

    matched_required_skills: list[str]
    missing_required_skills: list[str]

    matched_preferred_skills: list[str]
    missing_preferred_skills: list[str]

    required_coverage: float
    preferred_coverage: float

    overall_match_score: float