
import re

from app.schemas.resume import (
    ResumeData,
    Education,
    WorkExperience,
    Project,
    Certification,
)


# Skills recognised by the initial keyword-based extractor.
SKILL_KEYWORDS = [
    "python",
    "java",
    "c++",
    "javascript",
    "typescript",
    "react",
    "node.js",
    "fastapi",
    "django",
    "sql",
    "postgresql",
    "mongodb",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "natural language processing",
    "computer vision",
    "tensorflow",
    "pytorch",
    "scikit-learn",
    "pandas",
    "numpy",
    "data analysis",
    "data visualization",
    "git",
    "docker",
    "aws",
    "linux",
    "html",
    "css",
]


# Different resume headings mapped to standard section names.
SECTION_ALIASES = {
    "education": {
        "EDUCATION",
        "ACADEMIC BACKGROUND",
        "ACADEMIC QUALIFICATIONS",
        "EDUCATIONAL QUALIFICATIONS",
        "EDUCATION DETAILS",
    },
    "experience": {
        "EXPERIENCE",
        "WORK EXPERIENCE",
        "PROFESSIONAL EXPERIENCE",
        "EMPLOYMENT HISTORY",
        "WORK HISTORY",
        "INTERNSHIP EXPERIENCE",
        "INTERNSHIPS",
    },
    "projects": {
        "PROJECTS",
        "PERSONAL PROJECTS",
        "ACADEMIC PROJECTS",
        "KEY PROJECTS",
        "SELECTED PROJECTS",
        "PROJECT EXPERIENCE",
    },
    "certifications": {
        "CERTIFICATIONS",
        "CERTIFICATES",
        "LICENSES AND CERTIFICATIONS",
        "PROFESSIONAL CERTIFICATIONS",
        "LICENSES",
    },
    "skills": {
        "SKILLS",
        "TECHNICAL SKILLS",
        "CORE SKILLS",
        "TECHNICAL EXPERTISE",
        "CORE COMPETENCIES",
        "TECHNOLOGIES",
    },
}


def clean_line(line: str) -> str:
    """Remove common bullet symbols and extra whitespace."""
    return re.sub(r"^[\s•\-*]+", "", line).strip()


def extract_email(text: str):
    """Extract an email address."""
    match = re.search(
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
        text,
    )

    return match.group(0) if match else None


def extract_phone(text: str):
    """Extract a possible phone number."""
    match = re.search(
        r"(?<!\w)(?:\+?\d{1,3}[-.\s]?)?"
        r"(?:\d[-.\s]?){9,12}\d(?!\w)",
        text,
    )

    return match.group(0).strip() if match else None


def extract_candidate_name(text: str):
    """Heuristic name extraction from the opening lines."""
    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    for line in lines[:5]:
        cleaned = re.sub(r"\s+", " ", line)

        if (
            len(cleaned) <= 60
            and re.fullmatch(r"[A-Za-z][A-Za-z .'-]*", cleaned)
            and len(cleaned.split()) >= 2
        ):
            return cleaned

    return None


def extract_skills(text: str):
    """Identify skills using a predefined keyword dictionary."""
    normalized_text = text.lower()
    found_skills = []

    for skill in SKILL_KEYWORDS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, normalized_text):
            found_skills.append(skill)

    return found_skills


def extract_sections(text: str):
    """
    Divide resume text into sections.

    Recognises different heading variations and
    normalises them into standard section names.
    """
    sections = {}
    current_section = None

    for raw_line in text.splitlines():
        line = raw_line.strip()

        if not line:
            continue

        heading = re.sub(r"[:\s]+$", "", line).upper()

        matched_section = None

        for section_name, aliases in SECTION_ALIASES.items():
            if heading in aliases:
                matched_section = section_name
                break

        if matched_section:
            current_section = matched_section
            sections.setdefault(current_section, [])
            continue

        if current_section:
            sections[current_section].append(clean_line(line))

    return sections


def extract_year(text: str):
    """Find a likely graduation year."""
    match = re.search(r"\b(?:19|20)\d{2}\b", text)

    return int(match.group(0)) if match else None


def extract_education(section_lines: list[str]):
    """Extract education entries."""
    education = []

    content = " ".join(
        line for line in section_lines if line.strip()
    )

    if not content:
        return education

    entries = re.split(
        r"(?=(?:Bachelor|Master|B\.?Tech|M\.?Tech|B\.?Sc|M\.?Sc|Ph\.?D))",
        content,
        flags=re.IGNORECASE,
    )

    for entry in entries:
        entry = entry.strip()

        if not entry:
            continue

        parts = re.split(
            r"\s+[—–-]\s+",
            entry,
            maxsplit=1,
        )

        degree = parts[0].strip(" ,")
        institution = (
            parts[1].strip(" ,")
            if len(parts) > 1
            else None
        )

        education.append(
            Education(
                degree=degree or None,
                institution=institution,
                graduation_year=extract_year(entry),
            )
        )

    return education


def extract_experience(section_lines: list[str]):
    """Extract work experience entries."""
    experience = []
    current = None

    date_pattern = re.compile(
        r"\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)?"
        r"\s*\d{0,2}\s*,?\s*(?:19|20)\d{2}\b",
        re.IGNORECASE,
    )

    for line in section_lines:
        if not line:
            continue

        if " — " in line or " – " in line or " - " in line:
            if current:
                experience.append(current)

            parts = re.split(
                r"\s+[—–-]\s+",
                line,
                maxsplit=1,
            )

            current = {
                "job_title": parts[0].strip(),
                "company": (
                    parts[1].strip()
                    if len(parts) > 1
                    else None
                ),
                "duration": None,
                "description": "",
            }

        elif current and date_pattern.search(line):
            current["duration"] = line

        elif current:
            current["description"] += (
                (" " if current["description"] else "") + line
            )

    if current:
        experience.append(current)

    return [
        WorkExperience(**item)
        for item in experience
    ]


def extract_projects(section_lines: list[str]):
    """Extract projects and their technologies."""
    projects = []
    current = None

    for line in section_lines:
        if not line:
            continue

        if " | " in line:
            if current:
                projects.append(current)

            name, technologies = line.split(" | ", 1)

            current = {
                "name": name.strip(),
                "description": "",
                "technologies": [
                    tech.strip()
                    for tech in technologies.split(",")
                    if tech.strip()
                ],
            }

        elif current:
            current["description"] += (
                (" " if current["description"] else "") + line
            )

    if current:
        projects.append(current)

    return [
        Project(**item)
        for item in projects
    ]


def extract_certifications(section_lines: list[str]):
    """Extract certifications and issuing organisations."""
    certifications = []

    for line in section_lines:
        if not line:
            continue

        parts = re.split(
            r"\s+[—–-]\s+",
            line,
            maxsplit=1,
        )

        certifications.append(
            Certification(
                name=parts[0].strip(),
                issuing_organization=(
                    parts[1].strip()
                    if len(parts) > 1
                    else None
                ),
            )
        )

    return certifications


def extract_resume_data(text: str) -> ResumeData:
    """Convert raw resume text into a structured candidate profile."""

    sections = extract_sections(text)

    return ResumeData(
        candidate_name=extract_candidate_name(text),
        email=extract_email(text),
        phone=extract_phone(text),
        skills=extract_skills(text),
        education=extract_education(
            sections.get("education", [])
        ),
        experience=extract_experience(
            sections.get("experience", [])
        ),
        projects=extract_projects(
            sections.get("projects", [])
        ),
        certifications=extract_certifications(
            sections.get("certifications", [])
        ),
    )
