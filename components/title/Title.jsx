import React from 'react';
import styles from '@/styles/Home.module.css';

function Title(props) {
  return (
    <h1 className={styles.title}>
      Convert
      <span className={styles.redSpan}> Romans </span>
      to
      <span className={styles.blueSpan}> Arabics </span>
      Notation
    </h1>
  );
}

export default Title;
