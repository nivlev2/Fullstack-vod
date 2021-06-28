import React,{useContext} from 'react'
import {ThemeContext} from '../contexts/ThemeContext'

export default function PageContent(props){
    const {theme} = useContext(ThemeContext)
    const styles = {
        backgroundColor: theme? "#635858" : "white",
        minHeight:"100vh",
        padding:'0px'
        // boxSizing:"border-box"
        // width:"100vw"
    }
    return <div className="container-fluid" style={styles}>{props.children}</div>

}