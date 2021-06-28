import {useState} from 'react'
export default function InputHandler (intialVal){
    const [value,setValue] = useState(intialVal)
    const setInput = (e) =>{
        setValue(e.target.value)
    }
    const reset = () =>{
        setValue('')
    }
    return [value,setInput,reset]
}