type LoadingSpinnerProps = {
  message: string;
};

export default function LoadingSpinner({
  message,
}: LoadingSpinnerProps) {
  return (
    <div className="mt-8 flex flex-col items-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />

      <p className="mt-4 text-lg font-medium text-gray-700">
        {message}
      </p>
    </div>
  );
}