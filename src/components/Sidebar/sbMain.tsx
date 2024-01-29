import { NavLink, useLocation } from "react-router-dom"
import { sbState } from "./types";

import { sbNavItems } from "./data";

const renderNavLinks = (state: sbState) => {
  const location = useLocation()

  return (
    <>
      {sbNavItems.map((item, key) => {
        if (item.master !== true) {
          return (
            <NavLink
              to={item.link}
              className={
                `${location.pathname === item.link ? "sb-link-active" : ""} sb-link`
              }
              style={{ width: !state.open ? 'fit-content' : '-webkit-fill-available' }}
              key={key}>
              <div
                className="sb-link-icon"
                style={{ marginRight: !state.open ? '0rem' : '0.7rem' }}
              >
                { item.icon }
              </div>
              <div
                className="sb-link-name"
                style={{ contentVisibility: !state.open ? 'hidden' : 'inherit' }}
              >
                { item.name }
              </div>
            </NavLink>
          )
        }
      })}
      
      <div
        className="sb-link text-800"
        style={{ width: !state.open ? 'fit-content' : '-webkit-fill-available' }}
      >
        <div
          className="sb-link-icon"
          style={{ marginRight: !state.open ? '0rem' : '0.7rem' }}
        >
          
        </div>
        <div
          className="sb-link-name"
          style={{ contentVisibility: !state.open ? 'hidden' : 'inherit' }}
        >
          Master
        </div>
      </div>

      {sbNavItems.map((item, key) => {
        if (item.master === true) {
          return (
            <NavLink
              to={item.link}
              className={
                `${location.pathname === item.link ? "sb-link-active" : ""} sb-link`
              }
              style={{ width: !state.open ? 'fit-content' : '-webkit-fill-available' }}
              key={key}>
              <div
                className="sb-link-icon"
                style={{ marginRight: !state.open ? '0rem' : '0.7rem' }}
              >
                { item.icon }
              </div>
              <div
                className="sb-link-name"
                style={{ contentVisibility: !state.open ? 'hidden' : 'inherit' }}
              >
                { item.name }
              </div>
            </NavLink>
          )
        }
      })}
    </>
  )
}

export const sbMain = (state: sbState) => {
  return <div className="sb-main">
  <nav className="sb-nav">
    {/* @ts-ignore */}
    {renderNavLinks(state)}
  </nav>
  {/* <div
    className="doctor-info"
    style={{ contentVisibility: !state.open ? 'hidden' : 'inherit' }}  
  >
    <div className="doctor-profile"></div>
    <div className="doctor-name">Dr. M.S. Tamilarasi, M.D.S.</div>
    <div className="doctor-designation">Dental Surgeon</div>
  </div> */}
</div>
}