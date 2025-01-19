from app.schemas import ChatRequest


def get_message_response(chat_request: ChatRequest):
    message = chat_request.message
    result = chat_request.result
    return f"Thank you for your message. How can I assist you with your health results today? Is that you question: \"{message}\" regarind this topic \"{result.title}\""
