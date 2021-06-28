import React,{useContext} from 'react';
import { NavLink } from 'react-router-dom';
import {ThemeContext} from '../contexts/ThemeContext'
import {LoginStatusContext} from '../contexts/LoginStatusContext'
import '../styles/Navbar.css'
function NavBar (props){
    const {status,changeStatus} = useContext(LoginStatusContext)
    const {theme,changeTheme} = useContext(ThemeContext)
    const logout = () =>{
        changeStatus(false)
        props.setFavorites([])
        props.likesSetter([])
        // props.tokenChanged('')
        localStorage.removeItem("token")
    }
    const background = theme? "rgb(39, 41, 44)":"rgb(127, 127, 233)"
    // const font = theme? "rgb(221, 178, 61)" : "#efefef"
    const active = theme? "darkActive" :"active"
    return (
        <div>
        <div style={{background: background}}  className="nav">
  <input type="checkbox" id="nav-check"/>
  <div className="nav-header">
    <div className="nav-title form-check form-switch">
    <label className="float-start">Dark mode</label> 

    <input onClick={changeTheme} className="form-check-input ms-5" type="checkbox" id="flexSwitchCheckChecked" />
    </div>
  </div>
  <div className="nav-btn">
    <label htmlFor="nav-check">
      <span></span>
      <span></span>
      <span></span>
    </label>
  </div>
  
  <div style={{background: background}} className="nav-links">
    <NavLink exact activeClassName={active}   className="NNN"to="/">Home</NavLink>
    {status?<div onClick={logout} className="NNN LogOutLink">Log out</div> :    
    <NavLink exact activeClassName={active} className="NNN"to="/login">Login</NavLink>}
    <NavLink exact activeClassName={active} className="NNN"to ='/favorites'>Favorites</NavLink>
    
  </div>
</div>
        </div>
    )
}
export default NavBar