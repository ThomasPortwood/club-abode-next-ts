/**
 * https://nextjs.org/docs/basic-features/data-fetching
 * https://nextjs.org/docs/basic-features/data-fetching#getserversideprops-server-side-rendering
 * https://swr.now.sh/ - for client side rendering
 */
import React from 'react';
import {GetStaticProps} from "next";
import Head from "next/head";
import Link from "next/link";
import utilStyles from '../styles/utils.module.css'

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
        <Link href="/login">
          <a>Manual Login</a>
        </Link>
        <br/>
        <Link href="/profile">
          <a>Auto-login for Profile</a>
        </Link>
        <br/>
        <Link href="/admin">
          <a>Admin</a>
        </Link>
      </section>
    </div>
  )
};

export default Home;