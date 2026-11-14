
from app.services.structured_extractor import extract_skill_evidence


def test_extracts_skills_from_skills_section():
    text = """
    TECHNICAL SKILLS
    Python, React, FastAPI
    """

    evidence = extract_skill_evidence(text)

    assert len(evidence) == 3

    skills = {item.skill for item in evidence}
    assert skills == {"python", "react", "fastapi"}

    assert all(
        item.evidence_type == "skills_section"
        for item in evidence
    )


def test_extracts_skills_from_project():
    text = """
    PROJECTS
    Customer Churn Prediction | Python, scikit-learn
    Built a prediction model using Python and pandas.
    """

    evidence = extract_skill_evidence(text)

    python_evidence = [
        item for item in evidence
        if item.skill == "python"
    ]

    assert len(python_evidence) == 2
    assert all(
        item.evidence_type == "project"
        for item in python_evidence
    )


def test_extracts_skills_from_work_experience():
    text = """
    EXPERIENCE
    Software Development Intern — DemoTech Solutions
    Developed REST APIs using FastAPI and Python.
    """

    evidence = extract_skill_evidence(text)

    skills = {item.skill for item in evidence}

    assert "fastapi" in skills
    assert "python" in skills

    assert all(
        item.evidence_type == "experience"
        for item in evidence
    )


def test_skill_can_have_multiple_evidence_sources():
    text = """
    TECHNICAL SKILLS
    Python, React

    PROJECTS
    Job Tracker | Python, React
    Built a web application using Python.

    EXPERIENCE
    Developer — DemoTech
    Developed Python applications.
    """

    evidence = extract_skill_evidence(text)

    python_evidence = [
        item for item in evidence
        if item.skill == "python"
    ]

    evidence_types = {
        item.evidence_type
        for item in python_evidence
    }

    assert evidence_types == {
        "skills_section",
        "project",
        "experience",
    }


def test_duplicate_evidence_is_not_repeated():
    text = """
    TECHNICAL SKILLS
    Python, React
    Python, React
    """

    evidence = extract_skill_evidence(text)

    python_evidence = [
        item for item in evidence
        if item.skill == "python"
    ]

    assert len(python_evidence) == 1


def test_skills_outside_known_sections_are_other():
    text = """
    Python developer interested in machine learning.
    """

    evidence = extract_skill_evidence(text)

    assert len(evidence) == 2

    assert all(
        item.evidence_type == "other"
        for item in evidence
    )
