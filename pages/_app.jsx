import React from "react";
import NProgress from "nprogress";
import Head from "next/head";
import Layout from "@/components/layout";
import "@/components/layout.css";
import Router from "next/router";

Router.onRouteChangeStart = (url) => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();

Router.onRouteChangeError = () => NProgress.done();

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Request Test</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
