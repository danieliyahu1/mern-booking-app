import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from './../api-client';
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {

    const {hotelId} = useParams<{ hotelId: string }>();

    const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId || ""), 
    {
        enabled: !!hotelId,
    });

    if(!hotel)
    {
        return <></>
    }

    return (
        <div className="space-y-6">
            <div >
                <span className="flex ">
                    {Array.from({length: hotel.starRating}).map((_, index)=> (
                        <AiFillStar key={index} className="fill-yellow-400"/>
                    ))}
                </span>
                <span className="text-2xl font-bold cursor-pointer">{hotel.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {hotel.imageUrls.map((url, index) => (
                    <div className="h-[300px]">
                        <img
                            key={index}
                            src={url}
                            alt={hotel.name}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    </div>
                ))}
            </div>

            <div>
                <span className="grid grid-cols-1 lg:grid-cols-3 gap-2">
                    {hotel.facilities.map((facility, index)=> (
                        <span key={index} className="bg-Stone-100 border border-slate-300 rounded-sm p-3">
                                {facility} 
                        </span>
                    ))}
                </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]">
                <div className="whitespace-pre-line">
                    {hotel.description}
                </div>
                <div className="h-fit">
                    <GuestInfoForm hotelId={hotel._id} pricePerNight={hotel.pricePerNight}/>                    
                </div>                
            </div>
                
        </div>
    )
}

export default Detail;