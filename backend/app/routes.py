from fastapi import APIRouter, HTTPException, status
from app.schemas import ChatRequest
from fastapi.responses import JSONResponse
from app.services import get_text

router = APIRouter()


@router.get("/")
async def index():
    return "connected"


@router.get("/get_patient")
async def get_patient():
    try:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"status": "success", "patient": "Erika"}
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )


@router.get("/get_patient_data")
async def get_patient_data():
    try:
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"status": "success", "data": "Healthy!"}
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )


@router.get("/get_patient_results")
async def get_patient_results():
    try:
        return {"status": "success", "data": "All good!"}
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )


@router.post("/chat")
async def chat(chat_request: ChatRequest):
    try:
        text = get_text(chat_request)
        return JSONResponse(
            status_code=status.HTTP_200_OK,
            content={"text": text}
        )
    except ValueError as error:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(error)
        )
    except Exception as error:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred."
        )
