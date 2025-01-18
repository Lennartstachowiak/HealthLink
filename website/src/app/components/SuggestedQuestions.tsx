export function SuggestedQuestions() {
  const questions = [
    "What does my elevated white blood cell count of 11.2 K/µL indicate?",
    "Is my hemoglobin level of 14.2 g/dL within normal range?",
    "What lifestyle changes could help improve these results?",
  ];

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto px-4">
      {questions.map((question, index) => (
        <button
          key={index}
          className="shrink-0 rounded-full border bg-white px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          {question}
        </button>
      ))}
    </div>
  );
}
