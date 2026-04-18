export default function WarningBanner() {
  return (
    <div className="bg-red-100 border-b-4 border-red-400 px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-bold text-red-800 text-center">
                ⚠️ <strong>STUDENT PROJECT - DEMO ONLY</strong> ⚠️<br />
                This is a student project and is not affiliated with any real cryptocurrency platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}