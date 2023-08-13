import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

export const usePos = (pos) => {
  const { setPos } = useOutletContext();

  useEffect(() => {
    setPos(pos);
  });
};
