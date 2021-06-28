import {useState} from 'react'

function GetDataState(intialval){
    const [arr,setArr] = useState(intialval)

    const changeArr = (newArr)=>{
        setArr([...newArr])
    }
    return{arr,changeArr}
}

export default GetDataState