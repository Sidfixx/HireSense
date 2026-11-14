
from typing import Optional, Literal

from pydantic import BaseModel, Field, EmailStr


class Education(BaseModel):
    degree: Optional[str] = None
    institution: Optional[str] = None
    graduation_year: Optional[int] = None


class WorkExperience(BaseModel):
    job_title: Optional[str] = None
    company: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None


class Project(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    technologies: list[str] = Field(default_factory=list)


class Certification(BaseModel):
    name: str
    issuing_organization: Optional[str] = None


class SkillEvidence(BaseModel):
    skill: str

    evidence_type: Literal[
        "skills_section",
        "project",
        "experience",
        "other",
    ]

    evidence_text: str


class ResumeData(BaseModel):
    candidate_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None

    skills: list[str] = Field(default_factory=list)

    skill_evidence: list[SkillEvidence] = Field(
        default_factory=list
    )

    education: list[Education] = Field(default_factory=list)

    experience: list[WorkExperience] = Field(default_factory=list)

    projects: list[Project] = Field(default_factory=list)

    certifications: list[Certification] = Field(default_factory=list)
