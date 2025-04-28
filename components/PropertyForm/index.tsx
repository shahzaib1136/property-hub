import { Property } from "@lib/types/property";
import LocationFields from "@/components/PropertyForm/LocationFields";
import AmenitiesCheckboxes from "@/components/PropertyForm/AmenitiesCheckboxes";
import RateFields from "@/components/PropertyForm/RateFields";
import SellerFields from "@/components/PropertyForm/SellerFields";
import PropertyDetailsFields from "@/components/PropertyForm/PropertyDetailsFields";
import ListingStatsForm from "@/components/PropertyForm/ListingStatsForm";
import { ChangeHandler } from "@/components/PropertyForm/types";

interface PropertyFormProps {
  handleChange: ChangeHandler;
  fields: Property;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEditForm?: boolean;
  isSubmitButtonDisable?: boolean;
}

const PropertyForm: React.FC<PropertyFormProps> = ({
  handleChange,
  fields,
  handleSubmit,
  isEditForm = false,
  isSubmitButtonDisable = false,
}) => (
  <form onSubmit={handleSubmit}>
    <h2 className="text-3xl text-center font-semibold mb-6">{`${
      isEditForm ? "Edit" : "Add"
    } Property`}</h2>

    <PropertyDetailsFields fields={fields} onChange={handleChange} />
    <LocationFields fields={fields} onChange={handleChange} />
    <ListingStatsForm fields={fields} onChange={handleChange} />
    <AmenitiesCheckboxes handleChange={handleChange} fields={fields} />
    <RateFields onChange={handleChange} fields={fields} />
    <SellerFields onChange={handleChange} fields={fields} />

    {!isEditForm && (
      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 font-bold mb-2">
          Images (Select up to 4 images)
        </label>
        <input
          type="file"
          id="images"
          name="images"
          className="border rounded w-full py-2 px-3"
          accept="image/*"
          multiple
          onChange={handleChange}
        />
      </div>
    )}

    <div>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
        type="submit"
        disabled={isSubmitButtonDisable}
      >
        {`${isEditForm ? "Update" : "Add"} Property`}
      </button>
    </div>
  </form>
);

export default PropertyForm;
