

const CarCard = ({car, formatPrice}) => {
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
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
                    <span>Updated {`${car.postedDays}`} days ago</span>
                    <span>{`${car.seller}`}</span>
                </div>
            </div>
        </div>
    )
}
export default CarCard;