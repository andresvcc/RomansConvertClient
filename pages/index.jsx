import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import Title from '@/components/title/Title';
import InputAndOutput from '@/components/inputAndOutput/InputAndOutput';

export default function Home() {
  return (
    <main className={styles.main}>
      <Title />
      <InputAndOutput />
    </main>
  );
}
