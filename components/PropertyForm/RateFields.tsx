import InputField from "@/components/UI/InputField";
import { ChangeHandler } from "@/components/PropertyForm/types";
import { Property, Rates } from "@lib/types/property";

interface Props {
  fields: Property;
  onChange: ChangeHandler;
}

const rateFields: (keyof Rates)[] = ["weekly", "monthly", "nightly"];

const RateFields = ({ fields, onChange }: Props) => (
  <div className="mb-4 bg-blue-50 p-4">
    <label className="block text-gray-700 font-bold mb-2">
      Rates (Leave blank if not applicable)
    </label>
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
      {rateFields.map((rate) => (
        <div className="flex items-center" key={rate}>
          <label htmlFor={`${rate}_rate`} className="mr-2 capitalize">
            {rate}
          </label>
          <InputField
            type="number"
            id={`${rate}_rate`}
            name={`rates.${rate}`}
            className="border rounded w-full py-2 px-3"
            onChange={onChange}
            value={fields.rates[rate] ?? ""}
          />
        </div>
      ))}
    </div>
  </div>
);

export default RateFields;
