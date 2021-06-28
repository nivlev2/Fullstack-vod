import React,{createContext,useState} from 'react'

export const LoginStatusContext = createContext();

export function LoginStatusProvider (props){
    const [status,setStatus] = useState(false);
    function changeStatus(intialVal){
        setStatus(intialVal);
    }
    return(
        <LoginStatusContext.Provider value={{status,changeStatus}}>
            {props.children}
        </LoginStatusContext.Provider>
    )
}