import { useEffect, useState } from "react";
import { HotelType } from "../../../backend/src/shared/types";
import { useSearchContext } from "../contexts/SearchContext";


type Props = {
    hotel: HotelType;
};


const calculateStayDuration = (checkInDate: Date, checkOutDate: Date): number => {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
    const durationInMilliseconds = checkOutDate.getTime() - checkInDate.getTime();
    const durationInDays = durationInMilliseconds / millisecondsPerDay;

    return Math.ceil(durationInDays); // Round up to ensure partial days count as full days
};

const BookingCard = ({hotel}: Props) => {
    const search = useSearchContext();
    const [numberOfNights, setNumberOfNights] = useState<number>(0);

    
    useEffect(() => {
        if(search.checkIn && search.checkOut)
        {
            const nights = calculateStayDuration(search.checkIn, search.checkOut)
            setNumberOfNights(nights);
        }
    }, [search.checkIn, search.checkOut]);

    return(
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2">
                Location:
                <div className="font-bold">
                    {`${hotel.name}, ${hotel.city}, ${hotel.country}`}
                </div>
            </div>
            <div className="flex justify-between">
                <div>
                    Check-in:
                    <div className="font-bold">
                        {search.checkIn.toDateString()}
                    </div>
                </div>
                <div>
                    Check-out:
                    <div className="font-bold">
                        {search.checkOut.toDateString()}
                    </div>
                </div>
            </div>
            <div className="border-t border-b py-2">
                Total length of stay:
                <div className="font-bold">
                    {numberOfNights} nights
                </div>
            </div>
            <div>
                Guests:
                <div className="font-bold">{`${search.adultCount} adults, ${search.childCount} children`} </div>
            </div>
            
                 {/* 
                    
                </label>
               <label className="border-b border-gray-300 text-gray-700 text-sm flex-1">
                    Total length of stay:
                    <div className="font-bold">
                        {numberOfNights}
                    </div>
                </label>
                <label className="border-b border-gray-300 p-3 text-gray-700 text-sm flex-1">
                    Guests:
                    <div className="font-bold">{search.adultCount+search.childCount} </div>
                </label> */}
        </div>
    )   
};

export default BookingCard;