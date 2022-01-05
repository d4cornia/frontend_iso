import { useState } from 'react';

const useInput = (initialValue, initialValue2 = false, initialValue3 = '') => {
  const [value, setValue] = useState(initialValue);
  const [value2, setValue2] = useState(initialValue2);
  const [value3, setValue3] = useState(initialValue3);

  const bindForm = {
    value: value,
    onChange: (e) => {
      setValue(e.target.value);
      setValue2(false);
      setValue3('');
    }
  };

  const clearText = (val = '') => {
    setValue(val);
  };

  const clearMessage = (val = '') => {
    setValue3(val);
  };

  return [value, bindForm, clearText, value2, setValue2, value3, setValue3, clearMessage];
  // [Input Value, Binding, ClearValue, Error, ChangeError, ErrorMessage, ChangeErrorMessage, ClearErrorMessage]
};

export default useInput;
