import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { RomansTextField, ArabicsTextField } from './RomansTextField';
import styles from '@/styles/Home.module.css';

const ImputAndOutputView = memo(({
  afterSubmission, valid, handleChange, state, reset, arabic
}) => (
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
));

ImputAndOutputView.propTypes = {
  afterSubmission: PropTypes.func,
  valid: PropTypes.bool,
  handleChange: PropTypes.func,
  state: PropTypes.string,
  reset: PropTypes.func,
  arabic: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default ImputAndOutputView;
