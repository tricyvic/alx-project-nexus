import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Section - Error Content */}
        <div className="text-center lg:text-left">
          <div className="mb-8">
            <h1 className="text-8xl font-bold text-amber-600 mb-4">
              <span className="text-orange-500">4</span>
              <span className="text-white">0</span>
              <span className="text-orange-500">4</span>
            </h1>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto lg:mx-0">
              The page you are looking for has been moved, removed, or renamed. 
              Don't worry, even the best timepieces sometimes need adjustment.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              href="/"
              className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors transform hover:scale-105 shadow-lg"
            >
              ← Go Home
            </Link>
            <Link 
              href="/products"
              className="border-2 border-amber-600 text-amber-600 px-8 py-4 rounded-lg font-semibold hover:bg-amber-600 hover:text-white transition-colors transform hover:scale-105"
            >
              Browse Watches
            </Link>
          </div>

          {/* Additional Help */}
          <div className="mt-12 text-center lg:text-left">
            <p className="text-sm text-gray-500 mb-4">Need help finding something?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/contact"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                Contact Support
              </Link>
              <Link 
                href="/about"
                className="text-amber-600 hover:text-amber-700 font-medium transition-colors"
              >
                About Us
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section - Visual */}
        <div className="relative">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-2xl">
            {/* Watch Illustration */}
            <div className="relative mx-auto w-64 h-64">
              {/* Watch Face */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full border-4 border-gray-600 shadow-inner">
                {/* Watch Hands */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Hour Hand */}
                  <div className="absolute w-1 h-16 bg-white rounded-full transform -translate-x-1/2 -translate-y-8 origin-bottom shadow-lg"></div>
                  {/* Minute Hand */}
                  <div className="absolute w-0.5 h-20 bg-white rounded-full transform -translate-x-1/2 -translate-y-10 origin-bottom shadow-lg"></div>
                  {/* Center Dot */}
                  <div className="absolute w-3 h-3 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                </div>
                
                {/* Hour Markers */}
                {[12, 3, 6, 9].map((hour, index) => (
                  <div
                    key={hour}
                    className="absolute w-2 h-2 bg-white rounded-full"
                    style={{
                      top: hour === 12 ? '8%' : hour === 6 ? '92%' : '50%',
                      left: hour === 3 ? '92%' : hour === 9 ? '8%' : '50%',
                      transform: hour === 12 || hour === 6 ? 'translateX(-50%)' : 'translateY(-50%)'
                    }}
                  />
                ))}
              </div>
              
              {/* Watch Band */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-48 h-8 bg-gradient-to-r from-amber-600 to-orange-500 rounded-lg shadow-lg"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-orange-400 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/4 -left-8 w-4 h-4 bg-yellow-400 rounded-full animate-pulse delay-500"></div>
          </div>

          {/* Background Pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-200 to-orange-200 rounded-2xl transform rotate-3 scale-105 -z-10 opacity-30"></div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center">
        <p className="text-sm text-gray-500">
          © 2024 WatchStore. All Rights Reserved | Design Inspired by Modern Timepieces
        </p>
      </div>
    </div>
  );
}
