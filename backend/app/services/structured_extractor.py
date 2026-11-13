
import re

from app.schemas.resume import ResumeData


# Initial skill dictionary.
# We will expand this as HireSense develops.
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


def extract_email(text: str):
    """Find an email address in resume text."""

    match = re.search(
        r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
        text,
    )

    return match.group(0) if match else None


def extract_phone(text: str):
    """Find a possible phone number."""

    match = re.search(
        r"(?<!\w)(?:\+?\d{1,3}[-.\s]?)?"
        r"(?:\d[-.\s]?){9,12}\d(?!\w)",
        text,
    )

    return match.group(0).strip() if match else None


def extract_candidate_name(text: str):
    """
    Basic name extraction.
    Uses the first few non-empty lines as candidates.
    This is a heuristic, not guaranteed identification.
    """

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
    """Identify skills from the predefined skill dictionary."""

    normalized_text = text.lower()
    found_skills = []

    for skill in SKILL_KEYWORDS:
        pattern = r"(?<!\w)" + re.escape(skill) + r"(?!\w)"

        if re.search(pattern, normalized_text):
            found_skills.append(skill)

    return found_skills


def extract_resume_data(text: str) -> ResumeData:
    """Convert raw resume text into a structured profile."""

    return ResumeData(
        candidate_name=extract_candidate_name(text),
        email=extract_email(text),
        phone=extract_phone(text),
        skills=extract_skills(text),
    )
