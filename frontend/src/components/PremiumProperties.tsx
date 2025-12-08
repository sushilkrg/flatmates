import React from "react";

const PremiumProperties = () => {
  return (
    <section className=" bg-white">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center pt-16 pb-40 px-8 md:px-20 bg-white">
        <div className="md:w-1/2  text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Are you looking for <br /> Premium Properties?
          </h2>
          <p className="mt-4 text-gray-600">
            View and book your appointment with our partners.
          </p>
          <button className="mt-6 bg-green-500 text-white py-3 px-6 rounded-md shadow-md hover:bg-green-600">
            View Properties &gt;
          </button>
        </div>

        <div className="relative mt-8 -ml-24 pb-20 md:mt-[-120px] md:w-1/2 flex justify-center">
          <div className="absolute w-40 h-40 md:w-64 md:h-64 bg-white border-2 border-gray-200 rounded-lg shadow-lg transform rotate-6">
            <img
              src="https://plus.unsplash.com/premium_photo-1675616563084-63d1f129623d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
              alt="Property 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="absolute w-40 h-40 md:w-64 md:h-64 bg-white border-2 border-gray-200 rounded-lg shadow-lg transform -rotate-6 top-12 left-12">
            <img
              src="https://images.unsplash.com/photo-1667125095636-dce94dcbdd96?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWwlMjByb29tfGVufDB8fDB8fHww"
              alt="Property 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumProperties;
