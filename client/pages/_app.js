// _app.js
import React from 'react';
import App from 'next/app';

function MyApp({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    // If running on the server, return null to prevent rendering
    return null;
  }

  // If running on the client, render the component
  return <Component {...pageProps} />;
}

MyApp.getInitialProps = async (appContext) => {
  // Ensure no server-side rendering happens
  return {
    pageProps: {
      // Add any global props here if needed
    },
  };
};

export default MyApp;
