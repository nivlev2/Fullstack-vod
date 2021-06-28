import React from 'react'
import {Redirect,useParams} from 'react-router-dom'
function NotFound(){
    let id =useParams()
    console.log(id);
    
    return (
        
        <Redirect to="/" />)
}

export default NotFound