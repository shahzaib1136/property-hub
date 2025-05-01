import InputField from "@/components/UI/InputField";
import { ChangeHandler } from "@/components/AddPropertyForm/types";
import { Property } from "@lib/types/property";
import SelectField from "../UI/SelectField";

interface Props {
  fields: Property;
  onChange: ChangeHandler;
}

const propertyOptions = [
  { value: "", label: "Select an option" },
  { value: "Apartment", label: "Apartment" },
  { value: "Condo", label: "Condo" },
  { value: "House", label: "House" },
  { value: "CabinOrCottage", label: "Cabin or Cottage" },
  { value: "Room", label: "Room" },
  { value: "Studio", label: "Studio" },
  { value: "Other", label: "Other" },
];

const PropertyDetailsFields = ({ fields, onChange }: Props) => (
  <>
    <div className="mb-4">
      <SelectField
        label="Property Type"
        name="type"
        value={fields.type}
        onChange={onChange}
        options={propertyOptions}
        required
        // error={formData.type === "" ? "This field is required." : null}
      />
    </div>

    <div className="mb-4">
      <InputField
        label="Listing Name"
        name="name"
        placeholder="eg. Beautiful Apartment In Miami"
        required
        onChange={onChange}
        value={fields.name}
      />
    </div>

    <div className="mb-4">
      <label
        htmlFor="description"
        className="block text-gray-700 font-bold mb-2"
      >
        Description
      </label>
      <textarea
        id="description"
        name="description"
        className="border rounded w-full py-2 px-3"
        rows={4}
        placeholder="Add an optional description of your property"
        onChange={onChange}
        value={fields.description}
      />
    </div>
  </>
);

export default PropertyDetailsFields;
