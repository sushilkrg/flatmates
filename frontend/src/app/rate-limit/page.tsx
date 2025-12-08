export default function RateLimitPage() {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-red-600">Too Many Requests</h1>
        <p className="mt-4 text-gray-400">
          You have made too many requests in a short time.
          <br /> Please try again after few 10 - 15 minutes.
        </p>
      </div>
    </div>
  );
}
