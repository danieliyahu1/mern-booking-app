import {useFormContext} from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
    const {register, formState:{errors}} = useFormContext<HotelFormData>();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-3">Images</h1>            
            <div className="border rounded flex flex-col p-4 gap-4">
            <input
                type="file"
                accept="image/*"
                multiple
                className="w-full text-gray-700 font-normal"
                {...register("imageFiles", {
                    validate: (imageFiles)=>{
                        const totalLength = imageFiles.length;
                        if(totalLength == 0){
                            return "At least one image should be added";
                        }
                        else if(totalLength > 6){
                            return "Total number of images cannot be more than 6";
                        }
                    }
                })}
            />
            </div>
            {errors.imageFiles && (<span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>)}
        </div>
    );
};

export default ImagesSection;