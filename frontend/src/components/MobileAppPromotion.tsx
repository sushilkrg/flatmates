import React from "react";

const MobileAppPromotion = () => {
  return (
    <section className="bg-white">
      <div className="container mx-auto flex flex-col md:px-20 md:flex-row justify-between items-center py-12 px-4 bg-white">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Connect with us from anywhere
          </h2>
          <p className="mt-4 text-gray-600">
            Download the mobile app and enjoy the smoothest experience.
          </p>

          <div className="flex justify-center md:justify-start space-x-4 mt-6">
            <a
              href="#"
              target="_blank"
              className="border rounded-md hover:bg-slate-200"
            >
              <img
                src="https://www.flatmate.in/play-store.svg"
                alt="Google Play"
                className="h-12"
              />
            </a>
            <a
              href="#"
              target="_blank"
              className="border rounded-md hover:bg-slate-200"
            >
              <img
                src="https://www.flatmate.in/app-store.svg"
                alt="App Store"
                className="h-12"
              />
            </a>
          </div>
        </div>

        <div className="relative mt-8 md:mt-0 md:w-1/2 flex justify-center">
          <div className="relative">
            <img
              src="https://www.flatmate.in/_next/image?url=%2Fflamate-app-image.png&w=1920&q=75"
              alt="Mobile App"
              className="w-40 md:w-64"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppPromotion;
