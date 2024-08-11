import {hotelFacilities} from '../config/hotel-options-config'

type Props = {
    selectedFacilities: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  const HotelFacilityFilter = ({ selectedFacilities, onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Facilities</h4>
        {hotelFacilities.map((facility, index) => (
          <label key={index} className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="rounded"
              value={facility}
              checked={selectedFacilities.includes(facility)}
              onChange={onChange}
            />
            <span>{facility}</span>
          </label>
        ))}
      </div>
    );
  };
  
  export default HotelFacilityFilter;