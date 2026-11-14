
from fastapi import APIRouter

from app.schemas.matching import MatchRequest, MatchResult
from app.services.matching_engine import calculate_match

router = APIRouter(
    prefix="/matching",
    tags=["Matching"],
)


@router.post("/score", response_model=MatchResult)
def score_candidate(request: MatchRequest):
    """
    Compare a candidate's resume against job requirements
    and return a structured matching result.
    """

    result = calculate_match(
        candidate=request.candidate,
        job=request.job,
    )

    return result
