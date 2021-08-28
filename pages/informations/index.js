import nextCookies from 'next-cookies';
import Link from 'next/link';
import styles from '@/styles/Home.module.css';
import redux from '@/assets/redux/redux';

export default function Home({ user }) {
  const [{ sessions, count = 0 }, dispatch] = redux();

  const add = () => {
    dispatch({ state: 'count', value: count + 1 });
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>
        <span>Convert Romans to </span>
        <span>Arabics Notation</span>
      </h1>

      <p>{count}</p>
      <pre>{JSON.stringify(sessions, null, 2)}</pre>
      <button type="button" onClick={add}>sdfsd</button>

      <Link href="/">
        To home
      </Link>
    </main>
  );
}

export const getServerSideProps = (context) => {
  const { user } = nextCookies(context);
  if (!user) return { props: { } };
  return { props: { user } };
};
