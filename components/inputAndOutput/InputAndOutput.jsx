import React, { memo, useState } from 'react';
import axios from 'axios';
import ImputAndOutputView from './ImputAndOutputView';

const regexp = /^(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const postPromise = (data) => new Promise((resolve) => {
  const dataRead = data || {};
  axios.post('/api/convert', dataRead, { withCredentials: true })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

const InputAndOutput = () => {
  const [state, setState] = useState('');
  const [arabic, setArabic] = useState(' ');
  const [valid, setValid] = useState(false);

  const afterSubmission = (evt) => {
    evt.preventDefault();
    const validExpresion = state !== '' && state !== ' ' && regexp.test(state);
    if (validExpresion) {
      postPromise({
        roman: state
      }).then((result) => {
        const { arabic } = result;
        setArabic(arabic);
      });
    }
  };

  const handleChange = async (evt) => {
    const romanParsed = `${evt.target.value}`.toUpperCase();
    setValid(!regexp.test(romanParsed));
    setState(romanParsed);
  };

  const reset = async (evt) => {
    evt.preventDefault();
    setState('');
    setValid(false);
    setArabic(' ');
  };

  return (
    <ImputAndOutputView
      afterSubmission={afterSubmission}
      valid={valid}
      handleChange={handleChange}
      state={state}
      reset={reset}
      arabic={arabic}
    />
  );
};

export default InputAndOutput;
