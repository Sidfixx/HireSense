
from io import BytesIO

import fitz
from docx import Document


def extract_pdf_text(file_bytes: bytes) -> str:
    """Extract text from a PDF document."""

    try:
        with fitz.open(stream=file_bytes, filetype="pdf") as pdf:
            pages = [page.get_text() for page in pdf]

        return "\n".join(pages).strip()

    except Exception as exc:
        raise ValueError("Unable to read this PDF file.") from exc


def extract_docx_text(file_bytes: bytes) -> str:
    """Extract text from a DOCX document."""

    try:
        document = Document(BytesIO(file_bytes))

        paragraphs = [
            paragraph.text
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        ]

        for table in document.tables:
            for row in table.rows:
                for cell in row.cells:
                    if cell.text.strip():
                        paragraphs.append(cell.text)

        return "\n".join(paragraphs).strip()

    except Exception as exc:
        raise ValueError("Unable to read this DOCX file.") from exc


def extract_resume_text(file_bytes: bytes, filename: str) -> str:
    """Choose the appropriate parser based on file extension."""

    extension = filename.lower().rsplit(".", 1)[-1] if "." in filename else ""

    if extension == "pdf":
        return extract_pdf_text(file_bytes)

    if extension == "docx":
        return extract_docx_text(file_bytes)

    raise ValueError("Only PDF and DOCX files are supported.")
