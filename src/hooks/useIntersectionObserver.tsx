import { MutableRefObject, useState, useEffect } from "react";

import React from "react";

const UseIntersectionObserver = (
  ref: MutableRefObject<Element | null>,
  options?: IntersectionObserverInit,
) => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState<IntersectionObserverEntry | null>(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const observer = new IntersectionObserver((entries) => {
        setIntersectionObserverEntry(entries[0]);
      });
      observer.observe(ref.current);
      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
  }, []);
  return intersectionObserverEntry;
};

export default UseIntersectionObserver;
