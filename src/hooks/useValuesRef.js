import { useRef } from "react";

export const useValuesRef = (params) => {
  const paramsRef = useRef(null);
  paramsRef.current = params;
  return paramsRef;
};
