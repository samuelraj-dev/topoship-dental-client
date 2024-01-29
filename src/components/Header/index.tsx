import { RiNotification2Line } from "react-icons/ri"
import { TbMessage } from "react-icons/tb"

import "./styles.css"

export default function Header() {  
  
  return (
    <header className="header">
      <div className="nb-info1">
        <div className="nb-dr-container">
          <div className="nb-dr-profile"></div>
          <div className="nb-dr-info">
            <div className="nb-dr-name">Dr. M.S. Tamilarasi, M.D.S.</div>
            <div className="nb-dr-designation">Dental Surgeon</div>
          </div>
        </div>
        {/* <div className="nb-separator"></div> */}
      </div>
      <div className="nb-info2">
        <div className="nb-search">
          <input type="text" placeholder="search" />
        </div>
        <div className="nb-notification"><TbMessage /></div>
        <div className="nb-message"><RiNotification2Line /></div>
      </div>
    </header>
  )
}