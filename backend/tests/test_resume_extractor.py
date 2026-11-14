from app.services.structured_extractor import (
    extract_resume_data,
    extract_sections,
)


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
    assert len(data.education) == 1
    assert data.education[0].degree == "Bachelor of Technology"
    assert data.education[0].institution == "Eastern Institute of Technology, Kolkata"
    assert data.education[0].graduation_year == 2026


def test_project_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.projects) == 1
    assert data.projects[0].name == "Job Application Tracker"
    assert "React" in data.projects[0].technologies


def test_experience_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.experience) == 1
    assert data.experience[0].job_title == "Software Development Intern"
    assert data.experience[0].company == "DemoTech Solutions, Kolkata"
    assert data.experience[0].duration == "May 2025 – July 2025"


def test_certification_extraction():
    data = extract_resume_data(SAMPLE_RESUME)
    assert len(data.certifications) == 1
    assert data.certifications[0].name == "Python for Everybody"
    assert data.certifications[0].issuing_organization == "Demo Learning Academy"


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
    data = extract_resume_data("Python Python Python and React React")
    assert data.skills.count("python") == 1
    assert data.skills.count("react") == 1


def test_java_is_not_detected_inside_javascript():
    data = extract_resume_data("Experienced in JavaScript development")
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


def test_alternative_section_headings():
    text = """
    AARAV SHARMA

    ACADEMIC QUALIFICATIONS
    Bachelor of Technology — Example University

    EMPLOYMENT HISTORY
    Software Engineer — Example Company

    SELECTED PROJECTS
    Resume Screening System | Python, FastAPI

    PROFESSIONAL CERTIFICATIONS
    Python Certification — Example Academy
    """
    sections = extract_sections(text)
    assert "Bachelor of Technology" in " ".join(sections["education"])
    assert "Software Engineer" in " ".join(sections["experience"])
    assert "Resume Screening System" in " ".join(sections["projects"])
    assert "Python Certification" in " ".join(sections["certifications"])


def test_section_headings_are_case_insensitive():
    text = """
    academic qualifications
    Bachelor of Technology — Example University

    employment history
    Developer — Example Company
    """
    sections = extract_sections(text)
    assert "education" in sections
    assert "experience" in sections


def test_extracts_multiple_education_entries():
    text = """
    EDUCATION
    Bachelor of Technology — Eastern Institute of Technology
    2022 - 2026 | CGPA: 8.4
    Master of Science — North City University
    2026 - 2028 | CGPA: 9.1
    """
    data = extract_resume_data(text)
    assert len(data.education) == 2
    assert data.education[0].institution == "Eastern Institute of Technology"
    assert data.education[0].graduation_year == 2026
    assert data.education[1].institution == "North City University"
    assert data.education[1].graduation_year == 2028


def test_extracts_multiple_experience_entries():
    text = """
    EXPERIENCE
    Software Development Intern — DemoTech Solutions
    May 2025 – July 2025
    Built REST API endpoints.
    Machine Learning Intern — DataWorks
    August 2024 - December 2024
    Prepared datasets and trained baseline models.
    """
    data = extract_resume_data(text)
    assert len(data.experience) == 2
    assert data.experience[0].job_title == "Software Development Intern"
    assert data.experience[0].company == "DemoTech Solutions"
    assert data.experience[0].duration == "May 2025 – July 2025"
    assert "REST API" in data.experience[0].description
    assert data.experience[1].job_title == "Machine Learning Intern"
    assert data.experience[1].company == "DataWorks"


def test_extracts_multiple_projects():
    text = """
    PROJECTS
    Job Application Tracker | React, TypeScript, PostgreSQL
    Built a full-stack job tracking tool.
    Customer Churn Prediction | Python, scikit-learn, pandas
    Trained a model to predict customer churn.
    """
    data = extract_resume_data(text)
    assert len(data.projects) == 2
    assert data.projects[0].name == "Job Application Tracker"
    assert data.projects[0].technologies == [
        "React", "TypeScript", "PostgreSQL"
    ]
    assert "full-stack" in data.projects[0].description
    assert data.projects[1].name == "Customer Churn Prediction"
    assert "scikit-learn" in data.projects[1].technologies


def test_extracts_multiple_certifications():
    text = """
    CERTIFICATIONS
    Python for Everybody — Demo Learning Academy
    Introduction to Machine Learning — Demo Online Institute
    """
    data = extract_resume_data(text)
    assert len(data.certifications) == 2
    assert data.certifications[0].name == "Python for Everybody"
    assert data.certifications[0].issuing_organization == "Demo Learning Academy"
    assert data.certifications[1].name == "Introduction to Machine Learning"
    assert data.certifications[1].issuing_organization == "Demo Online Institute"


def test_graduation_year_uses_end_of_range():
    text = """
    EDUCATION
    Bachelor of Technology — Example University
    2022 - 2026
    """
    data = extract_resume_data(text)
    assert data.education[0].graduation_year == 2026
