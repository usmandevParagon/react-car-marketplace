import {useState, useMemo, useReducer} from "react";
import { cars, makes, cities, bodyTypes, fuelTypes, transmissions, colors, years } from "./data/cars";
import CarCard from "./components/CarCard.jsx";

const formatPrice = (p) => (
    p >= 10000000
        ? `${(p / 10000000).toFixed(2)} Crore`
        : `${(p / 100000).toFixed(1)} Lac`
)

const initialState = {
  cities: [],
  transmissions: []
};

const ACTIONS = {
  SELECT_CITY: 'select_city',
  SELECT_TRANSMISSION: 'select_transmission',
  SELECT_RESET: 'reset'
}

function reducer (state, action) {
  switch (action.type){
    case ACTIONS.SELECT_CITY:
      return {
        ...state,
        cities: state.cities.includes(action.payload) ? state.cities.filter(c => c !== action.payload) : [...state.cities, action.payload]
      }
    case ACTIONS.SELECT_TRANSMISSION:
      return {
        ...state,
        transmissions: state.transmissions.includes(action.payload) ? state.transmissions.filter(t => t!==action.payload) : [...state.transmissions, action.payload]
      }
    case ACTIONS.SELECT_RESET:
      return initialState
  }
}
export default function App() {

  const [keyword, setKeyword] = useState("")
  const [sidebarKeyword, setSidebarKeyword] = useState("")
  const [state, dispatch] = useReducer(reducer, initialState)

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

    if (state.cities.length > 0 && !state.cities.includes(car.city)) {
      return false
    }
    if(state.transmissions.length > 0 && !state.transmissions.includes(car.transmission)) {
      return false
    }

    return true;
  });
  // const numberOfCars = filteredCars.filter(car){
  //
  // }
  console.log(filteredCars)
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
            <div>
              {state.cities.map((city, index) =>
                <div key={index} className={`bg-gray-100 space-x-1 w-fit`}>
                  <span>{city}</span>
                  <span onClick={() => dispatch({type: ACTIONS.SELECT_CITY, payload: city})}>X</span>
                </div>
              )}
              {state.transmissions.map((transmission, index) =>
                  <div key={index} className={`bg-gray-100 space-x-1 w-fit`}>
                    <span>{transmission}</span>
                    <span onClick={() => dispatch({type: ACTIONS.SELECT_TRANSMISSION, payload: transmission})}>X</span>
                  </div>
              )}
              {
                (state.transmissions.length > 0 || state.cities.length > 0) &&
                  <span className={`text-blue-500 underline`} onClick={()=> dispatch({type:ACTIONS.SELECT_RESET})}>Clear all</span>
              }

            </div>
            <input
                type="text"
                placeholder="Search by keywords"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm"
                value={sidebarKeyword}
                onChange={(e)=>setSidebarKeyword(e.target.value)}
            />

            <label>
              Select City
            </label>
            {cities.map((city, index) =>
                <div key={index}>
                  <div key={index}>
                    <input type={`checkbox`} value={city} checked={state.cities.includes(city)} onChange={e => dispatch({type: ACTIONS.SELECT_CITY, payload: e.target.value})} />
                    <label>{city}</label>
                  </div>
                  <span>{cars.filter(car => car.city === city).length}</span>
                </div>
            )}


            <label>
              Transmission
            </label>
            {transmissions.map((transmission, index) =>
              <div key={index}>
                <input type={`checkbox`} value={transmission} checked={state.transmissions.includes(transmission)} onChange={e => dispatch({type: ACTIONS.SELECT_TRANSMISSION, payload: e.target.value})}/>
                <label>{transmission}</label>
              </div>
            )}




            {/*<div>*/}
            {/*  <h3 className="text-sm font-semibold mb-2">Price</h3>*/}
            {/*  <input type="range" className="w-full" />*/}
            {/*</div>*/}

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
                <CarCard  key={car.id} car={car} formatPrice={formatPrice}/>
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