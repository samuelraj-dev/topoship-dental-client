import { FiChevronLeft } from "react-icons/fi";
import { sbState, sbAction } from "./types";
import { Dispatch } from "react";

export const sbHeader = (state: sbState, dispatch: Dispatch<sbAction>) => {
  return <div className="sb-header">
    {/* <img
      src={Tooth}
    /> */}
    <h1>
      {!state.open ? 'T.' : 'Topoship.'}
    </h1>
    <button
      className="sb-controller"
      style={{ transform: !state.open ? 'rotateY(180deg) translate(-50%, -50%)' : 'translate(50%, -50%)' }}
      onClick={() => dispatch({ type: "TOGGLE" })}
    >
      <FiChevronLeft />
    </button>
  </div>
}