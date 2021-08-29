import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { RomansTextField, ArabicsTextField } from './RomansTextField';
import styles from '@/styles/Home.module.css';

const regexp = /^((\(M\)){0,3})(\(C\)\(M\)|\(C\)\(D\)|(\(D\))?(\(C\)){0,3})(\(X\)\(C\)|\(X\)\(L\)|(\(L\))?(\(X\)){0,3})(M\(X\)|M\(V\)|(\(V\))?)(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/;

const map = {
  I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000
};

const roman2arabic = (s) => {
  const validExpresion = regexp.test(s);
  if (validExpresion) return [...s].reduce((r, c, i, s) => (map[s[i + 1]] > map[c] ? r - map[c] : r + map[c]), 0);
  return 'NaN';
};

const InputAndOutput = ({ api }) => {
  const [state, setState] = useState('');
  const [arabic, setArabic] = useState(' ');
  const [valid, setValid] = useState(false);

  const afterSubmission = (evt) => {
    evt.preventDefault();
    const validExpresion = regexp.test(state);
    if (validExpresion) setArabic(roman2arabic(state));
  };

  const handleChange = (evt) => {
    const romanParsed = `${evt.target.value}`.toUpperCase();
    setValid(!regexp.test(romanParsed));
    setState(romanParsed);
  };

  const reset = (evt) => {
    evt.preventDefault();
    setState('');
    setValid(false);
    setArabic(' ');
  };

  return (
    <div>
      <form
        className={styles.calculForm}
        noValidate
        autoComplete="off"
        onSubmit={afterSubmission}
      >

        <div className={styles.groupTextField}>
          <RomansTextField
            id="romans"
            label={valid ? 'Invalid Roman Number' : 'Roman Number'}
            variant="outlined"
            onChange={handleChange}
            value={state}
          />

          <div className={styles.groupButton}>
            <button type="submit" className={valid ? styles.submitButonDisabled : styles.submitButon}>
              Convert
            </button>
            <button type="submit" className={styles.submitButon} onClick={reset}>
              Reset
            </button>
          </div>

          <ArabicsTextField
            id="arabic"
            label="Answer: Arabic notation"
            variant="outlined"
            value={arabic}
          />

        </div>

      </form>
    </div>
  );
};

InputAndOutput.propTypes = {
  api: PropTypes.func
};

export default InputAndOutput;
