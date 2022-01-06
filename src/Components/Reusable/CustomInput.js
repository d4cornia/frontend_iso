import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';
import useInput from 'customHooks/useInput';

const CustomInput = (props) => {
  const [
    input,
    bindInput,
    clearInput,
    isErrorInput,
    setErrorInput,
    errorMsgInput,
    setErrorMsgInput,
    clearErrorMsgInput
  ] = useInput('', false, '');

  const setError = (message) => {
    setErrorInput(true);
    setErrorMsgInput(message);
  };

  const clearError = () => {
    setErrorInput(false);
    setErrorMsgInput('');
  };

  useEffect(() => {
    props.updateObject({
      value: input,
      isError: isErrorInput,
      errorMsg: errorMsgInput,
      setError,
      clearError
    });
  }, [input]);

  return (
    <Form.Group
      className={`mb-3 input-container ${props.isHidden ? 'hidden' : ''}`}
      controlId={props.name}>
      <Form.Label>{props.label}</Form.Label>
      <Form.Control
        className={`${isErrorInput ? 'is-invalid' : ''}`}
        type={props.type ? props.type : 'text'}
        name={props.name}
        placeholder={props.placeholder}
        {...bindInput}
      />
      {isErrorInput && <div className="text-danger text_small">{errorMsgInput}</div>}
    </Form.Group>
  );
};

export default CustomInput;
