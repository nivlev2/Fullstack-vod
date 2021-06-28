import {useState} from 'react';

function FavoritesHook(arr){
    const [value,setValue] = useState(arr)

    const setArr = (newArr) =>{
        setValue([...newArr])
    }
    return [value, setArr]
}

export default FavoritesHook