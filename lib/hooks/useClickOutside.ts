import { useEffect, RefObject } from "react";

/**
 * Custom hook to handle clicks outside a specified element.
 *
 * @param ref - React ref object pointing to the target element.
 * @param onClickOutside - Callback triggered when a click occurs outside the element.
 */
export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  onClickOutside: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onClickOutside]);
};
