import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext"
import * as apiClient from "../api-client"
import { useState } from "react";
import SearchResultCard from "../components/SearchResultCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypeFilter from "../components/HotelTypeFilter";
import HotelFacilityFilter from "../components/HotelFacilityFilter";
import MaxPriceFilter from "../components/MaxPriceFilter";

const Search = () => {
    const search = useSearchContext();
    const[page, setPage] = useState<Number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const[selectedSortOption, setSelectedSortOption] = useState<string>("");


    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption: selectedSortOption,
    }

    const {data: hotelData} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams))

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
    
        setSelectedStars((prevStars) =>
          event.target.checked
            ? [...prevStars, starRating]
            : prevStars.filter((star) => star !== starRating)
        );
    };

    const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newType = event.target.value;

        setSelectedHotelTypes((prevTypes) =>
                event.target.checked
                ? [...prevTypes, newType]
                : prevTypes.filter((type) => type !== newType)
            );
    };

    const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newFacility = event.target.value;

        setSelectedFacilities((prevFacilities) =>
            event.target.checked
            ? [...prevFacilities, newFacility]
            : prevFacilities.filter((facility) => facility !== newFacility)
        );
    };

    const handleMaxPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newPrice = parseInt(event.target.value);

        setSelectedPrice( isNaN(newPrice) ? undefined : newPrice);
    };

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />

                    <HotelTypeFilter
                        selectedHotelTypes={selectedHotelTypes}
                        onChange={handleTypeChange}
                    />

                    <HotelFacilityFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilityChange}
                    />

                    <MaxPriceFilter onChange={handleMaxPriceChange}/>
                </div>
            </div>
            <div className="flex flex-col gap-5"> 
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ""}
                    </span>

                    <span>
                        <select
                             onChange={(event) => setSelectedSortOption(event.target.value.toString())}
                             className="p-2 border rounded-md w-full"
                        >
                            <option value="">
                                Sort By
                            </option>

                            <option value="starRating">
                                Star Rating
                            </option>

                            <option value="pricePerNightAsc">
                                Price Per Night(low to high)
                            </option>

                            <option value="pricePerNightDesc">
                                Price Per Night(high to low)   
                            </option>
                        </select>
                    </span>
                </div>
                {hotelData?.data.map((hotel, index) => (
                    <SearchResultCard key={index} hotel={hotel}/>
                ))}

                <div>
                    <Pagination 
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
            
        </div>
    )
}

export default Search;