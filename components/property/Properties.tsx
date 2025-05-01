"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { fetchProperties } from "@lib/api/propertiesApi";
import { Property } from "@lib/types/property";
import PropertyCard from "../PropertyCard";
import Spinner from "../common/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const LIMIT = 6;

const Properties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isInitialLoad = useRef(true);

  const loadProperties = useCallback(async () => {
    try {
      const {
        properties = [],
        page = 1,
        pages = 1,
      } = (await fetchProperties({ page: currentPage, limit: LIMIT })) || {};

      const hasMore = page < pages;

      if (properties?.length > 0) {
        setProperties((prev) => [...prev, ...properties]);

        if (hasMore) {
          setCurrentPage((prev) => prev + 1);
        }
        setIsLoading(false);
        setHasMore(hasMore);
      }
    } catch (err) {
      console.error(err);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      loadProperties();
    }
  }, [loadProperties]);

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {isLoading ? (
          <Spinner loading={true} />
        ) : properties.length === 0 && !hasMore && !isLoading ? (
          <div className="text-center text-gray-500 text-xl font-semibold">
            No properties found.
          </div>
        ) : (
          <InfiniteScroll
            dataLength={properties.length}
            next={loadProperties}
            hasMore={hasMore}
            loader={<Spinner loading={true} />}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </section>
  );
};

export default Properties;
