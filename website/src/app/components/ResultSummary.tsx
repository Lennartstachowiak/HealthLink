interface ResultSummaryProps {
  summary: string;
}

const ResultSummary = (props: ResultSummaryProps) => {
  const { summary } = props;
  return (
    <div className="mb-6 rounded-lg bg-gray-50 p-6">
      <h4 className="mb-2 text-lg font-medium text-gray-900">Summary</h4>
      <p className="text-gray-700">{summary}</p>
    </div>
  );
};

export default ResultSummary;
