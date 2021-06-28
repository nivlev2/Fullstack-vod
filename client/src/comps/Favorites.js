import React,{useContext} from 'react';
import {v4 as uuid} from 'uuid';
import NotLoggedIn from '../loginComps/NotLoggedIn';
import {Link} from 'react-router-dom'
import {ThemeContext} from "../contexts/ThemeContext" 
function Favorites({favorites,setSQ,removeFromFavorites}){
        const {theme} = useContext(ThemeContext)
    const background = theme? `mx-auto col-sm-10 my-2 shadow  bg-secondary text-light p-2`:`col-sm-10 shadow1 p-2 mx-auto  my-2 ` 

    if(!localStorage["token"]){
        return <NotLoggedIn/>
    }
    
    // const {theme} = useContext(ThemeContext)
    // const background = theme? `col-sm-10 shadow bg-secondary text-light`:`col-sm-10 shadow p-2` 

    return (
        <div className="container py-5">
            <div className="row  py-5">
                {favorites.map(item =>{
                    return(
                        <div key={uuid()} className={background}>
                            <div className=" p-2">
                        <div className="ListImage-favorites"style={{backgroundImage:`url(${item.Poster})`}}></div>
                          <h5>{item.Title}</h5>
                          <p>Year:{item.Year}</p>
                          <button onClick={()=>{
                              removeFromFavorites(item.imdbID)
                          }} className="badge bg-danger my-2 text-light">Dislike</button><br/>
                          <Link onClick={()=>{
                              setSQ(item.imdbID)
                          }} className={theme? "btn btn-danger mx-auto":"btn btn-primary"}  to={`/movie/${item.imdbID}`}>MoreInfo</Link>
                          </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Favorites;