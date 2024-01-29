import { TbLogout } from "react-icons/tb"
import { sbState } from "./types"

export const sbFooter = (state: sbState) => {
  return <footer className="sb-footer">
    {/* <div>settings</div> */}
    <div className="sb-logout">
      <div
        className="sb-logout-icon"
        style={{ marginRight: !state.open ? '0rem' : '0.7rem' }}
      >
        <TbLogout />
      </div>
      <div
        style={{ contentVisibility: !state.open ? 'hidden' : 'inherit' }}
      >logout</div>
    </div>
  </footer>
}