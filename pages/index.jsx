import { useState, useEffect } from 'react';
import styles from '@/styles/Home.module.css';
import Title from '@/components/title/Title';
import InputAndOutput from '@/components/inputAndOutput/InputAndOutput';

export default function Home({ user }) {
  return (
    <main className={styles.main}>
      <Title />
      <InputAndOutput />
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
