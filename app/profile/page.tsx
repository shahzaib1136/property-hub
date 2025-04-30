"use client";
import Image from "next/image";
import profileImage from "@assets/images/profile.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import {
  deleteUserProperty,
  fetchUserProperties,
} from "@lib/api/propertiesApi";
import { Property } from "@lib/types/property";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";
import { toast } from "react-toastify";

function Profile() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { data: session, status } = useSession();
  const { image, name, email, id = "" } = session?.user || {};
  const isSessionLoading = status === "loading";

  useEffect(() => {
    if (!id) return;

    const getUserProperties = async () => {
      setIsLoading(true);
      try {
        const userProperties = await fetchUserProperties(id);
        setProperties(userProperties || []);
      } catch (error) {
        console.error("Failed to delete property:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getUserProperties();
  }, [id]);

  const handleClickDelete = async (propertyId?: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!propertyId || !isConfirmed) return;

    try {
      setIsLoading(true);
      await deleteUserProperty(propertyId);
      toast.success("Property deleted successfully!");
      const updatedProperties = await fetchUserProperties(id);
      setProperties(updatedProperties || []);
    } catch (error) {
      console.error("Failed to delete property:", error);
      toast.error("Property deletion failed!");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || isSessionLoading) {
    return <Spinner loading={isLoading} />;
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  width={200}
                  height={200}
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={image || profileImage}
                  alt="User"
                  priority={true}
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Name: </span>
                {name}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">Email: </span>
                {email}
              </h2>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
              {properties?.length > 0 ? (
                properties.map((property) => (
                  <div className="mb-10" key={property.id}>
                    <Link href={`/properties/${property.id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0] as string}
                        alt="Property 1"
                        width={400}
                        height={200}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold">{property.name}</p>
                      <p className="text-gray-600">
                        Address:{" "}
                        {`${property.location.street} ${property.location.city} ${property.location.state}`}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property.id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleClickDelete(property?.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="font-semibold text-2xl my-auto mx-4">
                  No Property Found!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
