'use client';

export function DashboardHeader() {
  return (
    <header className="bg-white shadow">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">대시보드</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 