import { Property } from "@lib/types/property";

const amenities = [
  "Air Conditioning",
  "Barbeque",
  "Dryer",
  "Gym",
  "Laundry",
  "Lawn",
  "Microwave",
  "Outdoor Shower",
  "Refrigerator",
  "Sauna",
  "Swimming Pool",
  "TV Cable",
  "Washer",
  "WiFi",
  "Window Coverings",
];

interface AmenitiesCheckboxesProps {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fields: Property;
}

const AmenitiesCheckboxes: React.FC<AmenitiesCheckboxesProps> = ({
  handleChange,
  fields,
}) => (
  <div className="mb-4">
    <h3 className="block text-gray-700 font-bold mb-2">Amenities</h3>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
      {amenities.map((item) => (
        <label key={item} className="inline-flex items-center">
          <input
            type="checkbox"
            name="amenities"
            value={item}
            className="mr-2"
            onChange={handleChange}
            checked={fields?.amenities?.includes(item)}
          />
          {item}
        </label>
      ))}
    </div>
  </div>
);

export default AmenitiesCheckboxes;
