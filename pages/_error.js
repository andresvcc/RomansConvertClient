import React, { useEffect } from 'react';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';

// core components
import styles from '@/assets/jss/nextjs-material-dashboard-pro/views/errorPageStyles';
import Layout from '@/layouts/simple';

const useStyles = makeStyles(styles);

function Home(props) {
  const classes = useStyles();
  return (
    <Layout>
      error Page
    </Layout>
  );
}

export default Home;
