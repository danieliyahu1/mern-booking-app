import {useFormContext} from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Guests</h1>            
            <div className="grid grid-cols-2 p-6 gap-4 bg-gray-300">
                <label className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input type="number" min={0} className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("adultCount", { required: "This field is required"})}></input>
                    {errors.adultCount && (<span className="text-red-500">{errors.adultCount.message}</span>)}
                </label>
                
                <label className="text-gray-700 text-sm font-semibold">
                    Children
                    <input type="number" min={0} className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("childCount", { required: "This field is required"})}></input>
                    {errors.childCount && (<span className="text-red-500">{errors.childCount.message}</span>)}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;