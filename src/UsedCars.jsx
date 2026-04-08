import { useState, useMemo } from "react";
import { cars, makes, cities, bodyTypes, fuelTypes, transmissions, years } from "./data/cars";

// ─── Utility ────────────────────────────────────────────────────────────────
const formatPrice = (p) =>
    p >= 10000000
        ? `${(p / 10000000).toFixed(2)} Crore`
        : `${(p / 100000).toFixed(0)} Lac`;

const formatMileage = (m) => m.toLocaleString() + " km";

const timeAgo = (days) => {
    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    return `${days} days ago`;
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Badge({ children, color = "gray" }) {
    const map = {
        green: "bg-emerald-100 text-emerald-700",
        blue: "bg-blue-100 text-blue-700",
        amber: "bg-amber-100 text-amber-800",
        gray: "bg-gray-100 text-gray-600",
        red: "bg-red-100 text-red-700",
    };
    return (
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[color]}`}>
      {children}
    </span>
    );
}

function FuelIcon({ type }) {
    const icons = { Petrol: "⛽", Diesel: "🛢️", Hybrid: "🔋", Electric: "⚡", CNG: "🟢" };
    return <span className="text-xs">{icons[type] || "⛽"}</span>;
}

// ── Card: Grid view ──────────────────────────────────────────────────────────
function CarCardGrid({ car }) {
    const [saved, setSaved] = useState(false);
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 group">
            <div className="relative overflow-hidden">
                <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=280&fit=crop"; }}
                />
                <button
                    onClick={() => setSaved(!saved)}
                    className={`absolute top-2 right-2 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center transition-colors ${saved ? "text-red-500" : "text-gray-400 hover:text-red-400"}`}
                >
                    <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </button>
                {car.featured && (
                    <div className="absolute top-2 left-2">
                        <Badge color="amber">Featured</Badge>
                    </div>
                )}
                {car.certified && (
                    <div className={`absolute ${car.featured ? "top-8 left-2 mt-1" : "top-2 left-2"}`}>
                        <Badge color="green">✓ Certified</Badge>
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-1 truncate">{car.title}</h3>
                <p className="text-green-600 font-bold text-lg mb-2">PKR {formatPrice(car.price)}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1">📅 {car.year}</span>
                    <span className="flex items-center gap-1">📍 {car.city}</span>
                    <span className="flex items-center gap-1">🛣️ {formatMileage(car.mileage)}</span>
                    <span className="flex items-center gap-1"><FuelIcon type={car.fuelType} /> {car.fuelType}</span>
                    <span className="flex items-center gap-1">⚙️ {car.transmission}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                    <span className="text-xs text-gray-400">{timeAgo(car.postedDays)}</span>
                    <span className="text-xs text-gray-400">{car.seller}</span>
                </div>
            </div>
        </div>
    );
}

// ── Card: List view ──────────────────────────────────────────────────────────
function CarCardList({ car }) {
    const [saved, setSaved] = useState(false);
    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-200 flex">
            <div className="relative w-52 flex-shrink-0 overflow-hidden">
                <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-full object-cover"
                    style={{ minHeight: "140px" }}
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&h=280&fit=crop"; }}
                />
                {car.featured && (
                    <div className="absolute top-2 left-2">
                        <Badge color="amber">Featured</Badge>
                    </div>
                )}
            </div>
            <div className="flex-1 p-4 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-gray-900 text-base leading-tight">{car.title}</h3>
                        <button
                            onClick={() => setSaved(!saved)}
                            className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${saved ? "text-red-500 border-red-200" : "text-gray-400 border-gray-200 hover:text-red-400"}`}
                        >
                            <svg className="w-4 h-4" fill={saved ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                    <p className="text-green-600 font-bold text-xl mt-1 mb-2">PKR {formatPrice(car.price)}</p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">📅 {car.year}</span>
                        <span className="flex items-center gap-1">🛣️ {formatMileage(car.mileage)}</span>
                        <span className="flex items-center gap-1"><FuelIcon type={car.fuelType} /> {car.fuelType}</span>
                        <span className="flex items-center gap-1">⚙️ {car.transmission}</span>
                        <span className="flex items-center gap-1">📍 {car.city}</span>
                    </div>
                    <p className="text-xs text-gray-400 line-clamp-1">{car.description}</p>
                </div>
                <div className="flex items-center justify-between mt-3">
                    <div className="flex gap-2">
                        {car.certified && <Badge color="green">✓ Certified</Badge>}
                        <Badge color="gray">{car.bodyType}</Badge>
                    </div>
                    <span className="text-xs text-gray-400">{timeAgo(car.postedDays)} · {car.seller}</span>
                </div>
            </div>
        </div>
    );
}

// ── Sidebar filter section ───────────────────────────────────────────────────
function FilterSection({ title, children, defaultOpen = true }) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-100 py-4">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-full text-sm font-semibold text-gray-800 mb-1"
            >
                {title}
                <span className="text-gray-400 text-xs">{open ? "▲" : "▼"}</span>
            </button>
            {open && <div className="mt-3">{children}</div>}
        </div>
    );
}

function CheckboxGroup({ items, selected, onChange }) {
    return (
        <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
            {items.map((item) => (
                <label key={item} className="flex items-center gap-2 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={selected.includes(item)}
                        onChange={() =>
                            onChange(
                                selected.includes(item)
                                    ? selected.filter((s) => s !== item)
                                    : [...selected, item]
                            )
                        }
                        className="w-4 h-4 rounded border-gray-300 accent-green-500"
                    />
                    <span className="text-sm text-gray-600 group-hover:text-gray-900">{item}</span>
                </label>
            ))}
        </div>
    );
}

// ── Price range slider ────────────────────────────────────────────────────────
function PriceRange({ min, max, value, onChange }) {
    return (
        <div>
            <div className="flex justify-between text-xs text-gray-500 mb-3">
                <span>PKR {formatPrice(value[0])}</span>
                <span>PKR {formatPrice(value[1])}</span>
            </div>
            <div className="space-y-2">
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={100000}
                    value={value[0]}
                    onChange={(e) => onChange([Math.min(+e.target.value, value[1] - 100000), value[1]])}
                    className="w-full accent-green-500"
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={100000}
                    value={value[1]}
                    onChange={(e) => onChange([value[0], Math.max(+e.target.value, value[0] + 100000)])}
                    className="w-full accent-green-500"
                />
            </div>
        </div>
    );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const ITEMS_PER_PAGE = 12;
const SORT_OPTIONS = [
    { value: "featured", label: "Featured First" },
    { value: "price_asc", label: "Price: Low to High" },
    { value: "price_desc", label: "Price: High to Low" },
    { value: "year_desc", label: "Year: Newest First" },
    { value: "year_asc", label: "Year: Oldest First" },
    { value: "mileage_asc", label: "Mileage: Low to High" },
    { value: "newest", label: "Recently Added" },
];

export default function App() {
    // View
    const [view, setView] = useState("grid");
    const [sortBy, setSortBy] = useState("featured");
    const [page, setPage] = useState(1);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Filters
    const [selectedMakes, setSelectedMakes] = useState([]);
    const [selectedCities, setSelectedCities] = useState([]);
    const [selectedBodyTypes, setSelectedBodyTypes] = useState([]);
    const [selectedFuels, setSelectedFuels] = useState([]);
    const [selectedTransmissions, setSelectedTransmissions] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 30000000]);
    const [yearRange, setYearRange] = useState([2005, 2024]);
    const [mileageMax, setMileageMax] = useState(200000);
    const [certifiedOnly, setCertifiedOnly] = useState(false);
    const [keyword, setKeyword] = useState("");

    const clearAll = () => {
        setSelectedMakes([]);
        setSelectedCities([]);
        setSelectedBodyTypes([]);
        setSelectedFuels([]);
        setSelectedTransmissions([]);
        setPriceRange([0, 30000000]);
        setYearRange([2005, 2024]);
        setMileageMax(200000);
        setCertifiedOnly(false);
        setKeyword("");
        setPage(1);
    };

    const activeFilterCount =
        selectedMakes.length +
        selectedCities.length +
        selectedBodyTypes.length +
        selectedFuels.length +
        selectedTransmissions.length +
        (certifiedOnly ? 1 : 0);

    // Apply filters + sort
    const filtered = useMemo(() => {
        let result = cars.filter((c) => {
            if (keyword && !c.title.toLowerCase().includes(keyword.toLowerCase()) && !c.make.toLowerCase().includes(keyword.toLowerCase())) return false;
            if (selectedMakes.length && !selectedMakes.includes(c.make)) return false;
            if (selectedCities.length && !selectedCities.includes(c.city)) return false;
            if (selectedBodyTypes.length && !selectedBodyTypes.includes(c.bodyType)) return false;
            if (selectedFuels.length && !selectedFuels.includes(c.fuelType)) return false;
            if (selectedTransmissions.length && !selectedTransmissions.includes(c.transmission)) return false;
            if (c.price < priceRange[0] || c.price > priceRange[1]) return false;
            if (c.year < yearRange[0] || c.year > yearRange[1]) return false;
            if (c.mileage > mileageMax) return false;
            if (certifiedOnly && !c.certified) return false;
            return true;
        });

        return result.sort((a, b) => {
            switch (sortBy) {
                case "featured": return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
                case "price_asc": return a.price - b.price;
                case "price_desc": return b.price - a.price;
                case "year_desc": return b.year - a.year;
                case "year_asc": return a.year - b.year;
                case "mileage_asc": return a.mileage - b.mileage;
                case "newest": return a.postedDays - b.postedDays;
                default: return 0;
            }
        });
    }, [selectedMakes, selectedCities, selectedBodyTypes, selectedFuels, selectedTransmissions, priceRange, yearRange, mileageMax, certifiedOnly, keyword, sortBy]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    const goToPage = (p) => {
        setPage(p);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Sidebar JSX (shared between desktop + mobile drawer)
    const SidebarContent = (
        <div className="text-sm">
            {/* Keyword */}
            <div className="pb-4 border-b border-gray-100">
                <input
                    type="text"
                    placeholder="Search make, model..."
                    value={keyword}
                    onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                />
            </div>

            <FilterSection title="Make / Brand">
                <CheckboxGroup items={makes} selected={selectedMakes} onChange={(v) => { setSelectedMakes(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="City / Location">
                <CheckboxGroup items={cities} selected={selectedCities} onChange={(v) => { setSelectedCities(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="Price Range">
                <PriceRange min={0} max={30000000} value={priceRange} onChange={(v) => { setPriceRange(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="Body Type">
                <CheckboxGroup items={bodyTypes} selected={selectedBodyTypes} onChange={(v) => { setSelectedBodyTypes(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="Fuel Type">
                <CheckboxGroup items={fuelTypes} selected={selectedFuels} onChange={(v) => { setSelectedFuels(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="Transmission">
                <CheckboxGroup items={transmissions} selected={selectedTransmissions} onChange={(v) => { setSelectedTransmissions(v); setPage(1); }} />
            </FilterSection>

            <FilterSection title="Year">
                <div className="flex gap-2">
                    <select
                        value={yearRange[0]}
                        onChange={(e) => { setYearRange([+e.target.value, yearRange[1]]); setPage(1); }}
                        className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        {years.slice().reverse().map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                    <span className="self-center text-gray-400 text-xs">to</span>
                    <select
                        value={yearRange[1]}
                        onChange={(e) => { setYearRange([yearRange[0], +e.target.value]); setPage(1); }}
                        className="flex-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                        {years.map((y) => <option key={y} value={y}>{y}</option>)}
                    </select>
                </div>
            </FilterSection>

            <FilterSection title="Max Mileage">
                <div>
                    <div className="text-xs text-gray-500 mb-2">Up to {formatMileage(mileageMax)}</div>
                    <input
                        type="range"
                        min={0}
                        max={200000}
                        step={5000}
                        value={mileageMax}
                        onChange={(e) => { setMileageMax(+e.target.value); setPage(1); }}
                        className="w-full accent-green-500"
                    />
                </div>
            </FilterSection>

            <FilterSection title="Other" defaultOpen={false}>
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={certifiedOnly}
                        onChange={(e) => { setCertifiedOnly(e.target.checked); setPage(1); }}
                        className="w-4 h-4 rounded border-gray-300 accent-green-500"
                    />
                    <span className="text-sm text-gray-600">PakWheels Certified Only</span>
                </label>
            </FilterSection>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            {/* ── Top Nav ── */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="bg-green-600 text-white font-bold text-lg px-3 py-1 rounded-lg tracking-tight">PW</div>
                        <span className="font-bold text-gray-800 text-lg hidden sm:block">CarMarket</span>
                    </div>
                    <div className="flex-1 max-w-lg hidden md:block">
                        <input
                            type="text"
                            placeholder="Search for cars (e.g. Toyota Corolla 2021)"
                            value={keyword}
                            onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                            className="w-full border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                        />
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <button className="hover:text-green-600 transition-colors hidden sm:block">Sign In</button>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-medium transition-colors">Post Ad</button>
                    </div>
                </div>
            </header>

            {/* ── Breadcrumb ── */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 py-2 text-xs text-gray-400 flex items-center gap-1">
                    <span className="hover:text-green-600 cursor-pointer">Home</span>
                    <span>/</span>
                    <span className="hover:text-green-600 cursor-pointer">Used Cars</span>
                    <span>/</span>
                    <span className="text-gray-600">All Used Cars</span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex gap-6">
                    {/* ── Sidebar (Desktop) ── */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-20">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-bold text-gray-800">Filters</h2>
                                {activeFilterCount > 0 && (
                                    <button onClick={clearAll} className="text-xs text-green-600 hover:underline">
                                        Clear all ({activeFilterCount})
                                    </button>
                                )}
                            </div>
                            {SidebarContent}
                        </div>
                    </aside>

                    {/* ── Main Content ── */}
                    <main className="flex-1 min-w-0">
                        {/* Results header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                            <div>
                                <h1 className="text-lg font-bold text-gray-900">Used Cars for Sale</h1>
                                <p className="text-sm text-gray-500">
                                    {filtered.length} results found
                                    {activeFilterCount > 0 ? ` with ${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""}` : ""}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Mobile filter toggle */}
                                <button
                                    onClick={() => setMobileFiltersOpen(true)}
                                    className="lg:hidden flex items-center gap-1.5 border border-gray-200 bg-white rounded-full px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                                    </svg>
                                    Filters {activeFilterCount > 0 && <span className="bg-green-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">{activeFilterCount}</span>}
                                </button>

                                {/* Sort */}
                                <select
                                    value={sortBy}
                                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                                    className="border border-gray-200 bg-white rounded-full px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                                >
                                    {SORT_OPTIONS.map((o) => (
                                        <option key={o.value} value={o.value}>{o.label}</option>
                                    ))}
                                </select>

                                {/* Grid / List toggle */}
                                <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                                    <button
                                        onClick={() => setView("grid")}
                                        className={`px-3 py-1.5 transition-colors ${view === "grid" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                                        title="Grid view"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => setView("list")}
                                        className={`px-3 py-1.5 transition-colors ${view === "list" ? "bg-green-600 text-white" : "text-gray-500 hover:bg-gray-50"}`}
                                        title="List view"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M3 4h18v2H3zm0 7h18v2H3zm0 7h18v2H3z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Active filter chips */}
                        {activeFilterCount > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {selectedMakes.map((m) => (
                                    <span key={m} className="flex items-center gap-1 bg-green-50 text-green-700 border border-green-200 text-xs rounded-full px-2.5 py-1">
                    {m}
                                        <button onClick={() => setSelectedMakes(selectedMakes.filter((x) => x !== m))} className="hover:text-red-500">×</button>
                  </span>
                                ))}
                                {selectedCities.map((c) => (
                                    <span key={c} className="flex items-center gap-1 bg-blue-50 text-blue-700 border border-blue-200 text-xs rounded-full px-2.5 py-1">
                    {c}
                                        <button onClick={() => setSelectedCities(selectedCities.filter((x) => x !== c))} className="hover:text-red-500">×</button>
                  </span>
                                ))}
                                {selectedBodyTypes.map((b) => (
                                    <span key={b} className="flex items-center gap-1 bg-purple-50 text-purple-700 border border-purple-200 text-xs rounded-full px-2.5 py-1">
                    {b}
                                        <button onClick={() => setSelectedBodyTypes(selectedBodyTypes.filter((x) => x !== b))} className="hover:text-red-500">×</button>
                  </span>
                                ))}
                                {selectedFuels.map((f) => (
                                    <span key={f} className="flex items-center gap-1 bg-amber-50 text-amber-700 border border-amber-200 text-xs rounded-full px-2.5 py-1">
                    {f}
                                        <button onClick={() => setSelectedFuels(selectedFuels.filter((x) => x !== f))} className="hover:text-red-500">×</button>
                  </span>
                                ))}
                                {certifiedOnly && (
                                    <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs rounded-full px-2.5 py-1">
                    Certified Only
                    <button onClick={() => setCertifiedOnly(false)} className="hover:text-red-500">×</button>
                  </span>
                                )}
                                <button onClick={clearAll} className="text-xs text-gray-400 hover:text-red-500 underline">Clear all</button>
                            </div>
                        )}

                        {/* Car cards */}
                        {paginated.length === 0 ? (
                            <div className="bg-white border border-gray-200 rounded-xl p-16 text-center">
                                <div className="text-5xl mb-4">🚗</div>
                                <h3 className="font-semibold text-gray-700 mb-2">No cars found</h3>
                                <p className="text-sm text-gray-400 mb-4">Try adjusting your filters or search terms.</p>
                                <button onClick={clearAll} className="bg-green-600 text-white px-4 py-2 rounded-full text-sm hover:bg-green-700">Clear all filters</button>
                            </div>
                        ) : view === "grid" ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                                {paginated.map((car) => <CarCardGrid key={car.id} car={car} />)}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-4">
                                {paginated.map((car) => <CarCardList key={car.id} car={car} />)}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-1 mt-8">
                                <button
                                    onClick={() => goToPage(page - 1)}
                                    disabled={page === 1}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
                                >
                                    ← Prev
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                                    if (p === 1 || p === totalPages || (p >= page - 1 && p <= page + 1)) {
                                        return (
                                            <button
                                                key={p}
                                                onClick={() => goToPage(p)}
                                                className={`w-9 h-9 rounded-lg text-sm transition-colors ${p === page ? "bg-green-600 text-white font-semibold" : "border border-gray-200 hover:bg-gray-50"}`}
                                            >
                                                {p}
                                            </button>
                                        );
                                    }
                                    if (p === page - 2 || p === page + 2) return <span key={p} className="text-gray-400">...</span>;
                                    return null;
                                })}
                                <button
                                    onClick={() => goToPage(page + 1)}
                                    disabled={page === totalPages}
                                    className="px-3 py-2 border border-gray-200 rounded-lg text-sm disabled:opacity-30 hover:bg-gray-50 transition-colors"
                                >
                                    Next →
                                </button>
                            </div>
                        )}

                        {/* Results info */}
                        {filtered.length > 0 && (
                            <p className="text-center text-xs text-gray-400 mt-3">
                                Showing {(page - 1) * ITEMS_PER_PAGE + 1}–{Math.min(page * ITEMS_PER_PAGE, filtered.length)} of {filtered.length} results
                            </p>
                        )}
                    </main>
                </div>
            </div>

            {/* ── Mobile Filter Drawer ── */}
            {mobileFiltersOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
                    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto">
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="font-bold text-gray-800">Filters {activeFilterCount > 0 && <span className="text-green-600">({activeFilterCount})</span>}</h2>
                            <div className="flex items-center gap-3">
                                {activeFilterCount > 0 && (
                                    <button onClick={clearAll} className="text-xs text-green-600 hover:underline">Clear all</button>
                                )}
                                <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-500 text-xl">&times;</button>
                            </div>
                        </div>
                        <div className="p-4">
                            {SidebarContent}
                        </div>
                        <div className="sticky bottom-0 p-4 bg-white border-t border-gray-100">
                            <button
                                onClick={() => setMobileFiltersOpen(false)}
                                className="w-full bg-green-600 text-white py-2.5 rounded-full font-medium text-sm hover:bg-green-700 transition-colors"
                            >
                                Show {filtered.length} Results
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}