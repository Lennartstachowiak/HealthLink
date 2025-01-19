interface StatusChipProps {
  status: string;
}

export default function StatusChip(props: StatusChipProps) {
  const { status } = props;
  const getStatusColor = (value: string) => {
    switch (value.toLowerCase()) {
      case "normal":
        return "bg-green-50 text-green-600";
      case "high":
        return "bg-orange-50 text-orange-600";
      case "low":
        return "bg-orange-50 text-orange-600";
      default:
        return "bg-gray-50 text-gray-600";
    }
  };
  return (
    <span
      className={`text-sm drop-shadow-none px-2 py-1 rounded-2xl ${getStatusColor(
        status
      )} `}
    >
      {status}
    </span>
  );
}
