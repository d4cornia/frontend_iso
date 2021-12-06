import {useState} from "react";

const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const bindForm = {
        value: value,
        onChange: e => {
            setValue(e.target.value)
        }
    }

    const clearText = (val = '') => {
        setValue(val)
    }

    return [value, bindForm, clearText]
}

export default useInput