import React,{useContext} from 'react';
import { Link } from 'react-router-dom';
import {ThemeContext} from '../contexts/ThemeContext'
import '../styles/NotLoggedIn.css'

function NotLoggedIn(){
    const {theme} = useContext(ThemeContext)
    return(
        <div className="container  my-5">
                <div className="row">
                <div className={`col-lg-10 shadow ${theme? "bg-secondary text-light": "NotLoggedIn-background"}   mx-auto justfiy-content-center` }>
                    <div className="mx-auto">
                    <div className="NotLoggedIn-image"></div>
                    <div className=" ">
            <h3 >You have to log in <br/>in order to see you favorites</h3>
            <p>Click here to login now</p>
            <Link to ="/login" className= {theme? "btn btn-danger mb-3":"btn btn-primary mb-3"}>Log In now</Link></div>
            </div>

            {/* </div> */}
            </div>
            </div>
        </div>
    )
}

export default NotLoggedIn