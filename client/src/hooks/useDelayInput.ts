import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'

type UseDelayInputInterface = [string, React.Dispatch<React.SetStateAction<string>>]

export const useDelayInput = (type:string):UseDelayInputInterface => {

    const dispatch = useDispatch()

    const [minPrice, setMinPrice] = useState('')

    useEffect(() => {
        let timer = setTimeout(() => {
            dispatch({ type: type, payload: minPrice })
        }, 1500)
        return () => clearTimeout(timer)
    }, [minPrice])

    return [minPrice, setMinPrice]

}