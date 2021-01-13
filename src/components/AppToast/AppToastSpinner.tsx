import React from "react";
import Loader from "react-loader-spinner";
import { LoaderTypes } from "types";

type Props = {
  children?: any;
  condition: any;
  width?: number;
  height?: number;
  type?: LoaderTypes;
};

function Spinner({
  children = null,
  condition,
  width = 50,
  height = 50,
  type = "MutatingDots",
}: Props) {
  if (!condition) {
    return (
      <Loader
        type={type}
        color="#58D68D"
        height={height}
        width={width}
        timeout={0}
      />
    );
  }
  if (condition) {
    return children;
  }
}

export default Spinner;
