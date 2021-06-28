import React,{useContext,useEffect,useState} from 'react';
import {ThemeContext} from '../contexts/ThemeContext'
import axios from 'axios'
import {Redirect,Link} from 'react-router-dom'
import InputHandler from '../hooks/inputHandler'
function SignUp(){
    const {theme} = useContext(ThemeContext)
    const [name,setName] = InputHandler('')
    const [email,changeEmail] = InputHandler('')
    const [password,setPassword] = InputHandler('')
    const [user,setUser] = useState({})
    const [emailExist,setEmailExist] = useState("")
    const [errMsg,setErrMsg] = useState('')
    const [netWorkError,setNetWorkError] = useState(false)

    const background = theme? "row shadow p-5 w-75 mx-auto text-light bg-secondary" :"row shadow p-5 w-75 mx-auto Login"
    const loginToApp = ()=>{
        setUser({
          name:name,    
          email:email,
          password:password
        }) 
      }
      useEffect(()=>{
        const login = async ()=>{
          try{
            if(name.length < 2 || email.length < 3 || password.length < 5){
                return
            }
            
            let url = process.env.REACT_APP_SERVER + '/users'
            let response = await axios.post(url,user).then(resp => resp.data)
            if(response.msg){
                return setEmailExist(true)
            }
            if(response[0]){
               return
            }
            setEmailExist("success")
            console.log("dsadsadsa");
          console.log(response);    
          }
          catch(e){
              setNetWorkError(true)
          }
        }
        login()
    },[user])
    console.log(user);
    const showAlet = () =>{
        if(name.length < 1 || password.length < 1 || email.length < 1){
                setErrMsg("Please fill all the fields below")
        }
        else{
            setErrMsg("")
        }
        
    }
    return(
        <div className="container py-5">
        <div className={background}>
          {netWorkError? <h2 className="text-danger bg-light">We have network problem please try again later</h2>:<h2 className="my-4 Login-title ">Sign up to Vod </h2>}
          <h4 className="text-danger">{errMsg}</h4>
        <form onSubmit={(e)=>{
          e.preventDefault();
            loginToApp()
            showAlet()
        }}>
            <div className="">
            <label  htmlFor="exampleInputEmail1">Name</label>
            <input
            value={name}
            onChange={setName}
              type="text"
              className="form-control"
              aria-describedby="nameHelp"
              placeholder="Enter your name"
            />
            <small className="text-danger">{user.name && user.name.length <2 ? "Your name is too short":""}</small>
            </div>
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
             <small className="text-danger">{emailExist === true? "This email address is already exist":""}</small>
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
          <small className="text-danger">{user.password && user.password.length <5 ? "Your password must be at least 5 chars":""}</small><br/>
          {emailExist === "success" ?  <div><h3 className="text-success">thank you very much </h3><br/>
          <Link to="/login" className="btn btn-success p-1">Click here to login</Link>
          </div> : <button  type="submit" className={`btn btn-${theme? "danger":"primary"} m-2`}>
            Submit
          </button>}
          <hr></hr>

          <Link className={`${theme? "text-light":""}`} to='/login'>Registered already? click here to log in!</Link>
        </form>
        </div>
      </div>    )
}

export default SignUp