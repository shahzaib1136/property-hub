"use client";
import React, { useState } from "react";
import { setDefaults, fromAddress, OutputFormat } from "react-geocode";
import { Location } from "@/lib/types/property";
import Spinner from "@/components/common/Spinner";
import Map, { Marker } from "react-map-gl/mapbox";
import pin from "@assets/images/pin.svg";
import Image from "next/image";

import "mapbox-gl/dist/mapbox-gl.css";

const PropertyMap = ({ location }: { location: Location }) => {
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [isLoading, setIsLoading] = useState(true);
  const [isMapError, setIsMapError] = useState(false);

  const { street, city, state, zipcode } = location;

  setDefaults({
    key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, // Your API key here.
    language: "en", // Default language for responses.
    region: "es",
    outputFormat: OutputFormat.JSON,
  });

  React.useEffect(() => {
    const fetchCoords = async () => {
      try {
        const { results = [] } =
          (await fromAddress(`${street} ${city} ${state} ${zipcode}`)) || {};

        if (results.length === 0) {
          setIsMapError(true);
          return;
        }

        const { lat, lng } = results[0]?.geometry?.location || {};
        setCoordinates({ lat, lng });
      } catch (error) {
        console.log(error);
        setIsMapError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoords();
  }, [city, state, street, zipcode]);

  if (isLoading) {
    return <Spinner loading={isLoading} />;
  }

  if (isMapError) {
    return <div className="text-2xl">Location not found!</div>;
  }

  return (
    <Map
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      initialViewState={{
        longitude: coordinates.lng || 0,
        latitude: coordinates.lat || 0,
        zoom: 15,
      }}
      style={{ width: "100%", height: 500 }}
      mapStyle="mapbox://styles/mapbox/satellite-v9"
    >
      <Marker
        longitude={coordinates.lng || 0}
        latitude={coordinates.lat || 0}
        anchor="bottom"
      >
        <Image src={pin} height={30} width={30} alt="marker" />
      </Marker>
    </Map>
  );
};

export default PropertyMap;
