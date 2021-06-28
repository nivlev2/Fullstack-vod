import React,{useState,useContext,useRef} from 'react'
import {ThemeContext} from '../contexts/ThemeContext'
import {sortBy} from 'lodash'
import '../styles/Header.css'
function Header (props){
    const [movie,setMovie] = useState('')
    const {theme} = useContext(ThemeContext)
    const sortQRef = useRef()
    const spinner = theme? "DarkSpinner":"RegularSpinner"
    const inputValue = (e) =>{
        setMovie(e.target.value)
    }
    const sortArr = () => {
        let sort = sortQRef.current.value
        props.sortMovies(sort)
    }
    const loading = props.loading?  spinner:""
    return(
        <div>
        <div className="container-fluid my-2">
            <div className="strip">
            <h1 className="strip-title">Welcome to VOD</h1>
            </div>
            <div className="container">
            <div className="row ">
                <div className={theme? "bg-secondary":"light-search-bg"}>
                    <div className="col-md-5  d-flex m-2 float-start">
                        <form onSubmit={(e)=>{
                            e.preventDefault()
                           return props.searchMovie(movie)
                        }} className="col-md-12 form-group">

                        <input value={movie} onChange={inputValue} type="text" placeholder="search movie" className="float-start form-control headerInput"/>
                        <button  className={theme? "btn btn-danger float-start":"btn btn-primary float-start"}>Search</button>
                        <div className={`${loading} float-start`}></div>

                        </form>

                        </div>
                        <div className="selectMedia col-sm-6  my-2  float-end">
                    <select ref={sortQRef} onChange={sortArr
                    } className="form-select w-75" name="" id="">
                        <option value="Title">Name</option>
                        <option value="Year">Year</option>
                    </select>
                    </div>

                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
    )
}
export default Header