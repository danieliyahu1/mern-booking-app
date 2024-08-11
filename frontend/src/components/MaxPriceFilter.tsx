
type Props = {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  };
  
  const MaxPriceFilter = ({onChange }: Props) => {
    return (
      <div className="border-b border-slate-300 pb-5">
        <h4 className="text-md font-semibold mb-2">Max Price</h4>
        <select
            onChange={onChange}
            className="p-2 border rounded-md w-full"
        >
            <option value=""> Select Max Price</option>

            {[50, 100, 200, 300, 500].map((num, index) =>(
                    <option key={index} value={num}>
                        {num}
                    </option>
                ))}

            </select>
      </div>
    );
  };
  
  export default MaxPriceFilter;