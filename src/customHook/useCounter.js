import {useState} from "react";

const useCounter = (initialCount = 0, val = 1) => {
    const [count, setCount] = useState(initialCount)

    const increment = () => {
        console.log("increment hook")
        // kita bisa ambil nilai sebelumnya
        // pakai arrow function
        setCount((prevCount) => prevCount + val)
    }

    const decrement = () => {
        console.log("decrement hook")
        setCount((prevCount) => prevCount - val)
    }

    const reset = () => {
        console.log("reset hook")
        setCount(0)
    }

    return [count, increment, decrement, reset]
}

export default useCounter