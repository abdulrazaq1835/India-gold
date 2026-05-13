import { useEffect, useState } from "react"


export const useLocalStorage = (key ,initialValue)=>{
    const [state,setState] = useState(()=>{
        try {
            const saved =  localStorage.getItem(key)
    return saved ? JSON.parse(saved):initialValue            
        } catch {
            return initialValue
        }
    })

    useEffect(()=>{
        try {
         localStorage.setItem(key,JSON.stringify(state))   
        } catch  {
               console.error("localStorage dont saved")
        }
    },[key,state])
    
     return [state, setState]

}

