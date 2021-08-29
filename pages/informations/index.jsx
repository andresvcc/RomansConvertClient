import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import Title from '@/components/title/Title';

export default function Home({ user }) {
  return (
    <main className={styles.main}>
      <Title />
      <Link href="/">
        To Home
      </Link>
    </main>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
