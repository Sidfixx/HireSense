
from app.schemas.resume import ResumeData
from app.schemas.matching import JobRequirements
from app.services.matching_engine import calculate_match


def test_perfect_match():
    candidate = ResumeData(
        skills=["Python", "React", "FastAPI"]
    )

    job = JobRequirements(
        title="Python Developer",
        required_skills=["Python", "React"],
        preferred_skills=["FastAPI"],
    )

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 100.0
    assert result.missing_required_skills == []
    assert result.missing_preferred_skills == []


def test_partial_match():
    candidate = ResumeData(
        skills=["Python", "React"]
    )

    job = JobRequirements(
        title="Full Stack Developer",
        required_skills=["Python", "React", "SQL"],
        preferred_skills=["Docker"],
    )

    result = calculate_match(candidate, job)

    assert result.required_coverage == 66.67
    assert result.preferred_coverage == 0.0
    assert result.missing_required_skills == ["SQL"]
    assert result.missing_preferred_skills == ["Docker"]
    assert result.overall_match_score == 53.34


def test_skill_matching_is_case_insensitive():
    candidate = ResumeData(skills=["PYTHON", "React"])

    job = JobRequirements(
        title="Developer",
        required_skills=["python", "REACT"],
    )

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 100.0


def test_duplicate_job_skills_are_removed():
    candidate = ResumeData(skills=["Python"])

    job = JobRequirements(
        title="Developer",
        required_skills=["Python", "python", "PYTHON"],
    )

    result = calculate_match(candidate, job)

    assert len(result.matched_required_skills) == 1
    assert result.overall_match_score == 100.0


def test_only_required_skills():
    candidate = ResumeData(skills=["Python"])

    job = JobRequirements(
        title="Python Developer",
        required_skills=["Python", "Java"],
    )

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 50.0


def test_only_preferred_skills():
    candidate = ResumeData(skills=["Docker"])

    job = JobRequirements(
        title="Developer",
        preferred_skills=["Docker", "AWS"],
    )

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 50.0


def test_no_matching_skills():
    candidate = ResumeData(skills=["HTML", "CSS"])

    job = JobRequirements(
        title="Python Developer",
        required_skills=["Python", "FastAPI"],
        preferred_skills=["Docker"],
    )

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 0.0
    assert len(result.missing_required_skills) == 2


def test_empty_job_requirements():
    candidate = ResumeData(skills=["Python"])

    job = JobRequirements(title="Developer")

    result = calculate_match(candidate, job)

    assert result.overall_match_score == 0.0
    assert result.matched_required_skills == []
    assert result.matched_preferred_skills == []
