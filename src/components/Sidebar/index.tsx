import { useReducer } from "react";
import { sbState, sbAction } from "./types"

// @ts-ignore
import { sbHeader, sbMain, sbFooter } from "./router";

import "./styles.css";

const reducer = (state: sbState, action: sbAction) => {
  switch(action.type){
    case "TOGGLE":
      return { open: !state.open }
    default:
      return state
  }
}

export default function Sidebar() {
  const [state, dispatch] = useReducer(reducer, { open: true })

  return (
    <aside
      className="sidebar"
      style={{ width: !state.open ? 'fit-content' : 'var(--sb-w)' }}
    >
      {sbHeader(state, dispatch)}
      {sbMain(state)}
      {/* {sbFooter(state)} */}
    </aside>
  )
}