import React,{useState,useEffect,useContext} from "react";
import {LoginStatusContext} from '../contexts/LoginStatusContext'
import {Redirect,Link} from 'react-router-dom'
import axios from "axios"
import InputHandler from '../hooks/inputHandler'
import {ThemeContext} from '../contexts/ThemeContext'
import '../styles/Login.css'
function Login() {
  const {status,changeStatus} = useContext(LoginStatusContext)
  const {theme} = useContext(ThemeContext)    
  const [email,changeEmail] = InputHandler('')
  const [password,setPassword] = InputHandler('')
  const [user,setUser] = useState({})
  const [netWorkError,setNetWorkError] = useState(false)
  const [invalidUser,setInvalidUser] = useState(false)
  const loginToApp = ()=>{
    setUser({    
      email:email,
      password:password
    }) 
  }
  useEffect(()=>{
    const login = async ()=>{
      try{
        if(email.length < 3 || password.length < 2){
          return
        }
      let url = process.env.REACT_APP_SERVER + '/users/login'
      let response = await axios.post(url,user).then(resp => resp.data)
      setNetWorkError(false)
      if(response.Token){
        localStorage.setItem('token', response.Token)
        changeStatus(true)
      }
      
      else if(email.length > 0 || password.length > 0){
        setInvalidUser(true)
      }
      }
      catch(e){
        changeStatus(false)
        setInvalidUser(false)
        setNetWorkError(true)
      }
    }
    login()
},[user])
  if(status){
    return <Redirect to= '/'/>
  }
  const background = theme? "row shadow p-5 w-75 mx-auto text-light bg-secondary" :"row shadow p-5 w-75 mx-auto Login"
  return (
    <div className="container py-5 ">
      <div className={background}>
        {netWorkError? <h3 className="text-danger bg-light">We have network problem please try again later</h3>:<h2 className="my-4 Login-title">Login to Vod </h2>}
        {invalidUser? <h3 className="text-danger">Invalid email or password</h3>:""}
      <form onSubmit={(e)=>{
        e.preventDefault();
        loginToApp()
      }}>
        <div className="">
          <label  htmlFor="exampleInputEmail1">Email address</label>
          <input
          value={email}
          onChange={changeEmail}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            value = {password}
            onChange={setPassword}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        
        <button type="submit" className={`btn btn-${theme? "danger":"primary"} m-2`}>
          Submit
        </button><br/>
        <hr></hr>

        <Link className={`${theme? "text-light":""}`} to='/signup'>Not registered already? click here to register now!</Link>
      </form>
      </div>
    </div>
  );
}

export default Login;
