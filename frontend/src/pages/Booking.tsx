import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import BookingCard from "../components/BookingCard";
import { useSearchContext } from "../contexts/SearchContext";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
    const {stripePromise} = useAppContext();
    const search = useSearchContext();
    const [numberOfNights, setNumberOfNights] = useState<number>(0);
    const { hotelId } = useParams<{ hotelId: string }>();

    useEffect(() => {
        if(search.checkIn && search.checkOut)
        {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
            (1000 * 60 * 60 * 24);

            setNumberOfNights(Math.ceil(nights));
        }
    },[search.checkIn, search.checkOut]);

    const {data: currentUser} = useQuery(
        "fetchCurrentUser",
        apiClient.fetchCurrentUser
    );

    const {data: paymentIntentData} = useQuery("createPaymentIntent", () => 
        apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()),
        {
            enabled: !!hotelId && numberOfNights > 0,
        });
    
    const { data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId || ""))

    if(!hotel)
    {
        return <></>;
    }
    return (
        <div className="grid md:grid-cols-[1fr_2fr]">
            <BookingCard hotel={hotel}/>
            
            {currentUser && paymentIntentData && (
                <Elements stripe={stripePromise} options={{
                    clientSecret: paymentIntentData.clientSecret,
                }}>
                    <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
                </Elements>
                )}
        </div>
    );
};
export default Booking;