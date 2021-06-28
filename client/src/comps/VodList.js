import React,{useState,useEffect,useContext} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {ThemeContext} from '../contexts/ThemeContext'
import {v4 as uuid} from 'uuid'
function VodList(props){
    const [error,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState('')
    if(localStorage["movie"]){
        localStorage.removeItem("movie")
    }
    useEffect(()=>{
        const getData = async () => {
            props.loading(true)
            try{
                const resp = await axios.get(`https://www.omdbapi.com/?s=${props.movieName}&apikey=fd68d780`)
                props.changeArr(resp.data.Search) 
                props.loading(false)
                setError(false)
                checkLikes()
            }catch(e){
                setError(true)
                if(e instanceof TypeError){
                    setErrorMessage("We can't find this movie please try to search different movie")
                }else{
                    setErrorMessage("There is a promblem please try again later")
                }
                props.loading(false)

            }
        }
         getData()
    },[props.movieName,props.favorites])
    const closePopUp = () => {
        props.setTryLogin(false)
    } 
    const checkLikes = () =>{
      let temp_ar = []
      props.favorites.map(item =>{
        temp_ar.push(item.imdbID)
      })
      props.likesSetter(temp_ar)
  }
    const {theme} = useContext(ThemeContext)    
    const background = theme? `col-sm-6 shadow bg-secondary text-light`:`col-sm-6 shadow` 
      return (
          <div className="container py-5">
              {props.tryLogin? <div onClick={closePopUp} id="popupWrapper">
                <div id="popup" className={theme?"bg-secondary text-light":""}>
                 <div onClick={closePopUp} id="popupClose">X</div>
                <div id="popupContent">
                <h3 className="mb-4">Login in order to do likes</h3>
                <Link onClick={closePopUp} className={`btn btn-${theme? "danger":"primary"} mt-2`} to="/login">Click here to login</Link>
            </div>
                </div>
            </div>:""}
              {!error?
                            <div className="row  py-5">
                  {props.movies_arr.map(item =>{
                      return(
                      <div key={uuid()} className={background}>
                          <div className="m-3 p-2">
                        <div className="ListImage"  style={{backgroundImage:`url(${item.Poster})`}}></div>
                          <h5>{item.Title}</h5>
                          <p>Year:{item.Year}</p>
                          {props.likedKeys.indexOf(item.imdbID) != -1?
                          <button className="badge bg-danger" onClick={()=>{
                              props.removeFromFavorites(item.imdbID)
                          }}>Dislike</button>
                        :<button className="badge bg-success" onClick={()=>{
                              props.addToFavorites(item)
                          }}>like</button>
                        }
                          
                          <br/>
                          <Link onClick={()=>{
                              props.setSQ(item.imdbID)
                          }} className={theme? "btn btn-danger my-2":"btn btn-info my-2"}  to={`/movie/${item.imdbID}`}>MoreInfo</Link>
                          {/* <button onClick={()=>{
                              props.setSQ(item.imdbID)
                          }} className="btn btn-info">More info</button> */}
                          </div>
                      </div>
                      )
                  })}
              </div>:<div className="container py-5 d-flex align-items-center justify-content-center bg-danger text-white"><h1>{errorMessage}</h1></div>

            }
          </div>
        )

}

export default VodList