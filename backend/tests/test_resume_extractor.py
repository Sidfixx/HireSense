
from app.services.structured_extractor import extract_resume_data


SAMPLE_RESUME = """
AARAV SHARMA
Kolkata, India
aarav.sharma.demo@example.com
+91 98765 43210

PROFESSIONAL SUMMARY
Computer Science undergraduate interested in software development.

EDUCATION
Bachelor of Technology — Eastern Institute of Technology, Kolkata
2022 - 2026 | CGPA: 8.4/10

TECHNICAL SKILLS
Python, C++, JavaScript, TypeScript, React, FastAPI

PROJECTS
Job Application Tracker | React, TypeScript, FastAPI, PostgreSQL
Built a full-stack application to track job applications.

EXPERIENCE
Software Development Intern — DemoTech Solutions, Kolkata
May 2025 – July 2025
Developed and tested REST API endpoints.

CERTIFICATIONS
Python for Everybody — Demo Learning Academy
"""


def test_candidate_name():
    data = extract_resume_data(SAMPLE_RESUME)
    assert data.candidate_name == "AARAV SHARMA"


def test_email_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert data.email == "aarav.sharma.demo@example.com"


def test_phone_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert data.phone == "+91 98765 43210"


def test_skill_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert "python" in data.skills
    assert "react" in data.skills
    assert "fastapi" in data.skills


def test_education_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.education) > 0
    assert data.education[0].degree == "Bachelor of Technology"


def test_project_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.projects) > 0
    assert data.projects[0].name == "Job Application Tracker"


def test_experience_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.experience) > 0
    assert data.experience[0].job_title == "Software Development Intern"


def test_certification_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.certifications) > 0
    assert data.certifications[0].name == "Python for Everybody"


def test_empty_resume():
    data = extract_resume_data("")

    assert data.candidate_name is None
    assert data.email is None
    assert data.phone is None
    assert data.skills == []
    assert data.education == []
    assert data.experience == []
    assert data.projects == []
    assert data.certifications == []


def test_duplicate_skills_are_not_repeated():
    text = "Python Python Python and React React"
    data = extract_resume_data(text)

    assert data.skills.count("python") == 1
    assert data.skills.count("react") == 1


def test_java_is_not_detected_inside_javascript():
    text = "Experienced in JavaScript development"
    data = extract_resume_data(text)

    assert "javascript" in data.skills
    assert "java" not in data.skills


def test_missing_sections_do_not_crash():
    text = """
    AARAV SHARMA
    aarav.sharma.demo@example.com

    SKILLS
    Python, React
    """

    data = extract_resume_data(text)

    assert data.candidate_name == "AARAV SHARMA"
    assert data.skills == ["python", "react"]
    assert data.education == []
    assert data.experience == []
    assert data.projects == []
    assert data.certifications == []
