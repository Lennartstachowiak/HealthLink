"use client";

interface SuggestedQuestionsProps {
  suggestedQuestions: string[];
}

export function SuggestedQuestions(props: SuggestedQuestionsProps) {
  const { suggestedQuestions } = props;

  return (
    <div className="mb-4 flex gap-2 overflow-x-auto px-4">
      {suggestedQuestions.map((question, index) => (
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
