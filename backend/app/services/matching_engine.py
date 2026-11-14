
from app.schemas.resume import ResumeData
from app.schemas.matching import JobRequirements, MatchResult


def normalize_skill(skill: str) -> str:
    """Normalize skill names for case-insensitive comparison."""
    return " ".join(skill.casefold().strip().split())


def calculate_coverage(matched: int, total: int) -> float:
    """Calculate skill coverage as a percentage."""
    if total == 0:
        return 0.0

    return round((matched / total) * 100, 2)


def calculate_match(
    candidate: ResumeData,
    job: JobRequirements,
) -> MatchResult:
    """
    Compare candidate skills against job requirements.

    Required skills carry 80% of the score.
    Preferred skills carry 20%.
    """

    # Normalize candidate skills.
    candidate_skills = {
        normalize_skill(skill)
        for skill in candidate.skills
        if normalize_skill(skill)
    }

    # Remove duplicate job skills while preserving their display names.
    def unique_skills(skills: list[str]) -> list[str]:
        unique = {}
        for skill in skills:
            cleaned = skill.strip()
            normalized = normalize_skill(cleaned)

            if normalized and normalized not in unique:
                unique[normalized] = cleaned

        return list(unique.values())

    required = unique_skills(job.required_skills)
    preferred = unique_skills(job.preferred_skills)

    # Compare required skills.
    matched_required = [
        skill for skill in required
        if normalize_skill(skill) in candidate_skills
    ]

    missing_required = [
        skill for skill in required
        if normalize_skill(skill) not in candidate_skills
    ]

    # Compare preferred skills.
    matched_preferred = [
        skill for skill in preferred
        if normalize_skill(skill) in candidate_skills
    ]

    missing_preferred = [
        skill for skill in preferred
        if normalize_skill(skill) not in candidate_skills
    ]

    # Calculate coverage percentages.
    required_coverage = calculate_coverage(
        len(matched_required),
        len(required),
    )

    preferred_coverage = calculate_coverage(
        len(matched_preferred),
        len(preferred),
    )

    # Calculate weighted overall score.
    if required and preferred:
        overall_score = (
            required_coverage * 0.80
            + preferred_coverage * 0.20
        )
    elif required:
        overall_score = required_coverage
    elif preferred:
        overall_score = preferred_coverage
    else:
        overall_score = 0.0

    return MatchResult(
        job_title=job.title,
        matched_required_skills=matched_required,
        missing_required_skills=missing_required,
        matched_preferred_skills=matched_preferred,
        missing_preferred_skills=missing_preferred,
        required_coverage=required_coverage,
        preferred_coverage=preferred_coverage,
        overall_match_score=round(overall_score, 2),
    )
