import Head from "next/head";
import React from "react";

const Layout = ({
  title,
  children
}) => {
  return <>
      <Head>
        <title>{title || "blitz-app"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>;
};

export default Layout;