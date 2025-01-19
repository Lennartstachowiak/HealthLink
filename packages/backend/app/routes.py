from fastapi import APIRouter, status
from app.schemas import ChatRequest
from fastapi.responses import JSONResponse
from app.services import get_message_response
from app.results import results

router = APIRouter()


@router.get("/")
async def index():
    return "connected"


@router.get("/get_results")
async def get_patient():
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"data": results}
    )


@router.post("/send_message")
async def send_message(chat_request: ChatRequest):
    response = get_message_response(chat_request)
    return JSONResponse(
        status_code=status.HTTP_200_OK,
        content={"data": response}
    )
