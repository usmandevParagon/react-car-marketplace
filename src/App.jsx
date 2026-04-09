import { useState, useMemo } from "react";
import { cars, makes, cities, bodyTypes, fuelTypes, transmissions, years } from "./data/cars";

const formatPrice = (p) => (
    p >= 10000000
        ? `${(p / 10000000).toFixed(2)} Crore`
        : `${(p / 100000).toFixed(1)} Lac`
)


export default function App() {

  const [keyword, setKeyword] = useState("")
  const [sidebarKeyword, setSidebarKeyword] = useState("")

  const filteredCars = cars.filter((car) => {
    // Top search bar filter
    if (keyword && !car.title.toLowerCase().includes(keyword.toLowerCase())) {
      return false;
    }

    // Sidebar keyword filter
    if (sidebarKeyword) {
      const k = sidebarKeyword.toLowerCase();
      if (
          !car.title.toLowerCase().includes(k) &&
          !car.make.toLowerCase().includes(k) &&
          !car.city.toLowerCase().includes(k) &&
          !car.transmission.toLowerCase().includes(k) &&
          !car.color.toLowerCase().includes(k) &&
          !car.fuelType.toLowerCase().includes(k) &&
          !car.year.toString().includes(k)
      ) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-green-800 text-white font-bold text-lg px-3 py-1 rounded-lg">PW</div>
            <span className="font-bold text-gray-800 text-lg">CarMarket</span>
          </div>

          <input
              type="text"
              placeholder="Search for cars..."
              className="w-full max-w-md border border-gray-200 rounded-full px-4 py-2 text-sm"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value) }
          />

          <button className="bg-green-600 text-white px-4 py-1.5 rounded-full text-sm">
            Post Ad
          </button>
        </div>
      </header>

      {/* Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">

        {/* Sidebar */}
        <aside className="hidden lg:block w-64">
          <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-4">

            <h2 className="font-bold text-gray-800">Filters</h2>

            <input
                type="text"
                placeholder="Search by keywords"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={sidebarKeyword}
                onChange={(e)=>setSidebarKeyword(e.target.value)}
            />

            <div>
              <h3 className="text-sm font-semibold mb-2">Make</h3>
              <div className="space-y-2 text-sm">
                <label><input type="checkbox" /> Toyota</label>
                <label><input type="checkbox" /> Honda</label>
                <label><input type="checkbox" /> Suzuki</label>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Price</h3>
              <input type="range" className="w-full" />
            </div>

          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">

          {/* Top bar */}
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-lg font-bold">Used Cars</h1>

            <div className="flex gap-2">
              <select className="border rounded-full px-3 py-1.5 text-sm">
                <option>Sort</option>
              </select>

              <button className="px-3 py-1.5 border rounded-full">Grid</button>
              <button className="px-3 py-1.5 border rounded-full">List</button>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

            {/* Card */}
            {filteredCars.map((car) => (
                <div key={car.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  {car.featured &&
                      <span className={`p-1 bg-red-600 text-white absolute`}>Featured</span>
                  }

                  <img
                      src={car.image}
                      alt={`${car.title} image`}
                      className="w-full h-48 object-cover"/>

                  <div className="p-4">
                    <h3 className="font-semibold text-sm">{car.title}</h3>
                    <p className="text-green-600 font-bold text-lg">{formatPrice(car.price)}</p>

                    <div className="text-xs text-gray-500 flex flex-wrap gap-2 mt-2">
                      { [car.year, car.city, car.mileage, car.fuelType, car.transmission].map((item, index) => (
                          <span key={index} className={`bg-gray-100 px-2 py-1 rounded-full`}>{`${item}`}</span>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-gray-400 mt-3">
                      <span>Updated {`${car.postedDays}`} ago</span>
                      <span>{`${car.seller}`}</span>
                    </div>
                  </div>
                </div>
            ))}


          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button className="px-3 py-2 border rounded">Prev</button>
            <button className="px-3 py-2 border rounded bg-green-600 text-white">1</button>
            <button className="px-3 py-2 border rounded">2</button>
            <button className="px-3 py-2 border rounded">Next</button>
          </div>

        </main>
      </div>
    </div>
  );
}