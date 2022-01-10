import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Form } from 'react-bootstrap';
import useInput from '../../customHooks/useInput';

const CustomInput = forwardRef((props, ref) => {
  // VARIABLES
  const [input, bindInput, clearInput] = useInput(props.defaultValue ? props.defaultValue : '');
  const [stateInput, setStateInput] = useState(0); // State Value - -1: Error, 0: default, 1: success
  const [messageInput, setMessageInput] = useState(props.message ? props.message : ''); // Message Value
  const [errorMessageInput, setErrorMessageInput] = useState(''); // ErrorSuccessMessage Value

  useImperativeHandle(ref, () => ({
    // Methods exposed to parent
    // Call Example(On parent): <refName>.current.showError()
    value: input,
    state: stateInput,
    showError(message) {
      setError(message);
    },
    clearValue() {
      clearInput();
    },
    changeMessage(message) {
      setMessageInput(message);
    }
  }));

  useEffect(() => {
    clearError();
  }, [input]);

  const setError = (message) => {
    setStateInput(-1);
    setErrorMessageInput(message);
  };

  const clearError = () => {
    setStateInput(0);
    setErrorMessageInput('');
  };

  const setSuccess = () => {
    if (props.successMessage && stateInput !== -1 && input.length > 0) {
      setStateInput(1);
      setErrorMessageInput(props.successMessage);
    }

    if (props.blur) {
      console.log('hello');
      props.blur();
    }
  };

  return (
    <Form.Group
      className={`mb-3 input-container ${props.isHidden ? 'hidden' : ''} ${props.className}`}
      controlId={props.name}>
      {props.label && <Form.Label>{props.label}</Form.Label>}
      <Form.Control
        className={`${stateInput === -1 ? 'is-invalid' : stateInput === 1 ? 'is-valid' : ''}`}
        type={props.type ? props.type : 'text'}
        name={props.name}
        placeholder={props.placeholder}
        onBlur={setSuccess}
        onFocus={(e) => {
          if(props.focusing){
            props.focusing(e);
          }
        }}
        onKeyUp={(e) => {
          if(props.keyUp){
            props.keyUp(e);
          }
        }}
        {...bindInput}
      />
      {(messageInput !== '' || errorMessageInput !== '') && (
        <div
          className={`${
            stateInput === -1
              ? 'invalid-feedback'
              : stateInput === 1
              ? 'valid-feedback'
              : 'default-feedback'
          }`}>
          {errorMessageInput !== '' ? errorMessageInput : messageInput}
        </div>
      )}
    </Form.Group>
  );
});
// Template(Copy Only)
// <CustomInput
//  ref={ref}
//  name="password"
//  type="password"
//  label="Password"
//  placeholder="Must consist of 1 letter and 1 number"
//  isHidden={Logic?}
// />
export default CustomInput;
