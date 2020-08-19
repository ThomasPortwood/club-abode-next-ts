/**
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * https://swr.now.sh/ - for client side rendering
 */
import React from 'react';
import Head from "next/head";
import utilStyles from '../styles/utils.module.css'
import {Grid} from '@material-ui/core';

// export const getStaticProps: GetStaticProps = async context => {
//   const allPostsData = getSortedPostsData();
//   return {
//     props: {
//       allPostsData
//     }
//   }
// };

// export const getServerSideProps: GetServerSideProps = async context => {
//   return {
//     props: {
//       // props for your component
//     }
//   }
// };

const Home = ({allPostsData}) => {
  return (
    <div>
      <Head>
        <title>Club Abode</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <Grid container justify="center">
          <Grid item>
            <div className={`${utilStyles.login}`}>
              <a href={`/admin`}>
                <img src="favicon.ico"/>
                Login
              </a>
            </div>
          </Grid>
        </Grid>
      </section>
    </div>
  )
};

export default Home;