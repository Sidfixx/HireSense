
import re

from app.schemas.resume import (
    ResumeData,
    Education,
    WorkExperience,
    Project,
    Certification,
    SkillEvidence,
)


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


EDUCATION_START = re.compile(
    r"^(?:bachelor|master|doctor|ph\.?d|b\.?\s?tech|m\.?\s?tech|"
    r"b\.?\s?e\.?|m\.?\s?e\.?|b\.?\s?sc|m\.?\s?sc|"
    r"b\.?\s?ca|m\.?\s?ca|b\.?\s?com|m\.?\s?com|"
    r"b\.?\s?ba|m\.?\s?ba|mba|diploma|associate|"
    r"higher secondary|senior secondary|class\s*(?:10|12)|10th|12th)\b",
    re.IGNORECASE,
)


DATE_RANGE = re.compile(
    r"(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?"
    r"(?:19|20)\d{2}\s*(?:-|–|—|to)\s*"
    r"(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+)?"
    r"(?:(?:19|20)\d{2}|present|current)",
    re.IGNORECASE,
)


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
    lines = [line.strip() for line in text.splitlines() if line.strip()]

    for line in lines[:5]:
        cleaned = re.sub(r"\s+", " ", line)

        if (
            len(cleaned) <= 60
            and re.fullmatch(r"[A-Za-z][A-Za-z .'-]*", cleaned)
            and len(cleaned.split()) >= 2
        ):
            return cleaned

    return None


def _find_skills_in_line(line: str) -> list[str]:
    """Find recognised skills in one resume line."""
    found = []

    for skill in SKILL_KEYWORDS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, line, re.IGNORECASE):
            found.append(skill)

    return found


def extract_skills(text: str):
    """Identify skills using a predefined keyword dictionary."""
    found_skills = []

    for skill in SKILL_KEYWORDS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, text, re.IGNORECASE):
            found_skills.append(skill)

    return found_skills


def _match_section_heading(line: str):
    """Identify and normalise a known resume section heading."""
    heading = re.sub(r"[:\s]+$", "", line).upper()

    for section_name, aliases in SECTION_ALIASES.items():
        if heading in aliases:
            return section_name

    return None


def extract_sections(text: str):
    """Divide resume text into recognised sections."""
    sections = {}
    current_section = None

    for raw_line in text.splitlines():
        line = raw_line.strip()

        if not line:
            continue

        matched_section = _match_section_heading(line)

        if matched_section:
            current_section = matched_section
            sections.setdefault(current_section, [])
            continue

        if current_section:
            cleaned = clean_line(line)

            if cleaned:
                sections[current_section].append(cleaned)

    return sections


def extract_skill_evidence(text: str):
    """
    Find the resume lines supporting each extracted skill.

    This identifies where a skill is mentioned. It does not
    independently verify the candidate's actual proficiency.
    """
    evidence_records = []
    seen_records = set()

    current_section = None

    evidence_type_map = {
        "skills": "skills_section",
        "projects": "project",
        "experience": "experience",
    }

    for raw_line in text.splitlines():
        line = clean_line(raw_line)

        if not line:
            continue

        matched_section = _match_section_heading(line)

        if matched_section:
            current_section = matched_section
            continue

        evidence_type = evidence_type_map.get(
            current_section,
            "other",
        )

        matched_skills = _find_skills_in_line(line)

        for skill in matched_skills:
            record_key = (
                skill.casefold(),
                evidence_type,
                line.casefold(),
            )

            # Prevent duplicate evidence records.
            if record_key in seen_records:
                continue

            seen_records.add(record_key)

            evidence_records.append(
                SkillEvidence(
                    skill=skill,
                    evidence_type=evidence_type,
                    evidence_text=line,
                )
            )

    return evidence_records


def extract_year(text: str):
    """Return the final year in a range."""
    years = re.findall(r"\b(?:19|20)\d{2}\b", text)

    return int(years[-1]) if years else None


def _split_entry_line(line: str):
    """Split a structured heading into its first two fields."""
    parts = re.split(
        r"\s+(?:\||—|–|-)\s+|\s+at\s+",
        line,
        maxsplit=1,
        flags=re.IGNORECASE,
    )

    return [
        part.strip(" ,|")
        for part in parts
        if part.strip(" ,|")
    ]


def extract_education(section_lines: list[str]):
    """Extract multiple education records."""
    entries = []
    current = []

    for line in section_lines:
        if not line:
            continue

        if EDUCATION_START.match(line):
            if current:
                entries.append(current)

            current = [line]

        elif current:
            current.append(line)

    if current:
        entries.append(current)

    education = []

    for lines in entries:
        first_line = lines[0]
        parts = _split_entry_line(first_line)

        degree = parts[0] if parts else first_line

        institution = parts[1] if len(parts) > 1 else None

        if institution:
            institution = re.split(
                r"\s+(?:\||—|–|-)\s+|\s{2,}",
                institution,
                maxsplit=1,
            )[0].strip(" ,")

        full_entry = " ".join(lines)

        if not institution:
            for extra_line in lines[1:]:
                candidate = extra_line.strip()

                if (
                    candidate
                    and not re.search(r"\b(?:19|20)\d{2}\b", candidate)
                    and not re.search(
                        r"\b(?:cgpa|gpa|grade|percentage)\b",
                        candidate,
                        re.IGNORECASE,
                    )
                    and re.search(r"[A-Za-z]", candidate)
                ):
                    institution = candidate
                    break

        education.append(
            Education(
                degree=degree or None,
                institution=institution or None,
                graduation_year=extract_year(full_entry),
            )
        )

    return education


def _is_date_line(line: str) -> bool:
    return bool(DATE_RANGE.search(line))


def extract_experience(section_lines: list[str]):
    """Extract multiple work experience entries."""
    experience = []
    current = None

    def save_current():
        if current and (
            current.get("job_title") or current.get("company")
        ):
            experience.append(WorkExperience(**current))

    for line in section_lines:
        if not line:
            continue

        if _is_date_line(line):
            if current:
                current["duration"] = line
            continue

        parts = _split_entry_line(line)

        is_header = len(parts) >= 2 and len(parts[0]) <= 100

        if is_header:
            save_current()

            current = {
                "job_title": parts[0],
                "company": parts[1],
                "duration": None,
                "description": "",
            }

        elif current:
            current["description"] = (
                f'{current["description"]} {line}'.strip()
            )

    save_current()

    return experience


def extract_projects(section_lines: list[str]):
    """Extract multiple projects and their technologies."""
    projects = []
    current = None

    def save_current():
        if current and current.get("name"):
            projects.append(Project(**current))

    for line in section_lines:
        if not line:
            continue

        parts = _split_entry_line(line)

        is_header = len(parts) >= 2 and len(parts[0]) <= 100

        if line.lower().startswith("project:"):
            remainder = line.split(":", 1)[1].strip()
            parts = [remainder]
            is_header = True

        if is_header:
            save_current()

            tech_text = parts[1] if len(parts) > 1 else ""

            technologies = [
                item.strip()
                for item in re.split(r"[,;+]", tech_text)
                if item.strip()
            ]

            current = {
                "name": parts[0],
                "description": "",
                "technologies": technologies,
            }

        elif current:
            current["description"] = (
                f'{current["description"]} {line}'.strip()
            )

    save_current()

    return projects


def extract_certifications(section_lines: list[str]):
    """Extract certifications and issuing organisations."""
    certifications = []

    for line in section_lines:
        if not line:
            continue

        parts = _split_entry_line(line)

        certifications.append(
            Certification(
                name=parts[0] if parts else line,
                issuing_organization=(
                    parts[1] if len(parts) > 1 else None
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
        skill_evidence=extract_skill_evidence(text),
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
