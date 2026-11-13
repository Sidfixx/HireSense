
from fastapi import APIRouter, UploadFile, File, HTTPException

from app.services.resume_parser import extract_resume_text
from app.services.structured_extractor import extract_resume_data

router = APIRouter(prefix="/resumes", tags=["Resumes"])

MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 MB


@router.post("/upload")
async def upload_resume(file: UploadFile = File(...)):
    """Upload a PDF or DOCX resume and extract structured information."""

    if not file.filename:
        raise HTTPException(status_code=400, detail="Filename is missing.")

    extension = (
        file.filename.lower().rsplit(".", 1)[-1]
        if "." in file.filename
        else ""
    )

    if extension not in {"pdf", "docx"}:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are supported.",
        )

    file_bytes = await file.read(MAX_FILE_SIZE + 1)

    if not file_bytes:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")

    if len(file_bytes) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="File size must not exceed 5 MB.",
        )

    if extension == "pdf" and not file_bytes.startswith(b"%PDF-"):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file does not appear to be a valid PDF.",
        )

    if extension == "docx" and not file_bytes.startswith(b"PK"):
        raise HTTPException(
            status_code=400,
            detail="The uploaded file does not appear to be a valid DOCX.",
        )

    try:
        # Stage 1: Extract raw text.
        extracted_text = extract_resume_text(file_bytes, file.filename)

        if not extracted_text:
            raise HTTPException(
                status_code=422,
                detail="No readable text found in the document.",
            )

        # Stage 2: Extract structured candidate information.
        structured_data = extract_resume_data(extracted_text)

        return {
            "filename": file.filename,
            "file_type": extension,
            "character_count": len(extracted_text),
            "extracted_text": extracted_text,
            "candidate_profile": structured_data.model_dump(mode="json"),
        }

    except HTTPException:
        raise

    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
