from fastapi import APIRouter, status
from app.schemas import ChatRequest
from fastapi.responses import JSONResponse
from app.services import get_message_response
from app.results import results
import os
from getpass import getpass
from haystack_integrations.document_stores.weaviate import WeaviateDocumentStore, AuthApiKey
from haystack import Document
from haystack_integrations.components.embedders.mistral.document_embedder import MistralDocumentEmbedder

import os
from haystack_integrations.components.embedders.mistral.text_embedder import MistralTextEmbedder


WEAVIATE_API_KEY = os.getenv("WEAVIATE_API_KEY")
MISTRAL_API_KEY = os.getenv("MISTRAL_API_KEY")

auth_client_secret = AuthApiKey()

WEAVIATE_URL = os.getenv("WEAVIATE_URL")
document_store = WeaviateDocumentStore(url=WEAVIATE_URL,
                                       auth_client_secret=auth_client_secret)


def load_local_dataset(directory_path):
    documents = []
    for root, _, files in os.walk(directory_path):
        for file in files:
            if file.endswith(".txt") or file.endswith(".md"):
                with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                    content = f.read()
                documents.append(Document(content=content, meta={"filename": file}))
    return documents


# Load your dataset
local_dataset_path = "./processed_data/patient_1"
documents = load_local_dataset(local_dataset_path)

Mistral_doc_embedder = MistralDocumentEmbedder(model="mistral-embed")

embedder = MistralTextEmbedder(model="mistral-embed")

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
