type StatusCardProps = {
  status: string;
};

export default function StatusCard({ status }: StatusCardProps) {
  return (
    <div className="mt-8 w-full max-w-3xl rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="text-xl font-bold">Processing Status</h2>

      <p className="mt-4 text-lg text-blue-600">
        {status}
      </p>
    </div>
  );
}