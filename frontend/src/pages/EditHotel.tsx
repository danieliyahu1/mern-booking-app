import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";


const EditHotel = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();

    const { hotelId } = useParams<{ hotelId: string }>();
    const { data: hotel } = useQuery(
        ['fetchMyHotelById', hotelId],
        () => apiClient.fetchMyHotelById(hotelId || ''),
        {
            enabled: !!hotelId, // Only fetch if ID exists
        }
    );

    const {mutate, isLoading} = useMutation(apiClient.editMyHotel, {
        onSuccess: async () => {
            showToast({message: "Hotel Edited!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    })

    const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData)
    }
    
    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={hotel}/>)
}

export default EditHotel;