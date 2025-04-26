import InputField from "@/components/UI/InputField";
import { ChangeHandler } from "@/components/PropertyForm/types";
import { Property } from "@lib/types/property";

interface Props {
  fields: Property;
  onChange: ChangeHandler;
}

const LocationFields = ({ fields, onChange }: Props) => (
  <div className="mb-4 bg-blue-50 p-4">
    <InputField
      label="Location"
      name="location.street"
      placeholder="Street"
      className="mb-2"
      // error={error}
      onChange={onChange}
      value={fields.location.street}
    />
    <InputField
      name="location.city"
      placeholder="City"
      required
      className="mb-2"
      // error={error}
      onChange={onChange}
      value={fields.location.city}
    />
    <InputField
      name="location.state"
      placeholder="State"
      required
      className="mb-2"
      // error={error}
      onChange={onChange}
      value={fields.location.state}
    />
    <InputField
      name="location.zipcode"
      placeholder="Zipcode"
      className="mb-2"
      // error={error}
      onChange={onChange}
      value={fields.location.zipcode}
    />
  </div>
);

export default LocationFields;
