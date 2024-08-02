import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";


const AddHotel = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: async () => {
            showToast({message: "Hotel Saved!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message: error.message, type: "ERROR"});
        }
    })

    const handleSave = (hotelFormData: FormData)=>{
        console.log("handle save")
        mutate(hotelFormData)
    }
    
    return (<ManageHotelForm onSave={handleSave} isLoading={isLoading}/>)
}

export default AddHotel;