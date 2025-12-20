import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";

export default function Loader({ children, isLoading }) {
  if (isLoading) {
    return <Ripples size="45" speed="2" color="black" />;
  }
  return children;
}
