import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";


export type Props = {
    hotel: HotelType;
};

const SearchResultCard = ({hotel} : Props) => {
    return (
        <div className="bg-neutral-50 grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-8 gap-8 ">
            <div className="w-full h-[300px]">
                <img
                     src={hotel.imageUrls[0]}
                     className="w-full h-full object-cover object-center"
                />
            </div>

            <div className="grid grid-rows-[1fr_2fr_1fr]">
                <div>
                    <div className="flex items-center">
                        <span className="flex">
                            {Array.from({length: hotel.starRating}).map((_, index)=> (
                                <AiFillStar key={index} className="fill-yellow-400"/>
                            ))}
                        </span>
                        <span className="ml-1 text-sm">
                            {hotel.type}
                        </span>
                    </div>
                    <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
                        {hotel.name}
                    </Link>
                </div>

                <div className="line-clamp-4">
                    {hotel.description}
                </div>

                <div>
                    <div className="flex justify-between items-center items-end whitespace-nowrap">
                        <span className="flex gap-1 items-center">
                            {hotel.facilities.slice(0, 3).map((facility, index)=> (
                                <span key={index} className="bg-slate-300 font-bold rounded p-2 text-xs whitespace-nowrap">
                                     {facility} 
                                </span>
                            ))}
                            {hotel.facilities.length > 3 && <span className="text-sm">+{hotel.facilities.length-3} more</span>}
                        </span>
                        <div className="flex flex-col items-end gap-1">
                            <span className="font-bold">
                                {hotel.pricePerNight}$ per night
                            </span>
                            <Link to={`/detail/${hotel._id}`} className="text-white bg-blue-600 h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500">
                                View More
                            </Link>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SearchResultCard;